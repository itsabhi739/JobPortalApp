import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const JobChart = ({ jobs = [] }) => {
  const now = new Date();
  const data = Array.from({ length: 6 }, (_, index) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1);
    return {
      month: date.toLocaleString("en-IN", { month: "short" }),
      jobs: jobs.filter((job) => {
        const createdAt = new Date(job.createdAt);
        return createdAt.getMonth() === date.getMonth() && createdAt.getFullYear() === date.getFullYear();
      }).length,
    };
  });

  return (
    <div className="bg-white rounded-3xl shadow-md border border-gray-100 p-4 lg:p-5 h-full">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">
            Jobs Posted
        </h2>

        <p className="text-gray-500 mt-1 text-sm">
          Total jobs added over the last 6 months.
        </p>
      </div>

      <div className="h-[260px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>
            <CartesianGrid strokeDasharray="4 4" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
            <Tooltip />
            <Legend />
            <Bar dataKey="jobs" name="Jobs" fill="#6055FF" radius={[6, 6, 0, 0]} />
          </BarChart>

        </ResponsiveContainer>

      </div>
    </div>
  );
};

export default JobChart;