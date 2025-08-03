/*
  Warnings:

  - The `challenge` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `solution` column on the `projects` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "challenge",
ADD COLUMN     "challenge" TEXT[],
DROP COLUMN "solution",
ADD COLUMN     "solution" TEXT[];
