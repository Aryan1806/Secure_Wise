"use client";

import { useState } from "react";

import {
  buildSavingsTimeline,
  buildGoalDistribution,
} from "../src/utils/chartData";

import { SavingsTimelineChart } from "../src/components/charts/SavingsTimelineChart";
import { GoalDistributionChart } from "../src/components/charts/GoalDistributionChart";


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
  // Derived chart data
  // -------------------------------
  const timelineData = buildSavingsTimeline(goals);
  const distributionData = buildGoalDistribution(goals);

  // -------------------------------
  // Loading & error states
  // -------------------------------
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading exchange rates…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card p-8 text-center space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={refresh} className="btn-primary">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // -------------------------------
  // Main render
  // -------------------------------
  return (
    <main className="p-6 max-w-6xl mx-auto space-y-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-2">
            Savings Planner
          </h1>
          <p className="text-slate-600">Track your financial goals with ease</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refresh}
            className="btn-secondary text-sm"
          >
            <span className="inline-block mr-1">↻</span>
            Refresh Rates
          </button>

          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
            <span className="inline-block mr-1">+</span>
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
        <div className="card p-12 text-center">
          <div className="mb-4 text-6xl">💰</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No goals yet</h3>
          <p className="text-slate-600 mb-6">Start tracking your financial goals today</p>
          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
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

      {/* Charts section */}
      {goals.length > 0 && (
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-800">
            Insights
          </h2>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="card p-6">
              <h3 className="mb-4 font-semibold text-lg text-slate-800 flex items-center">
                <span className="mr-2">📈</span>
                Savings Over Time
              </h3>
              <SavingsTimelineChart data={timelineData} />
            </div>

            <div className="card p-6">
              <h3 className="mb-4 font-semibold text-lg text-slate-800 flex items-center">
                <span className="mr-2">📊</span>
                Goal Distribution
              </h3>
              <GoalDistributionChart data={distributionData} />
            </div>
          </div>
        </section>
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