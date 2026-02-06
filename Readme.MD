# Carving Hall

A LOTR-inspired woodcarving storefront built with Next.js (App Router) and Stripe Checkout.

## Stripe setup (granular)

1) Create a Stripe account.
2) In Stripe Dashboard, create products + prices for each carving.
3) Copy each Price ID and replace the `price_replace_*` values in `app/data/products.ts`.
4) Get your API keys from Stripe:
   - `STRIPE_SECRET_KEY` (secret key)
5) Add a webhook endpoint in Stripe:
   - Endpoint URL (after deploy): `https://your-domain.com/api/webhook`
   - Events to send: `checkout.session.completed`
   - Copy the webhook signing secret as `STRIPE_WEBHOOK_SECRET`

## Database setup (orders)

This project uses Prisma + Postgres. You need a Postgres database URL.

1) Create a Postgres database (Neon/Supabase/Render, etc.).
2) Add `DATABASE_URL` to `.env.local`.
3) Run Prisma migrations:

```bash
npx prisma migrate dev --name init
```

## Local setup

1) Install deps

```bash
npm install
```

2) Create a Stripe account, then add your keys and price IDs.

Create `.env.local`:

```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgresql://user:pass@host:5432/db
```

Update price IDs in `app/data/products.ts` (replace the `price_replace_*` values).

3) Run the dev server

```bash
npm run dev
```

Open http://localhost:3000

## Stripe notes

- Each product needs a Stripe Price ID (from your Stripe Dashboard).
- The checkout endpoint is in `app/api/checkout/route.ts`.
- The webhook endpoint is `app/api/webhook/route.ts` and stores paid orders.

## Deploy

Recommended: Vercel.

1) Push this repo to GitHub.
2) Import the repo in Vercel.
3) Add the `STRIPE_SECRET_KEY` env var in Vercel.
4) Add `STRIPE_WEBHOOK_SECRET` and `DATABASE_URL` in Vercel.
4) Deploy.

If you prefer another host (Netlify, Render, etc.), I can provide a tailored setup.
