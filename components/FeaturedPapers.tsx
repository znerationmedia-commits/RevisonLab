import React from 'react';
import { Subject, Syllabus, GradeLevel } from '../types';
import { Card } from './Card';
import { Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface FeaturedPaper {
    title: string;
    syllabus: Syllabus;
    subject: Subject;
    grade: GradeLevel;
    year: string;
    description: string;
    color: string;
}

const FEATURED_PAPERS: FeaturedPaper[] = [
    {
        title: 'SPM History 2023',
        syllabus: Syllabus.KSSR_KSSM,
        subject: Subject.SEJARAH,
        grade: GradeLevel.FORM_5,
        year: '2023',
        description: 'Complete Paper 1 simulation with latest KSSM format.',
        color: 'border-orange-500/20 bg-orange-50/30'
    },
    {
        title: 'SPM Mathematics 2023',
        syllabus: Syllabus.KSSR_KSSM,
        subject: Subject.MATH,
        grade: GradeLevel.FORM_5,
        year: '2023',
        description: 'Master the common calculation types from the latest SPM exam.',
        color: 'border-blue-500/20 bg-blue-50/30'
    },
    {
        title: 'IGCSE Physics 2023',
        syllabus: Syllabus.IGCSE,
        subject: Subject.PHYSICS,
        grade: GradeLevel.YEAR_11,
        year: '2023',
        description: 'Practice conceptual questions from the Cambridge 0625 paper.',
        color: 'border-purple-500/20 bg-purple-50/30'
    }
];

export const FeaturedPapers: React.FC<{ onQuickStart: (paper: FeaturedPaper) => void }> = ({ onQuickStart }) => {
    return (
        <section className="py-20 px-4 max-w-6xl mx-auto">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-brand-green/10 text-brand-green px-4 py-2 rounded-full font-bold text-sm mb-4">
                    <Calendar size={16} /> NEW FEATURE
                </div>
                <h2 className="text-4xl font-display font-bold text-brand-dark mb-4">Featured Past Year Papers</h2>
                <p className="text-brand-dark/50 max-w-2xl mx-auto font-medium">
                    Dive directly into specialized practice sessions that mimic official exam papers from recent years.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {FEATURED_PAPERS.map((paper, idx) => (
                    <Card
                        key={idx}
                        className={`p-6 border-2 transition-all flex flex-col h-full grayscale opacity-70 ${paper.color}`}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm text-2xl">
                                {paper.subject === Subject.SEJARAH ? '🏛️' : paper.subject === Subject.MATH ? '➗' : '⚛️'}
                            </div>
                            <div className="flex flex-col items-end gap-1">
                                <div className="text-xs font-bold bg-white/50 px-2 py-1 rounded-lg uppercase tracking-wider text-brand-dark/40">
                                    {paper.year}
                                </div>
                                <div className="text-[10px] font-bold bg-brand-orange text-white px-2 py-0.5 rounded-full uppercase tracking-tighter">
                                    Coming Soon
                                </div>
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-brand-dark mb-2">{paper.title}</h3>
                        <p className="text-sm text-brand-dark/60 mb-6 flex-1 font-medium">{paper.description}</p>

                        <div className="flex items-center justify-between mt-auto">
                            <span className="text-xs font-bold text-brand-dark/40 uppercase tracking-widest">{paper.syllabus.split(' ')[0]}</span>
                            <div className="flex items-center gap-1.5 text-brand-dark/30 font-bold text-sm italic">
                                Release {paper.year === '2023' ? 'Q1' : 'Q2'} <ArrowRight size={16} className="opacity-20" />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <div className="text-center mt-12">
                <p className="text-sm font-bold text-brand-dark/30 uppercase tracking-[0.2em] mb-4">And Many More Subjects Available</p>
                <div className="flex flex-wrap justify-center gap-2 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                    <span className="bg-brand-dark/5 px-3 py-1 rounded-lg text-xs font-bold">Additional Mathematics</span>
                    <span className="bg-brand-dark/5 px-3 py-1 rounded-lg text-xs font-bold">Bahasa Melayu</span>
                    <span className="bg-brand-dark/5 px-3 py-1 rounded-lg text-xs font-bold">English</span>
                    <span className="bg-brand-dark/5 px-3 py-1 rounded-lg text-xs font-bold">Biology</span>
                    <span className="bg-brand-dark/5 px-3 py-1 rounded-lg text-xs font-bold">Chemistry</span>
                </div>
            </div>
        </section>
    );
};
