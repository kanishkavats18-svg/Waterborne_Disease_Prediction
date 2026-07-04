import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { monthlyData } from "../../data/analyticsData";

function MonthlyTrendChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart
        data={monthlyData}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          stroke="#24344d"
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="month"
          stroke="#9fb4d3"
        />

        <YAxis
          stroke="#9fb4d3"
        />

        <Tooltip />

        <Line
          type="monotone"
          dataKey="cases"
          stroke="#38bdf8"
          strokeWidth={3}
          dot={{ r: 5 }}
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MonthlyTrendChart;