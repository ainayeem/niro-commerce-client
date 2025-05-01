"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { format } from "date-fns";
import { Calendar, CreditCard, ExternalLink, MapPin, Package, Receipt, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import OrderStatusTimeline from "./OrderStatusTimeline";

interface OrderDetailsModalProps {
  order: Order;
  trigger: React.ReactNode;
}

const OrderDetailsModal = ({ order, trigger }: OrderDetailsModalProps) => {
  const [open, setOpen] = useState(false);

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
        return <div className="w-3 h-3 rounded-full bg-amber-400 animate-pulse" />;
      case "Processing":
        return <div className="w-3 h-3 rounded-full bg-blue-400 animate-pulse" />;
      case "Completed":
        return <ShieldCheck size={14} className="text-green-600" />;
      case "Cancelled":
        return <X size={14} className="text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="w-[90%] md:w-[500px] lg:w-[600px] xl:w-[700px] max-w-[800px] max-h-[90vh] mx-auto overflow-y-auto border-2 border-primary/50 rounded-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between pt-4">
            <span className="text-base">Order #{order?._id?.slice(-8) || "N/A"}</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn("text-xs", getStatusColor(order?.status || ""))}>
                <span className="flex items-center gap-1.5">
                  {getStatusIcon(order?.status || "")}
                  {order?.status || "Unknown"}
                </span>
              </Badge>
              <Badge variant="outline" className={cn("text-xs", getPaymentStatusColor(order?.paymentStatus || ""))}>
                {order?.paymentStatus || "Unknown"}
              </Badge>
            </div>
          </DialogTitle>
          <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
            <span className="flex items-center gap-1">
              <Calendar size={12} />
              {order?.createdAt ? format(new Date(order.createdAt), "MMM d, yyyy") : "N/A"}
            </span>
            <span className="flex items-center gap-1">
              {order?.paymentMethod === "COD" ? <Receipt size={12} className="text-gray-600" /> : <CreditCard size={12} className="text-gray-600" />}
              {order?.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
            </span>
          </div>
        </DialogHeader>

        {["Pending", "Processing", "Completed"].includes(order?.status || "") && !order?.status?.includes("Cancelled") && (
          <div className="py-2">
            <OrderStatusTimeline status={order?.status || ""} />
          </div>
        )}

        <div className="space-y-6 mt-4">
          {/* Products */}
          <div>
            <h3 className="text-sm font-medium mb-3">Order Items</h3>
            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
              {order?.products?.map((item) => (
                <div key={item?._id || Math.random()} className="flex gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                  <div className="relative w-16 h-16 bg-white rounded-md overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image
                      src={item?.product?.imageUrls?.[0] || "/placeholder.svg?height=64&width=64"}
                      alt={item?.product?.name || "Product image"}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-medium text-sm line-clamp-1">{item?.product?.name || "Unnamed Product"}</h4>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                        <p>Qty: {item?.quantity || 0}</p>
                        {item?.color && <p>Color: {item.color}</p>}
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <p className="font-medium text-sm">${(item?.unitPrice || 0).toLocaleString()}</p>
                      {item?.product?._id && (
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

          <Separator />

          {/* Order Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin size={14} className="text-gray-500" />
                  Shipping Information
                </h4>
                <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-md border border-gray-100">
                  <p className="text-gray-700">
                    <span className="text-gray-500">Address:</span> {order?.shippingAddress || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Method:</span> Standard Delivery
                  </p>
                  {order?.status === "Completed" && (
                    <p className="text-green-600 font-medium flex items-center gap-1.5 mt-1">
                      <Package size={12} />
                      Delivered on {order?.updatedAt ? format(new Date(order.updatedAt), "MMM d, yyyy") : "N/A"}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                  <CreditCard size={14} className="text-gray-500" />
                  Payment Information
                </h4>
                <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-md border border-gray-100">
                  <p className="text-gray-700">
                    <span className="text-gray-500">Method:</span> {order?.paymentMethod === "COD" ? "Cash on Delivery" : "Online Payment"}
                  </p>
                  <p className="text-gray-700">
                    <span className="text-gray-500">Status:</span>{" "}
                    <span
                      className={
                        order?.paymentStatus === "Paid" ? "text-green-600" : order?.paymentStatus === "Pending" ? "text-amber-600" : "text-red-600"
                      }
                    >
                      {order?.paymentStatus || "Unknown"}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">Order Summary</h4>
              <div className="space-y-2 text-xs bg-gray-50 p-3 rounded-md border border-gray-100">
                <div className="flex justify-between">
                  <p className="text-gray-500">Subtotal</p>
                  <p>${(order?.totalAmount || 0).toLocaleString()}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-gray-500">Shipping</p>
                  <p>${(order?.deliveryCharge || 0).toLocaleString()}</p>
                </div>
                {(order?.discount || 0) > 0 && (
                  <div className="flex justify-between">
                    <p className="text-gray-500">Discount</p>
                    <p className="text-green-600">-${(order?.discount || 0).toLocaleString()}</p>
                  </div>
                )}
                {order?.coupon && (
                  <div className="flex justify-between">
                    <p className="text-gray-500">Coupon</p>
                    <p className="text-primary font-medium">
                      {typeof order.coupon === "string" ? order.coupon : (order.coupon as { code: string })?.code || "Coupon Applied"}
                    </p>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <p>Total</p>
                  <p>${(order?.finalAmount || 0).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            {order?.status === "Completed" && (
              <Button variant="outline" size="sm" className="text-xs h-8">
                Write a Review
              </Button>
            )}
            {order?.status === "Pending" && order?.paymentStatus === "Pending" && order?.paymentMethod === "COD" && (
              <Button variant="outline" size="sm" className="text-xs h-8 text-red-600 hover:text-red-700 hover:bg-red-50">
                Cancel Order
              </Button>
            )}
            {["Pending", "Processing"].includes(order?.status || "") && (
              <Button variant="default" size="sm" className="text-xs h-8">
                Track Order
              </Button>
            )}
            <Button variant="secondary" size="sm" className="text-xs h-8">
              Download Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OrderDetailsModal;
