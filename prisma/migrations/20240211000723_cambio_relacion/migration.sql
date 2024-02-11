/*
  Warnings:

  - You are about to drop the column `sizesId` on the `Garmenttype` table. All the data in the column will be lost.
  - You are about to drop the column `sizeId` on the `SizeCategory` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Garmenttype" DROP CONSTRAINT "Garmenttype_sizesId_fkey";

-- DropForeignKey
ALTER TABLE "SizeCategory" DROP CONSTRAINT "SizeCategory_sizeId_fkey";

-- AlterTable
ALTER TABLE "Garmenttype" DROP COLUMN "sizesId";

-- AlterTable
ALTER TABLE "SizeCategory" DROP COLUMN "sizeId";

-- AlterTable
ALTER TABLE "Sizes" ADD COLUMN     "garmenttypeId" TEXT NOT NULL DEFAULT 'NA',
ADD COLUMN     "sizeCategoryId" TEXT NOT NULL DEFAULT 'NA';

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_garmenttypeId_fkey" FOREIGN KEY ("garmenttypeId") REFERENCES "Garmenttype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
