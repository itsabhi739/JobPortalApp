import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const ApplicationsChart = ({ applications = [] }) => {
  const [range, setRange] = useState("weeks");
  const now = new Date();
  const data = range === "weeks"
    ? Array.from({ length: 7 }, (_, index) => {
      const start = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() - (6 - index) * 7);
      const end = new Date(start);
      end.setDate(start.getDate() + 7);
      return {
        period: `Week ${index + 1}`,
        applications: applications.filter((application) => {
          const createdAt = new Date(application.createdAt);
          return createdAt >= start && createdAt < end && createdAt <= now;
        }).length,
      };
    })
    : Array.from({ length: 6 }, (_, index) => {
      const start = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
      const end = new Date(now.getFullYear(), now.getMonth() - (4 - index), 1);
      return {
        period: start.toLocaleString("en-IN", { month: "short" }),
        applications: applications.filter((application) => {
          const createdAt = new Date(application.createdAt);
          return createdAt >= start && createdAt < end && createdAt <= now;
        }).length,
      };
    });

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Applications Overview
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Applications received over the {range === "weeks" ? "last 7 weeks" : "last 6 months"}.
          </p>
        </div>

        <select value={range} onChange={(event) => setRange(event.target.value)} className="border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#6055FF] text-sm">
          <option value="weeks">Last 7 Weeks</option>
          <option value="months">Last 6 Months</option>
        </select>
      </div>

      <div className="h-[260px]">

        <ResponsiveContainer width="100%" height="100%">

          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 20,
              left: 0,
              bottom: 0,
            }}
          >

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
            />

            <XAxis
              dataKey="period"
              tick={{ fill: "#6B7280", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{ fill: "#6B7280", fontSize: 14 }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip
              contentStyle={{
                borderRadius: "12px",
                border: "none",
                boxShadow: "0 10px 20px rgba(0,0,0,.1)",
              }}
            />

            <Legend />

            <Line
              type="monotone"
              dataKey="applications"
              stroke="#6055FF"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#6055FF",
              }}
              activeDot={{
                r: 8,
                fill: "#F4BC19",
              }}
            />

          </LineChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
};

export default ApplicationsChart;