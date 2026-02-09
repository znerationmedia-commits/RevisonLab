import express from 'express';
import prisma from '../db';
import { GoogleGenerativeAI } from '@google/generative-ai';
// import fetch from 'node-fetch'; // DISABLED: Using native fetch (Node 18+)

import { authenticateToken, AuthRequest } from '../middleware/authMiddleware';
import { checkExpiredSubscriptions } from '../middleware/checkExpiredSubscriptions';

const router = express.Router();

// Helper function to check mock mode dynamically
const isMockMode = () => process.env.AI_MOCK_MODE === 'true';
console.log(`[AI CONFIG] Mock Mode: ${isMockMode()} (AI_MOCK_MODE="${process.env.AI_MOCK_MODE}")`);

// Types (replicated from client for server usage)
enum Subject {
    MATH = 'Mathematics',
    SCIENCE = 'Science',
    PHYSICS = 'Physics',
    CHEMISTRY = 'Chemistry',
    BIOLOGY = 'Biology',
    ADD_MATH = 'Additional Mathematics',
    COMPUTER_SCIENCE = 'Computer Science',
    BAHASA_MELAYU = 'Bahasa Melayu',
    ENGLISH = 'English',
    SEJARAH = 'Sejarah (History)',
    GEOGRAPHY = 'Geografi',
    ECONOMICS = 'Economics',
    BUSINESS = 'Business Studies',
    EDUCATION_ISLAM = 'Pendidikan Islam',
    EDUCATION_MORAL = 'Pendidikan Moral',
    RBT = 'Reka Bentuk & Teknologi (RBT)'
}

// ... Helper functions ...
const getSubjectCategory = (subject: string) => {
    const stem = [Subject.MATH, Subject.SCIENCE, Subject.PHYSICS, Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ADD_MATH, Subject.COMPUTER_SCIENCE];
    const langs = [Subject.BAHASA_MELAYU, Subject.ENGLISH];
    const hums = [Subject.SEJARAH, Subject.GEOGRAPHY, Subject.ECONOMICS, Subject.BUSINESS];
    if (stem.includes(subject as Subject)) return 'STEM';
    if (langs.includes(subject as Subject)) return 'LANGS';
    if (hums.includes(subject as Subject)) return 'HUMS';
    return 'VALUES';
};

// ... Mock Generation Logic (Server Side) ...
const generateMockQuestions = (subject: string, grade: string, topic: string, syllabus: string) => {
    return Array.from({ length: 15 }).map((_, i) => ({
        id: `mock-${Date.now()}-${i}`,
        text: `[Server Mock] ${topic} Question ${i + 1} for ${grade}`,
        options: ["A", "B", "C", "D"],
        correctAnswerIndex: 0,
        explanation: "Server mock explanation."
    }));
};

const generateMockSyllabus = () => {
    return ["Mock Topic 1", "Mock Topic 2", "Mock Topic 3", "Mock Topic 4", "Mock Topic 5"];
}

