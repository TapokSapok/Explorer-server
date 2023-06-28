/*
  Warnings:

  - You are about to drop the `Operation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_PromocodeToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Operation" DROP CONSTRAINT "Operation_userId_fkey";

-- DropForeignKey
ALTER TABLE "_PromocodeToUser" DROP CONSTRAINT "_PromocodeToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_PromocodeToUser" DROP CONSTRAINT "_PromocodeToUser_B_fkey";

-- DropTable
DROP TABLE "Operation";

-- DropTable
DROP TABLE "_PromocodeToUser";

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "type" TEXT NOT NULL,
    "date" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PromocodeActivation" (
    "id" SERIAL NOT NULL,
    "promocodeId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PromocodeActivation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromocodeActivation" ADD CONSTRAINT "PromocodeActivation_promocodeId_fkey" FOREIGN KEY ("promocodeId") REFERENCES "Promocode"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PromocodeActivation" ADD CONSTRAINT "PromocodeActivation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
