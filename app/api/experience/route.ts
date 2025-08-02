import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(experiences);
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
    const experience = await prisma.experience.create({
      data: body,
    });

    return NextResponse.json(experience, { status: 201 });
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

    const experience = await prisma.experience.update({
      where: { id: body.id },
      data: body,
    });
    return NextResponse.json(experience, { status: 200 });
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
          await fetch("/api/uploadthing", {
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
