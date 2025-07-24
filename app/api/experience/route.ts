import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({
      orderBy: {
        startDate: "desc",
      },
    });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const experience = await prisma.experience.create({
      data: {
        ...body,
        startDate: new Date(body.startDate),
        endDate: body.endDate ? new Date(body.endDate) : null,
      },
    });
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}
