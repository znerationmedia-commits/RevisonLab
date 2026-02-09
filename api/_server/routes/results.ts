import express from 'express';
import prisma from '../db';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';
import { checkExpiredSubscriptions } from '../middleware/checkExpiredSubscriptions';

const router = express.Router();

// Apply expiration check to all routes (runs AFTER authentication)
router.use(authenticateToken, checkExpiredSubscriptions);

// Save a game result
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
    const { score, mode, questId } = req.body;
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ error: 'User not authenticated' });
    }

    try {
        // Enforce 1-quest play limit for free users
        const user = await prisma.user.findUnique({ where: { id: userId } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Limit check moved to /api/generation/quest

        console.log(`[API] Save Result - User: ${userId}`);
        console.log(`[API] Subscribed: ${user.isSubscribed}, Quests Played: ${user.questsPlayed}`);

        const result = await prisma.result.create({
            data: {
                userId,
                score,
                mode,
                questId: questId || undefined
            }
        });

        console.log(`[API] ✅ Result saved: ${result.id}`);

        // Update user stats (XP, Coins, questsPlayed)
        const xpGained = score;
        const coinsGained = Math.floor(score / 10);

        await prisma.user.update({
            where: { id: userId },
            data: {
                xp: { increment: xpGained },
                coins: { increment: coinsGained },
                // questsPlayed increment moved to /api/generation/quest
            }
        });

        console.log(`[API] ✅ Result saved! User XP: ${user.xp} -> +${xpGained}`);

        res.json(result);
    } catch (error) {
        console.error('[API] Error saving result:', error);
        res.status(500).json({ error: 'Failed to save result' });
    }
});

// Get user results
router.get('/my-results', authenticateToken, async (req: AuthRequest, res) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'User not authenticated' });

    try {
        const results = await prisma.result.findMany({
            where: { userId },
            orderBy: { date: 'desc' },
            include: { quest: { select: { title: true } } }
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch results' });
    }
});

export default router;
