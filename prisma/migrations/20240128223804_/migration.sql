/*
  Warnings:

  - You are about to drop the column `Qualification` on the `Comments` table. All the data in the column will be lost.
  - You are about to drop the column `SizesId` on the `Inventory` table. All the data in the column will be lost.
  - Added the required column `sizesId` to the `Inventory` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Inventory" DROP CONSTRAINT "Inventory_SizesId_fkey";

-- AlterTable
ALTER TABLE "Comments" DROP COLUMN "Qualification",
ADD COLUMN     "qualification" INTEGER NOT NULL DEFAULT 5;

-- AlterTable
ALTER TABLE "Inventory" DROP COLUMN "SizesId",
ADD COLUMN     "sizesId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_sizesId_fkey" FOREIGN KEY ("sizesId") REFERENCES "Sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
