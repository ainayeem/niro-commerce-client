"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { changeOrderStatus } from "@/services/OrderService";
import { format } from "date-fns";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Clock,
  CreditCard,
  Download,
  ExternalLink,
  Filter,
  Package,
  Receipt,
  Search,
  ShieldCheck,
  Truck,
  User,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import ShopOrderStatusModal from "./ShopOrderStatusModal";

interface Product {
  _id: string;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
  imageUrls?: string[];
  offerPrice?: number;
  availableColors?: string[];
  specification?: Record<string, string>;
  keyFeatures?: string[];
  slug?: string;
}

interface OrderProduct {
  _id: string;
  product?: Product;
  quantity: number;
  unitPrice: number;
  color?: string;
}

interface UserType {
  _id: string;
  name: string;
  email: string;
  role: string;
  clientInfo?: {
    device?: string;
    browser?: string;
    ipAddress?: string;
    pcName?: string;
    os?: string;
    userAgent?: string;
  };
}

interface Order {
  _id: string;
  user: UserType;
  products: OrderProduct[];
  coupon?: string | null;
  discount: number;
  deliveryCharge: number;
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  shippingAddress: string;
  paymentMethod: "COD" | "Online";
  paymentStatus: "Pending" | "Paid" | "Failed";
  totalAmount: number;
  finalAmount: number;
  shop: string;
  createdAt: string;
  updatedAt: string;
}

interface MyShopOrdersProps {
  orders: Order[];
}

