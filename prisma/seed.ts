import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed cameras
  await prisma.camera.createMany({
    data: [
      { id: "1", name: 'Camera - 01', location: 'Main Building' },
      { id: "2", name: 'Camera - 02', location: 'Vault' },
      { id: "3", name: 'Camera - 03', location: 'Entrance' },
    ],
    skipDuplicates: true,
  });

  // 4 local images
  const images = [
    '/incidents/unauthorized access.webp',
    '/incidents/gun_threat.jpeg',
    '/incidents/unauthorized_2.jpg',
    '/incidents/Crack-safe-open-.webp',
    '/incidents/intrusion.jpeg', // <-- new image
  ];
  const types = ['Unauthorized Access', 'Gun Threat', 'Face Recognised', 'Intrusion'];
  const now = new Date();
  const incidents = [];
  for (let i = 0; i < 12; i++) {
    const cameraId = ((i % 3) + 1).toString();
    const type = types[i % types.length];
    const thumbnailUrl = images[i % images.length];
    const tsStart = new Date(now.getTime() - (i + 1) * 2 * 60 * 60 * 1000); // every 2 hours
    const tsEnd = new Date(tsStart.getTime() + 30 * 60 * 1000); // 30 min duration
    incidents.push({
      cameraId,
      type,
      tsStart,
      tsEnd,
      thumbnailUrl,
      resolved: false,
    });
  }
  await prisma.incident.createMany({ data: incidents });
  console.log('Seeded cameras and 12 incidents');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });