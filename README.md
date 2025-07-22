# Real Estate BrokerBot Dashboard

## Overview

The Real Estate BrokerBot Dashboard is a modern, full-featured web application designed to help real estate professionals manage properties, clients, campaigns, templates, analytics, and AI training for automated responses. Built with Next.js, React, Tailwind CSS, Zustand, and a rich set of UI components, it provides a seamless experience for brokers and admins.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, SSR/CSR)
- **Language:** TypeScript, React 19
- **Styling:** Tailwind CSS, Radix UI, Lucide Icons
- **State Management:** Zustand
- **Forms & Validation:** React Hook Form, Zod
- **API:** RESTful endpoints (configurable via `NEXT_PUBLIC_API_URL`)
- **Charts:** Recharts
- **Other:** Mapbox GL, Tiptap Editor, UploadThing, Framer Motion, Sonner, Embla Carousel

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   # or
   pnpm install
   # or
   bun install
   ```
2. **Configure environment:**
   - Set `NEXT_PUBLIC_API_URL` and other required environment variables in a `.env.local` file.
3. **Run the development server:**
   ```bash
   npm run dev
   ```
4. **Build for production:**
   ```bash
   npm run build && npm start
   ```

---

## Main Pages & Features

### Dashboard (`/`)
- Welcome message, statistics grid, daily messages chart
- Quick actions and summary stats

### Properties (`/properties`)
- List, search, filter, and paginate properties
- View property details, images, features, amenities, and contact info
- Create, edit, and delete properties
- Property QR code and sharing

### Clients (`/clients`)
- Manage client database: add, edit, delete, search, and filter clients
- Export clients to CSV
- View statistics (total, filtered, new today)

### Campaigns (`/campaigns`)
- List all campaigns
- Create new campaigns (template or custom message)
- Select target audience (all, active, inactive, or custom clients)

### Templates (`/templates`)
- Manage message templates for campaigns
- Add, edit, delete, and toggle status of templates
- Multi-language support

### Analytics (`/analytics`)
- View key metrics: visitors, page views, bounce rate, session duration
- Placeholder for trends and traffic source charts

### AI Training (`/ai-training`)
- Manage Q&A pairs for AI chatbot training
- Add, edit, delete, search, and toggle status of Q&A
- Categorize Q&A (General, Properties, Pricing, etc.)

### Users (`/users`)
- View user list, roles, status, last login, and creation date
- (Mock data; extend for real user management)

### Settings (`/settings`)
- Under development (coming soon)

### Developer Page (`/dev`)
- Test API connectivity and debug features (for developers only)

### No Permission (`/no-permission`)
- 403 error page for unauthorized access

---

## Authentication
- Sign-in and sign-up routes are present under `/app/(auth)/` (implementation may vary)

---

## Project Structure

- `app/` — Main application pages and routes
- `components/` — Reusable UI and layout components
- `store/` — Zustand stores for state management
- `services/` — API and utility services
- `types/` — TypeScript types and interfaces
- `public/` — Static assets (images, etc.)
- `styles/` — Global and component styles

---

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. 