const fetch = require('node-fetch');

const apiKey = "AIzaSyA22WD4PF1dObZ5zv1viMvR1lt6re5AhVc";

async function testGemini() {
    console.log("Testing Gemini 1.5 Flash...\n");

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: "Generate a simple math question" }]
                }]
            })
        });

        console.log(`Status: ${response.status} ${response.statusText}`);

        if (response.ok) {
            const data = await response.json();
            console.log("\n✅ SUCCESS! API is working.");
            console.log("\nResponse:", JSON.stringify(data, null, 2));
        } else {
            const errorText = await response.text();
            console.log("\n❌ FAILED!");
            console.log("Error:", errorText);
        }
    } catch (error) {
        console.log("\n❌ ERROR:", error.message);
    }
}

testGemini();
