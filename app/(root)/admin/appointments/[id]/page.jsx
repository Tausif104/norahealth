import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/client/prisma";
import OrdersTable from "../../_components/orders-table";

export default async function AppointmentDetailsPage({ params }) {
  const param = await params;
  const booking = await prisma.booking.findUnique({
    where: { id: Number(param.id) },
    include: {
      slot: true,
    },
  });

  if (!booking) notFound();

  const user = await prisma.user.findUnique({
    where: { email: booking.email },
    include: { orders: true, account: true },
  });

  console.log(user);

  return (
    <div className='p-6  space-y-6'>
      <h1 className='text-xl font-semibold'>Appointment Details</h1>

      {/* Booking Info */}
      <section className=' p-4 space-y-2'>
        <h2 className='font-bold text-xl'>Booking Info</h2>
        <p>
          <b>Name:</b> {booking.fullName}
        </p>
        <p>
          <b>Email:</b> {booking.email}
        </p>
        <p>
          <b>Phone:</b> {booking.phoneNumber}
        </p>
        <p>
          <b>Service:</b> {booking.serviceName}
        </p>
        <p>
          <b>Provider:</b> {booking.providerName}
        </p>
        <p>
          <b>Appointment:</b> {formatDate(booking.appointment)}{" "}
          {booking.slot ? `at ${booking.slot.startTime}` : ""}
        </p>
        <p>
          <b>Notes:</b> {booking.notes || "—"}
        </p>
      </section>

      {/* Slot Info */}
      {booking.bookingType === "Booking" && booking.slot && (
        <section className='p-4 space-y-2'>
          <h2 className='font-bold text-xl'>Slot Info</h2>
          <p>
            <b>Date:</b> {formatDate(booking.slot.slotDate)}
          </p>
          <p>
            <b>Time:</b> {booking.slot.startTime} – {booking.slot.endTime}
          </p>
        </section>
      )}

      {booking.bookingType === "Order" && (
        <section className='p-4 space-y-2'>
          <h2 className='font-bold text-xl'>Order Appointment Info</h2>
          <p>
            <b>NHS Service:</b> {booking.nhsService}
          </p>
          <p>
            <b>Appointment Requested:</b>{" "}
            {booking.appointmentRequest ? "Yes" : "No"}
          </p>
          <p>
            <b>Requested Date:</b> {formatDate(booking.appointment)}
          </p>
        </section>
      )}

      {/* User + Orders */}
      {user && (
        <section className='p-4 space-y-2'>
          <h2 className='font-bold text-xl'>User Info</h2>
          <p>
            <b>User ID:</b> {user.id}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Name:</b> {user?.account?.firstName} {user?.account?.lastName}
          </p>
          <p>
            <b>Date of Birth:</b>{" "}
            {user?.account?.dob ? formatDate(user.account.dob) : "N/A"}
          </p>
          <p>
            <b>Role:</b> {user.role}
          </p>

          <h3 className='mt-3 font-bold text-xl'>Orders</h3>
          {user.orders.length ? (
            <OrdersTable
              data={user.orders.map((o) => ({
                id: o.id,
                medicineName: o.medicineName,
                status: o.status,
                createdAt: o.createdAt,
              }))}
            />
          ) : (
            <p>No orders yet.</p>
          )}
        </section>
      )}
    </div>
  );
}
