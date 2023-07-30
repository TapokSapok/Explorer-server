-- CreateTable
CREATE TABLE "BotWhitelistUser" (
    "id" SERIAL NOT NULL,
    "botId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,

    CONSTRAINT "BotWhitelistUser_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BotWhitelistUser" ADD CONSTRAINT "BotWhitelistUser_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
