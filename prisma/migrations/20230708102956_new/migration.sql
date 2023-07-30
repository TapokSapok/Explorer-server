/*
  Warnings:

  - You are about to drop the column `host` on the `Proxy` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `Proxy` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Proxy` table. All the data in the column will be lost.
  - You are about to drop the column `port` on the `Proxy` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Proxy` table. All the data in the column will be lost.
  - Added the required column `adress` to the `Proxy` table without a default value. This is not possible if the table is not empty.
  - Added the required column `marketId` to the `Proxy` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Proxy" DROP COLUMN "host",
DROP COLUMN "hostId",
DROP COLUMN "password",
DROP COLUMN "port",
DROP COLUMN "username",
ADD COLUMN     "adress" TEXT NOT NULL,
ADD COLUMN     "marketId" INTEGER NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'active';
