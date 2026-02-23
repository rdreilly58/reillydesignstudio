# ReillyDesignStudio.com

Professional design studio website — portfolio, shop, blog, and services.

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | PostgreSQL + Prisma |
| Auth | NextAuth.js |
| Payments | Stripe |
| File Storage | AWS S3 (digital downloads) |
| Blog | MDX via `next-mdx-remote` |
| Hosting | AWS Amplify |

## Site Structure

```
/                     Home — hero, portfolio preview, services, blog
/portfolio            Work gallery
/portfolio/[slug]     Individual project case study
/blog                 Blog listing
/blog/[slug]          Blog post (MDX)
/contact              Contact form
/shop                 Shop landing
/shop/physical        Physical products + cart
/shop/digital         Digital downloads
/shop/services        Services + quote request form
/shop/cart            Shopping cart
/shop/checkout        Stripe checkout
/dashboard            Customer dashboard (orders, downloads, quotes)
/admin                Admin overview
/admin/orders         Order management
/admin/products       Product management
/admin/quotes         Quote management
/admin/blog           Blog post management
```

## API Routes

| Route | Purpose |
|-------|---------|
| `POST /api/stripe/webhook` | Stripe payment event handler |
| `POST /api/quotes` | Submit quote request |
| `GET /api/download/[token]` | Secure digital file download |

## Data Models (Prisma)

- **User** — customers + admins (NextAuth compatible)
- **Product** — type: `PHYSICAL | DIGITAL | SERVICE`
- **Order + OrderItem** — full order lifecycle
- **DigitalDownload** — secure token-based download with expiry + limit
- **Quote** — service inquiry workflow (`PENDING → REVIEWING → SENT → ACCEPTED | DECLINED`)
- **BlogPost** — MDX content with tags + publish status
- **PortfolioItem** — project showcase with images + tags

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

```
DATABASE_URL              PostgreSQL connection string
NEXTAUTH_SECRET           Random secret for NextAuth
NEXTAUTH_URL              App URL (http://localhost:3000 in dev)
STRIPE_SECRET_KEY         Stripe secret key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_WEBHOOK_SECRET     Stripe webhook signing secret
AWS_ACCESS_KEY_ID         AWS credentials for S3
AWS_SECRET_ACCESS_KEY
AWS_REGION                e.g. us-east-1
AWS_S3_BUCKET             S3 bucket for digital files
NEXT_PUBLIC_SITE_URL      https://reillydesignstudio.com
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

## Microservices

Planned subdomains:
- `api.reillydesignstudio.com` — REST API / serverless functions
- `media.reillydesignstudio.com` — S3 media CDN
