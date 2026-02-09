import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes - Vercel will bundle these automatically
import authRoutes from './_server/routes/auth';
import questRoutes from './_server/routes/quests';
import resultRoutes from './_server/routes/results';
import subscriptionRoutes from './_server/routes/subscription';
import generationRoutes from './_server/routes/generation';
import testRoutes from './_server/routes/test';
import webhookRoutes from './_server/routes/webhooks';

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
