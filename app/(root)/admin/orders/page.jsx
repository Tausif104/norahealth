import AllOrdersTable from "../_components/all-order-table";
import { getAllOrdersAction } from "@/actions/order.action";

export default async function Page({ searchParams }) {
  const pageSize = 10;

  const params = await searchParams;

  const page = Number(params?.page ?? 0);

  const year = params?.year ?? "all";
  const month = params?.month ?? "all";
  const day = params?.day ?? "all";
  const status = params?.status ?? "all";
  const email = params?.email ?? "";

  const toUndef = (v) => (v && v !== "all" ? v : undefined);

  const res = await getAllOrdersAction({
    year: toUndef(year),
    month: toUndef(month),
    day: toUndef(day),
    status: toUndef(status),
    email: email.trim() || undefined,
    page,
    pageSize,
  });

  return (
    <AllOrdersTable
      initialOrders={res?.orders || []}
      initialTotal={res?.total || 0}
      initialPageIndex={page}
      pageSize={pageSize}
      initialFilters={{ year, month, day, status, email }}
    />
  );
}
