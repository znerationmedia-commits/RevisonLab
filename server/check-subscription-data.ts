import prisma from './db';

async function checkSubscriptionData() {
    try {
        console.log('🔍 Checking subscription data...\n');

        // Get all users with subscriptions
        const users = await prisma.user.findMany({
            where: {
                isSubscribed: true
            },
            select: {
                id: true,
                email: true,
                isSubscribed: true,
                subscriptionInterval: true,
                subscriptionStartDate: true,
                subscriptionEndDate: true,
                cancelAtPeriodEnd: true
            }
        });

        console.log(`Found ${users.length} subscribed users:\n`);

        users.forEach(user => {
            console.log(`📧 ${user.email}`);
            console.log(`   Subscribed: ${user.isSubscribed}`);
            console.log(`   Interval: ${user.subscriptionInterval || 'NOT SET'}`);
            console.log(`   Start Date: ${user.subscriptionStartDate || 'NOT SET'}`);
            console.log(`   End Date: ${user.subscriptionEndDate || 'NOT SET'}`);
            console.log(`   Cancel At Period End: ${user.cancelAtPeriodEnd}`);
            console.log('');
        });

        // Check if the new fields exist
        const sampleUser = await prisma.user.findFirst();
        if (sampleUser) {
            console.log('✅ Sample user structure:');
            console.log(JSON.stringify(sampleUser, null, 2));
        }

    } catch (error: any) {
        console.error('❌ Error:', error.message);
        if (error.message.includes('Unknown field')) {
            console.log('\n⚠️ The new subscription fields do not exist in the database!');
            console.log('Run: npx prisma db push --force-reset');
        }
    } finally {
        await prisma.$disconnect();
    }
}

checkSubscriptionData();
