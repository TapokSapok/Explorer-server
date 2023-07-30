/*
  Warnings:

  - You are about to drop the column `maxBlocks` on the `BotMacros` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bot" ADD COLUMN     "activeMacrosId" INTEGER;

-- AlterTable
ALTER TABLE "BotMacros" DROP COLUMN "maxBlocks",
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "MacrosBlock" ALTER COLUMN "secondValue" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Timer" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "interval" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Timer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Timer" ADD CONSTRAINT "Timer_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;
