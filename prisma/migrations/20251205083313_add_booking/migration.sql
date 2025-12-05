-- CreateEnum
CREATE TYPE "OcRequest" AS ENUM ('SAME_OC', 'DIFFERENT_OC');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "notes" TEXT,
    "ocRequest" "OcRequest" NOT NULL,
    "serviceName" TEXT NOT NULL,
    "providerName" TEXT NOT NULL,
    "nhsService" TEXT NOT NULL,
    "appointment" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "slotId" INTEGER,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Booking_slotId_idx" ON "Booking"("slotId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "BookingSlot"("id") ON DELETE SET NULL ON UPDATE CASCADE;