export default function MyShopOrders({ orders }: MyShopOrdersProps) {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isUpdating, setIsUpdating] = useState(false);
  const [localOrders, setLocalOrders] = useState<Order[]>(orders);

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  const handleStatusUpdate = async (orderId: string, status: string, note: string) => {
    try {
      setIsUpdating(true);
      await changeOrderStatus(orderId, status);
      setLocalOrders((prevOrders) => prevOrders.map((order) => (order._id === orderId ? { ...order, status: status as Order["status"] } : order)));
      toast.success(`Order status updated to ${status}`);
      if (note) {
        console.log(`Note for order ${orderId}: ${note}`);
      }
    } catch (error) {
      toast.error("Failed to update order status");
      console.error("Error updating order status:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const filteredOrders = localOrders.filter((order) => {
    const matchesSearch =
      searchQuery === "" ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.products.some((p) => p.product?.name?.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === "all" || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const pendingOrders = localOrders.filter((order) => order.status === "Pending");
  const processingOrders = localOrders.filter((order) => order.status === "Processing");
  const completedOrders = localOrders.filter((order) => order.status === "Completed");
  const cancelledOrders = localOrders.filter((order) => order.status === "Cancelled");

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPaymentStatusColor = (status: Order["paymentStatus"]) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800 border-green-200";
      case "Pending":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "Pending":
        return <Clock size={14} className="text-amber-600" />;
      case "Processing":
        return <Truck size={14} className="text-blue-600" />;
      case "Completed":
        return <ShieldCheck size={14} className="text-green-600" />;
      case "Cancelled":
        return <XCircle size={14} className="text-red-600" />;
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method: Order["paymentMethod"]) => {
    switch (method) {
      case "COD":
        return <Receipt size={14} className="text-gray-600" />;
      case "Online":
        return <CreditCard size={14} className="text-gray-600" />;
      default:
        return null;
    }
  };

  if (localOrders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <Package size={40} className="text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-6 max-w-md">Your shop hasn&apos;t received any orders yet. Check back later!</p>
      </div>
    );
  }

  function renderOrdersList(ordersList: Order[]) {
    if (ordersList.length === 0) {
      return (
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-200">
          <Package size={40} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 mb-2">No orders found</p>
          {searchQuery && (
            <Button variant="outline" size="sm" className="mt-2" onClick={() => setSearchQuery("")}>
              Clear Search
            </Button>
          )}
        </div>
      );
    }

    return ordersList.map((order) => (
      <Card
        key={order._id}
        className={cn(
          "overflow-hidden border border-gray-200 transition-all duration-300",
          expandedOrders[order._id] ? "shadow-md ring-1 ring-primary/10" : "hover:shadow-md hover:border-gray-300"
        )}
      >
        {/* Order Header */}
        <div className={cn("p-4 sm:p-6", expandedOrders[order._id] ? "bg-gray-50/80" : "bg-gray-50")}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium">Order #{order._id.slice(-8)}</h3>
                <Badge variant="outline" className={cn("text-xs", getStatusColor(order.status))}>
                  <span className="flex items-center gap-1.5">
                    {getStatusIcon(order.status)}
                    {order.status}
                  </span>
                </Badge>
                <Badge variant="outline" className={cn("text-xs", getPaymentStatusColor(order.paymentStatus))}>
                  {order.paymentStatus}
                </Badge>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar size={12} />
                  {format(new Date(order.createdAt), "MMM d, yyyy")}
                </span>
                <span className="flex items-center gap-1">
                  {getPaymentMethodIcon(order.paymentMethod)}
                  {order.paymentMethod}
                </span>
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {order.user.name}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="font-semibold">${order.finalAmount.toLocaleString()}</p>
                <p className="text-xs text-gray-500">{order.products.length} items</p>
              </div>
              <div className="flex items-center gap-2">
                <ShopOrderStatusModal
                  orderId={order._id}
                  currentStatus={order.status}
                  onStatusUpdate={handleStatusUpdate}
                  trigger={
                    <Button variant="outline" size="sm" className="h-8 text-xs" disabled={isUpdating}>
                      Update Status
                    </Button>
                  }
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn("h-8 w-8 p-0 rounded-full", expandedOrders[order._id] && "bg-primary/10 text-primary hover:bg-primary/20")}
                  onClick={() => toggleOrderExpand(order._id)}
                >
                  {expandedOrders[order._id] ? <ChevronUp size={18} /> : <ChevronDown size={18} className="text-gray-500" />}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details (Expandable) */}
        {expandedOrders[order._id] && (
          <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 bg-white">
            {/* Customer Information */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <User size={16} className="text-gray-500" />
                Customer Information
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md border border-gray-100">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Name</p>
                  <p className="text-sm font-medium">{order.user.name}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Email</p>
                  <p className="text-sm">{order.user.email}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Device</p>
                  <p className="text-sm">
                    {order.user.clientInfo?.device || "Unknown"} {order.user.clientInfo?.os || ""}
                  </p>
                </div>
              </div>
            </div>

            {/* Products */}
            <div className="mb-6">
              <h4 className="text-sm font-medium mb-3">Order Items</h4>
              <div className="space-y-3">
                {order.products.map((item) => (
                  <div key={item._id} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                    <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                      <Image
                        src={item.product?.imageUrls?.[0] || "/placeholder.svg"}
                        alt={item.product?.name || "Product image"}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="flex-1 flex flex-col sm:flex-row justify-between">
                      <div>
                        <h4 className="font-medium text-sm line-clamp-1">{item.product?.name || "Unnamed Product"}</h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                          <p>Qty: {item.quantity}</p>
                          {item.color && <p>Color: {item.color}</p>}
                          <p>Stock: {item.product?.stock || 0}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 sm:mt-0">
                        <div className="text-right">
                          <p className="font-medium text-sm">${item.unitPrice.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">List: ${item.product?.price?.toLocaleString() || "0"}</p>
                        </div>
                        {item.product?._id && (
                          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 rounded-full" asChild>
                            <Link href={`/products/${item.product._id}`}>
                              <ExternalLink size={12} />
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-medium mb-3">Shipping Information</h4>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-md border border-gray-100">
                  <p className="text-gray-700">
                    <span className="text-gray-500">Address:</span> {order.shippingAddress}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Method:</span> Standard Delivery
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Delivery Charge:</span> ${order.deliveryCharge.toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm bg-gray-50 p-4 rounded-md border border-gray-100">
                  <div className="flex justify-between">
                    <p className="text-gray-500">Subtotal</p>
                    <p>${order.totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-500">Shipping</p>
                    <p>${order.deliveryCharge.toLocaleString()}</p>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between">
                      <p className="text-gray-500">Discount</p>
                      <p className="text-green-600">-${order.discount.toLocaleString()}</p>
                    </div>
                  )}
                  {order.coupon && (
                    <div className="flex justify-between">
                      <p className="text-gray-500">Coupon</p>
                      <p className="text-primary font-medium">{typeof order.coupon === "string" ? order.coupon : "Coupon Applied"}</p>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium">
                    <p>Total</p>
                    <p>${order.finalAmount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-end gap-2">
              {order.status === "Pending" && (
                <>
                  <ShopOrderStatusModal
                    orderId={order._id}
                    currentStatus={order.status}
                    onStatusUpdate={(id) => handleStatusUpdate(id, "Cancelled", "Order cancelled by shop")}
                    trigger={
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                        disabled={isUpdating}
                      >
                        Cancel Order
                      </Button>
                    }
                  />
                  <ShopOrderStatusModal
                    orderId={order._id}
                    currentStatus={order.status}
                    onStatusUpdate={(id) => handleStatusUpdate(id, "Processing", "Order is being processed")}
                    trigger={
                      <Button variant="default" size="sm" className="text-xs h-8" disabled={isUpdating}>
                        Process Order
                      </Button>
                    }
                  />
                </>
              )}
              {order.status === "Processing" && (
                <ShopOrderStatusModal
                  orderId={order._id}
                  currentStatus={order.status}
                  onStatusUpdate={(id) => handleStatusUpdate(id, "Completed", "Order has been completed")}
                  trigger={
                    <Button variant="default" size="sm" className="text-xs h-8" disabled={isUpdating}>
                      Mark as Completed
                    </Button>
                  }
                />
              )}
              <Button variant="secondary" size="sm" className="text-xs h-8">
                Print Invoice
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs h-8"
                onClick={() => {
                  toast.info(`Contact feature for ${order.user.name} will be implemented soon`);
                }}
              >
                Contact Customer
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    ));
  }

  return (
    <div className="space-y-6">
      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-amber-50 border-amber-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-amber-600 font-medium">Pending</p>
              <h3 className="text-2xl font-bold mt-1">{pendingOrders.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <Clock size={20} className="text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Processing</p>
              <h3 className="text-2xl font-bold mt-1">{processingOrders.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
              <Truck size={20} className="text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Completed</p>
              <h3 className="text-2xl font-bold mt-1">{completedOrders.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <ShieldCheck size={20} className="text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-100">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Cancelled</p>
              <h3 className="text-2xl font-bold mt-1">{cancelledOrders.length}</h3>
            </div>
            <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
              <XCircle size={20} className="text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-auto flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <Input
            placeholder="Search by order ID, customer name or product..."
            className="pl-9 h-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-10 w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" size="sm" className="h-10">
            <Download size={16} className="mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-6">
          <TabsTrigger value="all" className="text-sm">
            All Orders ({localOrders.length})
          </TabsTrigger>
          <TabsTrigger value="pending" className="text-sm">
            Pending ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="processing" className="text-sm">
            Processing ({processingOrders.length})
          </TabsTrigger>
          <TabsTrigger value="completed" className="text-sm">
            Completed ({completedOrders.length})
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="text-sm">
            Cancelled ({cancelledOrders.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {renderOrdersList(filteredOrders)}
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          {renderOrdersList(
            pendingOrders.filter(
              (order) =>
                searchQuery === "" ||
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )}
        </TabsContent>

        <TabsContent value="processing" className="space-y-4">
          {renderOrdersList(
            processingOrders.filter(
              (order) =>
                searchQuery === "" ||
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {renderOrdersList(
            completedOrders.filter(
              (order) =>
                searchQuery === "" ||
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {renderOrdersList(
            cancelledOrders.filter(
              (order) =>
                searchQuery === "" ||
                order._id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                order.user.name.toLowerCase().includes(searchQuery.toLowerCase())
            )
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
