# Full-Stack Dashboard Project Proposal

## Project Summary

This proposal expands the current Next.js dashboard concept into a production-style full-stack application. The new project keeps the same core business domain, invoices, customers, revenue, authentication, and reporting, but separates the frontend and backend into clear services.

The goal is to build a practical system for learning how modern frontend and backend tools work together in a real application: API design, validation, database access, caching, server state, reports, containerization, and API documentation.

## Project Name

**Acme Full-Stack Invoice Dashboard**

## Main Objective

Build a full-stack invoice management dashboard where users can:

- Log in securely.
- View dashboard analytics.
- Manage customers.
- Create, update, delete, search, sort, and paginate invoices.
- Generate invoice reports.
- Download PDF reports.
- Explore and test backend APIs through Swagger documentation.
- Run the full system locally with Docker.

## Why This Project

The current project is a good Next.js learning app because it covers routing, server actions, authentication, database reads, forms, and UI states. The proposed version goes further by introducing a dedicated backend API and production-style service boundaries.

This makes the project better for understanding:

- How frontend apps consume backend APIs.
- How server state is cached and updated.
- How validation should be shared conceptually across client and server.
- How reports are generated from backend data.
- How Docker helps run apps consistently.
- How API documentation improves backend development.

## Tech Stack

### Frontend

- **Next.js**: React framework for routing, rendering, layouts, and pages.
- **Ant Design**: UI component library for tables, forms, modals, buttons, layouts, menus, and feedback states.
- **TanStack React Query**: Server-state management, caching, background refetching, mutations, optimistic updates, and API synchronization.
- **Zod**: Form and request validation schemas.

### Backend

- **Express.js**: REST API server.
- **Zod**: Request validation and safe API input parsing.
- **Postgres**: Relational database for users, customers, invoices, and revenue data.
- **JSReport**: PDF and document report generation.
- **Docker**: Containerization for frontend, backend, database, and reporting services.
- **Swagger / OpenAPI**: API documentation and interactive endpoint testing.

## High-Level Architecture

```text
Browser
  |
  v
Next.js Frontend
  |
  | HTTP requests
  v
Express.js API
  |
  | SQL queries
  v
Postgres Database

Express.js API
  |
  | Report render request
  v
JSReport Service
```

## Proposed Services

### 1. Frontend App

The frontend will be responsible for the user experience and client-side workflows.

Main responsibilities:

- Render dashboard pages.
- Manage authenticated UI states.
- Display Ant Design tables, forms, modals, alerts, and layouts.
- Fetch and cache API data with TanStack React Query.
- Validate form input with Zod before submitting to the API.
- Trigger report downloads.

Example frontend routes:

| Route | Purpose |
| --- | --- |
| `/login` | User login page |
| `/dashboard` | Analytics overview |
| `/dashboard/invoices` | Invoice table with search, sort, filters, and pagination |
| `/dashboard/invoices/create` | Create invoice form |
| `/dashboard/invoices/[id]` | Invoice detail page |
| `/dashboard/invoices/[id]/edit` | Edit invoice form |
| `/dashboard/customers` | Customer management page |
| `/dashboard/reports` | Report generation page |

### 2. Backend API

The backend will expose REST APIs consumed by the frontend.

Main responsibilities:

- Authenticate users.
- Validate request bodies, params, and query strings with Zod.
- Read and write data in Postgres.
- Return consistent JSON responses.
- Generate reports through JSReport.
- Expose Swagger documentation.

Example backend routes:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Log in user |
| `POST` | `/api/auth/logout` | Log out user |
| `GET` | `/api/dashboard/summary` | Dashboard card totals |
| `GET` | `/api/dashboard/revenue` | Revenue chart data |
| `GET` | `/api/invoices` | List invoices with search, sort, filters, and pagination |
| `POST` | `/api/invoices` | Create invoice |
| `GET` | `/api/invoices/:id` | Get invoice by ID |
| `PATCH` | `/api/invoices/:id` | Update invoice |
| `DELETE` | `/api/invoices/:id` | Delete invoice |
| `GET` | `/api/customers` | List customers |
| `POST` | `/api/customers` | Create customer |
| `GET` | `/api/reports/invoices/pdf` | Generate invoice PDF report |
| `GET` | `/api/docs` | Swagger API documentation |

### 3. Database

Postgres will store the application data.

Suggested tables:

- `users`
- `customers`
- `invoices`
- `revenue`
- `sessions` or `refresh_tokens`
- `report_logs`

Core relationships:

- A customer can have many invoices.
- An invoice belongs to one customer.
- A user can create or update many invoices.
- Report logs can track which user generated which report.

### 4. Reporting Service

JSReport will generate printable reports from backend data.

Suggested reports:

- Invoice PDF.
- Monthly revenue PDF.
- Customer statement PDF.
- Paid vs pending invoices report.

The backend should prepare the data, send it to JSReport, and return the generated file to the frontend.

### 5. Docker Setup

Docker will make the project easier to run locally.

Suggested containers:

- `frontend`: Next.js app.
- `backend`: Express.js API.
- `postgres`: Database.
- `jsreport`: Reporting service.

Suggested local ports:

| Service | Port |
| --- | --- |
| Frontend | `3000` |
| Backend API | `4000` |
| Postgres | `5432` |
| JSReport | `5488` |

## Core Features

### Authentication

- Login page.
- Protected dashboard pages.
- Backend-authenticated API requests.
- Token or cookie-based session strategy.
- Logout flow.

Learning focus:

