import prisma from './db';

async function main() {
    console.log('Start seeding QuestionBank...');

    const questions = [
        // MATHEMATICS - STANDARD 6 / YEAR 6 (KSSR)
        {
            subject: 'Mathematics',
            grade: 'Standard 6',
            syllabus: 'KSSR',
            topic: 'Algebra',
            year: 2023,
            question: 'Solve for x: 3x + 5 = 20',
            options: JSON.stringify(['5', '15', '25', '6']),
            correctAnswer: '5',
            explanation: 'Step 1: Subtract 5 from both sides: 3x = 15.\nStep 2: Divide by 3: x = 5.',
            difficulty: 'Easy',
            source: 'UPSR Clone 2023'
        },
        {
            subject: 'Mathematics',
            grade: 'Standard 6',
            syllabus: 'KSSR',
            topic: 'Algebra',
            year: 2022,
            question: 'If y = 2x + 1, find y when x = 4.',
            options: JSON.stringify(['7', '8', '9', '10']),
            correctAnswer: '9',
            explanation: 'Step 1: Substitute x = 4 into the equation.\nStep 2: y = 2(4) + 1 = 8 + 1 = 9.',
            difficulty: 'Easy',
            source: 'UPSR Clone 2022'
        },
        // SCIENCE - FORM 5 (KSSM)
        {
            subject: 'Science',
            grade: 'Form 5',
            syllabus: 'KSSM',
            topic: 'Electronics',
            year: 2022,
            question: 'Which component is used to amplify current?',
            options: JSON.stringify(['Resistor', 'Transistor', 'Capacitor', 'Diode']),
            correctAnswer: 'Transistor',
            explanation: 'Step 1: Recall component functions.\nStep 2: A transistor can be used as an amplifier or a switch.',
            difficulty: 'Medium',
            source: 'SPM 2022 Paper 1'
        },
        // BIOLOGY - IGCSE YEAR 11
        {
            subject: 'Biology',
            grade: 'Year 11 (IGCSE)',
            syllabus: 'IGCSE',
            topic: 'Cells',
            year: 2021,
            question: 'Which structure is found in plant cells but not in animal cells?',
            options: JSON.stringify(['Nucleus', 'Cell Membrane', 'Cell Wall', 'Mitochondria']),
            correctAnswer: 'Cell Wall',
            explanation: 'Step 1: Compare plant and animal cell structures.\nStep 2: Cell walls are unique to plant cells (and some bacteria/fungi), providing structure.',
            difficulty: 'Easy',
            source: 'IGCSE 2021 Paper 2'
        },
        // PHYSICS - FORM 4 (KSSM)
        {
            subject: 'Physics',
            grade: 'Form 4',
            syllabus: 'KSSM',
            topic: 'Force and Motion',
            year: 2023,
            question: 'What is the SI unit for Force?',
            options: JSON.stringify(['Joule', 'Newton', 'Watt', 'Pascal']),
            correctAnswer: 'Newton',
            explanation: 'Step 1: Recall SI units.\nStep 2: Force is measured in Newtons (N).',
            difficulty: 'Easy',
            source: 'SPM Trial 2023'
        },
        // ADDITIONAL MATH - FORM 5
        {
            subject: 'Additional Mathematics',
            grade: 'Form 5',
            syllabus: 'KSSM',
            topic: 'Differentiation',
            year: 2020,
            question: 'Find the gradient of the curve y = 2x^2 at x = 3.',
            options: JSON.stringify(['4', '6', '12', '18']),
            correctAnswer: '12',
            explanation: 'Step 1: Differentiate y = 2x^2 to get dy/dx = 4x.\nStep 2: Substitute x = 3: 4(3) = 12.',
            difficulty: 'Medium',
            source: 'SPM 2020'
        }
    ];

    for (const q of questions) {
        await prisma.questionBank.create({
            data: q
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
