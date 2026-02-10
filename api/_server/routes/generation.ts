import express from 'express';
import prisma from '../db.js';
import { generateAIContent } from '../utils/ai.js';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import fetch from 'node-fetch'; // DISABLED: Using native fetch (Node 18+)

import { authenticateToken, AuthRequest } from '../middleware/authMiddleware.js';
import { checkExpiredSubscriptions } from '../middleware/checkExpiredSubscriptions.js';

const router = express.Router();

// Helper function to check mock mode dynamically
const isMockMode = () => process.env.AI_MOCK_MODE === 'true';

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

// Helper functions 
const getSubjectCategory = (subject: string) => {
    const stem = [Subject.MATH, Subject.SCIENCE, Subject.PHYSICS, Subject.CHEMISTRY, Subject.BIOLOGY, Subject.ADD_MATH, Subject.COMPUTER_SCIENCE];
    const langs = [Subject.BAHASA_MELAYU, Subject.ENGLISH];
    const hums = [Subject.SEJARAH, Subject.GEOGRAPHY, Subject.ECONOMICS, Subject.BUSINESS];
    if (stem.includes(subject as Subject)) return 'STEM';
    if (langs.includes(subject as Subject)) return 'LANGS';
    if (hums.includes(subject as Subject)) return 'HUMS';
    return 'VALUES';
};

// Mock Generation Logic (Server Side) 
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

/**
 * SUPER-ROBUST JSON REPAIR
 * Handles truncated or slightly malformed JSON by:
 * 1. Extracting the core JSON part via regex
 * 2. Closing open braces/brackets if truncated
 */
const superRepairJSON = (text: string): any => {
    // Stage 1: Basic Extraction
    let cleaned = text.trim();
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/) || cleaned.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
        // If no full match, try to find the start and fix the end
        const startIdx = cleaned.indexOf('{');
        if (startIdx !== -1) {
            cleaned = cleaned.substring(startIdx);
        } else {
            const arrStartIdx = cleaned.indexOf('[');
            if (arrStartIdx !== -1) cleaned = cleaned.substring(arrStartIdx);
            else throw new Error("No JSON start found");
        }
    } else {
        cleaned = jsonMatch[0];
    }

    // Stage 2: Balanced Brackets (Repair Truncation)
    const stack: string[] = [];
    let insideString = false;
    let escape = false;
    let lastValidIdx = cleaned.length;

    for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (escape) {
            escape = false;
            continue;
        }
        if (char === '\\') {
            escape = true;
            continue;
        }
        if (char === '"') {
            insideString = !insideString;
            continue;
        }
        if (!insideString) {
            if (char === '{' || char === '[') {
                stack.push(char);
            } else if (char === '}' || char === ']') {
                const last = stack.pop();
                if ((char === '}' && last !== '{') || (char === ']' && last !== '[')) {
                    // Mismatch - might be malformed in the middle
                }
            }
        }
    }

    // If we are inside an unterminated string, close it
    if (insideString) cleaned += '"';

    // Close remaining brackets in reverse order
    while (stack.length > 0) {
        const last = stack.pop();
        if (last === '{') cleaned += '}';
        if (last === '[') cleaned += ']';
    }

    return JSON.parse(cleaned);
};

