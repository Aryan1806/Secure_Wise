"use client";

import { useState } from "react";

import { useGoals } from "../src/hooks/useGoals";
import { useExchangeRate } from "../src/hooks/useExchange";

import { GoalCard } from "../src/components/GoalCard";
import { DashboardStats } from "../src/components/Dashboard_stat";
import { AddGoalModal } from "../src/components/AddGoalModal";
import { AddContributionModal } from "../src/components/AddContributionModal";

export default function DashboardPage() {
  // -------------------------------
  // Domain state
  // -------------------------------
  const { goals, addGoal, addContribution } = useGoals();
  const { data, loading, error, refresh } = useExchangeRate();

  // -------------------------------
  // UI state
  // -------------------------------
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);

  const displayCurrency: "USD" | "INR" | "EUR" = "USD";

  const activeGoal = goals.find(goal => goal.id === activeGoalId);

  // -------------------------------
  // Loading & error states
  // -------------------------------
  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading exchange rates…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6 space-y-3">
        <p className="text-red-600">{error}</p>
        <button
          onClick={refresh}
          className="rounded bg-black px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  // -------------------------------
  // Main render
  // -------------------------------
  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Savings Planner
        </h1>

        <div className="flex gap-3">
          <button
            onClick={refresh}
            className="text-sm text-blue-600 hover:underline"
          >
            Refresh Rates
          </button>

          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="rounded bg-black px-4 py-2 text-white"
          >
            Add Goal
          </button>
        </div>
      </div>

      {/* Dashboard totals */}
      <DashboardStats
        goals={goals}
        exchangeRates={data}
        displayCurrency={displayCurrency}
      />

      {/* Goals grid */}
      {goals.length === 0 ? (
        <div className="text-gray-600 text-center py-12">
          No goals yet. Add your first savings goal.
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              exchangeRates={data}
              displayCurrency={displayCurrency}
              onAddContribution={setActiveGoalId}
            />
          ))}
        </div>
      )}

      {/* Add Goal Modal */}
      <AddGoalModal
        open={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        onAddGoal={addGoal}
      />

      {/* Add Contribution Modal */}
      {activeGoal && (
        <AddContributionModal
          open={true}
          goalName={activeGoal.name}
          currency={activeGoal.currency}
          onClose={() => setActiveGoalId(null)}
          onAdd={(amount, date) => {
            addContribution(activeGoal.id, amount, date);
          }}
        />
      )}
    </main>
  );
}
