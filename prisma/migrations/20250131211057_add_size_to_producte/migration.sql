/*
  Warnings:

  - You are about to drop the column `couleur` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `imagesrc` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "couleur",
DROP COLUMN "imagesrc",
ADD COLUMN     "color" TEXT,
ADD COLUMN     "imagesrc1" TEXT,
ADD COLUMN     "imagesrc2" TEXT,
ADD COLUMN     "imagesrc3" TEXT,
ADD COLUMN     "imagesrc4" TEXT,
ADD COLUMN     "url" TEXT,
ADD COLUMN     "vendu" BOOLEAN;
