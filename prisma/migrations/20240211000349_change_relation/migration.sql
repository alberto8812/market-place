/*
  Warnings:

  - You are about to drop the column `garmenttypeId` on the `Sizes` table. All the data in the column will be lost.
  - You are about to drop the column `sizeCategoryId` on the `Sizes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Sizes" DROP CONSTRAINT "Sizes_garmenttypeId_fkey";

-- DropForeignKey
ALTER TABLE "Sizes" DROP CONSTRAINT "Sizes_sizeCategoryId_fkey";

-- AlterTable
ALTER TABLE "Garmenttype" ADD COLUMN     "sizesId" TEXT NOT NULL DEFAULT 'NA';

-- AlterTable
ALTER TABLE "SizeCategory" ADD COLUMN     "sizeId" TEXT NOT NULL DEFAULT 'NA';

-- AlterTable
ALTER TABLE "Sizes" DROP COLUMN "garmenttypeId",
DROP COLUMN "sizeCategoryId";

-- AddForeignKey
ALTER TABLE "SizeCategory" ADD CONSTRAINT "SizeCategory_sizeId_fkey" FOREIGN KEY ("sizeId") REFERENCES "Sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Garmenttype" ADD CONSTRAINT "Garmenttype_sizesId_fkey" FOREIGN KEY ("sizesId") REFERENCES "Sizes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
