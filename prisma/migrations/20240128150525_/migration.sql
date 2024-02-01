/*
  Warnings:

  - You are about to drop the column `fatProduct` on the `Product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Product" DROP COLUMN "fatProduct",
ADD COLUMN     "flatProduct" BOOLEAN NOT NULL DEFAULT true;
