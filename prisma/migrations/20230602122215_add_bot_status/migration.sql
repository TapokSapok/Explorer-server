-- AlterTable
ALTER TABLE "Bot" ALTER COLUMN "status" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'offline';
