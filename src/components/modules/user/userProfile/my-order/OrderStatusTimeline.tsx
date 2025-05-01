"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, Package, Truck, XCircle } from "lucide-react";

interface OrderStatusTimelineProps {
  status: "Pending" | "Processing" | "Completed" | "Cancelled";
  className?: string;
}

const OrderStatusTimeline = ({ status, className }: OrderStatusTimelineProps) => {
  const steps = [
    { id: "Pending", label: "Order Placed", icon: Clock },
    { id: "Processing", label: "Processing", icon: Package },
    { id: "Shipping", label: "Shipping", icon: Truck },
    { id: "Completed", label: "Delivered", icon: CheckCircle2 },
  ];

  let currentStepIndex = steps.findIndex((step) => step.id === status);

  if (status === "Processing") {
    currentStepIndex = 1;
  } else if (status === "Completed") {
    currentStepIndex = 3;
  }

  const isCancelled = status === "Cancelled";

  return (
    <div className={cn("w-full py-2", className)}>
      {isCancelled ? (
        <div className="flex items-center justify-center py-2 px-4 bg-red-50 rounded-md border border-red-100">
          <p className="text-red-600 text-sm font-medium flex items-center gap-2">
            <XCircle size={16} />
            This order has been cancelled
          </p>
        </div>
      ) : (
        <div className="relative">
          {/* Progress bar */}
          <div className="absolute top-4 left-0 h-1 bg-gray-200 w-full rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{
                width: `${currentStepIndex >= 0 ? (currentStepIndex / (steps.length - 1)) * 100 : 0}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>

          {/* Steps */}
          <div className="relative flex justify-between">
            {steps.map((step, index) => {
              const isActive = index <= currentStepIndex;
              const Icon = step.icon;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center z-10 transition-all",
                      isActive ? "bg-primary text-primary-foreground shadow-sm" : "bg-gray-100 text-gray-400 border border-gray-200"
                    )}
                  >
                    <Icon size={16} />
                  </motion.div>
                  <p className={cn("mt-2 text-xs font-medium transition-colors", isActive ? "text-primary" : "text-gray-500")}>{step.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderStatusTimeline;
