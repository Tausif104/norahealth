"use client";

import { useProfile } from "@/lib/profileContext";
import { PanelLeft } from "lucide-react";

export default function Orders({ recentOrders, pastOrders }) {
  const { setMenuOpen } = useProfile();

  return (
    <div className='flex-1 space-y-6 p-[24px] md:p-[50px]'>
      {/* HEADER */}
      <div className='flex items-center gap-[50px]'>
        <button
          onClick={() => setMenuOpen(true)}
          className='md:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full'
        >
          <PanelLeft />
        </button>
        <h2 className='text-[#0D060C] text-[20px] md:text-[24px] font-semibold'>
          Orders
        </h2>
      </div>

      <div className='md:bg-white rounded-[12px] md:p-8'>
        {/* ================== CURRENT ORDERS ================== */}
        <section className='space-y-4'>
          <h3 className='hidden md:block text-[15px] font-semibold text-[#CE8936]'>
            Current Orders
          </h3>

          {/* DESKTOP */}
          <div className='hidden md:block w-full overflow-hidden'>
            <div className='grid grid-cols-[160px_1fr_180px] bg-[#F6E4D6] text-sm font-medium text-[#3A3D42] px-5 py-3 rounded-[12px]'>
              <span>Date</span>
              <span>Title</span>
              <span className='text-right pr-4'>Status</span>
            </div>

            {recentOrders.map((order) => (
              <div
                key={order.id}
                className='grid grid-cols-[160px_1fr_180px] items-center text-sm text-[#3A3D42] px-5 py-3 border-b border-[#F5F0EE]'
              >
                <div className='font-medium'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                <div>
                  <p className='font-semibold text-[#0D060C]'>
                    {order.medicineName}
                  </p>
                  <p className='text-[12px] text-[#A3A3A3]'>
                    Tracking ID: {order.trackingId}
                  </p>
                </div>

                <div className='flex justify-end md:py-1'>
                  {order.status === "clinicalreview" && (
                    <span className='inline-flex items-center rounded-full bg-[#FAF1DE] text-[#B97E00] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Under clinical review
                    </span>
                  )}

                  {order.status === "posted" && (
                    <span className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Posted via Royal Mail. Tracking ID
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE */}
          <div className='md:hidden'>
            <div className='bg-[#F6E4D6] text-[#CE8936] text-[14px] font-medium px-4 py-2 rounded-[6px] mb-3'>
              Current Orders
            </div>

            {recentOrders.map((order) => (
              <div key={order.id} className='border-b border-[#F5F0EE] py-4'>
                <div className='flex justify-between text-[12px] text-[#A3A3A3] mb-1'>
                  <span>Title:</span>
                  <span>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className='text-[14px] font-semibold text-[#0D060C]'>
                  {order.medicineName}
                </p>
                <p className='text-[12px] text-[#A3A3A3]'>
                  Tracking ID: {order.trackingId}
                </p>

                <div className='mt-2 flex items-center gap-2'>
                  <span className='text-[12px] text-[#A3A3A3]'>Status:</span>
                  {order.status === "clinicalreview" && (
                    <span className='inline-flex items-center rounded-full bg-[#FAF1DE] text-[#B97E00] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Under clinical review
                    </span>
                  )}

                  {order.status === "posted" && (
                    <span className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Posted via Royal Mail. Tracking ID
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className='h-6' />

        {/* ================== PAST ORDERS ================== */}
        <section className='space-y-4'>
          <h3 className='hidden md:block text-[15px] font-semibold text-[#CE8936]'>
            Past Orders
          </h3>

          {/* DESKTOP */}
          <div className='hidden md:block w-full overflow-hidden'>
            <div className='grid grid-cols-[160px_1fr_160px] bg-[#F6E4D6] rounded-[12px] text-sm font-medium text-[#0D060C] px-5 py-3'>
              <span>Date</span>
              <span>Title</span>
              <span className='text-right pr-4'>Status</span>
            </div>

            {pastOrders.map((order) => (
              <div
                key={order.id}
                className='grid grid-cols-[160px_1fr_160px] items-center text-sm text-[#3A3D42] px-5 py-3 border-b border-[#F3E4D6]'
              >
                <div className='font-medium'>
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

                <div>
                  <p className='font-semibold text-[#0D060C]'>
                    {order.medicineName}
                  </p>
                  <p className='text-[12px] text-[#A3A3A3]'>
                    {order.trackingId}
                  </p>
                </div>

                <div className='flex justify-end'>
                  {order.status === "delivered" && (
                    <span className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* MOBILE */}
          <div className='md:hidden'>
            <div className='bg-[#F6E4D6] text-[#CE8936] text-[14px] font-medium px-4 py-2 rounded-[6px] mb-3'>
              Past Orders
            </div>

            {pastOrders.map((order) => (
              <div key={order.id} className='border-b border-[#F3E4D6] py-4'>
                <div className='flex justify-between text-[12px] text-[#A3A3A3] mb-1'>
                  <span>Title:</span>
                  <span>
                    Date: {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <p className='text-[14px] font-semibold text-[#0D060C]'>
                  {order.medicineName}
                </p>
                <p className='text-[12px] text-[#A3A3A3]'>{order.trackingId}</p>

                <div className='mt-2 flex items-center gap-2'>
                  {order.status === "delivered" && (
                    <span className='inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap'>
                      Delivered
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
