const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    console.error('❌ No GEMINI_API_KEY found in .env');
    process.exit(1);
}

console.log('🔍 Fetching available Gemini models...\n');

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        console.log('✅ Available Models:\n');

        if (data.models) {
            data.models.forEach(model => {
                if (model.supportedGenerationMethods?.includes('generateContent')) {
                    console.log(`📦 ${model.name}`);
                    console.log(`   Display Name: ${model.displayName || 'N/A'}`);
                    console.log('');
                }
            });
        } else {
            console.log('No models found');
        }
    } catch (error) {
        console.error('❌ Error listing models:', error.message);
    }
}

listModels();
