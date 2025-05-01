"use client";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Order } from "@/types/order";
import { Package } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import OrderCard from "./OrderCard";

interface CompactMyOrdersProps {
  orders: Order[];
}

const MyOrders = ({ orders }: CompactMyOrdersProps) => {
  const [activeTab, setActiveTab] = useState<string>("active");

  const activeOrders = orders.filter((order) => ["Pending", "Processing"].includes(order.status));

  const completedOrders = orders.filter((order) => ["Completed", "Cancelled"].includes(order.status));

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6 max-w-md">You haven&apos;t placed any orders yet. Browse our products and start shopping!</p>
        <Button asChild>
          <Link href="/products">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <h2 className="text-2xl font-semibold">Your Orders</h2>
      </div>

      <Tabs defaultValue="active" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="active" className="text-sm">
            Active ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">
            Completed ({completedOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.length > 0 ? (
            activeOrders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <Package size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 mb-2">No active orders</p>
              <Button variant="outline" size="sm" className="mt-2" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedOrders.length > 0 ? (
            completedOrders.map((order) => <OrderCard key={order._id} order={order} />)
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
              <Package size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 mb-2">No completed orders</p>
              <Button variant="outline" size="sm" className="mt-2" onClick={() => setActiveTab("active")}>
                View Active Orders
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MyOrders;
