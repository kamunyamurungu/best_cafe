/*
  Warnings:

  - A unique constraint covering the columns `[externalJobId]` on the table `PrintJob` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "PrintJobSource" AS ENUM ('AGENT', 'PRINT_SERVER');

-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "externalJobId" TEXT,
ADD COLUMN     "source" "PrintJobSource" NOT NULL DEFAULT 'AGENT';

-- CreateIndex
CREATE UNIQUE INDEX "PrintJob_externalJobId_key" ON "PrintJob"("externalJobId");
