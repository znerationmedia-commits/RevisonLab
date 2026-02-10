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
    // CRITICAL: Look for this in your Vercel logs to confirm which key is active
    console.log(`[AI] >>> KEY VERIFICATION: Using API Key ending in "...${keySnippet}" <<<`);

    // URL for the Gemini API
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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
            console.error(`[AI] Gemini API Error Response: ${errorText}`);

            // Try to parse detailed JSON error if possible
            try {
                const errorJson = JSON.parse(errorText);
                const message = errorJson.error?.message || errorText;
                const details = errorJson.error?.details || [];
                // Look for the consumer project in the error metadata
                const project = details.find((d: any) => d.metadata?.consumer)?.metadata.consumer || "projects/1062327578778";

                throw new Error(`Gemini API Error (${response.status}): ${message} (Target Project: ${project}, Key Suffix: ${keySnippet})`);
            } catch (e: any) {
                if (e.message.includes("Gemini API Error")) throw e;
                throw new Error(`Gemini API Error (${response.status}): ${errorText} (Key Suffix: ${keySnippet})`);
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
