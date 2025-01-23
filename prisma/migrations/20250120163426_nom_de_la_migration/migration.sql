/*
  Warnings:

  - You are about to drop the `Diploma` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `NFT` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Diploma";

-- DropTable
DROP TABLE "NFT";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "SlotMachine" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "creatorAddress" VARCHAR(255) NOT NULL,
    "liquidity" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "percentageWinning" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "backgroundUrl" TEXT NOT NULL,
    "logoUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SlotMachine_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WheelImage" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "slotMachineId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WheelImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WheelImage" ADD CONSTRAINT "WheelImage_slotMachineId_fkey" FOREIGN KEY ("slotMachineId") REFERENCES "SlotMachine"("id") ON DELETE CASCADE ON UPDATE CASCADE;
