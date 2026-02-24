import { Subject, Syllabus, GradeLevel } from '../types';

export interface PaperResource {
    syllabus: Syllabus;
    grade: GradeLevel;
    subject: Subject;
    year: string;
    url: string;
}

export const PAPER_RESOURCES: PaperResource[] = [
    // SPM (KSSR/KSSM Form 5)
    {
        syllabus: Syllabus.KSSR_KSSM,
        grade: GradeLevel.FORM_5,
        subject: Subject.MATH,
        year: '2023',
        url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan' // Example aggregate link
    },
    {
        syllabus: Syllabus.KSSR_KSSM,
        grade: GradeLevel.FORM_5,
        subject: Subject.SEJARAH,
        year: '2023',
        url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2023/'
    },
    {
        syllabus: Syllabus.KSSR_KSSM,
        grade: GradeLevel.FORM_5,
        subject: Subject.BAHASA_MELAYU,
        year: '2023',
        url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2023/'
    },
    // IGCSE
    {
        syllabus: Syllabus.IGCSE,
        grade: GradeLevel.YEAR_11,
        subject: Subject.MATH,
        year: '2023',
        url: 'https://papacambridge.com/cambridge/igcse/mathematics-0580/2023/'
    },
    {
        syllabus: Syllabus.IGCSE,
        grade: GradeLevel.YEAR_11,
        subject: Subject.PHYSICS,
        year: '2023',
        url: 'https://papacambridge.com/cambridge/igcse/physics-0625/2023/'
    }
];

export const getPaperResource = (syllabus: Syllabus | null, grade: GradeLevel | null, subject: Subject | null, year: string | null): string | null => {
    if (!syllabus || !grade || !subject || !year) return null;

    // Normalize year for search (e.g., "2023" from "2023 (Latest)")
    const cleanYear = year.split(' ')[0];

    const resource = PAPER_RESOURCES.find(r =>
        r.syllabus === syllabus &&
        r.grade === grade &&
        r.subject === subject &&
        r.year === cleanYear
    );

    return resource?.url || null;
};
