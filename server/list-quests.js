
const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function listQuests() {
    console.log('\n=== LISTING ALL QUESTS ===\n');

    const quests = await prisma.quest.findMany({
        include: { creator: { select: { name: true, email: true } } },
        orderBy: { createdAt: 'desc' }
    });

    console.log(`Found ${quests.length} quests:`);

    quests.forEach((q, i) => {
        console.log(`${i + 1}. [${q.id.substring(0, 8)}...] "${q.title}" by ${q.creator?.name}`);
    });

    if (quests.length === 0) {
        console.log('❌ No quests found in the database.');
    }
}

listQuests()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
