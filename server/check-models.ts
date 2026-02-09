import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('❌ No GEMINI_API_KEY found in .env');
    process.exit(1);
}

console.log('🔍 Fetching available Gemini models via REST API...\n');

const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();

        if (data.models && Array.isArray(data.models)) {
            console.log('✅ Available Models:\n');

            data.models.forEach((model: any) => {
                if (model.supportedGenerationMethods?.includes('generateContent')) {
                    console.log(`📦 ${model.name}`);
                    console.log(`   Display Name: ${model.displayName}`);
                    console.log(`   Description: ${model.description || 'N/A'}`);
                    console.log(`   Versions: ${model.version || 'N/A'}`);
                    console.log('');
                }
            });
        } else {
            console.log('⚠️ No models found or unexpected response format.');
            if (data.error) {
                console.error('❌ API Error:', data.error.message);
            }
        }
    } catch (error: any) {
        console.error('❌ Error listing models:', error.message);
    }
}

listModels();
