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

  const getGoalIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('house') || lowerName.includes('home')) return '🏠';
    if (lowerName.includes('car') || lowerName.includes('vehicle')) return '🚗';
    if (lowerName.includes('vacation') || lowerName.includes('travel')) return '✈️';
    if (lowerName.includes('education') || lowerName.includes('school')) return '🎓';
    if (lowerName.includes('wedding')) return '💍';
    if (lowerName.includes('emergency')) return '🛡️';
    return '🎯';
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 100) return 'from-green-400 to-green-600';
    if (progress >= 75) return 'from-blue-400 to-blue-600';
    if (progress >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="card p-6 flex flex-col h-full hover:scale-105 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{getGoalIcon(goal.name)}</div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              {goal.name}
            </h3>
            <span className="inline-block px-3 py-1 text-xs font-medium text-blue-800 rounded-full" style={{ background: 'linear-gradient(135deg, #dbeafe 0%, #faf5ff 100%)' }}>
              {goal.currency}
            </span>
          </div>
        </div>
      </div>

      {/* Target */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <span>🎯</span>
          <span>Target Amount</span>
        </div>
        <div className="text-2xl font-bold text-gray-900">
          {goal.targetAmount.toLocaleString()} {goal.currency}
        </div>
        <div className="text-sm text-gray-500">
          ≈ {convertedTarget.toLocaleString()} {displayCurrency}
        </div>
      </div>

      {/* Saved */}
      <div className="mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
          <span>💰</span>
          <span>Amount Saved</span>
        </div>
        <div className="text-xl font-semibold text-green-600">
          {savedAmount.toLocaleString()} {goal.currency}
        </div>
      </div>

      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Progress</span>
          <span className="text-sm font-bold text-gray-900">{progress}%</span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{
              width: `${Math.min(progress, 100)}%`,
              background: getProgressColor(progress)
            }}
          />
        </div>
        {progress >= 100 && (
          <div className="mt-2 text-sm text-green-600 font-medium flex items-center gap-1">
            <span>🎉</span>
            <span>Goal Achieved!</span>
          </div>
        )}
      </div>

      {/* Action */}
      <button
        onClick={() => onAddContribution(goal.id)}
        className="btn-primary w-full mt-auto"
      >
        ➕ Add Contribution
      </button>
    </div>
  );
}
