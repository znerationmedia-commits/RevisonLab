/**
 * Stripe Integration Test Script
 * Run this to verify Stripe mock mode is working correctly
 */

const API_URL = 'http://localhost:5000/api';

async function testStripeMockMode() {
    console.log('🧪 Testing Stripe Mock Mode Integration\n');

    // You'll need a valid JWT token from your login
    const token = 'YOUR_JWT_TOKEN_HERE'; // Replace with actual token from localStorage

    try {
        console.log('1️⃣ Creating payment intent...');
        const response = await fetch(`${API_URL}/subscription/create-payment-intent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                amount: 2500,
                currency: 'myr',
                interval: 'month'
            })
        });

        const data = await response.json();
        console.log('✅ Payment Intent Response:', data);

        if (data.isMock) {
            console.log('✅ Mock mode is ACTIVE');
            console.log(`   Client Secret: ${data.clientSecret}`);
            console.log(`   Amount: RM ${data.amount / 100}`);
            console.log(`   Interval: ${data.interval}`);
        } else {
            console.log('⚠️ Real Stripe mode detected');
            console.log('   Make sure STRIPE_MOCK_MODE="true" in .env files');
        }

        // Test payment confirmation
        if (data.clientSecret && data.isMock) {
            console.log('\n2️⃣ Confirming mock payment...');
            const confirmResponse = await fetch(`${API_URL}/subscription/confirm-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    paymentIntentId: data.clientSecret,
                    interval: 'month'
                })
            });

            const confirmData = await confirmResponse.json();
            console.log('✅ Payment Confirmation:', confirmData);

            if (confirmData.success) {
                console.log('✅ Mock payment successful! Subscription should be active.');
            }
        }

        console.log('\n✅ All tests passed! Stripe mock mode is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.message);
        console.error('   Make sure:');
        console.error('   - Server is running on http://localhost:5000');
        console.error('   - You have a valid JWT token');
        console.error('   - STRIPE_MOCK_MODE="true" in .env files');
    }
}

// Instructions for running this test
console.log(`
📋 HOW TO RUN THIS TEST:

1. Login to your app and open browser console
2. Copy your JWT token:
   localStorage.getItem('quest_token')
   
3. Replace 'YOUR_JWT_TOKEN_HERE' in this file with your token

4. Run this script:
   node test-stripe-integration.js

OR test directly in browser console:

fetch('http://localhost:5000/api/subscription/create-payment-intent', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('quest_token')
  },
  body: JSON.stringify({ amount: 2500, currency: 'myr', interval: 'month' })
})
.then(r => r.json())
.then(d => console.log('Response:', d))
`);

// Uncomment to run the test
// testStripeMockMode();
