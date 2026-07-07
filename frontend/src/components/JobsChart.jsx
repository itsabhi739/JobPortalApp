import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { name: "React", value: 32 },
  { name: "Java", value: 24 },
  { name: "Node", value: 18 },
  { name: "Python", value: 15 },
  { name: "UI/UX", value: 11 },
];

const COLORS = [
  "#2F368C",
  "#F4BC19",
  "#22C55E",
  "#F97316",
  "#8B5CF6",
];

const JobChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">
          Job Categories
        </h2>

        <p className="text-gray-500 mt-1 text-sm">
          Applications received by job role.
        </p>
      </div>

      <div className="h-[260px]">

        <ResponsiveContainer width="100%" height="100%">

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>

            <Tooltip />

            <Legend
              verticalAlign="bottom"
              height={36}
            />

          </PieChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default JobChart;