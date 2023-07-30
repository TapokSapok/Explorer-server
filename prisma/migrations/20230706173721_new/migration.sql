/*
  Warnings:

  - Added the required column `proxyId` to the `Bot` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "proxyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Proxy" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "hostId" INTEGER NOT NULL,
    "host" TEXT NOT NULL,
    "port" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createDate" TEXT NOT NULL,
    "endDate" TEXT NOT NULL,

    CONSTRAINT "Proxy_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "Proxy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proxy" ADD CONSTRAINT "Proxy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
