import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { diseaseData } from "../../data/analyticsData";

const COLORS = [
  "#3b82f6",
  "#22c55e",
  "#f97316",
  "#a855f7",
  "#ef4444",
  "#14b8a6",
];

function DiseasePieChart({ analytics }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={diseaseData}
          dataKey="value"
          nameKey="name"
          outerRadius={90}
          innerRadius={45}
          paddingAngle={3}
        >
          {diseaseData.map((entry, index) => (
            <Cell
              key={index}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>

        <Tooltip />

        <Legend
  layout="vertical"
  verticalAlign="middle"
  align="right"
/>
      </PieChart>
    </ResponsiveContainer>
  );
}


export default DiseasePieChart;