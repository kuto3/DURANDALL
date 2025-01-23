/*
  Warnings:

  - Added the required column `ipfsUri` to the `Diploma` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diploma" ADD COLUMN     "ipfsUri" TEXT NOT NULL;
