-- CreateEnum
CREATE TYPE "BookingType" AS ENUM ('Booking', 'Order');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingType" "BookingType" DEFAULT 'Booking';
