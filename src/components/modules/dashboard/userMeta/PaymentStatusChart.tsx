"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface PaymentStatusChartProps {
  data: Array<{ totalPayments: number; status: string }>;
  isLoading?: boolean;
}

export function PaymentStatusChart({ data, isLoading = false }: PaymentStatusChartProps) {
  // Colors for different payment statuses
  const COLORS = {
    Paid: "#10b981",
    Pending: "#f59e0b",
    Failed: "#ef4444",
    Refunded: "#6b7280",
  };

  // Format data for the chart
  const chartData = data.map((item) => ({
    name: item.status,
    value: item.totalPayments,
    color: COLORS[item.status as keyof typeof COLORS] || "#6b7280",
  }));

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height="80%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`${value} payments`, "Count"]}
            contentStyle={{
              borderRadius: "6px",
              border: "1px solid #e5e7eb",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {chartData.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center">
            <div className="h-3 w-3 rounded-full mr-2" style={{ backgroundColor: entry.color }} />
            <span className="text-sm">
              {entry.name}: {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
