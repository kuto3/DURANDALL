/*
  Warnings:

  - You are about to drop the column `backgroundUrl` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `creatorAddress` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `liquidity` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `logoUrl` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `percentageWinning` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `SlotMachine` table. All the data in the column will be lost.
  - You are about to drop the `WheelImage` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `url` to the `SlotMachine` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "WheelImage" DROP CONSTRAINT "WheelImage_slotMachineId_fkey";

-- AlterTable
ALTER TABLE "SlotMachine" DROP COLUMN "backgroundUrl",
DROP COLUMN "creatorAddress",
DROP COLUMN "description",
DROP COLUMN "liquidity",
DROP COLUMN "logoUrl",
DROP COLUMN "percentageWinning",
DROP COLUMN "title",
ADD COLUMN     "url" TEXT NOT NULL;

-- DropTable
DROP TABLE "WheelImage";
