/*
  Warnings:

  - The values [XS,S,M,L,XL,XXL,XXXL] on the enum `Size` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Size_new" AS ENUM ('CA_XS', 'CA_S', 'CA_M', 'CA_L', 'CA_XL', 'CA_XXL', 'CA_XXXL', 'NA', 'HP_28', 'HP_30', 'HP_32', 'HP_34', 'HP_36', 'HP_38', 'MP_4', 'MP_6', 'MP_8', 'MP_10', 'MP_12', 'MP_14', 'ZA_36', 'ZA_37', 'ZA_38', 'ZA_39', 'ZA_40', 'ZA_41', 'ZA_42', 'ZA_43', 'NC_4', 'NC_6', 'NC_8', 'NC_10', 'NC_12', 'NC_14', 'NZ_28', 'NZ_29', 'NZ_30', 'NZ_31', 'NZ_32', 'NZ_33', 'NZ_34');
ALTER TABLE "Product" ALTER COLUMN "sizes" DROP DEFAULT;
ALTER TABLE "Product" ALTER COLUMN "sizes" TYPE "Size_new"[] USING ("sizes"::text::"Size_new"[]);
ALTER TABLE "OrderItem" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TABLE "Sizes" ALTER COLUMN "size" TYPE "Size_new" USING ("size"::text::"Size_new");
ALTER TYPE "Size" RENAME TO "Size_old";
ALTER TYPE "Size_new" RENAME TO "Size";
DROP TYPE "Size_old";
ALTER TABLE "Product" ALTER COLUMN "sizes" SET DEFAULT ARRAY[]::"Size"[];
COMMIT;
