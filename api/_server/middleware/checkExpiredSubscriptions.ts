import prisma from '../db';

/**
 * Middleware to check if user's subscription has expired
 * This runs on authenticated requests to automatically cancel expired subscriptions
 */
export async function checkExpiredSubscriptions(req: any, res: any, next: any) {
    // Only check if user is authenticated
    if (!req.user?.id) {
        // console.log('[SUBSCRIPTION] Skipping check - no authenticated user');
        return next();
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                isSubscribed: true,
                cancelAtPeriodEnd: true,
                subscriptionEndDate: true
            }
        });

        if (!user) {
            return next();
        }

        const now = new Date();
        const endDate = user.subscriptionEndDate;

        const userIdShort = req.user.id ? String(req.user.id).substring(0, 8) : 'unknown';
        console.log(`[SUBSCRIPTION CHECK] User: ${userIdShort}...`);
        console.log(`[SUBSCRIPTION CHECK] isSubscribed: ${user.isSubscribed}, endDate: ${endDate?.toISOString() || 'null'}`);
        console.log(`[SUBSCRIPTION CHECK] Current time: ${now.toISOString()}`);

        // Check if subscription has expired based on end date
        // Cancel if: (1) scheduled for cancellation and date passed, OR (2) end date has passed
        if (user.isSubscribed && endDate && now > endDate) {
            console.log(`[SUBSCRIPTION] ⚠️ EXPIRING SUBSCRIPTION - End date passed!`);
            console.log(`[SUBSCRIPTION] End date was: ${endDate.toISOString()}, Current time: ${now.toISOString()}`);

            await prisma.user.update({
                where: { id: req.user.id },
                data: {
                    isSubscribed: false,
                    cancelAtPeriodEnd: false
                }
            });

            // Update the user object in the request
            req.user.isSubscribed = false;
            console.log(`[SUBSCRIPTION] ✅ Subscription cancelled for user: ${userIdShort}...`);
        } else if (user.isSubscribed && endDate) {
            const timeLeft = endDate.getTime() - now.getTime();
            const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
            console.log(`[SUBSCRIPTION CHECK] ✅ Active - ${daysLeft} days remaining`);
        }

        next();
    } catch (error) {
        console.error('[SUBSCRIPTION] Error checking expired subscriptions:', error);
        // Don't block the request if there's an error
        next();
    }
}
