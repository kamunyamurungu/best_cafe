-- CreateEnum
CREATE TYPE "MetricType" AS ENUM ('SCAN', 'COPY');

-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "spoolJobId" INTEGER;

-- CreateTable
CREATE TABLE "Printer" (
    "id" TEXT NOT NULL,
    "computerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "isDefault" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Printer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrinterDevice" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "community" TEXT NOT NULL DEFAULT 'public',
    "scanOid" TEXT NOT NULL,
    "copyOid" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT true,
    "lastScanCount" INTEGER,
    "lastCopyCount" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PrinterDevice_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ScanCopyMetric" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "type" "MetricType" NOT NULL,
    "count" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScanCopyMetric_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Printer_computerId_name_key" ON "Printer"("computerId", "name");

-- AddForeignKey
ALTER TABLE "Printer" ADD CONSTRAINT "Printer_computerId_fkey" FOREIGN KEY ("computerId") REFERENCES "Computer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScanCopyMetric" ADD CONSTRAINT "ScanCopyMetric_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "PrinterDevice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
