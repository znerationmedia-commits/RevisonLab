import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testAnswerRandomization() {
    const authUrl = 'http://localhost:5000/api/auth/signup';
    const genUrl = 'http://localhost:5000/api/generate/quest';
    
    console.log("1. Creating/Getting test user...");
    const email = `rand_verify_${Date.now()}@test.com`;
    const password = 'password123';
    
    try {
        const signupRes = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Rand Verify User',
                email: email,
                password: password,
                role: 'student'
            })
        });

        const signupData = await signupRes.json();
        const userId = signupData.user.id;
        const token = signupData.token;

        console.log("2. Activating subscription...");
        await prisma.subscription.create({
            data: {
                userId: userId,
                planId: 'pro',
                status: 'active',
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });

        console.log("3. Generating questions and checking distribution...");
        const response = await fetch(genUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subject: 'Mathematics',
                grade: 'Form 5',
                topic: 'Matrices',
                syllabus: 'UEC'
            })
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return;
        }

        const questions = await response.json();
        console.log(`Generated ${questions.length} questions.`);

        const counts = [0, 0, 0, 0];
        questions.forEach((q: any) => {
            if (q.correctAnswerIndex >= 0 && q.correctAnswerIndex <= 3) {
                counts[q.correctAnswerIndex]++;
            }
        });

        console.log("Answer Distribution (0-3):", counts);
        const labels = ['A', 'B', 'C', 'D'];
        counts.forEach((count, i) => console.log(`${labels[i]}: ${count} questions`));

        const nonZeroPaths = counts.filter(c => c > 0).length;
        if (nonZeroPaths >= 3) {
            console.log("✅ PASS: Correct answers are distributed across multiple choices.");
        } else {
            console.warn("⚠️ WARNING: Distribution seems biased. Check the prompt again.");
        }

    } catch (err: any) {
        console.error("Test failed:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

testAnswerRandomization();
