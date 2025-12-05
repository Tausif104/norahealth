-- AlterTable
ALTER TABLE "User" ALTER COLUMN "isAdmin" SET DEFAULT false;

-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "lastwhCheck" TIMESTAMP(3) NOT NULL,
    "bloodPressure" TEXT NOT NULL,
    "lastBpCheckDate" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "secondEmail" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "nhsNumber" TEXT,
    "address" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "weight" TEXT NOT NULL,
    "height" TEXT NOT NULL,
    "weightHeightCheckDate" TIMESTAMP(3) NOT NULL,
    "bpTop" TEXT NOT NULL,
    "bpBottom" TEXT NOT NULL,
    "bpCheckDate" TIMESTAMP(3) NOT NULL,
    "medicalConditions" TEXT NOT NULL,
    "currentMedicines" TEXT NOT NULL,
    "profileImage" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingSlot" (
    "id" SERIAL NOT NULL,
    "slotDate" DATE NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "isBooked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "BookingSlot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_key" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "BookingSlot_slotDate_startTime_idx" ON "BookingSlot"("slotDate", "startTime");

-- AddForeignKey
ALTER TABLE "Record" ADD CONSTRAINT "Record_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
