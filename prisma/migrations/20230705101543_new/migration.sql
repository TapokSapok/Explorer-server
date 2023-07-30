-- DropForeignKey
ALTER TABLE "Partner" DROP CONSTRAINT "Partner_userId_fkey";

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
