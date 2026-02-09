import fs from 'fs';

const BASE_URL = 'http://localhost:5000/api/auth';

async function verifyFlow() {
    const email = `verify${Math.floor(Math.random() * 1000)}@example.com`;
    const password = 'password123';

    console.log(`1. Signing up with ${email}...`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Verify Test',
                email: email,
                password: password,
                role: 'student'
            })
        });
        const signupData = await signupRes.json();
        console.log('Signup Status:', signupRes.status);

        if (signupRes.status === 200) {
            console.log('\n2. Retrieving code from file...');
            // Wait a bit for file to be written by the server
            await new Promise(resolve => setTimeout(resolve, 1500));

            const code = fs.readFileSync('server/last_otp.txt', 'utf8').trim();
            console.log('Code found:', code);

            console.log('\n3. Verifying code...');
            const verifyRes = await fetch(`${BASE_URL}/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code })
            });
            const verifyData = await verifyRes.json();
            console.log('Verify Status:', verifyRes.status);

            if (verifyRes.ok) {
                console.log('Verification Success!');

                console.log('\n4. Testing Login...');
                const loginRes = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ identifier: email, password })
                });
                console.log('Login Status:', loginRes.status);
                if (loginRes.ok) {
                    console.log('Login Success! Flow Verified.');
                }
            } else {
                console.log('Verification Failed:', verifyData);
            }
        } else {
            console.log('Signup Failed:', signupData);
        }
    } catch (e) {
        console.error('Test failed:', e);
    }
}

verifyFlow();
