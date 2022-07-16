/*
  Warnings:

  - The `stateCode` column on the `Orders` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `OrderStates` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "OrderState" AS ENUM ('WAITING', 'PREPARING', 'CANCELED', 'DONE');

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_stateCode_fkey";

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "stateCode",
ADD COLUMN     "stateCode" "OrderState" NOT NULL DEFAULT E'WAITING';

-- DropTable
DROP TABLE "OrderStates";
