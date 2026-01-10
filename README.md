# SecureWise - Savings Planner

A modern web application for tracking and managing your financial goals with multi-currency support.

## Features

- 🎯 Create and manage multiple savings goals
- 💰 Track contributions over time
- 📊 Visualize progress with interactive charts
- 🌍 Multi-currency support (USD, INR, EUR)
- 📱 Responsive design for mobile and desktop
- ⚡ Fast and optimized with Next.js 16 and Turbopack

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Building for Production

```bash
npm run build
npm start
```

## Vercel Deployment

This project is fully configured for Vercel deployment.

### Deployment Steps

1. **Push to GitHub**: Ensure your code is pushed to a GitHub repository
2. **Connect to Vercel**: 
   - Go to [https://vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Import your GitHub repository
3. **Configure Environment Variables** (optional):
  - Add the following environment variables in the Vercel project settings (Environment → Production):
    - `NEXT_PUBLIC_EXCHANGE_RATE_API_URL` — optional; defaults to the public https://open.er-api.com/v6/latest/USD endpoint
    - `NEXT_PUBLIC_API_URL` — optional placeholder if you later connect a backend API
  - See `.env.example` for available configuration options
4. **Deploy**: Click "Deploy" and Vercel will automatically build and deploy your app

### Pre-configured for Vercel

✅ `vercel.json` configuration file  
✅ `.env.example` for environment setup  
✅ Next.js 16.1.1 with Turbopack for fast builds  
✅ TypeScript and ESLint configured  
✅ Tailwind CSS v4 for modern styling  

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

## Project Structure

```
app/
  ├── page.tsx           # Main dashboard page
  ├── layout.tsx         # App layout
  └── globals.css        # Global styles

src/
  ├── components/        # React components
  │   ├── AddContributionModal.tsx
  │   ├── AddGoalModal.tsx
  │   ├── GoalCard.tsx
  │   ├── Dashboard_stat.tsx
  │   ├── Modal.tsx
  │   └── charts/       # Chart components
  ├── hooks/            # Custom React hooks
  ├── types/            # TypeScript type definitions
  └── utils/            # Utility functions
```

## Technologies Used

- **Framework**: Next.js 16.1.1
- **Styling**: Tailwind CSS v4
- **Charts**: Recharts
- **Language**: TypeScript
- **Build Tool**: Turbopack

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

## License

This project is open source and available under the MIT License.
