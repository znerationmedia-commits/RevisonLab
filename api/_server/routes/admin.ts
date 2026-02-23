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
                        correctAnswers: true
                    }
                }
            },
            orderBy: { xp: 'desc' }
        });

        // Add calculated stats
        const usersWithStats = users.map(u => {
            const totalQ = u.results.reduce((sum, r) => sum + r.totalQuestions, 0);
            const totalC = u.results.reduce((sum, r) => sum + r.correctAnswers, 0);
            return {
                ...u,
                totalQuestions: totalQ,
                totalCorrect: totalC,
                accuracy: totalQ ? Math.round((totalC / totalQ) * 100) : 0,
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

export default router;
