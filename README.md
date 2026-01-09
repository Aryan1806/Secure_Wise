# Goal-Based Savings Planner

A production-style, client-side web application that helps users plan and track multiple savings goals.  
Users can create goals in different currencies, add contributions over time, view real-time currency conversions, and analyze their progress through interactive visualizations.


---

## 📌 Project Overview

The Goal-Based Savings Planner allows users to:
- Define multiple financial goals (e.g. Emergency Fund, Travel, Education)
- Track savings progress incrementally via dated contributions
- View targets and savings in multiple currencies
- Monitor overall progress using a dashboard
- Gain insights through charts and visual summaries

The application is **fully client-side**, with all state managed locally and persisted using browser storage.

---

## 🧱 Tech Stack

- **Next.js (App Router)** – application structure and routing
- **TypeScript** – static typing and safer refactoring
- **Tailwind CSS** – utility-first styling and responsive layout
- **Recharts** – data visualization (line and bar charts)
- **Exchange Rate API** – live currency conversion
- **LocalStorage** – client-side persistence

---

## ✨ Core Features

### 1. Savings Goals
- Create multiple goals with:
  - Name
  - Target amount
  - Currency (USD, INR, EUR)
- Each goal maintains its own list of contributions
- Progress is calculated dynamically based on contributions

### 2. Contributions Tracking
- Add contributions with:
  - Amount
  - Date
- Contributions are stored in the goal’s native currency
- Progress updates instantly after each contribution

### 3. Live Currency Conversion
- Fetches live exchange rates from an external API
- Displays converted values alongside original currency
- Manual refresh option for updated rates
- Cached fallback to handle API failures gracefully

### 4. Dashboard Overview
- Displays:
  - Total target amount (across all goals)
  - Total saved amount
  - Overall completion percentage
- All values are computed dynamically and not stored redundantly

### 5. Data Visualization
- **Savings Over Time (Line Chart)**  
  Shows cumulative savings growth based on contribution dates
- **Goal Distribution (Bar Chart)**  
  Visual comparison of savings across different goals
- Charts consume precomputed data to remain predictable and reusable

### 6. Persistence
- Goals and contributions are persisted using `localStorage`
- Data remains intact across page reloads
- No backend required

---

## 🎨 UI & UX Approach

- Layout and hierarchy were first conceptualized using **Figma**
- UI components follow **Tailwind UI design principles**
- Emphasis on:
  - Clear visual hierarchy
  - Consistent spacing
  - Readable typography
  - Responsive behavior across screen sizes
- UI components are kept presentational, with no embedded business logic

---

## 🧠 Architecture & Design Decisions

### Separation of Concerns
- **Domain logic** (calculations, currency conversion) lives in utility files
- **State management** is centralized in custom hooks
- **UI components** consume data and callbacks without owning logic

### Single Source of Truth
- All goals and contributions are managed through a single custom hook
- No duplicated or derived state is stored (e.g. totals, progress)

### Derived Data Strategy
- Progress percentages, totals, and chart data are computed on demand
- This avoids inconsistencies and simplifies state management

### Chart Design Philosophy
- Chart components do not calculate data
- All transformations are done beforehand in dedicated utilities
- This keeps charts deterministic and easy to extend

### Production-Oriented Practices
- Defensive handling of API failures
- Clear loading and error states
- Modular file structure
- Predictable data flow
