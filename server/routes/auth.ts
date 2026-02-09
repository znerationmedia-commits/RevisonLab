import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';
import { checkExpiredSubscriptions } from '../middleware/checkExpiredSubscriptions';
import prisma from '../db';
import { sendOTPEmail } from '../services/mailService';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyshouldbeenv';

// SIGNUP
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'This email is already registered. Please login instead.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

        // Save to PendingUser instead of User
        await prisma.pendingUser.upsert({
            where: { email },
            update: {
                name,
                password: hashedPassword,
                role: role || 'teacher',
                verificationCode
            },
            create: {
                name,
                email,
                password: hashedPassword,
                role: role || 'teacher',
                verificationCode
            }
        });

        // Send real email
        const emailSent = await sendOTPEmail(email, verificationCode);

        // ALWAYS log to file for local testing help
        require('fs').writeFileSync('otp_test_fallback.txt', `LAST OTP FOR ${email}: ${verificationCode}\n`);

        if (!emailSent) {
            return res.status(500).json({ error: 'Failed to send verification email. BUT I SAVED THE CODE to server/otp_test_fallback.txt for you to use!' });
        }

        res.json({ message: 'Verification code sent to your email', email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// VERIFY
router.post('/verify', async (req, res) => {
    const { email, code } = req.body;

    try {
        const pendingUser = await prisma.pendingUser.findUnique({ where: { email } });
        if (!pendingUser) {
            // Check if already verified
            const registeredUser = await prisma.user.findUnique({ where: { email } });
            if (registeredUser) {
                return res.status(400).json({ error: 'Email already verified. Please login.' });
            }
            return res.status(404).json({ error: 'No pending registration found for this email.' });
        }

        if (pendingUser.verificationCode !== code) {
            return res.status(400).json({ error: 'Invalid verification code' });
        }

        // Move to User table
        const user = await prisma.user.create({
            data: {
                name: pendingUser.name,
                email: pendingUser.email,
                password: pendingUser.password,
                role: pendingUser.role,
                isVerified: true
            }
        });

        // Delete from PendingUser
        await prisma.pendingUser.delete({ where: { email } });

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                isSubscribed: user.isSubscribed,
                subscriptionInterval: user.subscriptionInterval,
                subscriptionStartDate: user.subscriptionStartDate,
                subscriptionEndDate: user.subscriptionEndDate,
                cancelAtPeriodEnd: user.cancelAtPeriodEnd,
                questsPlayed: user.questsPlayed,
                questsCreated: user.questsCreated
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// RESEND OTP
router.post('/resend-otp', async (req, res) => {
    const { email } = req.body;
    try {
        const pendingUser = await prisma.pendingUser.findUnique({ where: { email } });

        if (!pendingUser) {
            const user = await prisma.user.findUnique({ where: { email } });
            if (user) return res.status(400).json({ error: 'Email already verified.' });
            return res.status(404).json({ error: 'User not found' });
        }

        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        await prisma.pendingUser.update({
            where: { email },
            data: { verificationCode }
        });

        // Send real email
        const emailSent = await sendOTPEmail(email, verificationCode);

        // ALWAYS log to file for local testing help
        require('fs').writeFileSync('otp_test_fallback.txt', `LAST OTP FOR ${email}: ${verificationCode}\n`);

        res.json({ message: 'New verification code sent. If email fails, check server/otp_test_fallback.txt', email });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/login', async (req, res) => {
    const { identifier, email, password } = req.body;
    const loginId = identifier || email; // Support both for backward compatibility

    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: loginId },
                    { name: loginId }
                ]
            },
            include: { _count: { select: { results: true } } }
        });

        if (!user) {
            // Check if they are pending verification
            const pending = await prisma.pendingUser.findUnique({ where: { email: loginId } });
            if (pending) {
                return res.status(403).json({
                    error: 'Your email is not verified. Please check your email for the code.',
                    needsVerification: true,
                    email: pending.email
                });
            }
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                xp: user.xp,
                coins: user.coins,
                isSubscribed: user.isSubscribed,
                subscriptionInterval: user.subscriptionInterval,
                subscriptionStartDate: user.subscriptionStartDate,
                subscriptionEndDate: user.subscriptionEndDate,
                cancelAtPeriodEnd: user.cancelAtPeriodEnd,
                questsPlayed: user.questsPlayed,
                questsCreated: user.questsCreated,
                completedQuizzes: user._count.results
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... (subscribe route) ...

// GET ME
router.get('/me', authenticateToken, checkExpiredSubscriptions, async (req: AuthRequest, res) => {
    try {
        const userId = req.user?.id;

        if (!userId) return res.status(401).json({ error: 'Unauthorized' });

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { _count: { select: { results: true } } }
        });

        if (!user) return res.status(404).json({ error: 'User not found' });

        res.json({
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                xp: user.xp,
                coins: user.coins,
                level: Math.floor(user.xp / 1000) + 1,
                isSubscribed: user.isSubscribed,
                subscriptionInterval: user.subscriptionInterval,
                subscriptionStartDate: user.subscriptionStartDate,
                subscriptionEndDate: user.subscriptionEndDate,
                cancelAtPeriodEnd: user.cancelAtPeriodEnd,
                questsPlayed: user.questsPlayed,
                questsCreated: user.questsCreated,
                completedQuizzes: user._count.results
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
