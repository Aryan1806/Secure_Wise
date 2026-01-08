// src/utils/currency.ts
import { Currency } from "";

export interface ExchangeRates {
  base: Currency;
  rates: Record<Currency, number>;
  lastUpdated: number; // epoch ms
}

// Convert between any two currencies using base rates
export function convertCurrency(
  amount: number,
  from: Currency,
  to: Currency,
  rates: ExchangeRates
): number {
  if (from === to) return amount;

  const fromRate = rates.rates[from];
  const toRate = rates.rates[to];

  if (!fromRate || !toRate) {
    throw new Error("Missing exchange rate");
  }

  // Normalize to base, then convert
  const amountInBase = amount / fromRate;
  const converted = amountInBase * toRate;

  return roundToTwo(converted);
}

// Financial rounding
export function roundToTwo(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}
