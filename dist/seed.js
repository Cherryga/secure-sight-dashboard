import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
    const camera = await prisma.camera.create({
        data: {
            name: "Gate 1",
            location: "North Wing",
            incidents: {
                create: [
                    {
                        type: "Intrusion",
                        tsStart: new Date(),
                        tsEnd: new Date(Date.now() + 5 * 60 * 1000),
                        thumbnailUrl: "https://example.com/thumb.jpg",
                    },
                    {
                        type: "Vandalism",
                        tsStart: new Date(),
                        tsEnd: new Date(Date.now() + 10 * 60 * 1000),
                        thumbnailUrl: "https://example.com/thumb2.jpg",
                        resolved: true,
                    },
                ]
            }
        }
    });
    console.log("Seeded:", camera);
}
main()
    .catch((e) => console.error(e))
    .finally(() => prisma.$disconnect());