// Limit Check & Increment
router.post('/quest', authenticateToken, checkExpiredSubscriptions, async (req: AuthRequest, res) => {
    const { subject, grade, topic, syllabus } = req.body;
    const userId = req.user?.id;

    if (userId) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });

            // Check Limit
            if (user && !user.isSubscribed && user.questsPlayed >= 1) {
                console.log(`[GEN] ❌ Limit reached for user ${userId}`);
                return res.status(403).json({
                    error: "Free limit reached. Upgrade to Pro for unlimited quests!",
                    code: "USER_LIMIT_REACHED"
                });
            }

            // Increment Usage (Count attempt)
            if (user && !user.isSubscribed) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { questsPlayed: { increment: 1 } }
                });
                console.log(`[GEN] Incremented usage for user ${userId}`);
            }
        } catch (error) {
            console.error("[GEN] Error checking/updating user limit:", error);
            // Continue to generation if DB fails? No, fail safe.
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    console.log(`[GEN] Request: ${subject} / ${grade} / ${topic} / ${syllabus}`);

    if (isMockMode()) {
        return res.json(generateMockQuestions(subject, grade, topic, syllabus));
    }

    try {
        // PURE AI GENERATION - Skip database entirely
        console.log(`🤖 [GEN] Generating questions with AI for: ${subject} / ${grade} / ${topic}`);

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("⚠️ [GEN] No Gemini API Key, returning mock.");
            return res.json(generateMockQuestions(subject, grade, topic, syllabus));
        }

        // GEMINI GENERATION - Generate questions with Gemini
        console.log("🤖 [GEN] Generating questions with Gemini...");

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Generate 10 multiple-choice questions for:
        - Subject: ${subject}
        - Grade: ${grade}
        - Topic: ${topic}
        - Syllabus: ${syllabus}

        INSTRUCTIONS:
        1. Questions must be appropriate for ${grade} level
        2. Follow ${syllabus} curriculum standards
        3. Each question must have 4 options (A, B, C, D)
        4. Include the correct answer and a brief explanation
        5. Make questions challenging but fair

        OUTPUT FORMAT (JSON array):
        {
          "questions": [
            {
              "question": "Question text here?",
              "options": ["Option A", "Option B", "Option C", "Option D"],
              "correctAnswerIndex": 1,
              "explanation": "Brief explanation of the answer"
            }
          ]
        }`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text();

            if (!responseText) {
                console.error("❌ [GEN] Empty AI response");
                return res.json(generateMockQuestions(subject, grade, topic, syllabus));
            }

            // Clean up markdown code blocks if present
            let cleanedText = responseText.trim();
            if (cleanedText.startsWith('```json')) {
                cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/```\n?/g, '');
            }

            // Try to parse the JSON
            let aiQuestions;
            try {
                const parsed = JSON.parse(cleanedText);
                aiQuestions = parsed.questions || parsed;
            } catch (parseError: any) {
                console.error(`❌ [GEN] JSON Parse Error: ${parseError.message}`);
                console.log(`[GEN] Problematic JSON (first 500 chars): ${cleanedText.substring(0, 500)}`);

                // Try to extract JSON array even if it's malformed
                const jsonMatch = cleanedText.match(/\[[\s\S]*\]/);
                if (jsonMatch) {
                    try {
                        aiQuestions = JSON.parse(jsonMatch[0]);
                        console.log(`✅ [GEN] Recovered ${aiQuestions.length} questions from malformed JSON`);
                    } catch {
                        console.error("❌ [GEN] Could not recover from malformed JSON, using mock");
                        return res.json(generateMockQuestions(subject, grade, topic, syllabus));
                    }
                } else {
                    console.error("❌ [GEN] No JSON array found, using mock");
                    return res.json(generateMockQuestions(subject, grade, topic, syllabus));
                }
            }

            // Validate the questions have the right structure
            if (!Array.isArray(aiQuestions) || aiQuestions.length === 0) {
                console.error("❌ [GEN] Invalid questions format, using mock");
                return res.json(generateMockQuestions(subject, grade, topic, syllabus));
            }

            // Map to ensure consistent field names (question vs text)
            const formattedQuestions = aiQuestions.map((q: any, i: number) => ({
                id: `ai-${Date.now()}-${i}`,
                text: q.question || q.text || `Question ${i + 1}`,
                options: q.options || ["A", "B", "C", "D"],
                correctAnswerIndex: q.correctAnswerIndex ?? q.correctAnswer ?? 0,
                explanation: q.explanation || "No explanation provided"
            }));

            console.log(`✅ [GEN] Generated ${formattedQuestions.length} questions with Gemini`);
            return res.json(formattedQuestions);
        } catch (apiError: any) {
            console.error(`❌ [GEN] Gemini API Error: ${apiError.message}`);
            return res.json(generateMockQuestions(subject, grade, topic, syllabus));
        }


    } catch (error) {
        console.error("❌ [GEN] Error:", error);
        res.status(500).json({ error: "Generation Failed" });
    }
});

router.post('/syllabus', async (req, res) => {
    const { subject, grade, syllabus } = req.body;
    console.log(`[SYLLABUS] Request: ${subject} / ${grade} / ${syllabus}`);

    if (isMockMode()) {
        console.log(`✅ [SYLLABUS] Using mock mode, returning mock data`);
        return res.json(generateMockSyllabus());
    }

    try {
        // 1. Check DB Cache
        const cached = await prisma.courseSyllabus.findUnique({
            where: {
                subject_grade_syllabus: {
                    subject,
                    grade,
                    syllabus
                }
            }
        });

        if (cached) {
            console.log(`✅ [SYLLABUS] Found cached syllabus`);
            return res.json(JSON.parse(cached.topics));
        }

        // AI SYLLABUS GENERATION with Gemini
        console.log(`🤖 [SYLLABUS] Generating syllabus with Gemini for: ${subject} ${grade}`);

        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.warn("⚠️ [SYLLABUS] No Gemini API Key, returning mock.");
            return res.json(generateMockSyllabus());
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

        const prompt = `Generate a comprehensive list of syllabus topics for:
        - Subject: ${subject}
        - Grade Level: ${grade}
        - Syllabus/Curriculum: ${syllabus}

        INSTRUCTIONS:
        1. Base this on the OFFICIAL current curriculum
        2. For KSSR/KSSM (Malaysian), align with latest DSKP standards
        3. For IGCSE, align with Cambridge curriculum
        4. Return a flat JSON array of topic strings
        5. Include 12-20 key topics

        OUTPUT FORMAT:
        {"topics": ["Chapter 1: Topic Name", "Chapter 2: Topic Name", ...]}`;

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const responseText = response.text();

            if (!responseText) {
                console.error("❌ [SYLLABUS] Empty AI response");
                return res.json(generateMockSyllabus());
            }

            // Clean up markdown code blocks if present
            let cleanedText = responseText.trim();
            if (cleanedText.startsWith('```json')) {
                cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
            } else if (cleanedText.startsWith('```')) {
                cleanedText = cleanedText.replace(/```\n?/g, '');
            }

            const parsed = JSON.parse(cleanedText);
            const topics = parsed.topics || [];
            console.log(`✅ [SYLLABUS] Generated ${topics.length} topics with Gemini`);

            // Cache it for future use
            await prisma.courseSyllabus.upsert({
                where: {
                    subject_grade_syllabus: { subject, grade, syllabus }
                },
                update: { topics: JSON.stringify(topics) },
                create: { subject, grade, syllabus, topics: JSON.stringify(topics) }
            });

            return res.json(topics);
        } catch (apiError: any) {
            console.error(`❌ [SYLLABUS] Gemini API Error: ${apiError.message}`);
            return res.json(generateMockSyllabus());
        }
    } catch (error) {
        console.error("❌ [SYLLABUS] Error:", error);
        // Fallback to mock if DB fails for some reason
        console.warn("⚠️ [SYLLABUS] Falling back to mock data due to error.");
        const mock = generateMockSyllabus();
        return res.json(mock);
    }
});

export default router;
