import express from 'express';
import prisma from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import { checkExpiredSubscriptions } from '../middleware/checkExpiredSubscriptions.js';

const router = express.Router();

// Apply expiration check to all routes (runs AFTER authentication)
router.use(authenticateToken, checkExpiredSubscriptions);

// Save a game result
router.post('/', authenticateToken, async (req: AuthRequest, res) => {
    const { score, mode, questId, correctAnswers, totalQuestions, subject, topic } = req.body;
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

        const result = await prisma.result.create({
            data: {
                userId,
                score,
                mode,
                totalQuestions: totalQuestions || 0,
                correctAnswers: correctAnswers || 0,
                subject: subject || undefined,
                topic: topic || undefined,
                questId: questId || undefined
            }
        });

        console.log(`[API] ✅ Result saved: ${result.id}`);

        // Update user stats (XP, Coins, questsPlayed)
        const xpGained = score;

        // 1 coin per correct answer
        const coinsGained = correctAnswers || 0;

        await prisma.user.update({
            where: { id: userId },
            data: {
                xp: { increment: xpGained },
                coins: { increment: coinsGained },
                // questsPlayed increment moved to /api/generation/quest
            }
        });

        // Fetch updated coin total to send back to client
        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            select: { coins: true }
        });

        console.log(`[API] ✅ Result saved! User XP: ${user.xp} -> +${xpGained}, Coins: +${coinsGained} (total: ${updatedUser?.coins})`);

        res.json({ ...result, newCoinTotal: updatedUser?.coins ?? 0 });
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
