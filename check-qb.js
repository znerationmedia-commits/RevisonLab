
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: "postgresql://neondb_owner:npg_mKhH0xCNkZ2B@ep-raspy-sun-aicnoi3v-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require"
        }
    }
});

async function main() {
    console.log("--- QuestionBank Content Check ---");
    try {
        const counts = await prisma.questionBank.groupBy({
            by: ['syllabus', 'grade', 'subject', 'year'],
            _count: { _all: true }
        });

        console.log(JSON.stringify(counts, null, 2));

        const lastFive = await prisma.questionBank.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            select: {
                id: true,
                subject: true,
                grade: true,
                syllabus: true,
                year: true,
                question: true
            }
        });

        console.log("\n--- Last 5 Questions ---");
        console.log(JSON.stringify(lastFive, null, 2));
    } catch (err) {
        console.error("Query failed:", err.message);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
