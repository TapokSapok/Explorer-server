/*
  Warnings:

  - Added the required column `value` to the `Promocode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocode" ADD COLUMN     "value" INTEGER NOT NULL;