// ... Limit Check & Increment ...
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
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    console.log(`[GEN] Request: ${subject} / ${grade} / ${topic} / ${syllabus}`);

    if (isMockMode()) {
        return res.json(generateMockQuestions(subject, grade, topic, syllabus));
    }

    try {
        // PURE AI GENERATION - Skip database entirely
        // GEMINI GENERATION - Generate questions with Gemini
        console.log("🤖 [GEN] Generating questions with Gemini...");

        const prompt = `Generate a set of high-quality multiple-choice questions for:
        - Subject: ${subject}
        - Grade: ${grade}
        - Topic: ${topic}
        - Syllabus: ${syllabus}

        CRITICAL INSTRUCTIONS:
        1. Format: ${grade} level, ${syllabus} standards
        2. Content: 4 options (A-D), correct index (0-3)
        3. Simplicity: Use ONLY basic alphanumeric characters and standard punctuation. AVOID complex nesting or unusual symbols.
        4. Conciseness: Explanations MUST be 1-2 short sentences maximum. This is vital to prevent truncation.

        JSON SPECIFICATION:
        Return ONLY a JSON object:
        {"questions": [{"question": "...", "options": ["...", "...", "...", "..."], "correctAnswerIndex": 0, "explanation": "..."}]}
        `;

        try {
            console.log(`🤖 [GEN] Requesting Gemini (JSON Mode: Super-Robust 2.5)...`);
            const responseText = await generateAIContent(prompt, "gemini-2.5-flash", "application/json");

            if (!responseText) {
                console.error("❌ [GEN] Empty AI response");
                return res.json(generateMockQuestions(subject, grade, topic, syllabus));
            }

            console.log(`✅ [GEN] Received response (${responseText.length} chars). Parsing...`);

            // Try to parse the JSON with Super Repair
            let aiQuestions;
            try {
                const parsed = superRepairJSON(responseText);
                aiQuestions = parsed.questions || (Array.isArray(parsed) ? parsed : null);
            } catch (parseError: any) {
                console.error(`❌ [GEN] JSON Critical Failure: ${parseError.message}`);
                console.log(`[GEN] Full Response for Debug: ${responseText}`);
                return res.json(generateMockQuestions(subject, grade, topic, syllabus));
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


    } catch (error: any) {
        console.error("❌ [GEN] Outer Error:", error.message);
        console.error(error.stack);
        res.status(500).json({ error: "Generation Failed", details: error.message });
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
                subject_grade_syllabus: { subject, grade, syllabus }
            }
        });

        if (cached) {
            console.log(`✅ [SYLLABUS] Found cached syllabus`);
            return res.json(JSON.parse(cached.topics));
        }

        // AI SYLLABUS GENERATION with Gemini
        console.log(`🤖 [SYLLABUS] Generating syllabus with Gemini for: ${subject} ${grade} (JSON Mode)`);

        const prompt = `Generate a comprehensive list of syllabus topics for:
        - Subject: ${subject}
        - Grade Level: ${grade}
        - Syllabus/Curriculum: ${syllabus}

        INSTRUCTIONS:
        1. Base this on the OFFICIAL current curriculum
        2. For KSSR/KSSM (Malaysian), align with latest DSKP standards
        3. For IGCSE, align with Cambridge curriculum
        4. Include 12-20 key topics

        JSON SPECIFICATION:
        Return ONLY a JSON object with a "topics" key containing a flat array of strings.
        Example:
        {"topics": ["Chapter 1: Topic Name", "Chapter 2: Topic Name"]}
        `;

        let responseText;
        try {
            responseText = await generateAIContent(prompt, "gemini-2.5-flash", "application/json");
        } catch (apiError: any) {
            console.error(`❌ [SYLLABUS] Gemini API Error: ${apiError.message}`);
            return res.json(generateMockSyllabus());
        }

        if (!responseText) {
            console.error("❌ [SYLLABUS] Empty AI response");
            return res.json(generateMockSyllabus());
        }

        console.log(`✅ [SYLLABUS] Received response (${responseText.length} chars). Parsing...`);

        let topics = [];
        try {
            const parsed = superRepairJSON(responseText);
            topics = parsed.topics || (Array.isArray(parsed) ? parsed : []);
        } catch (e: any) {
            console.error(`❌ [SYLLABUS] JSON Critical Failure: ${e.message}`);
            console.log(`[SYLLABUS] Full Response for Debug: ${responseText}`);
            return res.json(generateMockSyllabus());
        }

        if (topics.length === 0) {
            console.warn("⚠️ [SYLLABUS] No topics parsed, returning mock");
            return res.json(generateMockSyllabus());
        }

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
    } catch (error: any) {
        console.error("❌ [SYLLABUS] Error:", error.message);
        return res.json(generateMockSyllabus());
    }
});

export default router;
