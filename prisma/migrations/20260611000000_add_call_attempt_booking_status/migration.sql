-- AlterEnum
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'FirstCallAttempted';
ALTER TYPE "BookingStatus" ADD VALUE IF NOT EXISTS 'SecondCallAttempted';
