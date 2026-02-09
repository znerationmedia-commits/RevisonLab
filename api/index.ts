import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes - Vercel will bundle these automatically
import authRoutes from '../server/routes/auth.js';
import questRoutes from '../server/routes/quests.js';
import resultRoutes from '../server/routes/results.js';
import subscriptionRoutes from '../server/routes/subscription.js';
import generationRoutes from '../server/routes/generation.js';
import testRoutes from '../server/routes/test.js';
import webhookRoutes from '../server/routes/webhooks.js';

dotenv.config();

const app = express();
console.log("[VERCEL] Starting serverless function...");

app.use(cors());

// Webhook route MUST come before express.json() to use raw body
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/generate', generationRoutes);
app.use('/api/test', testRoutes);

app.get('/api', (req, res) => {
    res.send('RevisionLab API is running on Vercel');
});

export default app;
