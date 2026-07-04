import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

import { riskData } from "../../data/analyticsData";

function RiskBarChart() {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart
        data={riskData}
        layout="vertical"
        margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke="#2e3c59"
        />

        <XAxis
          type="number"
          stroke="#8aa3c2"
        />

        <YAxis
          type="category"
          dataKey="factor"
          stroke="#8aa3c2"
        />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[0, 10, 10, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}

export default RiskBarChart;