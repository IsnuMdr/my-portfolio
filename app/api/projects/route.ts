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
      include: {
        images: true,
        testimonial: true,
      },
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

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const { images, ...projectData } = body;

    const project = await prisma.project.create({
      data: {
        ...projectData,
        images:
          images?.length > 0 ? { createMany: { data: images } } : undefined,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    // delete all images on server
    const projectImages = await prisma.projectImage.findMany({
      where: { projectId: body.id },
    });

    if (projectImages.length > 0) {
      Promise.all([
        ...projectImages.map(async (image) => {
          await fetch("/api/uploadthing", {
            method: "DELETE",
            body: JSON.stringify({ url: image.imageUrl }),
          });
        }),
        prisma.projectImage.deleteMany({
          where: { projectId: body.id },
        }),
      ]);
    }

    const project = await prisma.project.update({
      where: { id: body.id },
      data:
        body.images.length > 0
          ? { ...body, images: { createMany: { data: body.images } } }
          : body,
    });
    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    // delete all images on server
    const projectImages = await prisma.projectImage.findMany({
      where: { projectId: id },
    });

    if (projectImages.length > 0) {
      Promise.all([
        ...projectImages.map(async (image) => {
          await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/uploadthing`, {
            method: "DELETE",
            body: JSON.stringify({ url: image.imageUrl }),
          });
        }),
        prisma.projectImage.deleteMany({
          where: { projectId: id },
        }),
      ]);
    }

    Promise.all([
      prisma.project.delete({
        where: { id },
      }),
      prisma.projectTestimonial.deleteMany({
        where: { projectId: id },
      }),
    ]);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : "An error occurred" },
      { status: 500 }
    );
  }
}