- Auth flow between frontend and backend.
- Protected API routes.
- Secure client/server boundaries.

### Dashboard Overview

- Total invoices.
- Total customers.
- Total paid amount.
- Total pending amount.
- Revenue chart.
- Latest invoices.

Learning focus:

- API aggregation endpoints.
- React Query caching.
- Loading and error states.

### Invoice Management

- Invoice list.
- Search by customer, email, status, date, and amount.
- Sort by date, amount, status, or customer.
- Pagination.
- Create invoice.
- Edit invoice.
- Delete invoice.
- View invoice details.

Learning focus:

- Complex query params.
- React Query mutations.
- Cache invalidation after create, update, and delete.
- Ant Design table patterns.

### Customer Management

- Customer list.
- Customer detail page.
- Customer invoice history.
- Customer totals.
- Create and edit customer records.

Learning focus:

- Relational data modeling.
- Nested API data.
- Reusable UI patterns.

### Reports

- Generate invoice PDF.
- Generate monthly revenue report.
- Download reports from the browser.
- Track report generation history.

Learning focus:

- Backend file generation.
- Binary responses.
- JSReport templates.
- Long-running API actions.

### API Documentation

- Swagger UI for all backend endpoints.
- Request and response examples.
- Error response examples.
- Auth requirements per endpoint.

Learning focus:

- API contracts.
- Backend documentation.
- Testing endpoints without the frontend.

## Validation Strategy

Use Zod on both sides of the application.

Frontend validation:

- Validate form values before API calls.
- Show field-level validation errors.
- Keep UI feedback fast and clear.

Backend validation:

- Validate request body, params, and query strings.
- Return consistent `400` responses for invalid input.
- Never trust frontend-only validation.

Example validation areas:

- Login credentials.
- Invoice create and update forms.
- Customer create and update forms.
- Pagination query params.
- Report filters.

## React Query Strategy

Use TanStack React Query for all server data.

Suggested query keys:

```ts
["dashboard", "summary"]
["dashboard", "revenue"]
["invoices", { query, page, sort, status }]
["invoice", id]
["customers", { query, page }]
["customer", id]
["reports", "history"]
```

Suggested mutation behavior:

- Create invoice: invalidate invoice list and dashboard summary.
- Update invoice: invalidate invoice detail, invoice list, and dashboard summary.
- Delete invoice: invalidate invoice list and dashboard summary.
- Create customer: invalidate customer list.
- Generate report: invalidate report history.

## Suggested Folder Structure

```text
acme-fullstack-dashboard/
  apps/
    web/
      app/
      components/
      features/
      lib/
      schemas/
      services/
    api/
      src/
        modules/
          auth/
          dashboard/
          invoices/
          customers/
          reports/
        db/
        middleware/
        schemas/
        swagger/
        utils/
  packages/
    shared/
      schemas/
      types/
  docker-compose.yml
  README.md
```

## Development Milestones

### Milestone 1: Project Foundation

- Create monorepo structure.
- Set up Next.js frontend.
- Set up Express backend.
- Set up Postgres with Docker.
- Add environment variable examples.
- Add health check endpoint.

### Milestone 2: Database and API

- Create database schema.
- Add seed data.
- Build customer APIs.
- Build invoice APIs.
- Add Zod request validation.
- Add standard error handling.

### Milestone 3: Frontend Data Layer

- Add Ant Design layout.
- Configure TanStack React Query.
- Build API client.
- Build dashboard overview.
- Build invoice list page.
- Add loading, error, and empty states.

### Milestone 4: Mutations and Forms

- Build create invoice form.
- Build edit invoice form.
- Build delete invoice flow.
- Add customer create and edit forms.
- Add Zod form validation.
- Add React Query cache invalidation.

### Milestone 5: Authentication

- Add login API.
- Add frontend login page.
- Protect dashboard routes.
- Attach auth credentials to API requests.
- Add logout flow.

### Milestone 6: Reports

- Add JSReport container.
- Create invoice report template.
- Create revenue report template.
- Add report download endpoints.
- Add frontend report page.

### Milestone 7: Swagger and Production Readiness

- Add Swagger documentation.
- Add request and response examples.
- Add Docker Compose for all services.
- Add production build scripts.
- Add deployment notes.

## Success Criteria

The project is successful when:

- The full app runs locally with Docker.
- The frontend communicates only with the backend API for business data.
- All main forms are validated with Zod.
- React Query handles fetching, caching, mutation state, and invalidation.
- Swagger documents the backend endpoints.
- JSReport generates at least one real PDF report.
- Postgres stores all dashboard, invoice, customer, and report data.
- The project README explains setup, architecture, scripts, and learning goals.

## Recommended First Build Order

1. Backend health check and Docker Compose.
2. Postgres schema and seed data.
3. Invoice and customer APIs.
4. Swagger documentation.
5. Next.js layout with Ant Design.
6. React Query API integration.
7. Invoice list, create, edit, and delete.
8. Authentication.
9. Reports with JSReport.
10. Final documentation.

## Learning Outcomes

After completing this project, you should better understand:

- How Next.js works as a frontend application consuming APIs.
- How Express organizes backend routes, middleware, and controllers.
- How Postgres supports relational business data.
- How Zod protects both frontend forms and backend endpoints.
- How TanStack React Query manages server state.
- How Ant Design speeds up dashboard UI development.
- How Swagger improves API development.
- How JSReport turns backend data into downloadable documents.
- How Docker connects frontend, backend, database, and service containers.
