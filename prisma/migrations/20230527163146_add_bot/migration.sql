/*
  Warnings:

  - Added the required column `endTerm` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `server` to the `Bot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "endTerm" TEXT NOT NULL,
ADD COLUMN     "server" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;
