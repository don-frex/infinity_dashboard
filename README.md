# Infinity Dashboard

A cutting-edge, immersive dashboard application built with **Next.js 16**, **Clerk Authentication**, and **Prisma**. This project demonstrates a modern approach to web development, featuring 3D visualizations, interactive data mapping, and a sleek, dark-themed UI.

## 🚀 Features

- **Immersive 3D Experience**: Interactive 3D elements and animations powered by **Framer Motion**.
- **Modern UI/UX**: A premium, dark-themed interface utilizing **Glassmorphism**, dynamic gradients, and smooth transitions.
- **Secure Authentication**: Robust user management and authentication provided by **Clerk**.
- **Data Visualization**:
  - Interactive **Agency Map** using `react-simple-maps`.
  - Dynamic charts (Bar, Pie, Area) powered by **Recharts**.
- **Agency & Contact Management**: Browse agencies, view details, and unlock contact information.
- **Usage Tracking**: Daily limit system for viewing contacts, tracked via a dedicated database model.
- **Responsive Design**: Fully responsive layout optimized for all device sizes.

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: 
  - [Tailwind CSS v4](https://tailwindcss.com/)
  - `clsx` & `tailwind-merge` for dynamic class management
  - `class-variance-authority` for component variants
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps**: `react-simple-maps` & `d3-scale`
- **Charts**: [Recharts](https://recharts.org/)

### Backend & Database
- **Runtime**: Node.js
- **Database**: SQLite (Development)
- **ORM**: [Prisma](https://www.prisma.io/)
- **Authentication**: [Clerk](https://clerk.com/)

### Tools & Utilities
- **Language**: TypeScript
- **Linting**: ESLint
- **Data Seeding**: Custom seed scripts with `csv-parse`

## 📂 Project Structure

```
├── src/
│   ├── app/              # Next.js App Router pages and API routes
│   ├── components/       # Reusable React components
│   │   ├── dashboard/    # Dashboard-specific widgets (Charts, Maps)
│   │   ├── home/         # Landing page components (Hero3D, Features)
│   │   └── ui/           # Generic UI components (Buttons, Cards, Inputs)
│   ├── lib/              # Utility functions and shared logic
│   ├── types/            # TypeScript type definitions
│   └── middleware.ts     # Clerk authentication middleware
├── prisma/
│   ├── schema.prisma     # Database schema definition
│   ├── seed.ts           # Database seeding script
│   └── dev.db            # SQLite database file
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## ⚡ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or yarn

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/infinity_dashboard.git
    cd infinity_dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Setup:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    # Clerk Authentication
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...

    # Database
    DATABASE_URL="file:./prisma/dev.db"
    ```

4.  **Database Setup:**
    Initialize the database and generate the Prisma client:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Seed the Database (Optional):**
    Populate the database with initial data:
    ```bash
    npm run prisma:seed
    ```
    *(Note: Ensure you have the necessary CSV files if the seed script relies on them)*

6.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📜 Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the application for production.
- `npm run start`: Starts the production server.
- `npm run lint`: Runs ESLint to check for code quality issues.
- `npx prisma studio`: Opens a visual editor for your database.

## 🔒 License

This project is licensed under the MIT License.
