const BASE_URL = 'http://127.0.0.1:5000/api/auth';

async function testLogin() {
    console.log("Testing login for hey123...");
    try {
        const res = await fetch(`${BASE_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                identifier: 'hey123',
                password: 'password123' // I'm guessing this was used during creation
            })
        });
        const data = await res.json();
        console.log('Status:', res.status);
        console.log('Response:', data);
    } catch (e) {
        console.error(e);
    }
}

testLogin();
