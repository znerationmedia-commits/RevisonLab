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

    // URL for the Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    console.log(`[AI] Sending Direct Fetch request to ${modelName}...`);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // MANDATORY: Your API key blocks empty referrers. 
                // You MUST whitelist this domain in Google Cloud Console.
                'Referer': 'https://revisionlab.vercel.app',
                'Referrer': 'https://revisionlab.vercel.app'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: prompt }]
                }]
            })
        });

        if (!response.ok) {
            const errorText = await response.text();

            // Try to parse detailed JSON error if possible
            try {
                const errorJson = JSON.parse(errorText);
                const message = errorJson.error?.message || errorText;
                throw new Error(`Gemini API Error (${response.status}): ${message}`);
            } catch (e) {
                throw new Error(`Gemini API Error (${response.status}): ${errorText}`);
            }
        }

        const data = await response.json();

        // Extract text from response structure
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            throw new Error("Empty response from Gemini API");
        }

        return text;
    } catch (error: any) {
        console.error('[AI] Generation Failed:', error.message);
        throw error;
    }
}
