"use client";

import { useGoals } from "../src/hooks/useGoals";
import { useExchangeRate } from "../src/hooks/useExchange";
import { GoalCard } from "../src/components/GoalCard";
import { DashboardStats } from "../src/components/Dashboard_stat";
import { useState } from "react";
import { AddGoalModal } from "../src/components/AddGoalModal";


export default function DashboardPage() {
  const { goals, addGoal } = useGoals();
  const [isAddGoalOpen, setIsAddGoalOpen] = useState(false);
  const { data, loading, error, refresh } = useExchangeRate();

  const [open, setOpen] = useState(false);


  const displayCurrency = "USD";

  if (loading) {
    return (
      <div className="p-6 text-gray-600">
        Loading exchange rates…
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <p className="text-red-600">{error}</p>
        <button
          onClick={refresh}
          className="mt-3 rounded bg-black px-4 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <main className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
            Savings Planner
        </h1>

        <button
            onClick={() => setIsAddGoalOpen(true)}
            className="rounded bg-black px-4 py-2 text-white"
        >
            Add Goal
        </button>
    </div>


      <DashboardStats
        goals={goals}
        exchangeRates={data}
        displayCurrency={displayCurrency}
      />

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
            />
          ))}
        </div>
      )}
      <AddGoalModal
        open={isAddGoalOpen}
        onClose={() => setIsAddGoalOpen(false)}
        onAddGoal={addGoal}
      />
    </main>
  );
}
