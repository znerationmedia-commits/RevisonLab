
const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function resetCounters() {
    console.log('\n=== RESETTING USER COUNTERS ===\n');

    // Find the user (replace with your email if you know it, otherwise resets ALL free users)
    const email = 'terrencekwa50@gmail.com';

    const user = await prisma.user.findUnique({
        where: { email: email }
    });

    if (!user) {
        console.log(`❌ User ${email} not found.`);
        return;
    }

    console.log(`User found: ${user.email}`);
    console.log(`Current State: Played=${user.questsPlayed}, Created=${user.questsCreated}`);

    if (user.isSubscribed) {
        console.log('⚠️ User is subscribed. Resetting anyway for testing.');
    }

    const updated = await prisma.user.update({
        where: { email: email },
        data: {
            questsPlayed: 0,
            questsCreated: 0
        }
    });

    console.log(`✅ Counters reset successfully!`);
    console.log(`New State: Played=${updated.questsPlayed}, Created=${updated.questsCreated}`);
}

resetCounters()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
