-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Size" ADD VALUE 'HP_28';
ALTER TYPE "Size" ADD VALUE 'HP_30';
ALTER TYPE "Size" ADD VALUE 'HP_32';
ALTER TYPE "Size" ADD VALUE 'HP_34';
ALTER TYPE "Size" ADD VALUE 'HP_36';
ALTER TYPE "Size" ADD VALUE 'HP_38';
ALTER TYPE "Size" ADD VALUE 'MP_4';
ALTER TYPE "Size" ADD VALUE 'MP_6';
ALTER TYPE "Size" ADD VALUE 'MP_8';
ALTER TYPE "Size" ADD VALUE 'MP_10';
ALTER TYPE "Size" ADD VALUE 'MP_12';
ALTER TYPE "Size" ADD VALUE 'MP_14';
ALTER TYPE "Size" ADD VALUE 'ZA_36';
ALTER TYPE "Size" ADD VALUE 'ZA_37';
ALTER TYPE "Size" ADD VALUE 'ZA_38';
ALTER TYPE "Size" ADD VALUE 'ZA_39';
ALTER TYPE "Size" ADD VALUE 'ZA_40';
ALTER TYPE "Size" ADD VALUE 'ZA_41';
ALTER TYPE "Size" ADD VALUE 'ZA_42';
ALTER TYPE "Size" ADD VALUE 'ZA_43';
ALTER TYPE "Size" ADD VALUE 'NC_4';
ALTER TYPE "Size" ADD VALUE 'NC_6';
ALTER TYPE "Size" ADD VALUE 'NC_8';
ALTER TYPE "Size" ADD VALUE 'NC_10';
ALTER TYPE "Size" ADD VALUE 'NC_12';
ALTER TYPE "Size" ADD VALUE 'NC_14';
ALTER TYPE "Size" ADD VALUE 'NZ_28';
ALTER TYPE "Size" ADD VALUE 'NZ_29';
ALTER TYPE "Size" ADD VALUE 'NZ_30';
ALTER TYPE "Size" ADD VALUE 'NZ_31';
ALTER TYPE "Size" ADD VALUE 'NZ_32';
ALTER TYPE "Size" ADD VALUE 'NZ_33';
ALTER TYPE "Size" ADD VALUE 'NZ_34';

-- AlterTable
ALTER TABLE "Sizes" ADD COLUMN     "garmenttypeId" TEXT NOT NULL DEFAULT 'NA',
ADD COLUMN     "sizeCategoryId" TEXT NOT NULL DEFAULT 'NA';

-- CreateTable
CREATE TABLE "SizeCategory" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SizeCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Garmenttype" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Garmenttype_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SizeCategory_name_key" ON "SizeCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Garmenttype_name_key" ON "Garmenttype"("name");

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_sizeCategoryId_fkey" FOREIGN KEY ("sizeCategoryId") REFERENCES "SizeCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sizes" ADD CONSTRAINT "Sizes_garmenttypeId_fkey" FOREIGN KEY ("garmenttypeId") REFERENCES "Garmenttype"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
