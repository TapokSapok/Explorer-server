/*
  Warnings:

  - You are about to drop the column `endTerm` on the `Bot` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPremium` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" DROP COLUMN "endTerm",
ADD COLUMN     "endDate" TEXT NOT NULL,
ADD COLUMN     "isPremium" BOOLEAN NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
