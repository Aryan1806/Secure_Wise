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
    <div className="card p-6">
      <h2 className="text-lg font-bold text-slate-800 mb-6">
        Overall Progress
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard label="Total Target" value={totalTarget} currency={displayCurrency} color="blue" />
        <StatCard label="Total Saved" value={totalSaved} currency={displayCurrency} color="emerald" />
        <StatCard label="Completion" value={progress} suffix="%" color="violet" />
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  currency,
  suffix,
  color,
}: {
  label: string;
  value: number;
  currency?: string;
  suffix?: string;
  color: string;
}) {
  const colorClasses = {
    blue: "from-blue-500 to-blue-600",
    emerald: "from-emerald-500 to-green-600",
    violet: "from-violet-500 to-purple-600",
  };

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 border border-slate-200/60">
      <div className="relative z-10">
        <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-2">{label}</div>
        <div className={`text-3xl font-bold bg-gradient-to-r ${colorClasses[color as keyof typeof colorClasses]} bg-clip-text text-transparent`}>
          {value.toLocaleString()}
          {currency && <span className="text-xl ml-1">{currency}</span>}
          {suffix}
        </div>
      </div>
    </div>
  );
}
