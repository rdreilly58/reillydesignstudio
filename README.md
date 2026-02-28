# ReillyDesignStudio.com

Professional design studio website — portfolio, shop, blog, and services.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL (Neon) + Prisma 5 |
| Auth | NextAuth.js |
| Payments | Stripe (live) |
| File Storage | AWS S3 (digital downloads) |
| Blog | MDX via `next-mdx-remote` |
| Hosting | AWS Amplify |

## Site Structure

```
/                           Home — hero, portfolio preview, services, blog
/portfolio                  Work gallery
/portfolio/[slug]           Individual project case study
/blog                       Blog listing
/blog/[slug]                Blog post (MDX)
/contact                    Contact form
/shop                       Shop landing
/shop/physical              Physical products + cart
/shop/digital               Digital downloads
/shop/services              Services + quote request + Book Now checkout
/shop/cart                  Shopping cart
/shop/checkout              Stripe checkout
/shop/checkout/success      Payment confirmation
/shop/checkout/cancel       Payment cancelled
/dashboard                  Customer dashboard (orders, downloads, quotes)
/admin                      Admin overview
/admin/orders               Order management
/admin/products             Product management
/admin/quotes               Quote management (review, price, send payment links)
/admin/invoices             Invoice management (create, list, PDF download)
/admin/blog                 Blog post management
```

## Payment & Invoice System

### Quote-to-Payment Flow

1. **Customer requests a quote** via the form on `/shop/services`
2. **Admin reviews** in `/admin/quotes` — sets price, adds notes
3. **Admin sends quote** — creates a Stripe Checkout session and payment link
4. **Customer pays** via Stripe Checkout
5. **Webhook** (`checkout.session.completed`) creates an Order and marks the quote as ACCEPTED
6. **Invoice** is available in Stripe and the admin panel

### Fixed-Price Services

Each service on `/shop/services` has a **Book Now** button that:
- Creates a Stripe Checkout session for the listed amount
- Redirects customer to Stripe-hosted payment page
- On success → `/shop/checkout/success`
- On cancel → `/shop/checkout/cancel`

### Invoice Management

Admins can create and send Stripe invoices directly from `/admin/invoices`:
- Enter customer email, description, and amount
- Invoice is created, finalized, and sent via Stripe
- All invoices are listed with status, amount, PDF download, and hosted view links

### Stripe Webhook Events Handled

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Creates Order, links to Quote if applicable, marks quote ACCEPTED |
| `payment_intent.succeeded` | Updates Order status to PAID |
| `payment_intent.payment_failed` | Updates Order status to CANCELLED |
| `invoice.paid` | Logged |

## API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/quotes` | GET, POST | List / submit quote requests |
| `/api/quotes/[id]` | GET, PATCH | View / update a quote (status, price, notes) |
| `/api/quotes/[id]/send` | POST | Create Stripe Checkout session, send payment link |
| `/api/checkout` | POST | Create Stripe Checkout for fixed-price services |
| `/api/invoices` | GET | List all Stripe invoices |
| `/api/invoices/[id]` | GET | Single invoice with PDF link |
| `/api/invoices/create` | POST | Create & send a Stripe invoice |
| `/api/stripe/webhook` | POST | Stripe payment event handler |
| `/api/download/[token]` | GET | Secure digital file download |

## Data Models (Prisma)

- **User** — customers + admins (NextAuth compatible)
- **Product** — type: `PHYSICAL | DIGITAL | SERVICE`
- **Order + OrderItem** — full order lifecycle, linked to Stripe payment/invoice IDs
- **DigitalDownload** — secure token-based download with expiry + limit
- **Quote** — service inquiry workflow (`PENDING → REVIEWING → SENT → ACCEPTED | DECLINED`), linked to Stripe customer/session/payment link
- **BlogPost** — MDX content with tags + publish status
- **PortfolioItem** — project showcase with images + tags

## Environment Variables

```
DATABASE_URL                        PostgreSQL connection string (Neon)
NEXTAUTH_SECRET                     Random secret for NextAuth
NEXTAUTH_URL                        https://reillydesignstudio.com
STRIPE_SECRET_KEY                   Stripe live secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY  Stripe live publishable key
STRIPE_WEBHOOK_SECRET               Stripe webhook signing secret
AWS_ACCESS_KEY_ID                   AWS credentials for S3
AWS_SECRET_ACCESS_KEY
AWS_REGION                          e.g. us-east-1
AWS_S3_BUCKET                       S3 bucket for digital files
NEXT_PUBLIC_SITE_URL                https://reillydesignstudio.com
```

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# edit .env.local with your values

# Set up database
npx prisma generate
npx prisma migrate dev

# Run dev server
npm run dev
```

## Deployment

Hosted on **AWS Amplify** with auto-deploy on push to `main`.
Domain: `reillydesignstudio.com` via Cloudflare (DNS proxy off for Amplify SSL).

## Business Entity

**Reilly Design Studio LLC** — Virginia SCC Entity ID: 11973922
- Bank: Mercury Business Checking
- Payments: Stripe (live)
- Bookkeeping: Wave
- Business License: Fairfax County BPOL

## AI / Automation

This project is managed with **OpenClaw** — an AI agent with access to the codebase, deployment pipeline, and external services (Twilio, Stripe, AWS).

- Deployments: AWS Amplify (auto-deploy on push to `main`)
- Secrets managed via environment variables (never committed)

## Admin Authentication

### How It Works

- **Auth Provider:** NextAuth.js with Google OAuth + PrismaAdapter (database sessions)
- **Protected Routes:** All `/admin/*` routes
- **Allowed Emails:** `rdreilly2010@gmail.com`, `robert.reilly@reillydesignstudio.com`

### Architecture Notes

- **Middleware** (`src/middleware.ts`) checks for the `__Secure-next-auth.session-token` cookie on `/admin/*` routes. If missing, redirects to `/api/auth/signin`.
- **Admin layout** (`src/app/admin/layout.tsx`) uses `useSession()` to verify the authenticated user's email is in the allowed list. Non-admin emails are redirected to `/`.
- **Important:** Since PrismaAdapter uses **database sessions** (not JWT), `getToken()` from `next-auth/jwt` does **not** work in middleware. The middleware must check for the session cookie directly.
- **Amplify SSR quirk:** `req.url` inside Amplify's SSR Lambda resolves to `localhost:3000`, not the real domain. The middleware hardcodes the production base URL for redirects.

### Login Flow

1. User navigates to `/admin`
2. Middleware checks for session cookie → redirects to `/api/auth/signin` if missing
3. User clicks "Sign in with Google" → Google OAuth flow
4. On success, NextAuth creates User/Account/Session records in PostgreSQL via PrismaAdapter
5. Session cookie is set → middleware allows access
6. Admin layout verifies email is in the allowed list

## Trademarks

- **Reilly Design Studio™** — USPTO search clear as of 2026-02-28
- **Design That Moves People™** — USPTO search clear as of 2026-02-28
- Federal trademark applications pending filing (TEAS Plus, Class 42)
- ™ displayed on site: hero tagline, footer, page metadata

## Email Signature

HTML email signature stored at `~/.openclaw/workspace/rds-email-signature.html`
- Logo: `/public/signature-logo.png` (dark zinc + violet "RDS")
- Installed in Spark Mail for `robert.reilly@reillydesignstudio.com`
- Brand colors: violet (#8b5cf6, #7c3aed) on white
