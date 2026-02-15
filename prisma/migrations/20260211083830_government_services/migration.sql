-- CreateEnum
CREATE TYPE "GovPricingModel" AS ENUM ('FREE', 'FLAT', 'PER_MINUTE');

-- CreateEnum
CREATE TYPE "ShortcutType" AS ENUM ('URL', 'GOV_SERVICE', 'AI_SERVICE', 'INTERNAL');

-- CreateTable
CREATE TABLE "GovService" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "officialUrl" TEXT NOT NULL,
    "description" TEXT,
    "pricingModel" "GovPricingModel" NOT NULL,
    "unitPrice" INTEGER,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GovService_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GovServiceUsage" (
    "id" TEXT NOT NULL,
    "govServiceId" TEXT NOT NULL,
    "staffId" TEXT NOT NULL,
    "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endedAt" TIMESTAMP(3),
    "transactionId" TEXT,

    CONSTRAINT "GovServiceUsage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shortcut" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "ShortcutType" NOT NULL,
    "target" TEXT NOT NULL,
    "icon" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Shortcut_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GovServiceUsage_transactionId_key" ON "GovServiceUsage"("transactionId");

-- CreateIndex
CREATE INDEX "GovServiceUsage_staffId_endedAt_idx" ON "GovServiceUsage"("staffId", "endedAt");

-- AddForeignKey
ALTER TABLE "GovServiceUsage" ADD CONSTRAINT "GovServiceUsage_govServiceId_fkey" FOREIGN KEY ("govServiceId") REFERENCES "GovService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovServiceUsage" ADD CONSTRAINT "GovServiceUsage_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GovServiceUsage" ADD CONSTRAINT "GovServiceUsage_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "Transaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;
