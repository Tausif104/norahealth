"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrderFromBooking } from "@/actions/booking.action";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function CreateOrderDialog({ bookingId }) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [isCreating, setIsCreating] = React.useState(false);

  const [medicineName, setMedicineName] = React.useState("");
  const [trackingId, setTrackingId] = React.useState("");
  const [status, setStatus] = React.useState("clinicalreview");

  const onOpen = () => {
    setMedicineName("");
    setTrackingId("");
    setStatus("clinicalreview");
    setOpen(true);
  };

  const onCreate = async () => {
    if (!medicineName.trim()) return toast.error("Medicine name required");
    // if (!trackingId.trim()) return toast.error("Tracking ID required");

    setIsCreating(true);
    const res = await createOrderFromBooking({
      bookingId,
      medicineName: medicineName.trim(),
      trackingId: trackingId.trim(),
      status,
    });

    if (!res?.success) return toast.error(res?.message || "Failed");

    toast.success(res?.message || "Order created successfully");
    setOpen(false);
    setIsCreating(false);

    // ✅ এই page আবার server-side re-fetch হবে, orders list updated দেখাবে
    router.refresh();
  };

  return (
    <>
      <Button className='bg-[#d18a2d] hover:bg-[#b97622]' onClick={onOpen}>
        Create Order
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className='sm:max-w-md'>
          <DialogHeader>
            <DialogTitle>Create Order</DialogTitle>
            <DialogDescription>
              Add medicine, tracking ID, and status to create an order.
            </DialogDescription>
          </DialogHeader>

          <div className='space-y-4'>
            <div>
              <label className='text-sm font-medium'>Medicine Name</label>
              <Input
                placeholder='Insert Medicine Name'
                value={medicineName}
                onChange={(e) => setMedicineName(e.target.value)}
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Tracking ID</label>
              <Input
                placeholder='EX: #XH45333A4825NR'
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
              />
            </div>

            <div>
              <label className='text-sm font-medium'>Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className='w-full'>
                  <SelectValue placeholder='Status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='clinicalreview'>
                    Under Clinical Review
                  </SelectItem>
                  <SelectItem value='posted'>Posted</SelectItem>
                  <SelectItem value='declined'>Declined</SelectItem>

                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </Button>
            <Button
              className='bg-[#d18a2d] hover:bg-[#b97622]'
              onClick={onCreate}
              disabled={isCreating}
            >
              {isCreating ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
