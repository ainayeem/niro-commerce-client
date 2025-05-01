/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/dateRangePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";
import { ArrowDown, ArrowUp, DollarSign, Package, ShoppingBag, TrendingUp } from "lucide-react";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { OrdersChart } from "./OrdersChart";
import { OrderStatusChart } from "./OrderstatusChart";
import { PaymentStatusChart } from "./PaymentStatusChart";
import { SalesChart } from "./SalesChart";

interface MetricsData {
  pieChartData: Array<{ category: any[] }>;
  barChartData: Array<{ totalOrders: number; month: number }>;
  lineChartData: Array<{ totalSales: number; date: string }>;
  paymentData: Array<{ totalPayments: number; status: string }>;
  orderData: Array<{ totalOrders: number; status: string }>;
  totalOrdersForUser: number;
  totalRevenueForUser: number;
  todaysSalesAmount: number;
}

interface DashboardMetricsProps {
  data: MetricsData;
}

const DashboardMetrics = ({ data }: DashboardMetricsProps) => {
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });

  const [timeframe, setTimeframe] = useState("month");
  const [isLoading, setIsLoading] = useState(false);

  // Calculate percentage change (mock data for demonstration)
  const calculateChange = (value: number) => {
    return Math.floor(Math.random() * 20) - 10; // Random value between -10 and 10
  };

  const orderChange = calculateChange(data.totalOrdersForUser);
  const revenueChange = calculateChange(data.totalRevenueForUser);

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BDT",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Handle date range change
  const handleDateChange = (newDate: DateRange | undefined) => {
    if (newDate?.from && newDate?.to) {
      setDate({
        from: newDate.from,
        to: newDate.to,
      });
      setIsLoading(true);
      // Here you would typically fetch new data based on the date range
      setTimeout(() => setIsLoading(false), 800); // Simulate loading
    }
  };

  // Handle timeframe change
  const handleTimeframeChange = (value: string) => {
    setTimeframe(value);
    setIsLoading(true);

    const today = new Date();
    let from = today;

    switch (value) {
      case "week":
        from = addDays(today, -7);
        break;
      case "month":
        from = addDays(today, -30);
        break;
      case "quarter":
        from = addDays(today, -90);
        break;
      case "year":
        from = addDays(today, -365);
        break;
    }

    setDate({ from, to: today });

    // Simulate loading
    setTimeout(() => setIsLoading(false), 800);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your store performance and analytics</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <DatePickerWithRange date={date} setDate={handleDateChange} />
          <div className="flex rounded-md border">
            {["week", "month", "quarter", "year"].map((period) => (
              <Button
                key={period}
                variant="ghost"
                size="sm"
                className={cn("rounded-none border-0", timeframe === period && "bg-muted")}
                onClick={() => handleTimeframeChange(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Total Revenue */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.totalRevenueForUser)}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {revenueChange > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{Math.abs(revenueChange)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{Math.abs(revenueChange)}%</span>
                </>
              )}
              <span>from previous period</span>
            </div>
          </CardContent>
        </Card>

        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalOrdersForUser}</div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              {orderChange > 0 ? (
                <>
                  <ArrowUp className="h-3 w-3 text-green-500" />
                  <span className="text-green-500">{Math.abs(orderChange)}%</span>
                </>
              ) : (
                <>
                  <ArrowDown className="h-3 w-3 text-red-500" />
                  <span className="text-red-500">{Math.abs(orderChange)}%</span>
                </>
              )}
              <span>from previous period</span>
            </div>
          </CardContent>
        </Card>

        {/* Today's Sales */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today&apos;s Sales</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.todaysSalesAmount)}</div>
            <div className="text-xs text-muted-foreground">
              {data.todaysSalesAmount > 0 ? "Sales are coming in today" : "No sales recorded today yet"}
            </div>
          </CardContent>
        </Card>

        {/* Pending Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.orderData.find((item) => item.status === "Pending")?.totalOrders || 0}</div>
            <div className="text-xs text-muted-foreground">Orders waiting to be processed</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>Your sales performance over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SalesChart data={data.lineChartData} isLoading={isLoading} />
              </CardContent>
            </Card>

            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
                <CardDescription>Distribution of orders by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <OrderStatusChart data={data.orderData} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Payment Status</CardTitle>
                <CardDescription>Distribution of payments by status</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <PaymentStatusChart data={data.paymentData} isLoading={isLoading} />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sales" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sales Analysis</CardTitle>
              <CardDescription>Detailed view of your sales performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SalesChart data={data.lineChartData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders Analysis</CardTitle>
              <CardDescription>Monthly order trends and status breakdown</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <OrdersChart data={data.barChartData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Analysis</CardTitle>
              <CardDescription>Overview of payment statuses</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PaymentStatusChart data={data.paymentData} isLoading={isLoading} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardMetrics;
