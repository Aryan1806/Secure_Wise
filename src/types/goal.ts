// src/types/goal.ts

// Supported currencies — easy to extend (EUR already included)
export type Currency = "INR" | "USD" | "EUR";

// A single contribution made towards a goal
export interface Contribution {
  id: string;
  amount: number;          // stored in goal's currency
  date: string;            // ISO string (YYYY-MM-DD)
}

// Core goal entity
export interface Goal {
  id: string;
  name: string;

  targetAmount: number;    // in original currency
  currency: Currency;

  contributions: Contribution[];

  createdAt: string;       // ISO timestamp
}
