# Next.js Dashboard

A learning dashboard built with the Next.js App Router course project. The app demonstrates a full-stack invoice dashboard with authenticated access, Postgres-backed data, server actions, streaming UI, search, pagination, and form validation.

## What This Project Includes

- Public landing page with responsive hero images.
- Credentials-based login using NextAuth and bcrypt password checks.
- Dashboard overview with revenue chart, summary cards, and latest invoices.
- Invoices area with search, pagination, create, edit, and delete flows.
- Customers table with invoice totals and searchable customer data.
- Server actions for mutations and cache revalidation.
- Postgres data access through the `postgres` package.
- Seed route for creating demo users, customers, invoices, and revenue data.
- Tailwind CSS UI built from reusable components in `app/ui`.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- NextAuth v5 beta
- Postgres
- Zod
- bcrypt
- pnpm

## Project Structure

```text
app/
  dashboard/
    (overview)/        Dashboard home route
    customers/         Customer listing route
    invoices/          Invoice list, create, edit, error, and loading UI
  lib/                 Data access, server actions, types, utilities, seed data
  login/               Login route
  seed/                Database seed route
  ui/                  Shared UI components
auth.ts                NextAuth provider setup and credential validation
auth.config.ts         NextAuth page and authorization config
public/                Static images and customer avatars
```

## Routes

| Route | Purpose |
| --- | --- |
| `/` | Public landing page |
| `/login` | Credentials login form |
| `/dashboard` | Overview cards, revenue chart, and latest invoices |
| `/dashboard/invoices` | Searchable, paginated invoices table |
| `/dashboard/invoices/create` | Create invoice form |
| `/dashboard/invoices/[id]/edit` | Edit invoice form |
| `/dashboard/customers` | Searchable customers table |
| `/seed` | Seeds demo data into Postgres |

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create an environment file from the example:

```bash
cp .env.example .env
```

Fill in the Postgres connection values and auth secret in `.env`.

```env
POSTGRES_URL=
POSTGRES_PRISMA_URL=
POSTGRES_URL_NON_POOLING=
POSTGRES_USER=
POSTGRES_HOST=
POSTGRES_PASSWORD=
POSTGRES_DATABASE=
AUTH_SECRET=
AUTH_URL=http://localhost:3000/api/auth
```

Generate an auth secret if you do not already have one:

```bash
openssl rand -base64 32
```

Start the development server:

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Database Setup

After the app can connect to Postgres, visit:

```text
http://localhost:3000/seed
```

The seed route creates these tables when needed:

- `users`
- `customers`
- `invoices`
- `revenue`

It also inserts the demo records from `app/lib/placeholder-data.ts`.

Default seeded login:

```text
Email: user@nextmail.com
Password: 123456
```

## Available Scripts

```bash
pnpm dev      # Start local development with Turbopack
pnpm build    # Build for production
pnpm start    # Start the production server
pnpm lint     # Run ESLint
```

## Key Implementation Notes

- Database reads live in `app/lib/data.ts`.
- Mutations live in `app/lib/actions.ts` and use server actions.
- Form validation uses Zod before writing invoice data.
- Invoice amounts are stored in cents and formatted for display.
- `revalidatePath('/dashboard/invoices')` keeps invoice views fresh after mutations.
- The `@/*` path alias maps to the project root.

## Course Reference

This project is based on the official [Next.js Learn App Router Course](https://nextjs.org/learn).
