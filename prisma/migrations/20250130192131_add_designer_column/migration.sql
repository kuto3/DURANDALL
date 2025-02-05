/*
  Warnings:

  - You are about to drop the `SlotMachine` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "SlotMachine";

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "designer" TEXT,
    "description" TEXT,
    "genre" TEXT,
    "categorie" TEXT,
    "souscategorie" TEXT,
    "imagesrc" TEXT,
    "price" DOUBLE PRECISION,
    "etat" TEXT,
    "couleur" TEXT,
    "matiere" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
