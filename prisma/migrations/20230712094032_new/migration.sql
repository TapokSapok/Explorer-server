/*
  Warnings:

  - You are about to drop the `BotWhitelistUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "BotWhitelistUser" DROP CONSTRAINT "BotWhitelistUser_botId_fkey";

-- DropTable
DROP TABLE "BotWhitelistUser";

-- CreateTable
CREATE TABLE "BotWhitelist" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "BotWhitelist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BotWhitelist" ADD CONSTRAINT "BotWhitelist_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
