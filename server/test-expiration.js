// Test script to verify subscription expiration works
const { PrismaClient } = require('./client');
const prisma = new PrismaClient();

async function testExpiration() {
    console.log('\n=== SUBSCRIPTION EXPIRATION TEST ===\n');

    // Find a subscribed user
    const user = await prisma.user.findFirst({
        where: { isSubscribed: true }
    });

    if (!user) {
        console.log('❌ No subscribed users found. Subscribe first, then run this test.');
        return;
    }

    console.log(`Found user: ${user.email}`);
    console.log(`Current status:`);
    console.log(`  - isSubscribed: ${user.isSubscribed}`);
    console.log(`  - subscriptionEndDate: ${user.subscriptionEndDate}`);
    console.log(`  - questsPlayed: ${user.questsPlayed}`);
    console.log(`  - questsCreated: ${user.questsCreated}`);

    // Set end date to yesterday
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    console.log(`\n📝 Setting subscriptionEndDate to yesterday: ${yesterday.toISOString()}`);

    await prisma.user.update({
        where: { id: user.id },
        data: { subscriptionEndDate: yesterday }
    });

    console.log('✅ Updated! Now make ANY API request (e.g., refresh your app)');
    console.log('\n📋 What to do next:');
    console.log('1. Go to your app in the browser');
    console.log('2. Refresh the page or click any link');
    console.log('3. Watch the server console for:');
    console.log('   [SUBSCRIPTION] ⚠️ EXPIRING SUBSCRIPTION - End date passed!');
    console.log('   [SUBSCRIPTION] ✅ Subscription cancelled');
    console.log('\n4. Try to play a 2nd quest - should be BLOCKED');
    console.log('5. Check database - isSubscribed should be false\n');
}

testExpiration()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
