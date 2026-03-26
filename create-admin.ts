import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function createAdmin() {
    const email = 'admin_tester@example.com';
    const password = await bcrypt.hash('password123', 10);
    
    try {
        // Delete if exists
        await prisma.user.deleteMany({ where: { email } });
        
        const user = await prisma.user.create({
            data: {
                email,
                password,
                name: 'Admin Tester',
                role: 'teacher',
                isVerified: true,
                isAdmin: true,
                xp: 1000,
                coins: 500
            }
        });
        console.log('✅ Admin Tester created:', user.email);
    } catch (e) {
        console.error('❌ Creation failed:', e);
    } finally {
        await prisma.$disconnect();
    }
}

createAdmin();
