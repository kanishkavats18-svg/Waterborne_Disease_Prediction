import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { waterSourceData } from "../../data/analyticsData";

function WaterSourceChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={waterSourceData}>
        <CartesianGrid
          stroke="#24344d"
          strokeDasharray="4 4"
        />

        <XAxis
          dataKey="source"
          stroke="#9fb4d3"
        />

        <YAxis
          stroke="#9fb4d3"
        />

        <Tooltip />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#22c55e"
          fill="#22c55e55"
          strokeWidth={3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default WaterSourceChart;