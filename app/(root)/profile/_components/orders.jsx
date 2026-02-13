"use client";

import { useMemo, useState } from "react";
import { useProfile } from "@/lib/profileContext";
import { PanelLeft, ChevronLeft, ChevronRight } from "lucide-react";

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const getStatusBadge = (status) => {
  const s = String(status || "").toLowerCase();

  if (s === "clinicalreview") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#FAF1DE] text-[#B97E00] text-[12px] px-3 py-1 whitespace-nowrap">
        Under clinical review
      </span>
    );
  }

  if (s === "posted") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#E7EDFF] text-[#0A72C8] text-[12px] px-3 py-1 whitespace-nowrap">
        Posted via Royal Mail
      </span>
    );
  }
  if (s === "declined") {
    return (
      <span className="inline-flex items-center rounded-full bg-[#ff7565] text-[#fff] text-[12px] px-3 py-1 whitespace-nowrap">
        Declined
      </span>
    );
  }

  return (
    <span className="inline-flex items-center rounded-full bg-[#F5F0EE] text-[#3A3D42] text-[12px] px-3 py-1 whitespace-nowrap">
      {status || "Pending"}
    </span>
  );
};

export default function Orders({ recentOrders = [] }) {
  const { setMenuOpen } = useProfile();

  // pagination
  const PAGE_SIZE = 8;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(recentOrders.length / PAGE_SIZE));

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return recentOrders.slice(start, start + PAGE_SIZE);
  }, [recentOrders, page]);

  // keep page valid when data changes
  useMemo(() => {
    if (page > totalPages) setPage(totalPages);
  }, [totalPages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="flex-1 space-y-6 p-[24px] md:p-[50px]">
      {/* HEADER */}
      <div className="flex items-center gap-[50px]">
        <button
          onClick={() => setMenuOpen(true)}
          className="md:hidden w-[40px] h-[40px] bg-[#d67b0e] text-white flex justify-center items-center rounded-full"
        >
          <PanelLeft />
        </button>
        <h2 className="text-[#0D060C] text-[20px] md:text-[24px] font-semibold">
          Orders
        </h2>
      </div>

      <div className="md:bg-white rounded-[12px] md:p-8">
        {/* DESKTOP */}
        <div className="hidden md:block w-full overflow-hidden">
          <div className="grid grid-cols-[160px_1fr_220px] bg-[#F6E4D6] text-sm font-medium text-[#3A3D42] px-5 py-3 rounded-[12px]">
            <span>Date</span>
            <span>Title</span>
            <span className="text-right pr-4">Status</span>
          </div>

          {paginatedOrders.map((order) => (
            <div
              key={order.id}
              className="grid grid-cols-[160px_1fr_220px] items-center text-sm text-[#3A3D42] px-5 py-3 border-b border-[#F5F0EE]"
            >
              <div className="font-medium">{formatDate(order.createdAt)}</div>

              <div>
                <p className="font-semibold text-[#0D060C]">
                  {order.medicineName}
                </p>
                <p className="text-[12px] text-[#A3A3A3]">
                  Tracking ID: {order.trackingId || "Pending"}
                </p>
              </div>

              <div className="flex justify-end md:py-1">
                {getStatusBadge(order.status, order.trackingId)}
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE */}
        <div className="md:hidden">
          {paginatedOrders.map((order) => (
            <div key={order.id} className="border-b border-[#F5F0EE] py-4">
              <div className="flex justify-between text-[12px] text-[#A3A3A3] mb-1">
                <span>Title:</span>
                <span>Date: {formatDate(order.createdAt)}</span>
              </div>

              <p className="text-[14px] font-semibold text-[#0D060C]">
                {order.medicineName}
              </p>
              <p className="text-[12px] text-[#A3A3A3]">
                Tracking ID: {order.trackingId || "Pending"}
              </p>

              <div className="mt-2 flex items-center gap-2">
                <span className="text-[12px] text-[#A3A3A3]">Status:</span>
                {getStatusBadge(order.status)}
              </div>
            </div>
          ))}
        </div>

        {/* PAGINATION */}
        {recentOrders.length > PAGE_SIZE && (
          <div className="mt-6 flex items-center justify-between">
            <p className="text-[13px] text-[#A3A3A3]">
              Page {page} of {totalPages}
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="h-9 px-3 rounded-full border border-[#F5F0EE] text-[#3A3D42] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft size={18} />
                Prev
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="h-9 px-3 rounded-full border border-[#F5F0EE] text-[#3A3D42] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
