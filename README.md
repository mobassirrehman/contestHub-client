# 🏆 ContestHub - Creative Contest Platform

A modern, full-stack contest management platform where users can create, discover, participate in, and manage creative contests across multiple categories.

## 🌐 Live Site

**[ContestHub Live](https://contesthub-contest-platform.netlify.app/)**

## 📸 Screenshots

![ContestHub Homepage](https://i.ibb.co.com/rKJH2vqv/contesthub-home.png)
## 🔑 Admin Credentials

- **Email:** zehad@gmail.com
- **Password:** Abcd1234@

## ✨ Key Features

1. **Multi-Role System** - Three distinct user roles (Admin, Creator, User) with role-based dashboards and permissions

2. **Secure Payment Integration** - Stripe payment gateway for contest registration with secure checkout flow

3. **Real-time Contest Management** - Live countdown timers, automatic status updates, and deadline tracking

4. **Dynamic Leaderboard** - Rankings based on contest wins with badge system (Bronze to Diamond)

5. **Advanced Search & Filtering** - Search contests by name, filter by categories with tab navigation

6. **Fully Responsive Design** - Mobile, tablet, and desktop optimized including dashboard layouts

7. **Dark/Light Theme Toggle** - Theme preference saved in localStorage, persists after refresh

8. **JWT Authentication** - Secure API routes with Firebase Auth and JWT token verification

9. **Interactive Dashboards** - Visual statistics with charts, win percentages, and participation tracking

10. **Contest Creator Tools** - Create contests with deadlines, prize money, task instructions, and declare winners

## 🛠️ Technologies Used

- **Frontend:** React 19, React Router 7, TailwindCSS, DaisyUI
- **State Management:** TanStack Query
- **Forms:** React Hook Form
- **Animations:** Framer Motion
- **Charts:** Recharts
- **Authentication:** Firebase Auth
- **Payments:** Stripe
- **HTTP Client:** Axios

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- Firebase account
- MongoDB Atlas account
- Stripe account

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/mobassirrehman/contestHub-client.git
cd contestHub-client
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment variables**

Create a `.env.local` file:
```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_API_URL=http://localhost:5000
```

4. **Start development server**
```bash
npm run dev
```

5. **Open in browser**
```
http://localhost:5173
```

### Server Setup

For the backend API, visit: [ContestHub Server Repository](https://github.com/mobassirrehman/contestHub-server)
---

© 2025 ContestHub. Made by TheGrim
