-- DropForeignKey
ALTER TABLE "Bot" DROP CONSTRAINT "Bot_proxyId_fkey";

-- DropForeignKey
ALTER TABLE "Bot" DROP CONSTRAINT "Bot_userId_fkey";

-- DropForeignKey
ALTER TABLE "BotWhitelistUser" DROP CONSTRAINT "BotWhitelistUser_botId_fkey";

-- DropForeignKey
ALTER TABLE "PartnerLink" DROP CONSTRAINT "PartnerLink_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_userId_fkey";

-- DropForeignKey
ALTER TABLE "Promocode" DROP CONSTRAINT "Promocode_partnerId_fkey";

-- DropForeignKey
ALTER TABLE "PromocodeActivation" DROP CONSTRAINT "PromocodeActivation_promocodeId_fkey";

-- DropForeignKey
ALTER TABLE "PromocodeActivation" DROP CONSTRAINT "PromocodeActivation_userId_fkey";

-- DropForeignKey
ALTER TABLE "Proxy" DROP CONSTRAINT "Proxy_userId_fkey";

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bot" ADD CONSTRAINT "Bot_proxyId_fkey" FOREIGN KEY ("proxyId") REFERENCES "Proxy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BotWhitelistUser" ADD CONSTRAINT "BotWhitelistUser_botId_fkey" FOREIGN KEY ("botId") REFERENCES "Bot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PartnerLink" ADD CONSTRAINT "PartnerLink_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocode" ADD CONSTRAINT "Promocode_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromocodeActivation" ADD CONSTRAINT "PromocodeActivation_promocodeId_fkey" FOREIGN KEY ("promocodeId") REFERENCES "Promocode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromocodeActivation" ADD CONSTRAINT "PromocodeActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Proxy" ADD CONSTRAINT "Proxy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
