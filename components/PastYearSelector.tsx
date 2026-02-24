import React from 'react';
import { Subject, Syllabus, GradeLevel } from '../types';
import { BookOpen, ScrollText, Calendar } from 'lucide-react';

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
                    {years.map((year) => (
                        <button
                            key={year}
                            onClick={() => onYearSelect(year)}
                            className={`p-4 rounded-xl border-2 font-bold text-center transition-all flex items-center justify-center gap-2 ${selectedYear === year ? 'border-brand-green bg-green-50 text-brand-green shadow-sm' : 'border-brand-dark/10 bg-white/50 hover:bg-white hover:border-brand-dark/20'}`}
                        >
                            <Calendar size={18} className={selectedYear === year ? 'text-brand-green' : 'text-brand-dark/40'} />
                            <span>{year}</span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
