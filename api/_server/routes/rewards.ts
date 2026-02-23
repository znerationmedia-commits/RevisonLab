import express from 'express';
import prisma from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/rewards — list all active rewards (authenticated users)
router.get('/', authenticateToken, async (req: AuthRequest, res) => {
    try {
        const rewards = await prisma.reward.findMany({
            where: { isActive: true },
            orderBy: { coinCost: 'asc' }
        });
        res.json(rewards);
    } catch (error) {
        console.error('[REWARDS] Error fetching rewards:', error);
        res.status(500).json({ error: 'Failed to fetch rewards' });
    }
});

// POST /api/rewards/redeem/:rewardId — redeem a reward
router.post('/redeem/:rewardId', authenticateToken, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    const { rewardId } = req.params;

    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        // Fetch reward and user in parallel
        const [reward, user] = await Promise.all([
            prisma.reward.findUnique({ where: { id: rewardId } }),
            prisma.user.findUnique({ where: { id: userId } })
        ]);

        if (!reward) return res.status(404).json({ error: 'Reward not found' });
        if (!reward.isActive) return res.status(400).json({ error: 'This reward is no longer available' });
        if (reward.stock !== null && reward.stock <= 0) {
            return res.status(400).json({ error: 'This reward is out of stock' });
        }
        if (!user) return res.status(404).json({ error: 'User not found' });
        if (user.coins < reward.coinCost) {
            return res.status(400).json({ error: `Not enough coins. You need ${reward.coinCost} coins but have ${user.coins}.` });
        }

        // Deduct coins, create redemption, decrement stock — all in a transaction
        const [redemption] = await prisma.$transaction([
            prisma.redemption.create({
                data: { userId, rewardId }
            }),
            prisma.user.update({
                where: { id: userId },
                data: { coins: { decrement: reward.coinCost } }
            }),
            ...(reward.stock !== null
                ? [prisma.reward.update({ where: { id: rewardId }, data: { stock: { decrement: 1 } } })]
                : [])
        ]);

        res.json({ success: true, redemption, coinsSpent: reward.coinCost });
    } catch (error) {
        console.error('[REWARDS] Redemption error:', error);
        res.status(500).json({ error: 'Failed to redeem reward' });
    }
});

// GET /api/rewards/my-redemptions — get current user's redemption history
router.get('/my-redemptions', authenticateToken, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const redemptions = await prisma.redemption.findMany({
            where: { userId },
            include: { reward: true },
            orderBy: { redeemedAt: 'desc' }
        });
        res.json(redemptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch redemptions' });
    }
});

export default router;
