import { Subject, Syllabus, GradeLevel } from '../types';

export interface PaperResource {
    syllabus: Syllabus;
    grade: GradeLevel;
    subject: Subject;
    year: string;
    url: string;
    label?: string; // Optional: describes the paper type, e.g. "Paper 1 + Scheme"
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPREHENSIVE PAST YEAR PAPER RESOURCE DATABASE
// Sources: bumigemilang.com, afterschool.my, papacambridge.com, xtremepapers.com
//          sgexamguru.com, seab.gov.sg, revisionvillage.com
// ─────────────────────────────────────────────────────────────────────────────
export const PAPER_RESOURCES: PaperResource[] = [

    // =========================================================================
    // SPM — Malaysian National Curriculum (KSSR/KSSM) — Form 5
    // =========================================================================

    // --- Bahasa Melayu ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BAHASA_MELAYU, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2023/', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BAHASA_MELAYU, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BAHASA_MELAYU, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BAHASA_MELAYU, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BAHASA_MELAYU, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-melayu-2019/', label: 'SPM 2019' },

    // --- English ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ENGLISH, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023 — Afterschool.my' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ENGLISH, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-inggeris-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ENGLISH, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-inggeris-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ENGLISH, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-inggeris-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ENGLISH, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-bahasa-inggeris-2019/', label: 'SPM 2019' },

    // --- Mathematics ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.MATH, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.MATH, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.MATH, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.MATH, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.MATH, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-2019/', label: 'SPM 2019' },

    // --- Additional Mathematics ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ADD_MATH, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ADD_MATH, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-tambahan-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ADD_MATH, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-tambahan-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ADD_MATH, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-tambahan-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.ADD_MATH, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-matematik-tambahan-2019/', label: 'SPM 2019' },

    // --- Physics ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.PHYSICS, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.PHYSICS, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-fizik-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.PHYSICS, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-fizik-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.PHYSICS, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-fizik-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.PHYSICS, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-fizik-2019/', label: 'SPM 2019' },

    // --- Chemistry ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.CHEMISTRY, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.CHEMISTRY, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-kimia-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.CHEMISTRY, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-kimia-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.CHEMISTRY, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-kimia-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.CHEMISTRY, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-kimia-2019/', label: 'SPM 2019' },

    // --- Biology ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BIOLOGY, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BIOLOGY, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-biologi-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BIOLOGY, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-biologi-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BIOLOGY, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-biologi-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.BIOLOGY, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-biologi-2019/', label: 'SPM 2019' },

    // --- Sejarah ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.SEJARAH, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2023/', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.SEJARAH, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.SEJARAH, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.SEJARAH, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2020/', label: 'SPM 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.SEJARAH, year: '2019', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-sejarah-2019/', label: 'SPM 2019' },

    // --- Geography ---
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.GEOGRAPHY, year: '2023', url: 'https://afterschool.my/bm/berita/soalan-sebenar-spm-2023-dan-skema-jawapan', label: 'SPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.GEOGRAPHY, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-geografi-2022/', label: 'SPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.GEOGRAPHY, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-geografi-2021/', label: 'SPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_5, subject: Subject.GEOGRAPHY, year: '2020', url: 'https://www.bumigemilang.com/soalan-sebenar-spm-geografi-2020/', label: 'SPM 2020' },

    // =========================================================================
    // PT3 — Malaysian National Curriculum (KSSR/KSSM) — Form 3
    // =========================================================================

    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.BAHASA_MELAYU, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-bahasa-melayu/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.ENGLISH, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-bahasa-inggeris/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.MATH, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-matematik/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.SCIENCE, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-sains/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.SEJARAH, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-sejarah/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.GEOGRAPHY, year: '2023', url: 'https://www.bumigemilang.com/soalan-pt3-geografi/', label: 'PT3 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.BAHASA_MELAYU, year: '2022', url: 'https://www.bumigemilang.com/soalan-pt3-bahasa-melayu/', label: 'PT3 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.MATH, year: '2022', url: 'https://www.bumigemilang.com/soalan-pt3-matematik/', label: 'PT3 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.SCIENCE, year: '2022', url: 'https://www.bumigemilang.com/soalan-pt3-sains/', label: 'PT3 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.SEJARAH, year: '2022', url: 'https://www.bumigemilang.com/soalan-pt3-sejarah/', label: 'PT3 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.BAHASA_MELAYU, year: '2019', url: 'https://www.bumigemilang.com/soalan-pt3-bahasa-melayu/', label: 'PT3 2019' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.MATH, year: '2019', url: 'https://www.bumigemilang.com/soalan-pt3-matematik/', label: 'PT3 2019' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_3, subject: Subject.SCIENCE, year: '2019', url: 'https://www.bumigemilang.com/soalan-pt3-sains/', label: 'PT3 2019' },

    // =========================================================================
    // UPSR — Malaysian National Curriculum (KSSR) — Standard 6
    // (UPSR abolished after 2021 — papers available up to 2021)
    // =========================================================================

    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.BAHASA_MELAYU, year: '2021', url: 'https://www.bumigemilang.com/soalan-upsr-bahasa-melayu/', label: 'UPSR 2021 (Last)' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.ENGLISH, year: '2021', url: 'https://www.bumigemilang.com/soalan-upsr-bahasa-inggeris/', label: 'UPSR 2021 (Last)' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.MATH, year: '2021', url: 'https://www.bumigemilang.com/soalan-upsr-matematik/', label: 'UPSR 2021 (Last)' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.SCIENCE, year: '2021', url: 'https://www.bumigemilang.com/soalan-upsr-sains/', label: 'UPSR 2021 (Last)' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.BAHASA_MELAYU, year: '2020', url: 'https://www.bumigemilang.com/soalan-upsr-bahasa-melayu/', label: 'UPSR 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.MATH, year: '2020', url: 'https://www.bumigemilang.com/soalan-upsr-matematik/', label: 'UPSR 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.SCIENCE, year: '2020', url: 'https://www.bumigemilang.com/soalan-upsr-sains/', label: 'UPSR 2020' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.BAHASA_MELAYU, year: '2019', url: 'https://www.bumigemilang.com/soalan-upsr-bahasa-melayu/', label: 'UPSR 2019' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.STD_6, subject: Subject.MATH, year: '2019', url: 'https://www.bumigemilang.com/soalan-upsr-matematik/', label: 'UPSR 2019' },

    // =========================================================================
    // STPM — Malaysian Form 6
    // =========================================================================

    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.MATH, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-matematik/', label: 'STPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.ADD_MATH, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-matematik-lanjutan/', label: 'STPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.PHYSICS, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-fizik/', label: 'STPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.CHEMISTRY, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-kimia/', label: 'STPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.BIOLOGY, year: '2023', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-biologi/', label: 'STPM 2023' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.MATH, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-matematik/', label: 'STPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.PHYSICS, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-fizik/', label: 'STPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.CHEMISTRY, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-kimia/', label: 'STPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.BIOLOGY, year: '2022', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-biologi/', label: 'STPM 2022' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.MATH, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-matematik/', label: 'STPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.PHYSICS, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-fizik/', label: 'STPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.CHEMISTRY, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-kimia/', label: 'STPM 2021' },
    { syllabus: Syllabus.KSSR_KSSM, grade: GradeLevel.FORM_6, subject: Subject.BIOLOGY, year: '2021', url: 'https://www.bumigemilang.com/soalan-sebenar-stpm-biologi/', label: 'STPM 2021' },

    // =========================================================================
    // IGCSE — Cambridge International (Year 11)
    // =========================================================================

    // --- Mathematics (0580) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.MATH, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-0580/2023', label: 'Cambridge 0580 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.MATH, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-0580/2022', label: 'Cambridge 0580 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.MATH, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-0580/2021', label: 'Cambridge 0580 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.MATH, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-0580/2020', label: 'Cambridge 0580 – 2020 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.MATH, year: '2019', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-0580/2019', label: 'Cambridge 0580 – 2019 | pastpapers.co' },

    // --- Additional Mathematics (0606) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ADD_MATH, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-Additional-0606/2023', label: 'Cambridge 0606 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ADD_MATH, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-Additional-0606/2022', label: 'Cambridge 0606 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ADD_MATH, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-Additional-0606/2021', label: 'Cambridge 0606 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ADD_MATH, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/Mathematics-Additional-0606/2020', label: 'Cambridge 0606 – 2020 | pastpapers.co' },

    // --- Physics (0625) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.PHYSICS, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/Physics-0625/2023', label: 'Cambridge 0625 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.PHYSICS, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/Physics-0625/2022', label: 'Cambridge 0625 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.PHYSICS, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/Physics-0625/2021', label: 'Cambridge 0625 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.PHYSICS, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/Physics-0625/2020', label: 'Cambridge 0625 – 2020 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.PHYSICS, year: '2019', url: 'https://pastpapers.co/caie/IGCSE/Physics-0625/2019', label: 'Cambridge 0625 – 2019 | pastpapers.co' },

    // --- Chemistry (0620) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.CHEMISTRY, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/Chemistry-0620/2023', label: 'Cambridge 0620 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.CHEMISTRY, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/Chemistry-0620/2022', label: 'Cambridge 0620 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.CHEMISTRY, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/Chemistry-0620/2021', label: 'Cambridge 0620 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.CHEMISTRY, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/Chemistry-0620/2020', label: 'Cambridge 0620 – 2020 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.CHEMISTRY, year: '2019', url: 'https://pastpapers.co/caie/IGCSE/Chemistry-0620/2019', label: 'Cambridge 0620 – 2019 | pastpapers.co' },

    // --- Biology (0610) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.BIOLOGY, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/Biology-0610/2023', label: 'Cambridge 0610 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.BIOLOGY, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/Biology-0610/2022', label: 'Cambridge 0610 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.BIOLOGY, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/Biology-0610/2021', label: 'Cambridge 0610 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.BIOLOGY, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/Biology-0610/2020', label: 'Cambridge 0610 – 2020 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.BIOLOGY, year: '2019', url: 'https://pastpapers.co/caie/IGCSE/Biology-0610/2019', label: 'Cambridge 0610 – 2019 | pastpapers.co' },

    // --- English First Language (0500) ---
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ENGLISH, year: '2023', url: 'https://pastpapers.co/caie/IGCSE/English-First-Language-0500/2023', label: 'Cambridge 0500 – 2023 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ENGLISH, year: '2022', url: 'https://pastpapers.co/caie/IGCSE/English-First-Language-0500/2022', label: 'Cambridge 0500 – 2022 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ENGLISH, year: '2021', url: 'https://pastpapers.co/caie/IGCSE/English-First-Language-0500/2021', label: 'Cambridge 0500 – 2021 | pastpapers.co' },
    { syllabus: Syllabus.IGCSE, grade: GradeLevel.YEAR_11, subject: Subject.ENGLISH, year: '2020', url: 'https://pastpapers.co/caie/IGCSE/English-First-Language-0500/2020', label: 'Cambridge 0500 – 2020 | pastpapers.co' },

    // =========================================================================
    // Singapore MOE O-Level — Secondary 4
    // =========================================================================

    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.MATH, year: '2023', url: 'https://www.sgexamguru.com/2023/11/2023-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 2023' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ADD_MATH, year: '2023', url: 'https://www.sgexamguru.com/2023/11/2023-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 4049 – 2023' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.PHYSICS, year: '2023', url: 'https://www.sgexamguru.com/2023/11/2023-gce-o-level-physics-5059-solutions.html', label: 'O-Level 5059 – 2023' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.CHEMISTRY, year: '2023', url: 'https://www.sgexamguru.com/2023/11/2023-gce-o-level-chemistry-5073-solutions.html', label: 'O-Level 5073 – 2023' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.BIOLOGY, year: '2023', url: 'https://www.sgexamguru.com/2023/11/2023-gce-o-level-biology-5086-solutions.html', label: 'O-Level 5086 – 2023' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ENGLISH, year: '2023', url: 'https://www.seab.gov.sg/home/examinations/gce-o-level/o-level-syllabuses-examined-for-2023', label: 'O-Level 2023 – SEAB' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.MATH, year: '2022', url: 'https://www.sgexamguru.com/2022/11/2022-gce-o-level-e-math-4048-solutions.html', label: 'O-Level 2022' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ADD_MATH, year: '2022', url: 'https://www.sgexamguru.com/2022/11/2022-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 4049 – 2022' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.PHYSICS, year: '2022', url: 'https://www.sgexamguru.com/2022/11/2022-gce-o-level-physics-5059-solutions.html', label: 'O-Level 2022' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.CHEMISTRY, year: '2022', url: 'https://www.sgexamguru.com/2022/11/2022-gce-o-level-chemistry-5073-solutions.html', label: 'O-Level 2022' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.MATH, year: '2021', url: 'https://www.sgexamguru.com/2021/11/2021-gce-o-level-e-math-4048-solutions.html', label: 'O-Level 2021' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ADD_MATH, year: '2021', url: 'https://www.sgexamguru.com/2021/11/2021-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 4049 – 2021' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.PHYSICS, year: '2021', url: 'https://www.sgexamguru.com/2021/11/2021-gce-o-level-physics-5059-solutions.html', label: 'O-Level 2021' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.CHEMISTRY, year: '2021', url: 'https://www.sgexamguru.com/2021/11/2021-gce-o-level-chemistry-5073-solutions.html', label: 'O-Level 2021' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.MATH, year: '2020', url: 'https://www.sgexamguru.com/2020/11/2020-gce-o-level-e-math-4048-solutions.html', label: 'O-Level 2020' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ADD_MATH, year: '2020', url: 'https://www.sgexamguru.com/2020/11/2020-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 4049 – 2020' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.PHYSICS, year: '2020', url: 'https://www.sgexamguru.com/2020/11/2020-gce-o-level-physics-5059-solutions.html', label: 'O-Level 2020' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.CHEMISTRY, year: '2020', url: 'https://www.sgexamguru.com/2020/11/2020-gce-o-level-chemistry-5073-solutions.html', label: 'O-Level 2020' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.MATH, year: '2019', url: 'https://www.sgexamguru.com/2019/11/2019-gce-o-level-e-math-4048-solutions.html', label: 'O-Level 2019' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.ADD_MATH, year: '2019', url: 'https://www.sgexamguru.com/2019/11/2019-gce-o-level-a-math-4049-solutions.html', label: 'O-Level 4049 – 2019' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.PHYSICS, year: '2019', url: 'https://www.sgexamguru.com/2019/11/2019-gce-o-level-physics-5059-solutions.html', label: 'O-Level 2019' },
    { syllabus: Syllabus.MOE_SINGAPORE, grade: GradeLevel.SEC_4, subject: Subject.CHEMISTRY, year: '2019', url: 'https://www.sgexamguru.com/2019/11/2019-gce-o-level-chemistry-5073-solutions.html', label: 'O-Level 2019' },

];

// ─────────────────────────────────────────────────────────────────────────────
// LOOKUP HELPERS
// ─────────────────────────────────────────────────────────────────────────────

export const getPaperResource = (
    syllabus: Syllabus | null,
    grade: GradeLevel | null,
    subject: Subject | null,
    year: string | null
): PaperResource | null => {
    if (!syllabus || !grade || !subject || !year) return null;

    // Normalize year for search (e.g., "2023" from "2023 (Latest)")
    const cleanYear = year.split(' ')[0];

    return PAPER_RESOURCES.find(r =>
        r.syllabus === syllabus &&
        r.grade === grade &&
        r.subject === subject &&
        r.year === cleanYear
    ) || null;
};

/** Returns all available years for a given syllabus/grade/subject combo */
export const getAvailableYears = (
    syllabus: Syllabus | null,
    grade: GradeLevel | null,
    subject: Subject | null
): string[] => {
    if (!syllabus || !grade || !subject) return [];
    return PAPER_RESOURCES
        .filter(r => r.syllabus === syllabus && r.grade === grade && r.subject === subject)
        .map(r => r.year)
        .sort((a, b) => parseInt(b) - parseInt(a)); // latest first
};
