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

// GET /api/admin/rewards — all rewards (including inactive)
router.get('/rewards', async (_req, res) => {
    try {
        const rewards = await prisma.reward.findMany({ orderBy: { createdAt: 'desc' } });
        res.json(rewards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch rewards' });
    }
});

// POST /api/admin/rewards — create a reward
router.post('/rewards', async (req, res) => {
    const { name, description, emoji, coinCost, stock } = req.body;

    if (!name || !description || !coinCost) {
        return res.status(400).json({ error: 'name, description, and coinCost are required' });
    }

    try {
        const reward = await prisma.reward.create({
            data: {
                name,
                description,
                emoji: emoji || '🎁',
                coinCost: parseInt(coinCost),
                stock: stock !== undefined && stock !== '' ? parseInt(stock) : null,
                isActive: true
            }
        });
        res.json(reward);
    } catch (error) {
        console.error('[ADMIN] Create reward error:', error);
        res.status(500).json({ error: 'Failed to create reward' });
    }
});

// PUT /api/admin/rewards/:id — update a reward
router.put('/rewards/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, emoji, coinCost, stock, isActive } = req.body;

    try {
        const reward = await prisma.reward.update({
            where: { id },
            data: {
                ...(name !== undefined && { name }),
                ...(description !== undefined && { description }),
                ...(emoji !== undefined && { emoji }),
                ...(coinCost !== undefined && { coinCost: parseInt(coinCost) }),
                ...(stock !== undefined && { stock: stock === '' || stock === null ? null : parseInt(stock) }),
                ...(isActive !== undefined && { isActive })
            }
        });
        res.json(reward);
    } catch (error) {
        console.error('[ADMIN] Update reward error:', error);
        res.status(500).json({ error: 'Failed to update reward' });
    }
});

// DELETE /api/admin/rewards/:id — delete a reward
router.delete('/rewards/:id', async (req, res) => {
    const { id } = req.params;
    try {
        // Delete associated redemptions first to avoid FK constraint
        await prisma.redemption.deleteMany({ where: { rewardId: id } });
        await prisma.reward.delete({ where: { id } });
        res.json({ success: true });
    } catch (error) {
        console.error('[ADMIN] Delete reward error:', error);
        res.status(500).json({ error: 'Failed to delete reward' });
    }
});

// GET /api/admin/users — list all users (basic info)
router.get('/users', async (_req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                xp: true,
                coins: true,
                isAdmin: true,
                isSubscribed: true,
                questsPlayed: true,
                _count: { select: { redemptions: true } }
            },
            orderBy: { xp: 'desc' }
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

export default router;
