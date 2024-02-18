/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Garmenttype` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `SizeCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Garmenttype_name_key" ON "Garmenttype"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SizeCategory_name_key" ON "SizeCategory"("name");
