import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SavingsTimelineChartProps {
  data: {
    date: string;
    total: number;
  }[];
}

export function SavingsTimelineChart({
  data,
}: SavingsTimelineChartProps) {
  if (data.length === 0) {
    return (
      <div className="text-sm text-gray-600">
        No contributions yet.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="total"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
