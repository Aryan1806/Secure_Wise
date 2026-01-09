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
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-sm">No contributions yet.</p>
        <p className="text-xs text-gray-400">Start saving to see your progress!</p>
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              fontSize: '14px'
            }}
            labelStyle={{ color: '#374151', fontWeight: 'bold' }}
          />
          <Line
            type="monotone"
            dataKey="total"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
