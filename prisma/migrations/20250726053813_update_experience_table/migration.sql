-- CreateEnum
CREATE TYPE "ExperienceType" AS ENUM ('fullTime', 'partTime', 'contract', 'internship');

-- AlterTable
ALTER TABLE "experiences" ADD COLUMN     "achievements" TEXT[],
ADD COLUMN     "companyLogo" TEXT,
ADD COLUMN     "companyUrl" TEXT,
ADD COLUMN     "technologies" TEXT[],
ADD COLUMN     "type" "ExperienceType" NOT NULL DEFAULT 'fullTime',
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET DATA TYPE TEXT,
ALTER COLUMN "current" DROP DEFAULT;
