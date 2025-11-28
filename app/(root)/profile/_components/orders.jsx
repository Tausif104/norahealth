"use client";

import { useProfile } from "@/lib/profileContext";
import { PanelLeft } from "lucide-react";
import React from "react";

const Orders = () => {
  const { setMenuOpen } = useProfile();
  const currentOrders = [
    {
      date: "17 Nov 2025",
      title: "Medicine name 1",
      trackingId: "#XH45333A4825NR",
      statusType: "review",
    },
    {
      date: "17 Nov 2025",
      title: "Medicine name 2",
      trackingId: "#XH45333A4825NR",
      statusType: "review",
    },
    {
      date: "11 Jan 2025",
      title: "Medicine name 3",
      trackingId: "#XH45333A4825NR",
      statusType: "shipped",
    },
  ];

  const pastOrders = [
    {
      date: "17 Nov 2025",
      title: "Medicine name 1",
      trackingId: "#XH45333A4825NR",
    },
    {
      date: "17 Nov 2025",
      title: "Medicine name 2",
      trackingId: "#XH45333A4825NR",
    },
    {
      date: "11 Jan 2025",
      title: "Medicine name 3",
      trackingId: "#XH45333A4825NR",
    },
  ];

  return (
    <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
      {/* Header */}
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px]  items-center gap-2 bg-[#d67b0e] text-white flex justify-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Orders
        </h2>
      </div>

      {/* Card */}
      <div className='md:bg-white rounded-[12px]  md:p-8'>
        {/* ===== CURRENT ORDERS ===== */}
        <section className='space-y-4'>
          {/* Desktop title */}
          <h3 className='hidden md:block text-[15px] font-semibold text-[#CE8936]'>
            Current Orders
          </h3>

          {/* Desktop table */}
          <div className='hidden md:block w-full overflow-hidden'>
            {/* Header row */}
            <div className='grid grid-cols-[160px_1fr_180px] bg-[#F6E4D6] text-sm font-medium text-[#3A3D42] px-5 py-3 rounded-[12px]'>
              <span>Date</span>
              <span>Title</span>
              <span className='text-right pr-4'>Status</span>
            </div>

            {/* Rows */}
            {currentOrders.map((order, idx) => (
              <div
                key={idx}
                className='grid grid-cols-[160px_1fr_180px] items-center text-sm text-[#3A3D42] px-5 py-3 border-b last:border-b-0 border-[#F5F0EE]'
              >
                {/* Date */}
                <div className='md:py-1 text-[14px] font-medium'>
                  {order.date}
                </div>

                {/* Title + tracking */}
                <div className='md:py-1'>
                  <p className='font-semibold text-[#0D060C]'>{order.title}</p>
                  <p className='text-[12px] text-[#A3A3A3]'>
                    Tracking ID: {order.trackingId}
                  </p>
                </div>

                {/* Status */}
                <div className='flex justify-end md:py-1'>
                  {order.statusType === "review" && (
                    <span className='inline-flex items-center rounded-full bg-[#FAF1DE] text-[#B97E00] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Under clinical review
                    </span>
                  )}

                  {order.statusType === "shipped" && (
                    <button
                      type='button'
                      className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap'
                    >
                      Posted via Royal Mail. Tracking ID
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className='md:hidden'>
            {/* Section bar like screenshot */}
            <div className='bg-[#F6E4D6] text-[#CE8936] text-[14px] font-medium px-4 py-2 rounded-[6px] mb-3'>
              Current Orders
            </div>

            {currentOrders.map((order, idx) => (
              <div
                key={idx}
                className='border-b border-[#F5F0EE] py-4 last:border-b-0'
              >
                <div className='flex justify-between text-[12px] text-[#A3A3A3] mb-1'>
                  <span>Title:</span>
                  <span>Date: {order.date}</span>
                </div>

                <p className='text-[14px] font-semibold text-[#0D060C]'>
                  {order.title}
                </p>
                <p className='text-[12px] text-[#A3A3A3]'>
                  Tracking ID: {order.trackingId}
                </p>

                <div className='mt-2 flex items-center gap-2'>
                  <span className='text-[12px] text-[#A3A3A3]'>Status:</span>
                  {order.statusType === "review" && (
                    <span className='inline-flex items-center rounded-full bg-[#FAF1DE] text-[#B97E00] text-[11px] px-3 py-1 whitespace-nowrap'>
                      Under clinical review
                    </span>
                  )}
                  {order.statusType === "shipped" && (
                    <button
                      type='button'
                      className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[11px] px-3 py-1 whitespace-nowrap'
                    >
                      Posted via Royal Mail. Tracking ID
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Spacer */}
        <div className='h-6' />

        {/* ===== PAST ORDERS ===== */}
        <section className='space-y-4'>
          {/* Desktop title */}
          <h3 className='hidden md:block text-[15px] font-semibold text-[#CE8936]'>
            Past Orders
          </h3>

          {/* Desktop table */}
          <div className='hidden md:block w-full overflow-hidden'>
            {/* Header */}
            <div className='grid grid-cols-[160px_1fr_160px] bg-[#F6E4D6] rounded-[12px] text-sm font-medium text-[#0D060C] px-5 py-3'>
              <span>Date</span>
              <span>Title</span>
              <span className='text-right pr-4'>Status</span>
            </div>

            {/* Rows */}
            {pastOrders.map((order, idx) => (
              <div
                key={idx}
                className='grid grid-cols-[160px_1fr_160px] items-center text-sm text-[#3A3D42] px-5 py-3 border-b last:border-b-0 border-[#F3E4D6]'
              >
                {/* Date */}
                <div className='md:py-1 text-[14px] font-medium'>
                  {order.date}
                </div>

                {/* Title + tracking */}
                <div className='md:py-1'>
                  <p className='font-semibold text-[#0D060C]'>{order.title}</p>
                  <p className='text-[12px] text-[#A3A3A3]'>
                    {order.trackingId}
                  </p>
                </div>

                {/* Order Again button */}
                <div className='flex justify-end md:py-1'>
                  <button
                    type='button'
                    className='cursor-pointer inline-flex items-center justify-center bg-[#D6866B] text-white text-[14px] font-medium py-2.5 px-5 rounded-full hover:bg-[#491F40]  transition whitespace-nowrap'
                  >
                    Order Again
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile layout */}
          <div className='md:hidden'>
            <div className='bg-[#F6E4D6] text-[#CE8936] text-[14px] font-medium px-4 py-2 rounded-[6px] mb-3'>
              Past Orders
            </div>

            {pastOrders.map((order, idx) => (
              <div
                key={idx}
                className='border-b border-[#F3E4D6] py-4 last:border-b-0'
              >
                <div className='flex justify-between text-[12px] text-[#A3A3A3] mb-1'>
                  <span>Title:</span>
                  <span>Date: {order.date}</span>
                </div>

                <p className='text-[14px] font-semibold text-[#0D060C]'>
                  {order.title}
                </p>
                <p className='text-[12px] text-[#A3A3A3]'>{order.trackingId}</p>

                <div className='mt-2 flex items-center gap-2'>
                  <span className='text-[12px] text-[#A3A3A3]'>Status:</span>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center bg-[#D6866B] text-white text-[12px] font-medium py-2 px-4 rounded-full hover:bg-[#b8680b] transition whitespace-nowrap'
                  >
                    Order Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Orders;
