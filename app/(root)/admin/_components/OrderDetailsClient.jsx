"use client";

import React from "react";
import Link from "next/link";
import { PanelLeft, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "@/lib/adminContext";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";

export default function OrderDetailsClient({ order }) {
  const { setMenuOpen } = useAdmin();

  const fullName = order?.user?.account
    ? `${order.user.account.firstName ?? ""} ${
        order.user.account.lastName ?? ""
      }`.trim()
    : "N/A";

  const phone = order?.user?.account?.phoneNumber ?? "N/A";
  const email = order?.user?.email ?? "N/A";

  const copyText = async (txt) => {
    try {
      await navigator.clipboard.writeText(String(txt ?? ""));
      toast.success("Copied!");
    } catch {
      toast.error("Copy failed");
    }
  };

  const statusLabel =
    order.status === "clinicalreview"
      ? "Clinical Review"
      : order.status === "posted"
      ? "Posted"
      : order.status === "delivered"
      ? "Delivered"
      : order.status;

  return (
    <div className='w-full p-6'>
      {/* HEADER */}
      <div className='flex items-center gap-4 mb-6'>
        <button
          onClick={() => setMenuOpen(true)}
          className='lg:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
        >
          <PanelLeft />
        </button>

        <div className='flex items-center justify-between w-full'>
          <div>
            <h2 className='text-xl font-semibold'>Order Details</h2>
            <p className='text-sm text-gray-500'>
              Order #{order.id} • {statusLabel}
            </p>
          </div>

          <Link href='/admin/orders'>
            <Button variant='outline'>Back</Button>
          </Link>
        </div>
      </div>

      {/* CONTENT */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* Order Info */}
        <div className='rounded-md border p-4 bg-white/40'>
          <h3 className='font-semibold mb-3'>Order Info</h3>

          <div className='space-y-3 text-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Medicine Name</span>
              <span className='font-medium'>{order.medicineName}</span>
            </div>

            <div className='flex items-center justify-between gap-3'>
              <span className='text-gray-600'>Tracking ID</span>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{order.trackingId}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => copyText(order.trackingId)}
                  title='Copy Tracking ID'
                >
                  <Copy className='size-4' />
                </Button>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Status</span>
              <span className='font-medium'>{statusLabel}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Created At</span>
              <span className='font-medium'>
                {formatDate(new Date(order.createdAt))}
              </span>
            </div>
          </div>
        </div>

        {/* Patient Info */}
        <div className='rounded-md border p-4 bg-white/40'>
          <h3 className='font-semibold mb-3'>Patient Info</h3>

          <div className='space-y-3 text-sm'>
            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Full Name</span>
              <span className='font-medium'>{fullName || "N/A"}</span>
            </div>

            <div className='flex items-center justify-between gap-3'>
              <span className='text-gray-600'>Email</span>
              <div className='flex items-center gap-2'>
                <span className='font-medium'>{email}</span>
                <Button
                  variant='ghost'
                  size='icon'
                  onClick={() => copyText(email)}
                  title='Copy Email'
                >
                  <Copy className='size-4' />
                </Button>
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Phone</span>
              <span className='font-medium'>{phone}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Second Email</span>
              <span className='font-medium'>
                {order?.user?.account?.secondEmail ?? "N/A"}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Address</span>
              <span className='font-medium'>
                {order?.user?.account?.address ?? "N/A"}
              </span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-gray-600'>Post Code</span>
              <span className='font-medium'>
                {order?.user?.account?.zipCode ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions (optional placeholder) */}
      <div className='mt-6 flex gap-2 hidden'>
        <Button
          variant='outline'
          onClick={() => copyText(JSON.stringify(order, null, 2))}
        >
          Copy JSON
        </Button>
      </div>
    </div>
  );
}
