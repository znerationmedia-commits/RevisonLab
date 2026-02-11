import React, { useState, useEffect } from 'react';
import { Question, CustomQuest, Subject, GradeLevel, Syllabus } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { Plus, Trash2, Save, ArrowLeft, BookOpen, CheckCircle, HelpCircle, Loader2, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

interface TeacherDashboardProps {
    onBack: () => void;
    onViewPricing: () => void;
}

export const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ onBack, onViewPricing }) => {
    const { user, refreshUser } = useAuth();

    useEffect(() => {
        refreshUser();
    }, []);

    if (!user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Loader2 className="animate-spin text-brand-orange" size={40} />
                <p className="text-brand-dark/60">Loading your profile...</p>
            </div>
        );
    }

    const [quests, setQuests] = useState<CustomQuest[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [questTitle, setQuestTitle] = useState('');
    const [questSubject, setQuestSubject] = useState<Subject | ''>('');
    const [questGrade, setQuestGrade] = useState<GradeLevel | ''>('');
    const [questSyllabus, setQuestSyllabus] = useState<Syllabus | ''>(() => {
        const subLevel = (user as any)?.subscriptionLevel;
        const subSyllabus = (user as any)?.subscribedSyllabus;
        return (user?.isSubscribed && subLevel === 'single' && subSyllabus) ? subSyllabus as Syllabus : '';
    });
    const [questions, setQuestions] = useState<Question[]>([]);

    // Current Question Form State
    const [currentQText, setCurrentQText] = useState('');
    const [option1, setOption1] = useState('');
    const [option2, setOption2] = useState('');
    const [option3, setOption3] = useState('');
    const [option4, setOption4] = useState('');
    const [correctIndex, setCorrectIndex] = useState(0);
    const [explanation, setExplanation] = useState('');

    const fetchQuests = async () => {
        if (!user) return;
        setIsLoading(true);
        try {
            const res = await fetch('/api/quests');
            if (res.ok) {
                const data = await res.json();
                // Filter quests created by this user
                const myQuests = data.filter((q: any) => q.creatorId === user?.id);
                setQuests(myQuests);
            }
        } catch (error) {
            console.error("Failed to fetch quests", error);
        }
        setIsLoading(false);
    };

    // Load quests from API
    useEffect(() => {
        fetchQuests();
    }, [user, isCreating]);

    const handleAddQuestion = () => {
        if (!user?.isSubscribed && questions.length >= 1) {
            alert("Free accounts are limited to 1 question per quest. Upgrade to Pro for unlimited questions!");
            onViewPricing();
            return;
        }

        if (!currentQText || !option1 || !option2 || !option3 || !option4 || !explanation) {
            alert("Please fill in all fields for the question.");
            return;
        }

        const newQuestion: Question = {
            id: `q-${Date.now()}`,
            text: currentQText,
            options: [option1, option2, option3, option4],
            correctAnswerIndex: correctIndex,
            explanation: explanation
        };

        setQuestions([...questions, newQuestion]);

        // Reset form
        setCurrentQText('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectIndex(0);
        setExplanation('');
    };

    const handleRemoveQuestion = (index: number) => {
        const newQuestions = [...questions];
        newQuestions.splice(index, 1);
        setQuestions(newQuestions);
    };

    const handleSaveQuest = async () => {
        if (!questTitle || !questSubject || !questGrade || !questSyllabus) {
            alert("Please enter title, subject, grade, and syllabus.");
            return;
        }

        const subLevel = (user as any)?.subscriptionLevel;
        const subSyllabus = (user as any)?.subscribedSyllabus;

        if (user?.isSubscribed && subLevel === 'single' && questSyllabus !== subSyllabus) {
            alert(`Your current plan only allows creating quests for the ${subSyllabus} syllabus. Please upgrade to "All Syllabus" for full access.`);
            return;
        }
        if (questions.length === 0) {
            alert("Please add at least one question.");
            return;
        }

        setIsLoading(true);
        const token = localStorage.getItem('quest_token');

        try {
            const res = await fetch('/api/quests', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    title: questTitle,
                    subject: questSubject,
                    grade: questGrade,
                    syllabus: questSyllabus,
                    questions: questions
                })
            });

            if (res.ok) {
                alert("Quest saved successfully!");
                setIsCreating(false);
                setQuestTitle('');
                setQuestSubject('');
                setQuestGrade('');
                setQuestSyllabus((user as any)?.subscriptionLevel === 'single' ? (user as any)?.subscribedSyllabus : '');
                setQuestions([]);
                fetchQuests(); // Refresh the list
            } else {
                const err = await res.json();
                alert(`Error: ${err.error}`);
            }
        } catch (error) {
            console.error("Failed to save quest", error);
            alert("Failed to save quest.");
        }
        setIsLoading(false);
    };

    const handleDeleteQuest = async (id: string) => {
        if (confirm("Are you sure you want to delete this quest?")) {
            const token = localStorage.getItem('quest_token');
            try {
                const res = await fetch(`/api/quests/${id}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    fetchQuests();
                } else {
                    alert("Failed to delete quest.");
                }
            } catch (error) {
                console.error(error);
                alert("Error deleting quest.");
            }
        }
    };

    if (isCreating) {
        return (
            <div className="max-w-4xl mx-auto space-y-6 animate-float">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="sm" onClick={() => setIsCreating(false)}>
                            <ArrowLeft size={20} /> Cancel
                        </Button>
                        <h2 className="text-3xl font-display font-bold text-brand-dark">Create New Quest</h2>
                    </div>
                    <Button onClick={handleSaveQuest} disabled={questions.length === 0 || isLoading} className="bg-brand-green hover:bg-green-600">
                        {isLoading ? <Loader2 className="animate-spin" /> : <><Save className="mr-2" size={20} /> Save Quest</>}
                    </Button>
                </div>

                <Card className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-brand-dark/60 uppercase mb-2">Quest Title</label>
                            <input
                                type="text"
                                value={questTitle}
                                onChange={(e) => setQuestTitle(e.target.value)}
                                placeholder="e.g., Solar System Quiz"
                                className="w-full p-4 rounded-xl border-2 border-brand-dark/10 focus:border-brand-blue focus:outline-none font-bold text-lg"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-dark/60 uppercase mb-2">Subject</label>
                            <select
                                value={questSubject}
                                onChange={(e) => setQuestSubject(e.target.value as Subject)}
                                className="w-full p-3 rounded-xl border-2 border-brand-dark/10 font-bold"
                            >
                                <option value="">Select Subject</option>
                                {Object.values(Subject).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-dark/60 uppercase mb-2">Grade</label>
                            <select
                                value={questGrade}
                                onChange={(e) => setQuestGrade(e.target.value as GradeLevel)}
                                className="w-full p-3 rounded-xl border-2 border-brand-dark/10 font-bold"
                            >
                                <option value="">Select Grade</option>
                                {Object.values(GradeLevel).map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-brand-dark/60 uppercase mb-2">Syllabus</label>
                            <select
                                value={questSyllabus}
                                onChange={(e) => setQuestSyllabus(e.target.value as Syllabus)}
                                disabled={(user as any)?.subscriptionLevel === 'single'}
                                className={`w-full p-3 rounded-xl border-2 border-brand-dark/10 font-bold ${(user as any)?.subscriptionLevel === 'single' ? 'bg-gray-100 opacity-60' : ''}`}
                            >
                                <option value="">Select Syllabus</option>
                                {Object.values(Syllabus).map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                            {(user as any)?.subscriptionLevel === 'single' && (
                                <p className="text-[10px] text-brand-orange font-bold mt-1 uppercase">Locked to Subscribed Syllabus</p>
                            )}
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Question Form */}
                    <Card className="p-6 space-y-4 h-fit">
                        <h3 className="font-bold text-xl flex items-center gap-2">
                            <Plus className="bg-brand-orange/10 p-1 rounded-lg text-brand-orange box-content" size={20} />
                            Add Question
                        </h3>

                        <div>
                            <label className="label-text">Question Text</label>
                            <textarea
                                className="input-field min-h-[100px]"
                                placeholder="What is the capital of Malaysia?"
                                value={currentQText}
                                onChange={(e) => setCurrentQText(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="label-text">Options (Select the correct one)</label>
                            {[option1, option2, option3, option4].map((opt, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <input
                                        type="radio"
                                        name="correctIndex"
                                        checked={correctIndex === idx}
                                        onChange={() => setCorrectIndex(idx)}
                                        className="w-5 h-5 accent-brand-green cursor-pointer"
                                    />
                                    <div className="relative w-full">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-xs text-brand-dark/30">
                                            {String.fromCharCode(65 + idx)}
                                        </span>
                                        <input
                                            type="text"
                                            className="input-field pl-8 py-2 text-sm"
                                            placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                                            value={idx === 0 ? option1 : idx === 1 ? option2 : idx === 2 ? option3 : option4}
                                            onChange={(e) => {
                                                if (idx === 0) setOption1(e.target.value);
                                                if (idx === 1) setOption2(e.target.value);
                                                if (idx === 2) setOption3(e.target.value);
                                                if (idx === 3) setOption4(e.target.value);
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div>
                            <label className="label-text">Explanation</label>
                            <textarea
                                className="input-field min-h-[80px] text-sm"
                                placeholder="Explain why the answer is correct..."
                                value={explanation}
                                onChange={(e) => setExplanation(e.target.value)}
                            />
                        </div>

                        <Button
                            fullWidth
                            variant={(!user?.isSubscribed && questions.length >= 1) ? "primary" : "secondary"}
                            onClick={(!user?.isSubscribed && questions.length >= 1) ? onViewPricing : handleAddQuestion}
                            className={(!user?.isSubscribed && questions.length >= 1) ? "bg-brand-orange hover:bg-orange-400" : ""}
                        >
                            {(!user?.isSubscribed && questions.length >= 1) ? (
                                <><Sparkles className="mr-2" size={16} /> Upgrade for More Qs</>
                            ) : (
                                "Add Question"
                            )}
                        </Button>
                    </Card>

                    {/* Right: Added Questions Preview */}
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl text-brand-dark/60 uppercase tracking-widest text-sm">
                            Questions ({questions.length})
                        </h3>

                        {questions.length === 0 ? (
                            <div className="text-center p-8 border-2 border-dashed border-brand-dark/10 rounded-xl text-brand-dark/40">
                                No questions added yet.
                            </div>
                        ) : (
                            <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                                {questions.map((q, idx) => (
                                    <div key={q.id} className="bg-white p-4 rounded-xl shadow-sm border border-brand-dark/5 relative group">
                                        <button
                                            onClick={() => handleRemoveQuestion(idx)}
                                            className="absolute top-2 right-2 text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <div className="flex gap-3">
                                            <span className="bg-brand-blue/10 text-brand-blue font-bold px-2 py-1 rounded-lg text-xs h-fit">
                                                Q{idx + 1}
                                            </span>
                                            <div>
                                                <p className="font-bold text-sm mb-2">{q.text}</p>
                                                <div className="grid grid-cols-2 gap-2 text-xs text-brand-dark/70">
                                                    {q.options.map((opt, i) => (
                                                        <div key={i} className={`px-2 py-1 rounded ${i === q.correctAnswerIndex ? 'bg-green-100 text-green-700 font-bold' : 'bg-gray-50'}`}>
                                                            {opt}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <style>{`
            .label-text {
                @apply block text-xs font-bold text-brand-dark/60 uppercase mb-2;
            }
            .input-field {
                @apply w-full p-3 rounded-xl border-2 border-brand-dark/10 focus:border-brand-blue focus:outline-none font-medium transition-colors;
            }
        `}</style>
            </div>
        );
    }

    const creationLimit = !user?.isSubscribed ? 1 : Infinity;
    const canCreate = quests.length < creationLimit;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-float">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="sm" onClick={onBack}>
                        <ArrowLeft size={20} /> Back to Home
                    </Button>
                    <div className="flex flex-col">
                        <h2 className="text-3xl font-display font-bold text-brand-dark">Quest Creator Dashboard</h2>
                        <div className="flex items-center gap-2 mt-1">
                            {user?.isSubscribed ? (
                                <span className="bg-brand-green/10 text-brand-green text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-green/20 flex items-center gap-1">
                                    <Sparkles size={8} /> {user.subscriptionLevel === 'all' ? 'ALL ACCESS' : `PRO: ${user.subscribedSyllabus || 'Single'}`}
                                </span>
                            ) : (
                                <span className="bg-brand-dark/5 text-brand-dark/40 text-[10px] font-bold px-2 py-0.5 rounded-full border border-brand-dark/10">
                                    FREE ACCOUNT
                                </span>
                            )}
                            {user?.isSubscribed && user?.subscriptionEndDate && (
                                <span className="text-[10px] font-bold text-brand-dark/40 uppercase">
                                    Ends: {new Date(user.subscriptionEndDate).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                    {canCreate ? (
                        <Button
                            onClick={() => setIsCreating(true)}
                        >
                            <Plus className="mr-2" /> Create New Quest
                        </Button>
                    ) : (
                        <Button
                            onClick={onViewPricing}
                            className="bg-brand-orange hover:bg-orange-400 shadow-lg shadow-brand-orange/20"
                        >
                            <Sparkles className="mr-2" /> Upgrade for Unlimited
                        </Button>
                    )}
                    {!user?.isSubscribed && (
                        <span className="text-[10px] font-bold text-brand-orange uppercase">
                            Free Limit: {quests.length} / 1 Quests
                        </span>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-full flex justify-center py-10">
                        <Loader2 className="animate-spin text-brand-blue" size={40} />
                    </div>
                ) : quests.length === 0 ? (
                    <div className="col-span-full text-center py-20 bg-white/50 rounded-3xl border-2 border-dashed border-brand-dark/10">
                        <div className="w-20 h-20 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
                            <BookOpen size={40} />
                        </div>
                        <h3 className="text-xl font-bold mb-2">No Quests Created Yet</h3>
                        <p className="text-brand-dark/60 mb-6 font-medium">Create your first custom quest to get started!</p>
                        <Button
                            onClick={() => canCreate ? setIsCreating(true) : onViewPricing()}
                        >
                            {canCreate ? 'Create Quest' : 'Upgrade for Unlimited'}
                        </Button>
                    </div>
                ) : (
                    quests.map((quest) => (
                        <Card key={quest.id} className="p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-brand-blue/20">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-xl">{quest.title}</h3>
                                    <div className="flex gap-2 text-xs font-bold text-brand-dark/50 mt-1">
                                        <span className="bg-blue-50 text-brand-blue px-2 py-0.5 rounded">{quest.subject}</span>
                                        <span className="bg-orange-50 text-brand-orange px-2 py-0.5 rounded">{quest.grade}</span>
                                    </div>
                                    <p className="text-sm text-brand-dark/50 font-medium mt-2">
                                        Created: {new Date(quest.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold">
                                    {quest.questions.length} Qs
                                </div>
                            </div>
                            <div className="flex justify-end pt-4 border-t border-brand-dark/5">
                                <button
                                    onClick={() => handleDeleteQuest(quest.id)}
                                    className="text-red-400 hover:text-red-600 flex items-center gap-2 text-sm font-bold transition-colors"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
};
