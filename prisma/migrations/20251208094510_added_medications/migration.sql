-- CreateTable
CREATE TABLE "Medications" (
    "id" SERIAL NOT NULL,
    "label" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Medications_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Medications" ADD CONSTRAINT "Medications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
