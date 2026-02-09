const BASE_URL = 'http://localhost:5000/api/auth';

async function testAuth() {
    const randomNum = Math.floor(Math.random() * 1000);
    const email = `test${randomNum}@example.com`;
    const name = `Test User ${randomNum}`;
    const password = 'password123';

    console.log(`1. Testing Signup for ${email}...`);
    try {
        const signupRes = await fetch(`${BASE_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                role: 'student'
            })
        });

        const signupData = await signupRes.json();
        console.log(`Status: ${signupRes.status}`);
        console.log('Response:', signupData);

        if (signupRes.ok) {
            console.log("Signup Success!");

            console.log("\n2. Testing existing email signup (should login)...");
            const signupRetryRes = await fetch(`${BASE_URL}/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: 'student'
                })
            });
            const signupRetryData = await signupRetryRes.json();
            console.log(`Status: ${signupRetryRes.status}`);
            if (signupRetryRes.ok) {
                console.log("Success: Existing email signup logged in correctly.");
            } else {
                console.log("Failed: Existing email signup error:", signupRetryData.error);
            }

            console.log("\n3. Testing Login with Email...");
            const loginEmailRes = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: email,
                    password: password
                })
            });
            const loginEmailData = await loginEmailRes.json();
            console.log(`Status: ${loginEmailRes.status} (Email Login)`);

            console.log("\n4. Testing Login with Name...");
            const loginNameRes = await fetch(`${BASE_URL}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    identifier: name,
                    password: password
                })
            });
            const loginNameData = await loginNameRes.json();
            console.log(`Status: ${loginNameRes.status} (Name Login)`);

            if (loginNameRes.ok) {
                console.log("\n5. Testing /me...");
                const meRes = await fetch(`${BASE_URL}/me`, {
                    headers: { 'Authorization': `Bearer ${loginNameData.token}` }
                });
                const meData = await meRes.json();
                console.log(`Status: ${meRes.status}`);
                console.log('User Profile Success!');
            }
        }
    } catch (error) {
        console.error("Fetch error:", error);
    }
}

testAuth();
