import { PrismaClient } from './server/client/index.js';
const prisma = new PrismaClient();

async function listAll() {
    try {
        const users = await prisma.user.findMany({
            take: 3,
            select: { email: true, name: true, isVerified: true }
        });
        console.log(JSON.stringify(users, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        await prisma.$disconnect();
    }
}

listAll();
