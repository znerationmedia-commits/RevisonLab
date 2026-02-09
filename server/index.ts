import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
console.log("Starting server...");
const PORT = process.env.PORT || 5000;

import authRoutes from './routes/auth';
import questRoutes from './routes/quests';
import resultRoutes from './routes/results';
import subscriptionRoutes from './routes/subscription';
import generationRoutes from './routes/generation';
import testRoutes from './routes/test';
import webhookRoutes from './routes/webhooks';

app.use(cors());

// Webhook route MUST come before express.json() to use raw body
app.use('/api/webhooks', webhookRoutes);

app.use(express.json());

// Log all requests
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.url}`);
    next();
});

// Subscription expiration check is now applied per-route (after authentication)

app.use('/api/auth', authRoutes);
app.use('/api/quests', questRoutes);
app.use('/api/results', resultRoutes);
app.use('/api/subscription', subscriptionRoutes);
app.use('/api/generate', generationRoutes);
app.use('/api/test', testRoutes);

app.get('/', (req, res) => {
    res.send('RevisionLab API is running');
});

// We will add routes here later

// Only listen if run directly (not as a module on Vercel)
if (require.main === module) {
    app.listen(Number(PORT), '0.0.0.0', () => {
        console.log(`Server is running on http://localhost:${PORT}`);

        // Run cleanup on startup
        const { cleanupExpiredSubscriptions } = require('./utils/subscriptionCleanup');
        cleanupExpiredSubscriptions();
    });
}

export default app;
