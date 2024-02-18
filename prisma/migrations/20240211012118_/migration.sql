/*
  Warnings:

  - A unique constraint covering the columns `[id,sizeCategoryId,garmenttypeId]` on the table `Sizes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Sizes_garmenttypeId_key";

-- DropIndex
DROP INDEX "Sizes_sizeCategoryId_key";

-- DropIndex
DROP INDEX "Sizes_size_key";

-- CreateIndex
CREATE UNIQUE INDEX "Sizes_id_sizeCategoryId_garmenttypeId_key" ON "Sizes"("id", "sizeCategoryId", "garmenttypeId");
