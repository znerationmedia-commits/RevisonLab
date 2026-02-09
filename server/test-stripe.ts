import Stripe from 'stripe';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '.env') });

const key = process.env.STRIPE_SECRET_KEY || '';
if (!key) {
    console.error("❌ ERROR: STRIPE_SECRET_KEY not found in .env");
    process.exit(1);
}

console.log("Testing Key:", key.substring(0, 10) + "...");

const stripe = new Stripe(key, { apiVersion: '2024-06-20' as any });

(async () => {
    try {
        console.log("Attempting to create a test session...");
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price_data: { currency: 'myr', product_data: { name: 'Test' }, unit_amount: 100 }, quantity: 1 }],
            mode: 'payment',
            success_url: 'http://localhost',
            cancel_url: 'http://localhost',
        });
        console.log("Success! Session ID:", session.id);
    } catch (error: any) {
        console.log("\n❌ STRIPE ERROR:");
        console.log(error.message);
    }
})();
