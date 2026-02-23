import express from 'express';
import prisma from '../db.js';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';

const router = express.Router();

// Middleware: require isAdmin
const requireAdmin = async (req: AuthRequest, res: express.Response, next: express.NextFunction) => {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user || !user.isAdmin) {
            return res.status(403).json({ error: 'Admin access required' });
        }
        next();
    } catch {
        res.status(500).json({ error: 'Server error' });
    }
};

router.use(authenticateToken, requireAdmin);

// GET /api/admin/stats — aggregate analytics
router.get('/stats', async (_req, res) => {
    try {
        const [userCount, totalCoins, totalXP, performance] = await Promise.all([
            prisma.user.count(),
            prisma.user.aggregate({ _sum: { coins: true } }),
            prisma.user.aggregate({ _sum: { xp: true } }),
            prisma.result.aggregate({
                _sum: {
                    totalQuestions: true,
                    correctAnswers: true
                }
            })
        ]);

        res.json({
            users: userCount,
            totalCoins: totalCoins._sum.coins || 0,
            totalXP: totalXP._sum.xp || 0,
            totalQuestions: performance._sum.totalQuestions || 0,
            totalCorrect: performance._sum.correctAnswers || 0,
            averageAccuracy: performance._sum.totalQuestions ?
                Math.round((performance._sum.correctAnswers || 0) / performance._sum.totalQuestions * 100) : 0
        });
    } catch (error) {
        console.error('[ADMIN] Stats error:', error);
        res.status(500).json({ error: 'Failed to fetch analytics' });
    }
});

// GET /api/admin/users — list all users (with aggregate stats)
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                xp: true,
                isAdmin: true,
                isSubscribed: true,
                questsPlayed: true,
                results: {
                    select: {
                        totalQuestions: true,
                        correctAnswers: true,
                        subject: true
                    }
                }
            },
            orderBy: { xp: 'desc' }
        });

        // Add calculated stats
        const usersWithStats = users.map(u => {
            const totalQ = u.results.reduce((sum, r) => sum + r.totalQuestions, 0);
            const totalC = u.results.reduce((sum, r) => sum + r.correctAnswers, 0);
            const subjects = Array.from(new Set(u.results.map(r => r.subject).filter(Boolean))).sort();

            return {
                ...u,
                totalQuestions: totalQ,
                totalCorrect: totalC,
                accuracy: totalQ ? Math.round((totalC / totalQ) * 100) : 0,
                subjectsDone: subjects,
                results: undefined // Clear raw results
            };
        });

        res.json(usersWithStats);
    } catch (error) {
        console.error('[ADMIN] Users error:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// GET /api/admin/users/:userId/performance — Daily stats for a user
router.get('/users/:userId/performance', async (req, res) => {
    const { userId } = req.params;
    try {
        const results = await prisma.result.findMany({
            where: { userId },
            orderBy: { date: 'asc' },
            select: {
                date: true,
                totalQuestions: true,
                correctAnswers: true
            }
        });

        // Group by day (YYYY-MM-DD)
        const dailyStats: Record<string, { answered: number, correct: number }> = {};

        results.forEach(r => {
            const day = r.date.toISOString().split('T')[0];
            if (!dailyStats[day]) {
                dailyStats[day] = { answered: 0, correct: 0 };
            }
            dailyStats[day].answered += r.totalQuestions;
            dailyStats[day].correct += r.correctAnswers;
        });

        const formattedStats = Object.entries(dailyStats).map(([date, stats]) => ({
            date,
            ...stats,
            accuracy: stats.answered ? Math.round((stats.correct / stats.answered) * 100) : 0
        })).sort((a, b) => b.date.localeCompare(a.date));

        res.json(formattedStats);
    } catch (error) {
        console.error('[ADMIN] Performance error:', error);
        res.status(500).json({ error: 'Failed to fetch performance data' });
    }
});

// --- REWARD MANAGEMENT ---

// GET /api/admin/rewards — list all rewards (including inactive)
router.get('/rewards', async (_req, res) => {
    try {
        const rewards = await prisma.reward.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rewards' });
    }
});

// POST /api/admin/rewards — create a new reward
router.post('/rewards', async (req, res) => {
    try {
        const { title, description, coinCost, icon, stock } = req.body;
        const reward = await prisma.reward.create({
            data: { title, description, coinCost, icon, stock: stock || null }
        });
        res.json(reward);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create reward' });
    }
});

// PUT /api/admin/rewards/:id — update a reward
router.put('/rewards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const data = req.body;
        const reward = await prisma.reward.update({
            where: { id },
            data
        });
        res.json(reward);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update reward' });
    }
});

// DELETE /api/admin/rewards/:id — delete a reward
router.delete('/rewards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.reward.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete reward' });
    }
});

// GET /api/admin/redemptions — list all redemptions
router.get('/redemptions', async (_req, res) => {
    try {
        const redemptions = await prisma.redemption.findMany({
            include: {
                user: { select: { name: true, email: true } },
                reward: { select: { title: true } }
            },
            orderBy: { redeemedAt: 'desc' }
        });
        res.json(redemptions);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch redemptions' });
    }
});

// PATCH /api/admin/redemptions/:id — update redemption status
router.patch('/redemptions/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const redemption = await prisma.redemption.update({
            where: { id },
            data: { status }
        });
        res.json(redemption);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update redemption' });
    }
});

export default router;
