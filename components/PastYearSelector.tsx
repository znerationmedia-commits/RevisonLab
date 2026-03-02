import React, { useState, useEffect } from 'react';
import { Subject, Syllabus, GradeLevel } from '../types';
import { BookOpen, ScrollText, Calendar, ExternalLink, AlertCircle } from 'lucide-react';
import { getPaperResource } from '../services/paperResources';

interface PastYearSelectorProps {
    selectedSyllabus: Syllabus | null;
    selectedGrade: GradeLevel | null;
    selectedSubject: Subject | null;
    selectedYear: string | null;
    onSyllabusSelect: (syll: Syllabus) => void;
    onGradeSelect: (grade: GradeLevel) => void;
    onSubjectSelect: (subject: Subject) => void;
    onYearSelect: (year: string) => void;
    getGradesBySyllabus: (syll: Syllabus) => { primary: GradeLevel[], secondary: GradeLevel[], advanced?: GradeLevel[] };
    getSubjectsByGrade: (grade: GradeLevel | null, syllabus: Syllabus | null) => any[];
}

export const PastYearSelector: React.FC<PastYearSelectorProps> = ({
    selectedSyllabus,
    selectedGrade,
    selectedSubject,
    selectedYear,
    onSyllabusSelect,
    onGradeSelect,
    onSubjectSelect,
    onYearSelect,
    getGradesBySyllabus,
    getSubjectsByGrade
}) => {
    const years = ['2024 (Latest)', '2023', '2022', '2021', '2020', '2019'];

    // Fetch real question counts per year for the badge display
    const [yearCounts, setYearCounts] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!selectedSyllabus || !selectedGrade || !selectedSubject) {
            setYearCounts({});
            return;
        }

        const params = new URLSearchParams({
            syllabus: selectedSyllabus,
            grade: selectedGrade,
            subject: selectedSubject
        });

        fetch(`/api/question-bank/count?${params}`)
            .then(r => r.ok ? r.json() : {})
            .then(data => setYearCounts(data || {}))
            .catch(() => setYearCounts({}));
    }, [selectedSyllabus, selectedGrade, selectedSubject]);

    // Look up if a paper resource exists for the current selection
    const paperResource = selectedSyllabus && selectedGrade && selectedSubject && selectedYear
        ? getPaperResource(selectedSyllabus, selectedGrade, selectedSubject, selectedYear)
        : null;

    return (
        <div className="space-y-8">
            {/* Step 1: Syllabus Selection */}
            <div>
                <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">1. Select Syllabus</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {Object.values(Syllabus).map((syll) => (
                        <button
                            key={syll}
                            onClick={() => onSyllabusSelect(syll)}
                            className={`p-4 rounded-xl border-2 font-bold text-left transition-all flex items-center gap-3 ${selectedSyllabus === syll ? 'border-brand-accent bg-orange-50 text-brand-accent shadow-sm' : 'border-brand-dark/10 bg-white/50 hover:bg-white hover:border-brand-dark/20'}`}
                        >
                            <ScrollText size={20} className={selectedSyllabus === syll ? 'text-brand-accent' : 'text-brand-dark/40'} />
                            <span>{syll}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Step 2: Grade Selection */}
            <div>
                <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">2. Select Grade / Level</label>
                <div className="space-y-4">
                    {selectedSyllabus && (() => {
                        const grades = getGradesBySyllabus(selectedSyllabus);
                        return (
                            <>
                                {grades.primary.length > 0 && (
                                    <div>
                                        <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Primary</span>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                            {grades.primary.map((grade) => (
                                                <button
                                                    key={grade}
                                                    onClick={() => onGradeSelect(grade)}
                                                    className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {grades.secondary.length > 0 && (
                                    <div>
                                        <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Secondary</span>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                            {grades.secondary.map((grade) => (
                                                <button
                                                    key={grade}
                                                    onClick={() => onGradeSelect(grade)}
                                                    className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {grades.advanced && grades.advanced.length > 0 && (
                                    <div>
                                        <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Advanced</span>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                            {grades.advanced.map((grade) => (
                                                <button
                                                    key={grade}
                                                    onClick={() => onGradeSelect(grade)}
                                                    className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                                >
                                                    {grade}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        );
                    })()}
                </div>
            </div>

            {/* Step 3: Subject Selection */}
            <div>
                <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">3. Choose Subject</label>
                {!selectedGrade ? (
                    <div className="flex flex-col items-center justify-center h-24 border-2 border-dashed border-brand-dark/20 rounded-xl text-brand-dark/40">
                        <BookOpen size={24} className="mb-1" />
                        <p className="text-sm">Select a grade first</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                        {getSubjectsByGrade(selectedGrade, selectedSyllabus).map((sub) => (
                            <button
                                key={sub.id}
                                onClick={() => onSubjectSelect(sub.id)}
                                className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedSubject === sub.id ? 'border-brand-blue bg-white shadow-md scale-105' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                            >
                                <div className={`${sub.color} w-10 h-10 flex items-center justify-center rounded-full text-lg shadow-sm`}>{sub.icon}</div>
                                <span className="font-bold text-xs text-center leading-tight">{sub.id}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Step 4: Year Selection */}
            <div>
                <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">4. Select Paper Year</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {years.map((year) => {
                        const yearNum = year.split(' ')[0];
                        const count = yearCounts[yearNum] || 0;
                        const hasReal = count >= 10;

                        return (
                            <button
                                key={year}
                                onClick={() => onYearSelect(year)}
                                className={`p-4 rounded-xl border-2 font-bold text-center transition-all flex flex-col items-center justify-center gap-1.5 ${selectedYear === year ? 'border-brand-green bg-green-50 text-brand-green shadow-sm' : 'border-brand-dark/10 bg-white/50 hover:bg-white hover:border-brand-dark/20'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className={selectedYear === year ? 'text-brand-green' : 'text-brand-dark/40'} />
                                    <span>{year}</span>
                                </div>
                                {selectedSyllabus && selectedGrade && selectedSubject && hasReal && (
                                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                                        ✓ {count} Real Questions
                                    </span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Source Material — shown when all 4 steps are complete */}
            {selectedSyllabus && selectedGrade && selectedSubject && selectedYear && (
                <div className="mt-8 animate-float">
                    {paperResource ? (
                        /* ── PAPER FOUND: show the clickable redirect button ── */
                        <div className="p-4 bg-brand-green/5 rounded-2xl border border-brand-green/20 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green shrink-0">
                                    <BookOpen size={20} />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-brand-dark">Study the Original Paper</p>
                                    <p className="text-xs text-brand-dark/50 font-medium">
                                        {paperResource.label ?? `${selectedSubject} — ${selectedYear.split(' ')[0]}`}
                                    </p>
                                </div>
                            </div>
                            <a
                                href={paperResource.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-brand-green text-white px-4 py-2 rounded-xl font-bold text-sm shadow-sm hover:bg-brand-green/90 active:scale-95 transition-all whitespace-nowrap shrink-0"
                                title={`Open original paper source: ${paperResource.url}`}
                            >
                                <ExternalLink size={15} />
                                Open PDF Source
                            </a>
                        </div>
                    ) : (
                        /* ── NO PAPER: graceful fallback ── */
                        <div className="p-4 bg-brand-dark/3 rounded-2xl border border-brand-dark/10 flex items-center gap-3">
                            <div className="w-10 h-10 bg-brand-dark/5 rounded-full flex items-center justify-center shrink-0">
                                <AlertCircle size={18} className="text-brand-dark/30" />
                            </div>
                            <div>
                                <p className="text-sm font-bold text-brand-dark/50">Original paper source not yet linked</p>
                                <p className="text-xs text-brand-dark/35 font-medium">
                                    We're still compiling verified resources for this combination. Check back soon.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
