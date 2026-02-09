import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';
import prisma from '../db';

const router = express.Router();

// Test endpoint to manually check and expire subscriptions
router.get('/test-expiration', authenticateToken, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                isSubscribed: true,
                subscriptionEndDate: true,
                cancelAtPeriodEnd: true
            }
        });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const now = new Date();
        const endDate = user.subscriptionEndDate;

        console.log('\n=== MANUAL EXPIRATION TEST ===');
        console.log(`User: ${user.email}`);
        console.log(`isSubscribed: ${user.isSubscribed}`);
        console.log(`subscriptionEndDate: ${endDate?.toISOString() || 'null'}`);
        console.log(`Current time: ${now.toISOString()}`);
        console.log(`Is expired? ${endDate && now > endDate ? 'YES' : 'NO'}`);

        // Check if subscription has expired
        if (user.isSubscribed && endDate && now > endDate) {
            console.log('⚠️ EXPIRING SUBSCRIPTION NOW...');

            await prisma.user.update({
                where: { id: userId },
                data: {
                    isSubscribed: false,
                    cancelAtPeriodEnd: false
                }
            });

            console.log('✅ Subscription cancelled!');

            return res.json({
                message: 'Subscription expired and cancelled',
                wasSubscribed: true,
                nowSubscribed: false,
                endDate: endDate.toISOString(),
                currentTime: now.toISOString()
            });
        }

        return res.json({
            message: 'Subscription is still active or already expired',
            isSubscribed: user.isSubscribed,
            endDate: endDate?.toISOString() || null,
            currentTime: now.toISOString(),
            daysRemaining: endDate ? Math.floor((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)) : null
        });
    } catch (error: any) {
        console.error('Test expiration error:', error);
        res.status(500).json({ error: error.message });
    }
});

export default router;
