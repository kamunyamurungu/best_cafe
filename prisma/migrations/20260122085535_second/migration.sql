/*
  Warnings:

  - The values [OCCUPIED,MAINTENANCE] on the enum `ComputerStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPUTER_CREATED,COMPUTER_UPDATED] on the enum `EventType` will be removed. If these variants are still used in the database, this will fail.
  - The values [COMPLETED,CANCELLED] on the enum `SessionStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ComputerStatus_new" AS ENUM ('AVAILABLE', 'IN_USE', 'LOCKED', 'OFFLINE', 'ERROR');
ALTER TABLE "Computer" ALTER COLUMN "status" TYPE "ComputerStatus_new" USING ("status"::text::"ComputerStatus_new");
ALTER TYPE "ComputerStatus" RENAME TO "ComputerStatus_old";
ALTER TYPE "ComputerStatus_new" RENAME TO "ComputerStatus";
DROP TYPE "public"."ComputerStatus_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "EventType_new" AS ENUM ('COMPUTER_CONNECTED', 'COMPUTER_DISCONNECTED', 'SESSION_STARTED', 'SESSION_ENDED', 'USER_LOGIN', 'USER_LOGOUT');
ALTER TABLE "Event" ALTER COLUMN "type" TYPE "EventType_new" USING ("type"::text::"EventType_new");
ALTER TYPE "EventType" RENAME TO "EventType_old";
ALTER TYPE "EventType_new" RENAME TO "EventType";
DROP TYPE "public"."EventType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "SessionStatus_new" AS ENUM ('CREATED', 'ACTIVE', 'ENDED');
ALTER TABLE "Session" ALTER COLUMN "status" TYPE "SessionStatus_new" USING ("status"::text::"SessionStatus_new");
ALTER TYPE "SessionStatus" RENAME TO "SessionStatus_old";
ALTER TYPE "SessionStatus_new" RENAME TO "SessionStatus";
DROP TYPE "public"."SessionStatus_old";
COMMIT;
