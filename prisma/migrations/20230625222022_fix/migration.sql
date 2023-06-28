-- AlterTable
ALTER TABLE "Partner" ALTER COLUMN "income" DROP NOT NULL,
ALTER COLUMN "income" SET DEFAULT 0,
ALTER COLUMN "activations" DROP NOT NULL,
ALTER COLUMN "activations" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Promocode" ALTER COLUMN "activations" DROP NOT NULL,
ALTER COLUMN "activations" SET DEFAULT 0;
