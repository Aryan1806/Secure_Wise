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
    <div className="rounded-xl border p-4 shadow-sm bg-white flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">
          {goal.name}
        </h3>
        <span className="text-xs rounded bg-gray-100 px-2 py-1 text-gray-600">
          {goal.currency}
        </span>
      </div>

      {/* Target */}
      <div className="mt-2 text-sm text-gray-700">
        Target:{" "}
        <strong>
          {goal.targetAmount.toLocaleString()} {goal.currency}
        </strong>
        <div className="text-xs text-gray-500">
          ≈ {convertedTarget.toLocaleString()} {displayCurrency}
        </div>
      </div>

      {/* Saved */}
      <div className="mt-3 text-sm text-gray-700">
        Saved:{" "}
        <strong>
          {savedAmount.toLocaleString()} {goal.currency}
        </strong>
      </div>

      {/* Progress */}
      <div className="mt-3">
        <div className="h-2 w-full rounded bg-gray-200 overflow-hidden">
          <div
            className="h-full bg-green-500 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-1 text-xs text-gray-600">
          {progress}% completed
        </div>
      </div>

      {/* Action */}
      <button
        onClick={() => onAddContribution(goal.id)}
        className="mt-4 w-full rounded border px-4 py-2 text-sm font-medium hover:bg-gray-50"
      >
        Add Contribution
      </button>
    </div>
  );
}
