## 💊 MediMart | Healthcare Marketplace

MediMart is a high-performance, full-stack healthcare marketplace designed to connect patients with verified pharmacies. It features a triple-tier dashboard system (Admin, Seller, Customer) for seamless medicine procurement, order tracking, and platform auditing.

---

### 🚀 Key Features

## 🛡️ Admin Control Center

- Order Audit Log: View and monitor every transaction across the entire platform.
- Category Management: Full CRUD operations for medicine categories with optimized React state forms.
- Platform Analytics: Real-time monitoring of sales, user growth, and seller performance.
- User Governance: Manage account statuses and roles (ADMIN, SELLER, CUSTOMER).

## 🏪 Seller Dashboard

- Inventory Management: Specialized tools for pharmacists to list medicines with dosage, price, and category info.
- Image Upload: Integrated ImgBB API for high-quality medicine and profile imagery.
- Sales Tracking: Monitor store-specific orders and delivery statuses.

## 👤 Customer Experience

- Medicine Discovery: Filter medicines by category and search across verified sellers.
- Secure Checkout: Snapshot-based order system that preserves price and seller info at the time of purchase.
- Profile Management: Personalized dashboard with image upload and address management.

---

### 🛠 Tech Stack

- Framework: Next.js 16 (App Router)
- Language: TypeScript
- Styling: Tailwind CSS + Shadcn UI
- Database/ORM: PostgreSQL + Prisma
- Form Handling: Standard React State (Optimized for performance)
- Icons & UI: Lucide React, Sonner (Toasts), Framer Motion
- Image Hosting: ImgBB API
- Deployment: Vercel

---

### 🏛 Project Architecture

- The project follows a clean, modular structure to separate business logic from UI components:
- /actions: Next.js Server Actions for secure database mutations.
- /components/modules: Feature-specific components (Medicine cards, Category modals).
- /components/ui: Atomic Shadcn UI components.
- /services: Data fetching logic and external API integrations (order, user, medicine services).
- /utils: Helper functions for image uploading and date formatting.

---

### 🔧 Installation & Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medimart.git
   cd medimart
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Environment Variables: Create a .env file and add your credentials:
   ```bash
   SERVER_URL="http://localhost:5000"
   CLIENT_URL="http://localhost:3000"
   AUTH_URL="http://localhost:5000"
   API_URL="http://localhost:5000/api"
   NEXT_PUBLIC_AUTH_URL="http://localhost:5000"
   NEXT_PUBLIC_API_URL="http://localhost:5000/api"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   NEXT_PUBLIC_IMGBB_API_KEY="imgbb_api_key"
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

---

### 🔒 Core Business Logic

- Order Integrity: The system uses a "Snapshot" pattern. When an order is placed, medicine details and seller information are recorded in the OrderItems table to ensure historical data remains accurate even if a product is later deleted.
- Image Processing: Uses a centralized uploadImageToImgBB utility with FileReader for immediate client-side previews before server submission.
- Responsive Design: A mobile-first approach using a 12-column grid and Tailwind's dark-mode support for a premium user experience.

---

## 👤 Author

- Kanak Ray
- Full Stack Developer
- (Node.js · Express.js · TypeScript · PostgreSQL · Prisma)

---

## 📄 License

This project is intended for educational and demonstration purposes.
