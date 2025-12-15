/*
  Warnings:

  - You are about to drop the column `profileImage` on the `Health` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "profileImage" TEXT;

-- AlterTable
ALTER TABLE "Health" DROP COLUMN "profileImage";
