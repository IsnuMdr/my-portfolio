/*
  Warnings:

  - You are about to drop the column `icon` on the `skills` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "icon",
ADD COLUMN     "description" TEXT,
ADD COLUMN     "experience" TEXT;
