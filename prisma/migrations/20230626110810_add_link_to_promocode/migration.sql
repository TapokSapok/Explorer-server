-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "service" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
