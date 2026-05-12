# Architecture Overview

The project follows a modern SaaS-style architecture using Next.js, Supabase, and Zustand.

---

## Frontend

- Next.js App Router
- Tailwind CSS
- TypeScript
- Zustand for state management

---

## Backend

Supabase is used as a Backend-as-a-Service platform.

Features:
- Database storage
- Shared audit persistence
- Lead capture storage

---

## Core Components

### SpendForm
Handles user input for:
- AI tools
- Plans
- Monthly spend
- Seat count

### Audit Engine
Processes submitted tools and calculates:
- Potential savings
- Recommended plans
- Optimization suggestions

### Shared Audit Page
Dynamic route that:
- Fetches audit data
- Displays saved reports
- Captures leads

---

## Data Flow

1. User submits form
2. Zustand stores temporary state
3. Audit engine calculates savings
4. Supabase stores audit
5. Shared report URL generated
6. Lead form updates database