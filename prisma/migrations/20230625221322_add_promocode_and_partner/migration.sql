-- CreateTable
CREATE TABLE "Partner" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "income" INTEGER NOT NULL,
    "activations" INTEGER NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Promocode" (
    "id" SERIAL NOT NULL,
    "partnerId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "activations" INTEGER NOT NULL,

    CONSTRAINT "Promocode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_userId_key" ON "Partner"("userId");

-- AddForeignKey
ALTER TABLE "Partner" ADD CONSTRAINT "Partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promocode" ADD CONSTRAINT "Promocode_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
