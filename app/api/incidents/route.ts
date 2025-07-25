import { NextResponse } from 'next/server'; // Adjust the import based on your prisma client setup

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const incidents = await prisma.incident.findMany({
      where: {
        resolved: false,
      },
      orderBy: {
        tsStart: 'desc',
      },
      include: {
        camera: true, // Include camera details if needed
      },
    });

    return NextResponse.json(incidents);
  } catch (error) {
    return NextResponse.error();
  }
} 