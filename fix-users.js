// ESM version
import { PrismaClient } from './server/client/index.js';
const prisma = new PrismaClient();

async function verifyAll() {
    console.log("Setting all users to isVerified: true...");
    try {
        const result = await prisma.user.updateMany({
            data: {
                isVerified: true
            }
        });
        console.log(`Updated ${result.count} users successfully.`);
    } catch (e) {
        console.error("Update failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

verifyAll();
