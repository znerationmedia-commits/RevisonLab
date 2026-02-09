import { PrismaClient } from './server/client/index.js';
const prisma = new PrismaClient();

async function checkUsers() {
    try {
        const users = await prisma.user.findMany({
            take: 5,
            select: { email: true, name: true, isVerified: true }
        });
        console.log("Current Users Status:");
        console.table(users);
    } catch (e) {
        console.error("Fetch failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

checkUsers();
