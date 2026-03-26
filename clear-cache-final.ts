import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function clearSyllabusCache() {
  console.log("🧹 Clearing courseSyllabus cache...");
  try {
    const deleted = await prisma.courseSyllabus.deleteMany({});
    console.log(`✅ Deleted ${deleted.count} cached syllabuses.`);
  } catch (err: any) {
    console.error("❌ Failed to clear syllabus cache:", err.message);
  } finally {
    await prisma.$disconnect();
  }
}

clearSyllabusCache();
