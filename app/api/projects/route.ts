import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma, ProjectCategories } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const isFeatured = searchParams.get("featured") === "true";
  const category = searchParams.get("category") as ProjectCategories;

  try {
    let whereCondition: Prisma.ProjectWhereInput = {};

    if (isFeatured) {
      whereCondition = { featured: true };
    } else if (category) {
      whereCondition = { category };
    }

    const projects = await prisma.project.findMany({
      where: whereCondition,
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const project = await prisma.project.create({
      data: body,
    });
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
