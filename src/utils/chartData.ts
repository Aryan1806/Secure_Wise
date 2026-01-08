import { Goal } from "../types/goal";

/**
 * Line chart: total savings over time
 */
export function buildSavingsTimeline(goals: Goal[]) {
  const map = new Map<string, number>();

  goals.forEach(goal => {
    goal.contributions.forEach(c => {
      const date = c.date;
      map.set(date, (map.get(date) || 0) + c.amount);
    });
  });

  let runningTotal = 0;

  return Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, amount]) => {
      runningTotal += amount;
      return {
        date,
        total: runningTotal,
      };
    });
}

/**
 * Bar chart: total saved per goal
 */
export function buildGoalDistribution(goals: Goal[]) {
  return goals.map(goal => ({
    name: goal.name,
    saved: goal.contributions.reduce(
      (sum, c) => sum + c.amount,
      0
    ),
  }));
}
