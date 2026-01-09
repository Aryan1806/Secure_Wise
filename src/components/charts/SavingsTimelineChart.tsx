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
<<<<<<< HEAD
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <div className="text-4xl mb-2">📊</div>
        <p className="text-sm">No contributions yet.</p>
        <p className="text-xs text-gray-400">Start saving to see your progress!</p>
=======
      <div className="flex items-center justify-center h-64 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
        <div className="text-center">
          <p className="text-slate-500 text-sm">No contributions yet</p>
          <p className="text-slate-400 text-xs mt-1">Start adding contributions to see your progress</p>
        </div>
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="date"
<<<<<<< HEAD
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
=======
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            stroke="#64748b"
            style={{ fontSize: '12px' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
            }}
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          />
          <Line
            type="monotone"
            dataKey="total"
<<<<<<< HEAD
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2, fill: '#ffffff' }}
=======
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ fill: '#2563eb', r: 4 }}
            activeDot={{ r: 6 }}
>>>>>>> 2b8a78b1032edaccf284f3a5ba4b778ab97a88a6
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
