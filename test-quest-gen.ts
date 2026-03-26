import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function testQuestGenFinal() {
    const authUrl = 'http://localhost:5000/api/auth/signup';
    const genUrl = 'http://localhost:5000/api/generate/quest';
    
    console.log("1. Creating test user...");
    const email = `verify_${Date.now()}@test.com`;
    const password = 'password123';
    
    try {
        const signupRes = await fetch(authUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Verify User',
                email: email,
                password: password,
                role: 'student'
            })
        });

        const signupData = await signupRes.json();
        const userId = signupData.user.id;
        const token = signupData.token;
        console.log(`✅ User created (ID: ${userId}).`);

        console.log("2. Activating subscription manually...");
        await prisma.subscription.create({
            data: {
                userId: userId,
                planId: 'pro',
                status: 'active',
                currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            }
        });
        console.log("✅ Subscription activated.");

        console.log("3. Testing question generation quantity...");
        const response = await fetch(genUrl, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                subject: 'Mathematics',
                grade: 'Form 5',
                topic: 'Matrices (Inverse, Determinants)',
                syllabus: 'UEC'
            })
        });

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            console.error(await response.text());
            return;
        }

        const data = await response.json();
        console.log("Response status:", response.status);
        console.log("Number of questions generated:", data.length);
        
        if (Array.isArray(data)) {
            if (data.length >= 15) console.log("✅ PASS: Generated 15+ questions.");
            else console.log(`⚠️ Generated ${data.length} questions.`);
        }
    } catch (err: any) {
        console.error("Test failed:", err.message);
    } finally {
        await prisma.$disconnect();
    }
}

testQuestGenFinal();
