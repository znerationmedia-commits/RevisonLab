import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function listUsers() {
    try {
        const users = await prisma.user.findMany({
            select: { email: true, name: true, isAdmin: true }
        });
        console.log('--- Database Users ---');
        console.log(JSON.stringify(users, null, 2));
        
        const pending = await prisma.pendingUser.findMany();
        console.log('--- Pending Users ---');
        console.log(JSON.stringify(pending, null, 2));
    } catch (e) {
        console.error('❌ Listing failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

listUsers();
