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
        <div className="text-center animate-fade-in-up">
          <div className="animate-pulse-custom text-6xl mb-4">💰</div>
          <p className="text-gray-600 text-lg">Loading exchange rates…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="card p-8 text-center max-w-md animate-fade-in-up">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="btn-primary"
          >
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
    <main className="p-6 max-w-6xl mx-auto space-y-8 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 card p-6 text-white" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' }}>
        <div className="flex items-center gap-3">
          <div className="text-4xl">🎯</div>
          <div>
            <h1 className="text-3xl font-bold">
              Savings Planner
            </h1>
            <p className="text-blue-100">Track your financial goals with ease</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={refresh}
            className="btn-secondary text-gray-700"
          >
            🔄 Refresh Rates
          </button>

          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
            ➕ Add Goal
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
        <div className="card p-12 text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-6">Start your savings journey by adding your first goal!</p>
          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <div key={goal.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <GoalCard
                goal={goal}
                exchangeRates={data}
                displayCurrency={displayCurrency}
                onAddContribution={setActiveGoalId}
              />
            </div>
          ))}
        </div>
      )}

      {/* Charts section */}
      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📊</div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Insights & Analytics
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl">📈</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Savings Over Time
              </h3>
            </div>
            <SavingsTimelineChart data={timelineData} />
          </div>

          <div className="card p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="text-xl">📊</div>
              <h3 className="text-lg font-semibold text-gray-900">
                Goal Distribution
              </h3>
            </div>
            <GoalDistributionChart data={distributionData} />
          </div>
        </div>
      </section>

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
