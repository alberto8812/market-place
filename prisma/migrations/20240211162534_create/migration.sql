/*
  Warnings:

  - Changed the type of `name` on the `Garmenttype` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `name` on the `SizeCategory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "CategorySize" AS ENUM ('hombre', 'mujer', 'kids', 'NA');

-- CreateEnum
CREATE TYPE "Garmenttypes" AS ENUM ('camisa', 'pantalon', 'zapatos', 'NA');

-- DropIndex
DROP INDEX "Garmenttype_name_key";

-- DropIndex
DROP INDEX "SizeCategory_name_key";

-- AlterTable
ALTER TABLE "Garmenttype" DROP COLUMN "name",
ADD COLUMN     "name" "Garmenttypes" NOT NULL;

-- AlterTable
ALTER TABLE "SizeCategory" DROP COLUMN "name",
ADD COLUMN     "name" "CategorySize" NOT NULL;
