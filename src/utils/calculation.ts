// src/utils/calculations.ts
import { Goal } from "@/types/goal";

export function getTotalSaved(goal: Goal): number {
  return goal.contributions.reduce(
    (sum, c) => sum + c.amount,
    0
  );
}

export function getProgressPercentage(goal: Goal): number {
  if (goal.targetAmount === 0) return 0;

  const saved = getTotalSaved(goal);
  const progress = (saved / goal.targetAmount) * 100;

  return Math.min(100, Math.round(progress));
}
