
const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function freshDatabase() {
    console.log('\n=== FRESH DATABASE RESET ===\n');

    console.log('1. Deleting all Results...');
    const deletedResults = await prisma.result.deleteMany({});
    console.log(`   - Deleted ${deletedResults.count} results.`);

    console.log('2. Deleting all Quests...');
    const deletedQuests = await prisma.quest.deleteMany({});
    console.log(`   - Deleted ${deletedQuests.count} quests.`);

    console.log('3. Resetting User Counters...');
    const updatedUsers = await prisma.user.updateMany({
        data: {
            questsPlayed: 0,
            questsCreated: 0,
            xp: 0,
            coins: 0
        }
    });
    console.log(`   - Reset counters for ${updatedUsers.count} users.`);

    console.log('\n✅ Database is FRESH! Users are kept, but all activity is wiped.');
    console.log('You can now log in and test from scratch.');
}

freshDatabase()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
