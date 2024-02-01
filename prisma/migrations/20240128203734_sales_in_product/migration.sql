/*
  Warnings:

  - You are about to drop the column `quantity` on the `Inventory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[size]` on the table `Sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "quantity",
ADD COLUMN     "inStock" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sale" DOUBLE PRECISION NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_size_key" ON "Sizes"("size");
