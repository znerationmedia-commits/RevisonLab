const apiKey = "AIzaSyA22WD4PF1dObZ5zv1viMvR1lt6re5AhVc";

// Test different Gemini 2.5 model endpoints
const models = [
    "gemini-2.0-flash-exp",
    "gemini-2.0-flash",
    "gemini-exp-1206",
    "gemini-2.0-flash-thinking-exp-1219",
    "gemini-1.5-flash",
    "gemini-1.5-pro"
];

async function testModel(modelName) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: "Say hello" }] }]
            })
        });

        console.log(`${modelName}: ${response.status} ${response.statusText}`);

        if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${modelName} WORKS!`);
            return true;
        }
    } catch (error) {
        console.log(`❌ ${modelName}: ${error.message}`);
    }
    return false;
}

async function main() {
    console.log("Testing Gemini models...\n");
    for (const model of models) {
        await testModel(model);
    }
}

main();
