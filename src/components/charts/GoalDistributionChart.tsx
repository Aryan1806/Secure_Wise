import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface GoalDistributionChartProps {
  data: {
    name: string;
    saved: number;
  }[];
}

export function GoalDistributionChart({
  data,
}: GoalDistributionChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-sm text-gray-600">
        No goals yet.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="saved" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
