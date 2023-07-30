/*
  Warnings:

  - You are about to drop the `BotWhitelist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BotWhitelist" DROP CONSTRAINT "BotWhitelist_botId_fkey";

-- DropTable
DROP TABLE "BotWhitelist";

-- CreateTable
CREATE TABLE "BotWhitelistUser" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "BotWhitelistUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BotMacros" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "maxBlocks" INTEGER NOT NULL,

    CONSTRAINT "BotMacros_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MacrosBlock" (
    "id" SERIAL NOT NULL,
    "macrosId" INTEGER NOT NULL,
    "blockType" TEXT NOT NULL,
    "event" TEXT,
    "action" TEXT,
    "value" TEXT NOT NULL,
    "secondValue" TEXT NOT NULL,

    CONSTRAINT "MacrosBlock_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BotWhitelistUser" ADD CONSTRAINT "BotWhitelistUser_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BotMacros" ADD CONSTRAINT "BotMacros_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MacrosBlock" ADD CONSTRAINT "MacrosBlock_macrosId_fkey" FOREIGN KEY ("macrosId") REFERENCES "BotMacros"("id") ON DELETE CASCADE ON UPDATE CASCADE;
