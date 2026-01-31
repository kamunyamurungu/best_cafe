-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "EventType" ADD VALUE 'SESSION_PAUSED';
ALTER TYPE "EventType" ADD VALUE 'SESSION_RESUMED';

-- AlterEnum
ALTER TYPE "SessionStatus" ADD VALUE 'PAUSED';

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "pausedAt" TIMESTAMP(3),
ADD COLUMN     "pausedMillis" INTEGER NOT NULL DEFAULT 0;
