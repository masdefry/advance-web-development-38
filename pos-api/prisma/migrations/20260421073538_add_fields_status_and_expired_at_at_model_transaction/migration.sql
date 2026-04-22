/*
  Warnings:

  - Added the required column `expiredAt` to the `transactions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `transactions` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "StatusTransaction" AS ENUM ('WAITING_FOR_PAYMENT', 'PAID', 'CANCELLED');

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "expiredAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "status" "StatusTransaction" NOT NULL;
