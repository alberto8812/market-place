-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "createDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "fatProduct" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "modifiedDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifieldBy" TEXT;
