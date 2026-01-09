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
<<<<<<< HEAD
        <div className="text-center animate-fade-in-up">
          <div className="animate-pulse-custom text-6xl mb-4">💰</div>
          <p className="text-gray-600 text-lg">Loading exchange rates…</p>
=======
        <div className="text-center">
          <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
          <p className="text-slate-600 font-medium">Loading exchange rates…</p>
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
<<<<<<< HEAD
      <div className="flex items-center justify-center min-h-screen">
        <div className="card p-8 text-center max-w-md animate-fade-in-up">
          <div className="text-6xl mb-4">⚠️</div>
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={refresh}
            className="btn-primary"
          >
=======
      <div className="flex items-center justify-center min-h-screen p-6">
        <div className="card p-8 text-center space-y-4">
          <p className="text-red-600 font-medium">{error}</p>
          <button onClick={refresh} className="btn-primary">
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
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
<<<<<<< HEAD
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
=======
    <main className="p-6 max-w-6xl mx-auto space-y-8 py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent mb-2">
            Savings Planner
          </h1>
          <p className="text-slate-600">Track your financial goals with ease</p>
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
        </div>

        <div className="flex gap-3">
          <button
            onClick={refresh}
<<<<<<< HEAD
            className="btn-secondary text-gray-700"
          >
            🔄 Refresh Rates
=======
            className="btn-secondary text-sm"
          >
            <span className="inline-block mr-1">↻</span>
            Refresh Rates
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          </button>

          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
<<<<<<< HEAD
            ➕ Add Goal
=======
            <span className="inline-block mr-1">+</span>
            Add Goal
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
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
<<<<<<< HEAD
        <div className="card p-12 text-center animate-fade-in-up">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No goals yet</h3>
          <p className="text-gray-600 mb-6">Start your savings journey by adding your first goal!</p>
=======
        <div className="card p-12 text-center">
          <div className="mb-4 text-6xl">💰</div>
          <h3 className="text-xl font-semibold text-slate-800 mb-2">No goals yet</h3>
          <p className="text-slate-600 mb-6">Start tracking your financial goals today</p>
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          <button
            onClick={() => setIsAddGoalOpen(true)}
            className="btn-primary"
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
<<<<<<< HEAD
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
=======
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2">
          {goals.map(goal => (
            <GoalCard
              key={goal.id}
              goal={goal}
              exchangeRates={data}
              displayCurrency={displayCurrency}
              onAddContribution={setActiveGoalId}
            />
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          ))}
        </div>
      )}

      {/* Charts section */}
<<<<<<< HEAD
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
=======
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
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
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
