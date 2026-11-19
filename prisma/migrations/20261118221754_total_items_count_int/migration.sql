/*
  Warnings:

  - You are about to alter the column `totalItems` on the `Order` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "totalItems" SET DATA TYPE INTEGER;
