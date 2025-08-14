/*
  Warnings:

  - The `experience` column on the `skills` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "skills" DROP COLUMN "experience",
ADD COLUMN     "experience" TIMESTAMP(3);
