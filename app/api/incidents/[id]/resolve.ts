import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  if (!id) {
    return NextResponse.json({ message: 'Invalid incident id' }, { status: 400 });
  }

    try {
      const incident = await prisma.incident.findUnique({
      where: { id: String(id) },
      });
      if (!incident) {
      return NextResponse.json({ message: 'Incident not found' }, { status: 404 });
      }
      const updatedIncident = await prisma.incident.update({
      where: { id: String(id) },
        data: { resolved: !incident.resolved },
      });
    return NextResponse.json(updatedIncident);
    } catch (error) {
    return NextResponse.json({ message: 'Error resolving incident', error }, { status: 500 });
  }
} 