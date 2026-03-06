import React, { useEffect, useState } from 'react';
import { ResultEntry } from '../types';
import { BarChart3, TrendingUp, BookOpen, Target, Loader2 } from 'lucide-react';
import { Card } from './Card';

interface DataAnalysisProps {
    token: string;
}

interface SubjectStat {
    subject: string;
    totalQuestions: number;
    correctAnswers: number;
}

export const DataAnalysis: React.FC<DataAnalysisProps> = ({ token }) => {
    const [results, setResults] = useState<ResultEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await fetch('/api/results/my-results', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (res.ok) {
                    const data = await res.json();
                    setResults(data);
                }
            } catch (error) {
                console.error("Failed to fetch results for analysis:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [token]);

    if (loading) {
        return (
            <Card className="p-8 flex justify-center items-center border-2 border-brand-dark/5 shadow-xl relative overflow-hidden group">
                <Loader2 className="animate-spin text-brand-blue" size={32} />
            </Card>
        );
    }

    if (results.length === 0) {
        return (
            <Card className="p-8 border-2 border-brand-dark/5 shadow-xl relative overflow-hidden">
                <div className="text-center px-4 py-8">
                    <div className="w-16 h-16 bg-brand-dark/5 rounded-full flex items-center justify-center mx-auto mb-4">
                        <BarChart3 className="text-brand-dark/40" size={32} />
                    </div>
                    <h3 className="text-xl font-display font-bold text-brand-dark mb-2">No Data Yet</h3>
                    <p className="text-brand-dark/60 text-sm">
                        Complete some quests to see your performance analysis here!
                    </p>
                </div>
            </Card>
        );
    }

    // Aggregate results by subject
    const subjectStatsMap = results.reduce<Record<string, SubjectStat>>((acc, result) => {
        // If subject is missing, group under 'General' or based on mode
        const subj: string = result.subject || (result.mode === 'CUSTOM' ? 'Custom Quest' : 'General');
        if (!acc[subj]) {
            acc[subj] = { subject: subj, totalQuestions: 0, correctAnswers: 0 };
        }
        acc[subj].totalQuestions += result.totalQuestions;
        acc[subj].correctAnswers += result.correctAnswers;
        return acc;
    }, {});

    // Sort by total questions descending
    const subjectStats: SubjectStat[] = Object.values(subjectStatsMap);
    subjectStats.sort((a, b) => b.totalQuestions - a.totalQuestions);

    // Overall totals
    const totalQuestionsAll = subjectStats.reduce((sum, stat) => sum + stat.totalQuestions, 0);
    const totalCorrectAll = subjectStats.reduce((sum, stat) => sum + stat.correctAnswers, 0);
    const overallAccuracy = totalQuestionsAll > 0 ? Math.round((totalCorrectAll / totalQuestionsAll) * 100) : 0;

    return (
        <Card className="p-6 md:p-8 border-2 border-brand-dark/5 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 text-brand-blue rounded-xl flex items-center justify-center shadow-inner">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <h3 className="text-2xl font-display font-bold text-brand-dark">Performance Analysis</h3>
                    <p className="text-sm text-brand-dark/60">See how you're doing across different subjects</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-5 rounded-2xl border border-brand-dark/5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-brand-dark/5 rounded-full">
                        <BookOpen className="text-brand-dark/60" size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-wider mb-1">Total Questions</p>
                        <p className="text-3xl font-display font-bold text-brand-dark">{totalQuestionsAll}</p>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-brand-dark/5 shadow-sm flex items-center gap-4">
                    <div className="p-3 bg-green-100 rounded-full">
                        <Target className="text-brand-green" size={24} />
                    </div>
                    <div>
                        <p className="text-xs font-bold text-brand-dark/40 uppercase tracking-wider mb-1">Overall Accuracy</p>
                        <p className="text-3xl font-display font-bold text-brand-green">{overallAccuracy}%</p>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h4 className="font-bold text-brand-dark mb-4 px-1">Subject Breakdown</h4>
                {subjectStats.map((stat, idx) => {
                    const accuracy = stat.totalQuestions > 0 ? Math.round((stat.correctAnswers / stat.totalQuestions) * 100) : 0;
                    return (
                        <div key={idx} className="bg-white p-4 rounded-xl shadow-sm border border-brand-dark/5 relative overflow-hidden group hover:border-brand-blue/30 transition-colors">
                            <div className="flex justify-between items-end mb-2 relative z-10">
                                <div>
                                    <h5 className="font-bold text-brand-dark text-lg">{stat.subject}</h5>
                                    <p className="text-xs text-brand-dark/50 font-medium">
                                        {stat.correctAnswers} / {stat.totalQuestions} Correct
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className={`text-lg font-bold ${accuracy >= 80 ? 'text-brand-green' : accuracy >= 50 ? 'text-brand-orange' : 'text-red-500'}`}>
                                        {accuracy}%
                                    </span>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="w-full bg-brand-dark/5 h-2.5 rounded-full overflow-hidden relative z-10">
                                <div
                                    className={`h-full rounded-full transition-all duration-1000 ${accuracy >= 80 ? 'bg-brand-green' : accuracy >= 50 ? 'bg-brand-orange' : 'bg-red-500'}`}
                                    style={{ width: `${Math.max(accuracy, 2)}%` }} // At least 2% so dot is visible
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};
