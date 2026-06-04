# Dristy Institute - Future Roadmap (Phase 2)

This document outlines the plans for Phase 2 of the **Dristy Computer Training Institute** website.

## Phase 2 Goals
In the next phase, we will transition the website from a premium static showcase to an active, database-driven educational portal.

### 1. Admissions Pipeline & Database Integration
*   **Admissions Form**: Connect the `<ContactForm />` and a new `<AdmissionForm />` to dynamic Next.js API endpoints.
*   **Database Management**: Connect a database (e.g. MongoDB, PostgreSQL via Prisma, or Supabase) to store applicant registrations, course selections, and contact inquiries.
*   **API Routes**: Build endpoints in `/app/api/admissions/route.ts` and `/app/api/contact/route.ts` to process submissions, validate inputs, send email confirmations, and save details to the database.

### 2. Student Portal
*   **Authentication**: Implement secure student logins using **NextAuth.js** or **Clerk**.
*   **Dashboard**: Create a dashboard where students can view:
    *   Enrolled courses.
    *   Class schedules and attendance metrics.
    *   Grade charts and teacher reviews.
    *   Tuition payment balances and installment receipts.

### 3. Current Architecture Readiness
*   **Isolated Input Forms**: All input forms (such as `<ContactForm />` inside [components/ContactForm.tsx](file:///k:/Own/demo/components/ContactForm.tsx)) are already fully isolated as standalone components.
*   **Placeholder Comments**: Key integration coordinates have been explicitly marked with `{/* TODO: connect to API route */}` comments, making it easy to swap client simulation handlers for active server calls.
*   **API Routes Directory**: The `/app/api/` folder has been created with a `.gitkeep` file to hold your database pipelines.
