
import prisma from './db';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });
dotenv.config();

const STATIC_SYLLABI = [
    {
        subject: "Mathematics",
        grade: "Form 4",
        syllabus: "KSSM",
        topics: [
            "Chapter 1: Quadratic Functions and Equations in One Variable",
            "Chapter 2: Number Bases",
            "Chapter 3: Logical Reasoning",
            "Chapter 4: Operations on Sets",
            "Chapter 5: Network in Graph Theory",
            "Chapter 6: Linear Inequalities in Two Variables",
            "Chapter 7: Graphs of Motion",
            "Chapter 8: Measures of Dispersion for Ungrouped Data",
            "Chapter 9: Probability of Combined Events",
            "Chapter 10: Consumer Mathematics: Financial Management"
        ]
    },
    {
        subject: "Science",
        grade: "Form 2",
        syllabus: "KSSM",
        topics: [
            "Chapter 1: Biodiversity",
            "Chapter 2: Ecosystem",
            "Chapter 3: Nutrition",
            "Chapter 4: Human Health",
            "Chapter 5: Water and Solution",
            "Chapter 6: Acid and Alkali",
            "Chapter 7: Electricity and Magnetism",
            "Chapter 8: Force and Motion",
            "Chapter 9: Heat",
            "Chapter 10: Sound Waves",
            "Chapter 11: Stars and Galaxies in the Universe",
            "Chapter 12: Solar System",
            "Chapter 13: Meteoroid, Asteroid, Comet"
        ]
    },
    {
        subject: "Bahasa Melayu",
        grade: "Form 5",
        syllabus: "KSSM",
        topics: [
            "Tema 1: Merealisasikan Impian",
            "Tema 2: Insan Terdidik, Negara Sejahtera",
            "Tema 3: Memetik Bintang",
            "Tema 4: Menjulang Harapan di Bumi Bertuah",
            "Tema 5: Memacu Produktiviti",
            "Tema 6: Dunia Pelancongan",
            "Tema 7: Demi Kedamaian",
            "Tema 8: Dalam Lipatan Kenangan",
            "Tema 9: Melestarikan Warisan",
            "Tema 10: Pesaing Hebat",
            "Tema 11: Dunia Selamat Milik Kita"
        ]
    },
    {
        subject: "History",
        grade: "Form 5",
        syllabus: "KSSM",
        topics: [
            "Bab 1: Kedaulatan Negara",
            "Bab 2: Perlembagaan Persekutuan",
            "Bab 3: Raja Berperlembagaan dan Demokrasi Berparlimen",
            "Bab 4: Sistem Persekutuan",
            "Bab 5: Pembentukan Malaysia",
            "Bab 6: Cabaran Selepas Pembentukan Malaysia",
            "Bab 7: Membina Kesejahteraan Negara",
            "Bab 8: Membina Kemakmuran Negara",
            "Bab 9: Dasar Luar Malaysia",
            "Bab 10: Kecemerlangan Malaysia di Persada Dunia"
        ]
    },
    {
        subject: "Biology",
        grade: "Year 11 (IGCSE)",
        syllabus: "Cambridge IGCSE",
        topics: [
            "1. Characteristics and classification of living organisms",
            "2. Organization of the organism",
            "3. Movement in and out of cells",
            "4. Biological molecules",
            "5. Enzymes",
            "6. Plant nutrition",
            "7. Human nutrition",
            "8. Transport in plants",
            "9. Transport in animals",
            "10. Diseases and immunity",
            "11. Gas exchange in humans",
            "12. Respiration",
            "13. Excretion in humans",
            "14. Coordination and response",
            "15. Drugs",
            "16. Reproduction",
            "17. Inheritance",
            "18. Variation and selection",
            "19. Organisms and their environment",
            "20. Biotechnology and genetic engineering",
            "21. Human influences on ecosystems"
        ]
    }
];

async function main() {
    console.log("🚀 Starting Static Syllabus Seeder...");

    for (const data of STATIC_SYLLABI) {
        console.log(`Processing ${data.subject} (${data.grade})...`);

        await prisma.courseSyllabus.upsert({
            where: {
                subject_grade_syllabus: {
                    subject: data.subject,
                    grade: data.grade,
                    syllabus: data.syllabus
                }
            },
            update: {
                topics: JSON.stringify(data.topics)
            },
            create: {
                subject: data.subject,
                grade: data.grade,
                syllabus: data.syllabus,
                topics: JSON.stringify(data.topics)
            }
        });
    }

    console.log("✅ Syllabus seeding complete!");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());
