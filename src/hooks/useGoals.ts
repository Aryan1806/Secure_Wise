import { useEffect, useState } from "react";
import { Goal, Contribution, Currency } from "../types/goal";

const STORAGE_KEY = "savings_goals";

function loadGoals(): Goal[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveGoals(goals: Goal[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
}

export function useGoals() {
  const [goals, setGoals] = useState<Goal[]>([]);

  // Load once
  useEffect(() => {
    setGoals(loadGoals());
  }, []);

  // Persist on change
  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  function addGoal(
    name: string,
    targetAmount: number,
    currency: Currency
  ) {
    const newGoal: Goal = {
      id: crypto.randomUUID(),
      name,
      targetAmount,
      currency,
      contributions: [],
      createdAt: new Date().toISOString(),
    };

    setGoals(prev => [...prev, newGoal]);
  }

  function addContribution(
    goalId: string,
    amount: number,
    date: string
  ) {
    setGoals(prev =>
      prev.map(goal => {
        if (goal.id !== goalId) return goal;

        const contribution: Contribution = {
          id: crypto.randomUUID(),
          amount,
          date,
        };

        return {
          ...goal,
          contributions: [...goal.contributions, contribution],
        };
      })
    );
  }

  return {
    goals,
    addGoal,
    addContribution,
  };
}
