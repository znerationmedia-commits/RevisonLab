
import prisma from './db';
import dotenv from 'dotenv';
// Node 18+ has native fetch, but we might need to be careful with types if using tsx

dotenv.config({ path: '../.env.local' });
// Try loading from .env if .env.local fails or is not found (fallback)
dotenv.config();

// const prisma = new PrismaClient(); // Removed: Using shared instance from ./db

const SUBJECTS_TO_SEED = [
    { subject: 'Mathematics', grade: 'Form 4', syllabus: 'KSSM' },
    { subject: 'Science', grade: 'Form 2', syllabus: 'KSSM' },
    { subject: 'Biology', grade: 'Year 11 (IGCSE)', syllabus: 'Cambridge IGCSE' },
    { subject: 'History', grade: 'Form 5', syllabus: 'KSSM' }
];

const QUESTIONS_PER_BATCH = 5; // Start small to test
const BATCHES_PER_TOPIC = 1;

async function generateWithGemini(prompt: string, type: 'json' | 'text' = 'json') {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) throw new Error("GEMINI_API_KEY not found in env");
    console.log(`Debug: Using API Key starting with ${apiKey.substring(0, 5)}...`);

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
                response_mime_type: type === 'json' ? "application/json" : "text/plain",
            }
        })
    });

    if (!response.ok) {
        throw new Error(`Gemini API Error: ${response.status} ${response.statusText}`);
    }

    const data: any = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from AI");

    return type === 'json' ? JSON.parse(text) : text;
}

async function getOrGenerateSyllabus(subject: string, grade: string, syllabus: string) {
    // 1. Check DB
    const existing = await prisma.courseSyllabus.findUnique({
        where: { subject_grade_syllabus: { subject, grade, syllabus } }
    });

    if (existing) {
        console.log(`✅ [SYLLABUS] Found cached for ${subject} ${grade} (${syllabus})`);
        return JSON.parse(existing.topics);
    }

    // 2. Generate
    console.log(`🤖 [SYLLABUS] Generating for ${subject} ${grade}...`);
    const prompt = `Generate a comprehensive list of syllabus topics for:
    - Subject: ${subject}
    - Grade: ${grade}
    - Syllabus: ${syllabus}
    
    Return ONLY a JSON array of strings. Example: ["Chapter 1: Algebra", "Chapter 2: Geometry"]`;

    try {
        const topics = await generateWithGemini(prompt, 'json');

        await prisma.courseSyllabus.create({
            data: {
                subject, grade, syllabus,
                topics: JSON.stringify(topics)
            }
        });
        return topics;
    } catch (e) {
        console.error("Failed to generate syllabus:", e);
        return [];
    }
}

async function generateQuestionsForTopic(subject: string, grade: string, syllabus: string, topic: string) {
    console.log(`   📝 Generaring questions for topic: ${topic}...`);

    const prompt = `Generate ${QUESTIONS_PER_BATCH} multiple-choice questions for:
    - Subject: ${subject}
    - Grade: ${grade}
    - Syllabus: ${syllabus}
    - Topic: ${topic}
    
    Requirements:
    - Hard difficulty suitable for exam preparation.
    - JSON Output Array: [{ question, options (array of 4 strings), correctAnswer (string), explanation, difficulty: "Hard" }]
    - Return ONLY JSON.`;

    try {
        const questions = await generateWithGemini(prompt, 'json');

        for (const q of questions) {
            // Validate structure
            if (!q.question || !q.options || !q.correctAnswer) continue;

            await prisma.questionBank.create({
                data: {
                    subject,
                    grade,
                    syllabus,
                    topic,
                    year: new Date().getFullYear(),
                    question: q.question,
                    options: JSON.stringify(q.options),
                    correctAnswer: q.correctAnswer,
                    explanation: q.explanation || "No explanation provided.",
                    difficulty: q.difficulty || "Medium",
                    source: "AI Auto-Seeder"
                }
            });
        }
        console.log(`      ✅ Saved ${questions.length} questions.`);
    } catch (e) {
        console.error(`      ❌ Failed to generate questions for ${topic}:`, e);
    }
}

async function main() {
    console.log("🚀 Starting Auto-Seeder...");

    for (const item of SUBJECTS_TO_SEED) {
        console.log(`\n📌 Processing: ${item.subject} (${item.grade})`);

        // 1. Get Topics
        const topics = await getOrGenerateSyllabus(item.subject, item.grade, item.syllabus);
        if (!topics || topics.length === 0) continue;

        // 2. Loop Topics
        let count = 0;
        for (const topic of topics) {
            if (count >= 3) break; // LIMIT to first 3 topics for testing speed

            // Check existing count to avoid over-seeding
            const existingCount = await prisma.questionBank.count({
                where: { subject: item.subject, grade: item.grade, topic }
            });

            if (existingCount >= 5) {
                console.log(`   ⏩ Skipping ${topic} (Already has ${existingCount} questions)`);
                continue;
            }

            await generateQuestionsForTopic(item.subject, item.grade, item.syllabus, topic);

            // Artificial delay to prevent API rate limits (Git limit is usually 15 RPM for free tier)
            await new Promise(r => setTimeout(r, 4000));
            count++;
        }
    }

    console.log("\n✅ Auto-Seeding Complete!");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
