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
      <div className="flex items-center gap-3 mb-6">
        <div className="text-2xl">📈</div>
        <h2 className="text-2xl font-bold text-gray-900">
          Overall Progress
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <StatCard
          icon="🎯"
          label="Total Target"
          value={totalTarget}
          currency={displayCurrency}
          color="linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)"
        />
        <StatCard
          icon="💰"
          label="Total Saved"
          value={totalSaved}
          currency={displayCurrency}
          color="linear-gradient(135deg, #10b981 0%, #059669 100%)"
        />
        <StatCard
          icon="🏆"
          label="Completion"
          value={progress}
          suffix="%"
          color="linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)"
        />
      </div>

      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Overall Progress</span>
          <span className="text-sm font-bold text-gray-900">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(135deg, #60a5fa 0%, #a855f7 100%)'
            }}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  currency,
  suffix,
  color,
}: {
  icon: string;
  label: string;
  value: number;
  currency?: string;
  suffix?: string;
  color: string;
}) {
  return (
    <div className="stat-card text-center">
      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${color} flex items-center justify-center mx-auto mb-3`}>
        <span className="text-xl">{icon}</span>
      </div>
      <div className="text-sm text-gray-600 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">
        {value.toLocaleString()}
        {currency && ` ${currency}`}
        {suffix}
      </div>
    </div>
  );
}
