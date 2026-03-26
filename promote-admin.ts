import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function promote() {
    try {
        const user = await prisma.user.update({
            where: { email: 'tester_js@example.com' },
            data: { isAdmin: true }
        });
        console.log('✅ User promoted to admin:', user.email);
    } catch (e) {
        console.error('❌ Promotion failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

promote();
