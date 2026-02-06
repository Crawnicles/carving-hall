import { NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/app/data/products";
import { getDb } from "@/app/lib/db";

const stripeSecret = process.env.STRIPE_SECRET_KEY;

if (!stripeSecret) {
  // Fail fast in development if env is missing.
  console.warn("STRIPE_SECRET_KEY is not set");
}

const stripe = new Stripe(stripeSecret ?? "", {
  apiVersion: "2024-06-20",
});

type CheckoutItem = {
  id: string;
  quantity: number;
};

export async function POST(request: Request) {
  try {
    if (!stripeSecret) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const body = (await request.json()) as { items?: CheckoutItem[] };

    if (!body.items || body.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
    }

    const lineItems = body.items.map((item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) {
        throw new Error(`Unknown product: ${item.id}`);
      }
      if (!product.priceId.startsWith("price_")) {
        throw new Error(`Missing Stripe price ID for ${product.name}`);
      }
      return {
        price: product.priceId,
        quantity: item.quantity,
      };
    });

    const origin = request.headers.get("origin") ?? "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: lineItems,
      success_url: `${origin}/checkout/success`,
      cancel_url: `${origin}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "NZ"],
      },
      allow_promotion_codes: true,
    });

    const db = getDb();
    const totalAmount = body.items.reduce((sum, item) => {
      const product = products.find((entry) => entry.id === item.id);
      if (!product) return sum;
      return sum + Math.round(product.price * 100) * item.quantity;
    }, 0);

    await db.order.create({
      data: {
        stripeSessionId: session.id,
        status: "pending",
        totalAmount,
        currency: "usd",
        items: {
          create: body.items.map((item) => {
            const product = products.find((entry) => entry.id === item.id);
            return {
              productId: item.id,
              productName: product?.name ?? item.id,
              priceAmount: Math.round((product?.price ?? 0) * 100),
              quantity: item.quantity,
            };
          }),
        },
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Checkout failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
