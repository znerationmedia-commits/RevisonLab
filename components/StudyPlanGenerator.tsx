import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Subject, Syllabus, GradeLevel } from '../types';
import { geminiService, StudyPlanRequest, StudyPlanResponse } from '../services/geminiService';
import { Button } from './Button';
import { Card } from './Card';
import { Calendar, Loader2, Sparkles, Clock, Target, CheckCircle2, BookOpen, ArrowLeft } from 'lucide-react';

export const StudyPlanGenerator: React.FC = () => {
    const navigate = useNavigate();
    const [subject, setSubject] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [syllabus, setSyllabus] = useState<string>('');
    const [timeframe, setTimeframe] = useState<string>('4 Weeks');
    const [hoursPerDay, setHoursPerDay] = useState<string>('2');
    const [goals, setGoals] = useState<string>('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [studyPlan, setStudyPlan] = useState<StudyPlanResponse | null>(null);

    const handleGenerate = async () => {
        if (!subject || !grade || !syllabus || !timeframe || !hoursPerDay) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        setError(null);
        try {
            const plan = await geminiService.generateStudyPlan({
                subject,
                grade,
                syllabus,
                timeframe,
                hoursPerDay,
                goals
            });
            setStudyPlan(plan);
        } catch (err: any) {
            if (err.message === 'USER_LIMIT_REACHED') {
                setError('You have reached your free AI generation limit. Please upgrade to Pro.');
            } else {
                setError(err.message || 'Failed to generate study plan. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Back
                </Button>
            </div>

            <div className="text-center space-y-3 mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-brand-blue/10 text-brand-blue mb-4">
                    <Calendar size={32} />
                </div>
                <h2 className="text-4xl font-display font-bold text-brand-dark">AI Study Plan Generator</h2>
                <p className="text-brand-dark/60 font-medium">Let our AI build a personalized, day-by-day roadmap to help you ace your exams.</p>
            </div>

            {!studyPlan ? (
                <Card className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Syllabus</label>
                            <select
                                value={syllabus}
                                onChange={(e) => setSyllabus(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            >
                                <option value="" disabled>Select Syllabus...</option>
                                {Object.values(Syllabus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Grade Level</label>
                            <select
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            >
                                <option value="" disabled>Select Grade...</option>
                                {Object.values(GradeLevel).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Target Subject</label>
                            <select
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            >
                                <option value="" disabled>Select Subject...</option>
                                {Object.values(Subject).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Timetable Length</label>
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            >
                                <option value="1 Week">1 Week (Crash Course)</option>
                                <option value="2 Weeks">2 Weeks</option>
                                <option value="4 Weeks">1 Month (Recommended)</option>
                                <option value="2 Months">2 Months</option>
                                <option value="3 Months">3 Months (Deep Prep)</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Hours per Day</label>
                            <select
                                value={hoursPerDay}
                                onChange={(e) => setHoursPerDay(e.target.value)}
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all"
                            >
                                <option value="1">1 Hour</option>
                                <option value="2">2 Hours</option>
                                <option value="3">3 Hours</option>
                                <option value="4">4 Hours (Intensive)</option>
                                <option value="5+">5+ Hours (Full Time)</option>
                            </select>
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-bold text-brand-dark/70 uppercase tracking-wide">Specific Goals (Optional)</label>
                            <input
                                type="text"
                                value={goals}
                                onChange={(e) => setGoals(e.target.value)}
                                placeholder="e.g. Focus on organic chemistry, improve MCQs, etc."
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 bg-gray-50/50 font-medium focus:ring-2 focus:ring-brand-blue/20 outline-none transition-all text-sm"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm font-bold border border-red-100 flex items-center gap-2">
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <Button
                        size="lg"
                        fullWidth
                        onClick={handleGenerate}
                        disabled={loading || !subject || !grade || !syllabus}
                        className="py-5 text-lg shadow-xl shadow-brand-blue/20 mt-4 group"
                    >
                        {loading ? (
                            <><Loader2 className="animate-spin mr-2" /> Architecting your plan...</>
                        ) : (
                            <><Sparkles className="mr-2 group-hover:scale-110 transition-transform" /> Generate My Study Plan</>
                        )}
                    </Button>
                </Card>
            ) : (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                    <Card className="p-8 bg-gradient-to-br from-brand-blue to-indigo-600 text-white shadow-2xl overflow-hidden relative border-0">
                        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl mix-blend-overlay" />

                        <div className="relative z-10 space-y-4">
                            <h3 className="text-3xl font-display font-bold">{studyPlan.title}</h3>
                            <p className="text-white/80 text-lg leading-relaxed">{studyPlan.overview}</p>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                                    <Target size={16} /> {subject}
                                </span>
                                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                                    <Clock size={16} /> {timeframe} ({hoursPerDay}h/day)
                                </span>
                            </div>
                        </div>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="md:col-span-2 space-y-6">
                            <h4 className="text-2xl font-bold text-brand-dark ml-2">Weekly Schedule</h4>
                            <div className="space-y-4">
                                {studyPlan.weeks.map((week, idx) => (
                                    <Card key={idx} className="p-6 border-2 border-brand-dark/5 hover:border-brand-blue/30 transition-colors">
                                        <div className="flex items-start gap-4">
                                            <div className="shrink-0 w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center font-bold text-xl shadow-inner">
                                                W{week.weekNumber}
                                            </div>
                                            <div className="space-y-3 flex-1">
                                                <h5 className="font-bold text-lg text-brand-dark">{week.focus}</h5>
                                                <ul className="space-y-2">
                                                    {week.tasks.map((task, tIdx) => (
                                                        <li key={tIdx} className="flex items-start gap-2 text-brand-dark/70 text-sm">
                                                            <CheckCircle2 size={16} className="text-brand-green shrink-0 mt-0.5" />
                                                            <span className="leading-snug">{task}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-6">
                            <h4 className="text-2xl font-bold text-brand-dark ml-2">Pro Tips</h4>
                            <Card className="p-6 bg-orange-50/50 border-2 border-brand-orange/10">
                                <ul className="space-y-4">
                                    {studyPlan.tips.map((tip, idx) => (
                                        <li key={idx} className="flex items-start gap-3">
                                            <div className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                                {idx + 1}
                                            </div>
                                            <p className="text-sm text-brand-dark/80 font-medium leading-relaxed">{tip}</p>
                                        </li>
                                    ))}
                                </ul>
                            </Card>

                            <Button
                                variant="outline"
                                fullWidth
                                onClick={() => setStudyPlan(null)}
                                className="border-brand-dark/20 hover:bg-gray-50"
                            >
                                Generate Another Plan
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
