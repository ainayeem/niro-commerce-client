"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type React from "react";
import { useState } from "react";

interface ShopOrderStatusModalProps {
  orderId: string;
  currentStatus: "Pending" | "Processing" | "Completed" | "Cancelled";
  trigger: React.ReactNode;
  onStatusUpdate?: (orderId: string, status: string, note: string) => void;
}

export default function ShopOrderStatusModal({ orderId, currentStatus, trigger, onStatusUpdate }: ShopOrderStatusModalProps) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(currentStatus);
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (onStatusUpdate) {
      onStatusUpdate(orderId, status, note);
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>Change the status for order #{orderId.slice(-8)}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="status" className="text-right text-sm font-medium">
              Status
            </label>
            <Select value={status} onValueChange={(value: "Pending" | "Processing" | "Completed" | "Cancelled") => setStatus(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="note" className="text-right text-sm font-medium">
              Note
            </label>
            <Textarea
              id="note"
              placeholder="Add a note about this status change (optional)"
              className="col-span-3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Update Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
