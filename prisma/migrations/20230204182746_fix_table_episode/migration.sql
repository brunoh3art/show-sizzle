/*
  Warnings:

  - You are about to drop the column `override` on the `episode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "episode" DROP COLUMN "override",
ADD COLUMN     "overview" TEXT;
