/*
  Warnings:

  - Added the required column `completedAt` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `longDescription` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamSize` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProjectCategories" AS ENUM ('fullstack', 'backend', 'frontend', 'mobile');

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "category" "ProjectCategories" NOT NULL DEFAULT 'fullstack',
ADD COLUMN     "challenge" TEXT,
ADD COLUMN     "completedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "features" TEXT[],
ADD COLUMN     "longDescription" TEXT NOT NULL,
ADD COLUMN     "results" TEXT[],
ADD COLUMN     "role" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "solution" TEXT,
ADD COLUMN     "teamSize" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "project_testimonial" (
    "id" TEXT NOT NULL,
    "quote" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "company" TEXT,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project_images" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "projectId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "project_images_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "project_testimonial" ADD CONSTRAINT "project_testimonial_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "project_images" ADD CONSTRAINT "project_images_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
