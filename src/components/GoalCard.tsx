import { Goal } from "../types/goal";
import { ExchangeRates, convertCurrency } from "../utils/currency";
import {
  getProgressPercentage,
  getTotalSaved,
} from "../utils/calculation";

interface GoalCardProps {
  goal: Goal;
  exchangeRates: ExchangeRates;
  displayCurrency: "INR" | "USD" | "EUR";
  onAddContribution: (goalId: string) => void;
}

export function GoalCard({
  goal,
  exchangeRates,
  displayCurrency,
  onAddContribution,
}: GoalCardProps) {
  const savedAmount = getTotalSaved(goal);
  const progress = getProgressPercentage(goal);

  const convertedTarget = convertCurrency(
    goal.targetAmount,
    goal.currency,
    displayCurrency,
    exchangeRates
  );

  return (
    <div className="card-hover p-6 flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-slate-800">
          {goal.name}
        </h3>
        <span className="text-xs font-semibold rounded-full bg-gradient-to-r from-blue-100 to-blue-200 px-3 py-1.5 text-blue-700 border border-blue-300/50">
          {goal.currency}
        </span>
      </div>

      {/* Target */}
      <div className="mb-3 space-y-1">
        <div className="text-sm text-slate-600 font-medium">Target</div>
        <div className="text-2xl font-bold text-slate-800">
          {goal.targetAmount.toLocaleString()} <span className="text-lg text-slate-600">{goal.currency}</span>
        </div>
        <div className="text-xs text-slate-500">
          ≈ {convertedTarget.toLocaleString()} {displayCurrency}
        </div>
      </div>

      {/* Saved */}
      <div className="mb-4 space-y-1">
        <div className="text-sm text-slate-600 font-medium">Current Savings</div>
        <div className="text-2xl font-bold text-emerald-600">
          {savedAmount.toLocaleString()} <span className="text-lg text-slate-600">{goal.currency}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-auto space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs font-semibold text-slate-600">Progress</span>
          <span className="text-xs font-bold text-slate-800">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onAddContribution(goal.id)}
        className="mt-5 w-full btn-secondary"
      >
        + Add Contribution
      </button>
    </div>
  );
}
