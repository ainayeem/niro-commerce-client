"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { Calendar, ChevronDown, ChevronUp, Clock, CreditCard, Receipt, ShieldCheck, XCircle } from "lucide-react";
import { useState } from "react";
import OrderDetailsModal from "./OrderDetailsModal";
import OrderStatusTimeline from "./OrderStatusTimeline";

interface OrderCardProps {
  order: Order;
}
const OrderCard = ({ order }: OrderCardProps) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

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
        return <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />;
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
  return (
    <Card
      className={cn(
        "overflow-hidden border border-gray-200 transition-all duration-300",
        expanded ? "shadow-md ring-1 ring-primary/10" : "hover:shadow-md hover:border-gray-300"
      )}
    >
      {/* Order Header */}
      <div className={cn("p-4 sm:p-6", expanded ? "bg-gray-50/80" : "bg-gray-50")}>
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
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="font-semibold">${order.finalAmount.toLocaleString()}</p>
              <p className="text-xs text-gray-500">{order.products.length} items</p>
            </div>
            <div className="flex items-center gap-2">
              <OrderDetailsModal
                order={order}
                trigger={
                  <Button variant="outline" size="sm" className="h-8 text-xs">
                    Details
                  </Button>
                }
              />
              <Button
                variant="ghost"
                size="sm"
                className={cn("h-8 w-8 p-0 rounded-full", expanded && "bg-primary/10 text-primary hover:bg-primary/20")}
                onClick={toggleExpand}
              >
                {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} className="text-gray-500" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Order Status Timeline */}
      {["Pending", "Processing", "Completed"].includes(order.status) && !order.status.includes("Cancelled") && (
        <div className="px-4 sm:px-6 py-3 bg-white border-t border-gray-100">
          <OrderStatusTimeline status={order.status} />
        </div>
      )}

      {/* Order Details (Expandable) */}
      {expanded && (
        <CardContent className="p-4 sm:p-6 pt-4 sm:pt-4 bg-white">
          <div className="flex flex-wrap gap-4 justify-between">
            <div>
              <h4 className="text-sm font-medium mb-1">Shipping Address</h4>
              <p className="text-xs text-gray-600">{order.shippingAddress}</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Payment</h4>
              <p className="text-xs text-gray-600">
                {order.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"} •
                <span
                  className={
                    order.paymentStatus === "Paid"
                      ? "text-green-600 ml-1"
                      : order.paymentStatus === "Pending"
                      ? "text-amber-600 ml-1"
                      : "text-red-600 ml-1"
                  }
                >
                  {order.paymentStatus}
                </span>
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Items</h4>
              <p className="text-xs text-gray-600">{order.products.length} products</p>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-1">Total</h4>
              <p className="text-xs font-medium">${order.finalAmount.toLocaleString()}</p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {order.status === "Completed" && (
              <Button variant="outline" size="sm" className="text-xs h-8">
                Write a Review
              </Button>
            )}
            {order.status === "Pending" && order.paymentStatus === "Pending" && order.paymentMethod === "Online" && (
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-xs h-8 bg-green-600 text-white hover:bg-green-900 hover:text-white">
                  Make Payment
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                  Cancel Order
                </Button>
              </div>
            )}
            {["Pending", "Processing"].includes(order.status) && (
              <Button variant="default" size="sm" className="text-xs h-8">
                Track Order
              </Button>
            )}
            <Button variant="secondary" size="sm" className="text-xs h-8">
              Download Invoice
            </Button>
            <OrderDetailsModal
              order={order}
              trigger={
                <Button variant="outline" size="sm" className="text-xs h-8">
                  View Full Details
                </Button>
              }
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
};

export default OrderCard;
