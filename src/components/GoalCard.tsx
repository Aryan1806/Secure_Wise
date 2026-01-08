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
}

export function GoalCard({
  goal,
  exchangeRates,
  displayCurrency,
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
    <div className="rounded-xl border p-4 shadow-sm bg-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold text-gray-900">
          {goal.name}
        </h3>
        <span className="text-sm text-gray-500">
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

      {/* Progress bar */}
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
    </div>
  );
}
