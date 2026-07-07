import React from "react";
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

const data = [
  { month: "Jan", applications: 18 },
  { month: "Feb", applications: 25 },
  { month: "Mar", applications: 32 },
  { month: "Apr", applications: 28 },
  { month: "May", applications: 41 },
  { month: "Jun", applications: 55 },
  { month: "Jul", applications: 48 },
];

const ApplicationsChart = () => {
  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="flex justify-between items-center mb-4 gap-3">
        <div>
          <h2 className="text-lg font-bold text-gray-800">
            Applications Overview
          </h2>

          <p className="text-gray-500 mt-1 text-sm">
            Track the number of applications received every month.
          </p>
        </div>

        <select className="border border-gray-200 rounded-xl px-3 py-2 outline-none focus:border-[#2F368C] text-sm">
          <option>Last 7 Months</option>
          <option>Last Year</option>
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
              dataKey="month"
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
              stroke="#2F368C"
              strokeWidth={4}
              dot={{
                r: 5,
                fill: "#2F368C",
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