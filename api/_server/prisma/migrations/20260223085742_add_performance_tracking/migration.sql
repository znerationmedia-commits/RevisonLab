/*
  Warnings:

  - You are about to drop the `Redemption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reward` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Redemption" DROP CONSTRAINT "Redemption_rewardId_fkey";

-- DropForeignKey
ALTER TABLE "Redemption" DROP CONSTRAINT "Redemption_userId_fkey";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "correctAnswers" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalQuestions" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Redemption";

-- DropTable
DROP TABLE "Reward";
