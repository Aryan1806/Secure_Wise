import { Goal } from "../types/goal";
import { ExchangeRates, convertCurrency } from "../utils/currency";
import { getTotalSaved } from "../utils/calculation";

interface DashboardStatsProps {
  goals: Goal[];
  exchangeRates: ExchangeRates;
  displayCurrency: "INR" | "USD" | "EUR";
}

export function DashboardStats({
  goals,
  exchangeRates,
  displayCurrency,
}: DashboardStatsProps) {
  const totalTarget = goals.reduce((sum, goal) => {
    return (
      sum +
      convertCurrency(
        goal.targetAmount,
        goal.currency,
        displayCurrency,
        exchangeRates
      )
    );
  }, 0);

  const totalSaved = goals.reduce((sum, goal) => {
    return (
      sum +
      convertCurrency(
        getTotalSaved(goal),
        goal.currency,
        displayCurrency,
        exchangeRates
      )
    );
  }, 0);

  const progress =
    totalTarget === 0
      ? 0
      : Math.min(100, Math.round((totalSaved / totalTarget) * 100));

  return (
    <div className="rounded-xl border p-4 bg-gray-50">
      <h2 className="text-lg font-semibold text-gray-900">
        Overall Progress
      </h2>

      <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Stat label="Total Target" value={totalTarget} currency={displayCurrency} />
        <Stat label="Total Saved" value={totalSaved} currency={displayCurrency} />
        <Stat label="Completion" value={progress} suffix="%" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  currency,
  suffix,
}: {
  label: string;
  value: number;
  currency?: string;
  suffix?: string;
}) {
  return (
    <div>
      <div className="text-sm text-gray-600">{label}</div>
      <div className="text-xl font-semibold text-gray-900">
        {value.toLocaleString()}
        {currency && ` ${currency}`}
        {suffix}
      </div>
    </div>
  );
}
