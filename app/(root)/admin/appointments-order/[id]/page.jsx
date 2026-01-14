import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import { prisma } from "@/lib/client/prisma";
import CreateOrderDialog from "./CreateOrderDialog";
import AppointmentOrdersTable from "./AppointOrdersTable";

export default async function AppointmentOrderDetailsPage({ params }) {
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

  console.log(booking, user);

  return (
    <div className='p-6 w-full  space-y-6'>
      <h1 className='text-xl font-semibold'>Appointment Order Details</h1>
      <CreateOrderDialog bookingId={booking.id} />
      {/* Booking Info */}
      <section className=' p-4 space-y-2'>
        <h2 className='font-bold text-xl'>Patient Info</h2>
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
          <b>
            {booking.bookingType === "Booking"
              ? "Appointment Date"
              : "Requested Date"}
            :
          </b>{" "}
          {formatDate(booking.appointment)}{" "}
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
          <h2 className='font-bold text-xl'>Contraception Order Info</h2>
          <p>
            <b>NHS Service:</b> {booking.nhsService}
          </p>
          <p>
            <b>OC Requested:</b> {booking.ocRequest}
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

          {user.orders?.length ? (
            <AppointmentOrdersTable orders={user.orders} />
          ) : (
            <p>No orders yet.</p>
          )}
        </section>
      )}
    </div>
  );
}
