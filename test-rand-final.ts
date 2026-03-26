import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkeyshouldbeenv';

async function testAnswerRandomizationFinal() {
    console.log("1. Creating verified subscribed test user manually...");
    const email = `verify_rand_final_${Date.now()}@test.com`;
    const password = 'password123';
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const user = await prisma.user.create({
            data: {
                name: 'Rand Verify User',
                email: email,
                password: hashedPassword,
                role: 'student',
                isVerified: true,
                isSubscribed: true, // Bypass limit
                subscriptionLevel: 'all',
                subscriptionEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });

        console.log(`✅ User created (ID: ${user.id}).`);

        const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
        console.log("✅ Token generated.");

        console.log("2. Generating questions and checking distribution...");
        const genUrl = 'http://localhost:5000/api/generate/quest';
        const response = await fetch(genUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subject: 'Mathematics',
                grade: 'Form 5',
                topic: 'Matrices (Multiplication & Inverse)',
                syllabus: 'UEC'
            })
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            console.error(await response.text());
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

        const types = counts.filter(c => c > 0).length;
        if (types >= 3) {
            console.log("✅ PASS: Correct answers are randomized across choices.");
        } else {
            console.warn("⚠️ WARNING: Distribution seems biased. Counts:", counts);
        }

    } catch (err: any) {
        console.error("Test failed:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

testAnswerRandomizationFinal();
