
const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function checkUserLimits() {
    console.log('\n=== CHECKING USER LIMITS ===\n');

    // Find the user (replace with your email if you know it, otherwise getting the first one)
    const user = await prisma.user.findFirst({
        orderBy: { id: 'asc' } // Just get the first user to check
    });

    if (!user) {
        console.log('❌ No users found.');
        return;
    }

    console.log(`User: ${user.email} | Subscribed: ${user.isSubscribed}`);
    console.log(`Played: ${user.questsPlayed} | Created: ${user.questsCreated}`);
    console.log(`Can Play? ${user.isSubscribed || user.questsPlayed < 1}`);
    console.log(`Can Create? ${user.isSubscribed || user.questsCreated < 1}`);
}

checkUserLimits()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
