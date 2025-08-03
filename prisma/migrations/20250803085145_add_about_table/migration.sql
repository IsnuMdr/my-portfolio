-- CreateTable
CREATE TABLE "abouts" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "headline" TEXT,
    "tagline" TEXT,
    "summary" TEXT,
    "imageUrl" TEXT,
    "personal" TEXT[],
    "location" TEXT,
    "email" TEXT,
    "phone" TEXT,
    "linkedin" TEXT,
    "github" TEXT,
    "resume" TEXT,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "abouts_pkey" PRIMARY KEY ("id")
);
