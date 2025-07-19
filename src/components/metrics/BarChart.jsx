import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

export const MetricBarChart = ({ title, data, percentile, category }) => {
  return (
    <div className="p-4 rounded-xl shadow-md border my-4 bg-white">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="text-sm text-gray-600">
        Percentile: {percentile} | Category: {category}
      </p>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="proportion" fill="#8884d8" name="Proportion (%)" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
