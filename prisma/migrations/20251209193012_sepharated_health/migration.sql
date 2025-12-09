/*
  Warnings:

  - You are about to drop the column `bpBottom` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `bpCheckDate` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `bpTop` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `currentMedicines` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `medicalConditions` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `Account` table. All the data in the column will be lost.
  - You are about to drop the column `weightHeightCheckDate` on the `Account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" DROP COLUMN "bpBottom",
DROP COLUMN "bpCheckDate",
DROP COLUMN "bpTop",
DROP COLUMN "currentMedicines",
DROP COLUMN "height",
DROP COLUMN "medicalConditions",
DROP COLUMN "profileImage",
DROP COLUMN "weight",
DROP COLUMN "weightHeightCheckDate";

-- CreateTable
CREATE TABLE "Health" (
    "id" SERIAL NOT NULL,
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

    CONSTRAINT "Health_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Health_userId_key" ON "Health"("userId");

-- AddForeignKey
ALTER TABLE "Health" ADD CONSTRAINT "Health_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
