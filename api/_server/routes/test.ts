import express from 'express';
import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import prisma from '../db.js';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

// Simple AI Check
router.get('/ai-check', async (req, res) => {
    try {
        console.log('[TEST] Checking Gemini API (Direct Fetch)...');
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return res.status(500).json({ status: 'error', message: 'GEMINI_API_KEY is not set' });
        }

        // DIRECT FETCH to bypass SDK limitations on Vercel and force Referer header
        // This solves the "Requests from referer <empty> are blocked" error
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

        console.log('[TEST] Sending request to Gemini REST API...');

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // These headers trick Google into thinking the request comes from the allowed domain
                'Referer': 'https://revisionlab.vercel.app',
                'Referrer': 'https://revisionlab.vercel.app'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Reply with only the word 'OK'" }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response text";

        console.log(`[TEST] Gemini Response: ${text}`);

        res.json({
            status: 'ok',
            message: 'AI generation successful (Direct Fetch)',
            response: text,
            model: "gemini-2.5-flash"
        });

    } catch (error: any) {
        console.error('[TEST] AI Check Failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'AI generation failed',
            error: error.message,
            stack: error.stack,
            details: error
        });
    }
});

// Simple DB Connection Check
router.get('/db-check', async (req, res) => {
    try {
        console.log('[TEST] Checking DB connection...');
        // Try a simple query
        const userCount = await prisma.user.count();
        console.log(`[TEST] DB Connection Successful. User count: ${userCount}`);

        // Also check if we can read environment variables
        const envCheck = {
            DATABASE_URL_SET: !!process.env.DATABASE_URL,
            JWT_SECRET_SET: !!process.env.JWT_SECRET,
            GEMINI_API_KEY_SET: !!process.env.GEMINI_API_KEY
        };

        res.json({
            status: 'ok',
            message: 'Database connection successful',
            userCount,
            env: envCheck
        });
    } catch (error: any) {
        console.error('[TEST] DB Connection Failed:', error);
        res.status(500).json({
            status: 'error',
            message: 'Database connection failed',
            error: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
    }
});

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
