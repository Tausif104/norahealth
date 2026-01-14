/*
  Warnings:

  - A unique constraint covering the columns `[slotDate,startTime,endTime]` on the table `BookingSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BookingSlot_slotDate_startTime_endTime_key" ON "BookingSlot"("slotDate", "startTime", "endTime");
