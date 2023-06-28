/*
  Warnings:

  - You are about to drop the column `activations` on the `Promocode` table. All the data in the column will be lost.
  - Added the required column `type` to the `Promocode` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promocode" DROP COLUMN "activations",
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "_PromocodeToUser" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_PromocodeToUser_AB_unique" ON "_PromocodeToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_PromocodeToUser_B_index" ON "_PromocodeToUser"("B");

-- AddForeignKey
ALTER TABLE "_PromocodeToUser" ADD CONSTRAINT "_PromocodeToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "Promocode"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PromocodeToUser" ADD CONSTRAINT "_PromocodeToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
