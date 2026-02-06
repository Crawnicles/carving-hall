import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/app/data/products";
import { getDb } from "@/app/lib/db";

const stripeSecret = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const stripe = new Stripe(stripeSecret ?? "", {
  apiVersion: "2024-06-20",
});

const getProductByPriceId = (priceId?: string | null) =>
  products.find((product) => product.priceId === priceId);

export async function POST(request: Request) {
  if (!stripeSecret || !webhookSecret) {
    return NextResponse.json(
      { error: "Stripe webhook is not configured." },
      { status: 500 }
    );
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Invalid signature";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const db = getDb();

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const sessionId = session.id;

    const lineItems = await stripe.checkout.sessions.listLineItems(sessionId, {
      limit: 100,
    });

    const totalAmount = session.amount_total ?? 0;
    const currency = session.currency ?? "usd";

    const itemsData = lineItems.data.map((item) => {
      const product = getProductByPriceId(item.price?.id ?? null);
      const unitAmount = item.price?.unit_amount ?? 0;
      return {
        productId: product?.id ?? item.price?.id ?? "unknown",
        productName: product?.name ?? item.description ?? "Unknown item",
        priceAmount: unitAmount,
        quantity: item.quantity ?? 1,
      };
    });

    const shippingAddress = session.shipping_details
      ? {
          name: session.shipping_details.name,
          address: session.shipping_details.address,
        }
      : null;

    await db.order.upsert({
      where: { stripeSessionId: sessionId },
      update: {
        status: "paid",
        totalAmount,
        currency,
        customerEmail: session.customer_details?.email ?? null,
        shippingAddress,
        items: {
          deleteMany: {},
          create: itemsData,
        },
      },
      create: {
        stripeSessionId: sessionId,
        status: "paid",
        totalAmount,
        currency,
        customerEmail: session.customer_details?.email ?? null,
        shippingAddress,
        items: {
          create: itemsData,
        },
      },
    });
  }

  return NextResponse.json({ received: true });
}
