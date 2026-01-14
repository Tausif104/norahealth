-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('Incomplete', 'Complete');

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "bookingStatus" "BookingStatus" DEFAULT 'Incomplete';
