import { GoogleGenAI } from "@google/genai";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Manually parse .env.local
const envPath = path.resolve(__dirname, '.env.local');
let apiKey = '';

try {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('VITE_GEMINI_API_KEY=')) {
            apiKey = trimmed.split('=')[1].trim();
            break;
        }
    }
} catch (e) {
    console.error("Could not read .env.local", e);
}

if (!apiKey) {
    console.error("No API KEY found in .env.local");
    process.exit(1);
}

console.log("Using API Key:", apiKey.substring(0, 5) + "...");

const main = async () => {
    try {
        const ai = new GoogleGenAI({ apiKey });
        console.log("SDK: Initialized.");

        // Try SDK call first
        if (ai.models && typeof ai.models.list === 'function') {
            console.log("SDK: Calling ai.models.list()...");
            const response = await ai.models.list();
            console.log("SDK: Response:", JSON.stringify(response, null, 2));
        } else {
            // throw to trigger catch and try raw fetch
            throw new Error("SDK method not found or skipped");
        }

    } catch (error) {
        console.error("SDK Failed!");
        if (error.status) console.error("Status:", error.status);
        if (error.message) console.error("Message:", error.message);

        console.log("\n--- Testing Multiple Referrers ---");
        const testReferrers = [
            'http://localhost:3000/',
            'https://revisionlab-gamified-learning.vercel.app/',
            'https://questacademy.vercel.app/'
        ];

        for (const ref of testReferrers) {
            try {
                const model = "models/gemini-2.5-flash"; // Use Gemini 2.5 as requested
                const url = `https://generativelanguage.googleapis.com/v1beta/${model}:generateContent?key=${apiKey}`;
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Referer': ref
                    },
                    body: JSON.stringify({
                        contents: [{ parts: [{ text: "hi" }] }]
                    })
                });

                console.log(`Referer: ${ref} -> Status: ${response.status}`);
                if (response.ok) {
                    console.log(`✅ SUCCESS with ${ref}`);
                } else {
                    const err = await response.json();
                    console.log(`❌ FAILED with ${ref}: ${err.error?.message || "Unknown error"}`);
                }
            } catch (e) {
                console.log(`❌ ERROR testing ${ref}: ${e.message}`);
            }
        }
    }
}

main();
