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
    const { subject, grade, topic, syllabus, isPastYear, year } = req.body;
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

    console.log(`[GEN] Request: ${subject} / ${grade} / ${topic || 'Full Paper'} / ${syllabus} ${isPastYear ? `(Past Year ${year})` : ''}`);

    // Check API Key
    if (!process.env.GEMINI_API_KEY) {
        console.error("❌ [GEN] GEMINI_API_KEY is MISSING in environment.");
        return res.status(500).json({
            error: "Gemini API Key is missing. Please add it to your .env file or Vercel environment variables.",
            instruction: "Go to https://aistudio.google.com/app/apikey to get a new key."
        });
    }

    if (isMockMode()) {
        console.warn("⚠️ [GEN] AI_MOCK_MODE is ON. But user requested real questions. Stopping here to prevent mock data.");
        return res.status(403).json({ error: "Mock mode is enabled in .env but real questions were requested." });
    }

    // ─── PAST YEAR: STRICT QuestionBank requirement ───────────────────
    if (isPastYear && year) {
        try {
            const parsedYear = parseInt(String(year).split(' ')[0], 10);
            if (!isNaN(parsedYear)) {
                // Smart Matching: Extract key acronyms (KSSR, KSSM, IGCSE, SPM, etc.)
                const acronyms = (syllabus.match(/\b(KSSR|KSSM|IGCSE|SPM|UPSR|PT3|STPM|IB)\b/gi) || [])
                    .map(a => a.toUpperCase());

                const sKeywords = syllabus.split('(')[0].trim();

                // Grade Normalization: Standard 1 <-> Year 1 <-> Grade 1
                const gradeMatch = grade.match(/\d+/);
                const gradeNum = gradeMatch ? gradeMatch[0] : null;
                const gradeVariations = gradeNum ? [
                    `Standard ${gradeNum}`,
                    `Year ${gradeNum}`,
                    `Grade ${gradeNum}`,
                    `Form ${gradeNum}`,
                    grade
                ] : [grade];

                const realQuestions = await prisma.questionBank.findMany({
                    where: {
                        subject,
                        grade: { in: gradeVariations },
                        year: parsedYear,
                        OR: [
                            { syllabus: { contains: sKeywords, mode: 'insensitive' } },
                            { syllabus: syllabus },
                            ...acronyms.map(a => ({ syllabus: { contains: a, mode: 'insensitive' } }))
                        ]
                    },
                    orderBy: { createdAt: 'asc' },
                });

                if (realQuestions.length > 0) {
                    console.log(`✅ [GEN] Found ${realQuestions.length} real QuestionBank questions for ${subject}/${grade}/${parsedYear} (Variations: ${gradeVariations.join(', ')})`);

                    const formatted = realQuestions.map((q: any) => {
                        let options: string[] = [];
                        try { options = JSON.parse(q.options); } catch { options = ['A', 'B', 'C', 'D']; }
                        const letterMap: Record<string, number> = { A: 0, B: 1, C: 2, D: 3 };
                        const correctAnswerIndex = letterMap[q.correctAnswer?.toUpperCase()] ?? 0;

                        return {
                            id: `real-${q.id}`,
                            text: q.question,
                            options,
                            correctAnswerIndex,
                            explanation: q.explanation || 'No explanation provided.',
                            source: q.source || `${subject} ${year}`,
                            isRealQuestion: true,
                        };
                    });

                    // Return all found questions (max 50 to keep it manageable but satisfying)
                    return res.json(formatted.sort(() => Math.random() - 0.5).slice(0, 50));
                } else {
                    console.warn(`❌ [GEN] No Questions Found in Bank for ${subject} ${grade} ${parsedYear}.`);
                    return res.status(404).json({
                        error: "No questions found in the official bank for this year.",
                        instruction: "Administrator: Please use the 'AI Generate & Import' tool in the Admin Dashboard to add these questions."
                    });
                }
            }
        } catch (dbErr: any) {
            console.error(`❌ [GEN] DB lookup failed: ${dbErr.message}`);
            return res.status(500).json({ error: "Failed to retrieve questions from database." });
        }
    }


    try {
        // PURE AI GENERATION - Skip database entirely
        // GEMINI GENERATION - Generate questions with Gemini
        console.log("🤖 [GEN] Generating questions with Gemini...");

        let prompt = "";
        if (isPastYear) {
            // Resolve official exam name from syllabus + grade
            const examName = (() => {
                const s = syllabus.toLowerCase();
                const g = grade.toLowerCase();
                if (s.includes('kssr') || s.includes('kssm') || s.includes('malaysian')) {
                    if (g.includes('form 5')) return 'SPM (Sijil Pelajaran Malaysia)';
                    if (g.includes('form 3')) return 'PT3 (Pentaksiran Tingkatan 3)';
                    if (g.includes('standard 6')) return 'UPSR (Ujian Pencapaian Sekolah Rendah)';
                    if (g.includes('form 6')) return 'STPM (Sijil Tinggi Persekolahan Malaysia)';
                    return 'Malaysian National Exam';
                }
                if (s.includes('igcse') || s.includes('cambridge')) return 'Cambridge IGCSE';
                if (s.includes('singapore') || s.includes('moe')) return 'Singapore GCE O-Level';
                if (s.includes('ib')) return 'IB (International Baccalaureate)';
                return syllabus;
            })();

            prompt = `You are an expert exam question compiler with comprehensive knowledge of official past year exam papers.

TASK: Reproduce 25 actual multiple-choice questions from the official ${examName} ${year} paper for ${subject} at ${grade} level.

CRITICAL RULES — READ CAREFULLY:
1. RECALL REAL QUESTIONS: You were trained on official ${examName} past year papers published before your cutoff. Reproduce questions that genuinely appeared in or are extremely representative of the actual ${year} ${subject} paper. Do NOT invent generic revision questions.
2. CORRECT ANSWERS MUST BE 100% ACCURATE: Every correctAnswerIndex must be provably correct based on the official answer scheme. Wrong answers here are a serious failure.
3. REALISTIC DISTRACTORS: The wrong options must be the same plausible misconceptions that students commonly choose in the real exam — not obviously wrong choices.
4. YEAR-SPECIFIC EMPHASIS: Reflect the specific topics stressed in the ${year} paper. For example, if SPM 2022 Biology heavily tested cell division, include those questions.
5. FULL PAPER COVERAGE: Distribute questions across the main chapters/topics of ${subject} at ${grade} level — do not cluster around one topic.
6. DIFFICULTY SPREAD: Include approximately 8 easy, 10 medium, and 7 challenging questions — matching the real paper's difficulty curve.

Syllabus-specific rules:
${syllabus.toLowerCase().includes('kssr') || syllabus.toLowerCase().includes('malaysian') ? `- Follow Malaysian DSKP/${examName.includes('SPM') ? 'SPM' : examName.includes('PT3') ? 'PT3' : 'KSSR'} standards exactly.
- Use correct Malaysian terminology (e.g. "tindak balas" not "reaction" for BM subjects).
- SPM Paper 1 is all MCQ — 40 questions, 1 mark each. Match this format.` : ''}
${syllabus.toLowerCase().includes('igcse') || syllabus.toLowerCase().includes('cambridge') ? `- Use the official Cambridge ${subject} syllabus code and follow the mark scheme conventions.
- Match Cambridge command words exactly (state, describe, explain, calculate, deduce, suggest).
- Core and Extended tier questions should be mixed.` : ''}
${syllabus.toLowerCase().includes('singapore') ? `- Follow Singapore MOE O-Level syllabus structure.
- Match SEAB question phrasings and answer key conventions.` : ''}

`;
        } else {
            prompt = `Generate a set of high-quality multiple-choice questions for:
            - Subject: ${subject}
            - Grade: ${grade}
            - Topic: ${topic}
            - Syllabus: ${syllabus}
            
            CRITICAL INSTRUCTIONS:
            1. Format: ${grade} level, ${syllabus} standards
            2. Content: 4 options (A-D), correct index (0-3)
            `;
        }

        prompt += `
        GENERAL QUALITY RULES:
        1. QUANTITY: Generate EXACTLY 25 questions. No fewer.
        2. Simplicity: Use ONLY basic alphanumeric characters and standard punctuation. AVOID complex nesting or unusual symbols.
        3. Explanation Quality: Each explanation MUST be specific to the question. It must:
           - Directly state WHY the correct answer is right (cite the specific law, formula, fact, or rule)
           - Briefly explain why a common wrong choice is misleading
           - Be 2-3 sentences maximum. Do NOT write generic study notes.
           - GOOD example: "The correct answer is chlorophyll because it is the pigment that absorbs light energy for photosynthesis. Option B (glucose) is wrong because glucose is the product of photosynthesis, not the absorber."
           - BAD example: "This is an important topic in biology." — This is not acceptable.

        JSON SPECIFICATION:
        Return ONLY a valid JSON object with this exact structure:
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
        } catch (error: any) {
            console.error("❌ [GEN] Error:", error.message);
            return res.status(500).json({
                error: `AI Generation failed: ${error.message}`,
                details: "Check your GEMINI_API_KEY in .env. If it's expired, you must renew it at Google AI Studio."
            });
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
            return res.status(500).json({
                error: `Syllabus generation failed: ${apiError.message}`,
                instruction: "Please check your GEMINI_API_KEY in .env."
            });
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
            return res.status(500).json({ error: "AI returned invalid JSON. Please try again." });
        }

        if (topics.length === 0) {
            console.warn("⚠️ [SYLLABUS] No topics parsed");
            return res.status(500).json({ error: "AI failed to generate topics." });
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
        console.error("❌ [SYLLABUS] Unexpected Error:", error.message);
        return res.status(500).json({ error: "Unexpected error during syllabus generation." });
    }
});

router.post('/study-plan', authenticateToken, checkExpiredSubscriptions, async (req: AuthRequest, res) => {
    const { subject, grade, syllabus, timeframe, hoursPerDay, goals } = req.body;
    const userId = req.user?.id;

    console.log(`[STUDY-PLAN] Request: ${subject} / ${grade} / ${syllabus} - ${timeframe} - ${hoursPerDay}h/day`);

    if (userId) {
        try {
            const user = await prisma.user.findUnique({ where: { id: userId } });

            // Check Limit reusing questsPlayed as a general AI generation count for now, 
            // or we could let subscribers have unlimited. Let's apply the same check.
            if (user && !user.isSubscribed && user.questsPlayed >= 5) { // Give a bit more leeway for study plans or use same limit
                console.log(`[STUDY-PLAN] ❌ Limit reached for user ${userId}`);
                return res.status(403).json({
                    error: "Free AI generation limit reached. Upgrade to Pro for unlimited features!",
                    code: "USER_LIMIT_REACHED"
                });
            }

            // Increment Usage
            if (user && !user.isSubscribed) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { questsPlayed: { increment: 1 } }
                });
            }
        } catch (error) {
            console.error("[STUDY-PLAN] Error checking/updating user limit:", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (!process.env.GEMINI_API_KEY) {
        return res.status(500).json({ error: "Gemini API Key is missing." });
    }

    if (isMockMode()) {
        console.log(`✅ [STUDY-PLAN] Using mock mode`);
        return res.json({
            title: `Study Plan: ${subject} (${grade})`,
            overview: "A mock study plan for testing.",
            weeks: [
                {
                    weekNumber: 1,
                    focus: "Foundational Concepts",
                    tasks: ["Review Chapter 1", "Complete 10 practice questions", "Watch tutorial video"]
                },
                {
                    weekNumber: 2,
                    focus: "Advanced Applications",
                    tasks: ["Take mock test 1", "Review mistakes", "Read Chapter 2"]
                }
            ],
            tips: ["Stay hydrated", "Take short breaks"]
        });
    }

    try {
        console.log(`🤖 [STUDY-PLAN] Generating with Gemini...`);

        const prompt = `Act as an expert academic tutor and create a highly effective, personalized study plan.
        
        STUDENT PROFILE:
        - Subject: ${subject}
        - Grade Level: ${grade}
        - Syllabus/Curriculum: ${syllabus}
        - Timeframe: ${timeframe}
        - Daily Study Commitment: ${hoursPerDay} hours per day
        - Additional Goals/Focus: ${goals || 'General mastery and exam preparation'}

        INSTRUCTIONS:
        1. Break the plan down logically into weeks (or phases if the timeframe is short like a few days).
        2. Assign specific, actionable tasks for each period based on the official curriculum of the chosen syllabus.
        3. Be realistic about what can be achieved in ${hoursPerDay} hours per day.
        4. Include a general overview of the strategy.
        5. Provide 3-5 actionable study tips specific to this subject and grade.

        JSON SPECIFICATION:
        Return ONLY a JSON object with the following exact structure:
        {
          "title": "A catchy title for the plan",
          "overview": "A short paragraph explaining the overall strategy",
          "weeks": [
            {
              "weekNumber": 1,
              "focus": "Main topic/theme for the week",
              "tasks": ["Task 1", "Task 2"]
            }
          ],
          "tips": ["Tip 1", "Tip 2"]
        }
        `;

        let responseText;
        try {
            responseText = await generateAIContent(prompt, "gemini-2.5-flash", "application/json");
        } catch (apiError: any) {
            console.error(`❌ [STUDY-PLAN] Gemini API Error: ${apiError.message}`);
            return res.status(500).json({ error: `AI generation failed: ${apiError.message}` });
        }

        if (!responseText) {
            return res.status(500).json({ error: "Empty response from AI" });
        }

        let planData;
        try {
            planData = superRepairJSON(responseText);
        } catch (e: any) {
            console.error(`❌ [STUDY-PLAN] JSON parse failed: ${e.message}`);
            return res.status(500).json({ error: "AI returned invalid JSON." });
        }

        console.log(`✅ [STUDY-PLAN] Generated successfully`);
        return res.json(planData);
    } catch (error: any) {
        console.error("❌ [STUDY-PLAN] Error:", error.message);
        return res.status(500).json({ error: "Failed to generate study plan." });
    }
});

export default router;
