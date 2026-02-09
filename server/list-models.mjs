// list-models.mjs
const apiKey = "AIzaSyA22WD4PF1dObZ5zv1viMvR1lt6re5AhVc";
const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;

async function listModels() {
    try {
        const response = await fetch(url, {
            headers: {
                'Referer': 'http://localhost:3000'
            }
        });
        const data = await response.json();
        console.log("Available Models:");
        if (data.models) {
            data.models.forEach((m) => {
                if (m.supportedGenerationMethods && m.supportedGenerationMethods.includes("generateContent")) {
                    console.log(`- ${m.name}`);
                }
            });
        } else {
            console.log("No models found or error:", JSON.stringify(data, null, 2));
        }
    } catch (error) {
        console.error("Error fetching models:", error);
    }
}

listModels();
