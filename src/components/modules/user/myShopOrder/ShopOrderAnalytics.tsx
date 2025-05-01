"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface Order {
  _id: string;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  finalAmount: number;
  createdAt: string;
}

interface ShopOrderAnalyticsProps {
  orders: Order[];
}

const ShopOrderAnalytics = ({ orders }: ShopOrderAnalyticsProps) => {
  const [timeRange, setTimeRange] = useState("week");

  // Process data for charts
  const getChartData = () => {
    const now = new Date();
    const filteredOrders = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      if (timeRange === "week") {
        // Last 7 days
        const weekAgo = new Date(now);
        weekAgo.setDate(now.getDate() - 7);
        return orderDate >= weekAgo;
      } else if (timeRange === "month") {
        // Last 30 days
        const monthAgo = new Date(now);
        monthAgo.setDate(now.getDate() - 30);
        return orderDate >= monthAgo;
      } else {
        // All time
        return true;
      }
    });

    // Group by day for the chart
    const dailyData: Record<string, { date: string; orders: number; revenue: number }> = {};

    filteredOrders.forEach((order) => {
      const date = new Date(order.createdAt).toISOString().split("T")[0];
      if (!dailyData[date]) {
        dailyData[date] = { date, orders: 0, revenue: 0 };
      }
      dailyData[date].orders += 1;
      dailyData[date].revenue += order.finalAmount;
    });

    return Object.values(dailyData).sort((a, b) => a.date.localeCompare(b.date));
  };

  const chartData = getChartData();

  // Calculate summary stats
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.finalAmount, 0);
  const completedOrders = orders.filter((order) => order.status === "Completed").length;
  const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Order Analytics</CardTitle>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select time range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Last 7 days</SelectItem>
            <SelectItem value="month">Last 30 days</SelectItem>
            <SelectItem value="all">All time</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold mt-1">{totalOrders}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold mt-1">${totalRevenue.toLocaleString()}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Completed Orders</p>
              <h3 className="text-2xl font-bold mt-1">{completedOrders}</h3>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <p className="text-sm text-gray-500">Average Order Value</p>
              <h3 className="text-2xl font-bold mt-1">
                $
                {averageOrderValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </h3>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="orders">
          <TabsList className="mb-4">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
          </TabsList>
          <TabsContent value="orders">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
          <TabsContent value="revenue">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, "Revenue"]} />
                  <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ShopOrderAnalytics;
