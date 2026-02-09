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

        console.log("\n--- Retrying with RAW FETCH and REFERER Header ---");
        // Fallback to fetch with header to simulate browser
        try {
            const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
            const response = await fetch(url, {
                headers: {
                    'Referer': 'http://localhost:3000/'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("SUCCESS with Referer header!");
                // Just log the model names to check for gemini-1.5-flash-001
                if (data.models) {
                    console.log("Writing models to model_list.txt...");
                    const names = data.models.map(m => m.name).join('\n');
                    fs.writeFileSync('model_list.txt', names);
                    console.log("Done writing.");
                }
            } else {
                console.error("Raw fetch also failed.");
                console.error("Status:", response.status);
                const text = await response.text();
                console.error("Body:", text);
            }
        } catch (fetchError) {
            console.error("Raw fetch error:", fetchError);
        }
    }
}

main();
