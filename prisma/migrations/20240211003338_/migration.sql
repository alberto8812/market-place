/*
  Warnings:

  - A unique constraint covering the columns `[sizeCategoryId]` on the table `Sizes` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[garmenttypeId]` on the table `Sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Sizes" ALTER COLUMN "garmenttypeId" DROP DEFAULT,
ALTER COLUMN "sizeCategoryId" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_sizeCategoryId_key" ON "Sizes"("sizeCategoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_garmenttypeId_key" ON "Sizes"("garmenttypeId");
