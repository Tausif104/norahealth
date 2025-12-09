-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('clinicalreview', 'posted', 'delivered');

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "medicineName" TEXT NOT NULL,
    "trackingId" TEXT NOT NULL,
    "status" "OrderStatus" NOT NULL DEFAULT 'clinicalreview',
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
