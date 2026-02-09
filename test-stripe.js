import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const Stripe = require('stripe');

// The key provided by the user
const key = 'pk_live_51J7H8XC5d9EfMU7M7V8dRt0IBrpWS0B2BmnwlDstJ0Tmuny3AmN7MM3jQusaZLhhUR2HgsvVzXsVKTjZ2yUhsmXC00s3QBnH2Y';

console.log("Testing Key:", key);

try {
    const stripe = new Stripe(key, { apiVersion: '2024-06-20' });

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
        } catch (error) {
            console.log("\n❌ STRIPE ERROR:");
            console.log(error.message);
        }
    })();
} catch (e) {
    console.error(e);
}
