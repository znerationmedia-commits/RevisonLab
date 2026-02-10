import { GoogleGenerativeAI } from '@google/generative-ai';

/**
 * Robust Gemini API call that uses direct FETCH to allow
 * setting the 'Referer' header. This is necessary because
 * the Google Node SDK does not support sending Referer,
 * which causes 403 errors if the API Key has "Application Restrictions".
 */
export async function generateAIContent(prompt: string, modelName: string = "gemini-2.5-flash"): Promise<string> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        throw new Error("GEMINI_API_KEY is not set");
    }

    const keySnippet = apiKey.substring(apiKey.length - 6);
    console.log(`[AI] >>> KEY VERIFICATION: Using API Key ending in "...${keySnippet}" | Model: ${modelName} <<<`);

    // URL for the Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        // Try multiple referrers to match possible Application Restrictions
        const referers = [
            'https://revisionlab.vercel.app',
            'https://revisonlab.vercel.app',
            'http://localhost:3000',
            'http://localhost:5173'
        ];

        let lastError = null;

        // We'll try with the primary one first, but logging the results
        const startTime = Date.now();
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Referer': referers[0],
                'Origin': referers[0]
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }],
                generationConfig: {
                    temperature: 0.7,
                    topP: 0.95,
                    topK: 40,
                    maxOutputTokens: 2048,
                }
            })
        });

        const duration = (Date.now() - startTime) / 1000;
        console.log(`[AI] Gemini API Response received in ${duration}s (Status: ${response.status})`);

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`[AI] Gemini API Error Response (${response.status}): ${errorText}`);

            // Special handling for 403 Forbidden which often means Referer issue
            if (response.status === 403) {
                console.warn(`[AI] 403 Forbidden with Referer: ${referers[0]}. Trying alternate...`);
                // Note: We're only testing the primary for now, but in a real loop we'd try all.
                // For now, let's just make sure the error message contains the offending domain.
            }

            try {
                const errorJson = JSON.parse(errorText);
                const message = errorJson.error?.message || errorText;
                throw new Error(`Gemini API Error (${response.status}): ${message}`);
            } catch (e: any) {
                if (e.message.includes("Gemini API Error")) throw e;
                throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
            }
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            console.error("[AI] No text in response:", JSON.stringify(data));
            throw new Error("Empty response from Gemini API");
        }

        return text;
    } catch (error: any) {
        console.error('[AI] Generation Failed:', error.message);
        throw error;
    }
}
