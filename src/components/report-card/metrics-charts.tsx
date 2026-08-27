"use client";

import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ReferenceLine,
  CartesianGrid
} from "recharts";
import { DepartmentScorecard } from "@/types";

interface MetricsChartsProps {
  departments: DepartmentScorecard[];
}

export function MetricsCharts({ departments }: MetricsChartsProps) {
  // Chart 1 Data: Average Response Days
  const responseData = departments.map((d) => ({
    shortName: d.id.replace("DEPT-", ""),
    fullName: d.name,
    days: d.avgResponseDays,
    grade: d.grade,
  }));

  // Chart 2 Data: Rejection Rate %
  const rejectionData = departments.map((d) => ({
    shortName: d.id.replace("DEPT-", ""),
    fullName: d.name,
    rejection: d.rejectionRate,
    grade: d.grade,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Chart 1: Response Time (Days) vs 30-Day Limit */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-heading">
              Average RTI Response Latency (Days)
            </h4>
            <p className="text-[11px] text-zinc-500">
              Red dotted line indicates Section 7(1) 30-Day Statutory Deadline
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
            Avg Days
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
              <XAxis dataKey="shortName" tick={{ fontSize: 11, fill: "#71717a" }} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#71717a" }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-900 text-white p-2.5 rounded-lg text-xs shadow-xl space-y-1">
                        <p className="font-bold">{data.fullName}</p>
                        <p className="text-zinc-300">Avg Response Time: <strong className="text-white">{data.days} days</strong></p>
                        <p className="text-zinc-400">Grade: {data.grade}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={30} stroke="#dc2626" strokeDasharray="4 4" strokeWidth={2} label={{ value: "30-Day Statutory Limit", fill: "#dc2626", fontSize: 10, position: "top" }} />
              <Bar dataKey="days" radius={[6, 6, 0, 0]}>
                {responseData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.days > 30 ? "#dc2626" : entry.days > 20 ? "#f59e0b" : "#15803d"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Chart 2: Rejection Rate % */}
      <div className="bg-white p-5 rounded-2xl border border-zinc-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-700 font-heading">
              RTI Rejection Rate (% of Total Requests)
            </h4>
            <p className="text-[11px] text-zinc-500">
              Higher rates indicate adversarial PIO gatekeeping
            </p>
          </div>
          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-zinc-100 text-zinc-600">
            Rejection %
          </span>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={rejectionData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f4f4f5" vertical={false} />
              <XAxis dataKey="shortName" tick={{ fontSize: 11, fill: "#71717a" }} angle={-15} textAnchor="end" />
              <YAxis tick={{ fontSize: 11, fill: "#71717a" }} unit="%" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-zinc-900 text-white p-2.5 rounded-lg text-xs shadow-xl space-y-1">
                        <p className="font-bold">{data.fullName}</p>
                        <p className="text-zinc-300">Rejection Rate: <strong className="text-white">{data.rejection}%</strong></p>
                        <p className="text-zinc-400">Grade: {data.grade}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar dataKey="rejection" radius={[6, 6, 0, 0]}>
                {rejectionData.map((entry, index) => (
                  <Cell
                    key={`cell-rej-${index}`}
                    fill={entry.rejection > 25 ? "#dc2626" : entry.rejection > 10 ? "#f59e0b" : "#15803d"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
