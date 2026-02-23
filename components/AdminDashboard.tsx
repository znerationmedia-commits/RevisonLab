import React, { useState, useEffect } from 'react';
import { Users, BarChart2, TrendingUp, Award, Calendar, CheckCircle, XCircle, ChevronRight, ArrowLeft, Target, BookOpen } from 'lucide-react';

interface AdminStats {
    users: number;
    totalCoins: number;
    totalXP: number;
    totalQuestions: number;
    totalCorrect: number;
    averageAccuracy: number;
}

interface UserStats {
    id: string;
    name: string;
    email: string;
    role: string;
    xp: number;
    isAdmin: boolean;
    isSubscribed: boolean;
    questsPlayed: number;
    totalQuestions: number;
    totalCorrect: number;
    accuracy: number;
}

interface PerformanceMetric {
    date: string;
    answered: number;
    correct: number;
    accuracy: number;
}

interface AdminDashboardProps {
    token: string;
}

const API_BASE = '/api/admin';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [tab, setTab] = useState<'analytics' | 'users'>('analytics');
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState<UserStats[]>([]);
    const [selectedUser, setSelectedUser] = useState<UserStats | null>(null);
    const [userPerformance, setUserPerformance] = useState<PerformanceMetric[]>([]);
    const [loadingPerformance, setLoadingPerformance] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_BASE}/users`, { headers });
            if (res.ok) setUsers(await res.json());
        } catch { /* ignore */ }
    };

    const fetchStats = async () => {
        try {
            const res = await fetch(`${API_BASE}/stats`, { headers });
            if (res.ok) setStats(await res.json());
        } catch { /* ignore */ }
    };

    const fetchUserPerformance = async (userId: string) => {
        setLoadingPerformance(true);
        try {
            const res = await fetch(`${API_BASE}/users/${userId}/performance`, { headers });
            if (res.ok) setUserPerformance(await res.json());
        } catch {
            showToast('Failed to fetch performance data', 'error');
        }
        setLoadingPerformance(false);
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchUsers(), fetchStats()]);
            setLoading(false);
        };
        init();
    }, [token]);

    const handleBackToUsers = () => {
        setSelectedUser(null);
        setUserPerformance([]);
    };

    const handleSelectUser = (user: UserStats) => {
        setSelectedUser(user);
        fetchUserPerformance(user.id);
    };

    const renderAnalytics = () => {
        if (!stats) return null;
        return (
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { label: 'Total Students', value: stats.users, icon: <Users className="text-blue-500" size={18} />, bg: 'bg-blue-50' },
                        { label: 'Questions Answered', value: stats.totalQuestions, icon: <BookOpen className="text-purple-500" size={18} />, bg: 'bg-purple-50' },
                        { label: 'Avg. Accuracy', value: `${stats.averageAccuracy}%`, icon: <Target className="text-green-500" size={18} />, bg: 'bg-green-50' }
                    ].map((s, i) => (
                        <div key={i} className={`${s.bg} rounded-2xl p-6 border border-white/50 shadow-sm transition-all hover:shadow-md`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-bold text-brand-dark/40 uppercase tracking-wider">{s.label}</span>
                                {s.icon}
                            </div>
                            <div className="text-3xl font-display font-bold text-brand-dark">{s.value.toLocaleString()}</div>
                        </div>
                    ))}
                </div>

                <div className="bg-white/80 rounded-3xl p-8 border border-white/50 shadow-sm">
                    <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2 text-brand-dark">
                        <TrendingUp size={24} className="text-brand-orange" />
                        Platform Growth
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <p className="text-sm font-bold text-brand-dark/60">Community Engagement</p>
                            <div className="flex items-center justify-between p-4 bg-brand-dark/5 rounded-2xl">
                                <span className="text-sm font-medium">Total XP Distributed</span>
                                <span className="font-bold text-brand-dark">⭐ {stats.totalXP.toLocaleString()}</span>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-brand-dark/5 rounded-2xl">
                                <span className="text-sm font-medium">Global Correct Answers</span>
                                <span className="font-bold text-brand-green">✅ {stats.totalCorrect.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className="flex flex-col justify-center items-center p-8 bg-brand-orange/5 rounded-3xl border border-brand-orange/10">
                            <Target size={48} className="text-brand-orange mb-4 opacity-20" />
                            <p className="text-sm font-bold text-brand-dark/60 mb-1 text-center">Platform Accuracy</p>
                            <span className="text-5xl font-display font-bold text-brand-orange">{stats.averageAccuracy}%</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const renderUserPerformance = () => {
        if (!selectedUser) return null;
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                <button onClick={handleBackToUsers} className="flex items-center gap-2 text-sm font-bold text-brand-dark/50 hover:text-brand-dark transition-colors mb-4">
                    <ArrowLeft size={16} /> Back to User List
                </button>

                <div className="bg-white/80 rounded-3xl p-6 border border-white/50 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-blue to-indigo-600 flex items-center justify-center text-white font-display font-bold text-3xl shadow-lg">
                            {selectedUser.name[0].toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-display font-bold">{selectedUser.name}</h2>
                            <p className="text-brand-dark/40 font-medium">{selectedUser.email}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total XP', value: selectedUser.xp, icon: '⭐' },
                            { label: 'Questions', value: selectedUser.totalQuestions, icon: '📚' },
                            { label: 'Correct', value: selectedUser.totalCorrect, icon: '✅' },
                            { label: 'Accuracy', value: `${selectedUser.accuracy}%`, icon: '🎯' }
                        ].map((s, i) => (
                            <div key={i} className="p-4 bg-brand-dark/5 rounded-2xl">
                                <p className="text-[10px] font-bold text-brand-dark/40 uppercase mb-1">{s.label}</p>
                                <div className="text-lg font-bold">{s.icon} {s.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white/80 rounded-3xl p-8 border border-white/50 shadow-sm">
                    <h3 className="font-display font-bold text-xl mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-brand-orange" />
                        Daily Performance History
                    </h3>

                    {loadingPerformance ? (
                        <div className="text-center py-12 text-brand-dark/40 font-bold">Fetching history...</div>
                    ) : userPerformance.length === 0 ? (
                        <p className="text-center py-12 text-brand-dark/30 font-bold italic">No performance data recorded yet</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="text-left border-b border-brand-dark/5">
                                        <th className="pb-4 text-[10px] font-bold text-brand-dark/40 uppercase">Date</th>
                                        <th className="pb-4 text-[10px] font-bold text-brand-dark/40 uppercase">Answered</th>
                                        <th className="pb-4 text-[10px] font-bold text-brand-dark/40 uppercase">Correct</th>
                                        <th className="pb-4 text-[10px] font-bold text-brand-dark/40 uppercase">Accuracy</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-brand-dark/5">
                                    {userPerformance.map((p, i) => (
                                        <tr key={i} className="hover:bg-brand-dark/5 transition-colors">
                                            <td className="py-4 font-bold text-sm">{new Date(p.date).toLocaleDateString()}</td>
                                            <td className="py-4 text-sm">{p.answered}</td>
                                            <td className="py-4 text-sm font-bold text-brand-green">{p.correct}</td>
                                            <td className="py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex-1 bg-brand-dark/5 h-2 rounded-full overflow-hidden min-w-[60px]">
                                                        <div
                                                            className={`h-full rounded-full ${p.accuracy > 80 ? 'bg-green-500' : p.accuracy > 50 ? 'bg-brand-orange' : 'bg-red-500'}`}
                                                            style={{ width: `${p.accuracy}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-xs font-bold w-10">{p.accuracy}%</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-5xl mx-auto pt-10 pb-16 px-4">
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white text-sm animate-pop-in
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {toast.msg}
                </div>
            )}

            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Admin Insights</h1>
                    <p className="text-brand-dark/40 text-sm mt-1">Student performance and engagement monitoring</p>
                </div>
            </div>

            {!selectedUser && (
                <div className="flex gap-2 bg-white/50 p-1 rounded-2xl mb-6 w-fit">
                    {([['analytics', '📊 Overview'], ['users', '👥 Students']] as const).map(([key, label]) => (
                        <button key={key} onClick={() => setTab(key)}
                            className={`px-5 py-2 rounded-xl font-bold text-sm transition-all
                  ${tab === key ? 'bg-white shadow-sm text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark'}`}>
                            {label}
                        </button>
                    ))}
                </div>
            )}

            {loading ? (
                <div className="text-center py-20 text-brand-dark/40 font-bold">Analyzing data...</div>
            ) : selectedUser ? (
                renderUserPerformance()
            ) : tab === 'analytics' ? (
                renderAnalytics()
            ) : (
                <div className="grid grid-cols-1 gap-3">
                    {users.map(u => (
                        <div
                            key={u.id}
                            onClick={() => handleSelectUser(u)}
                            className="bg-white/80 rounded-2xl p-5 flex items-center gap-6 border border-white/50 hover:border-brand-blue/30 hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-brand-dark/5 flex items-center justify-center text-brand-dark font-display font-bold text-lg shrink-0 group-hover:bg-brand-blue group-hover:text-white transition-colors">
                                {u.name[0].toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <p className="font-bold text-brand-dark">{u.name}</p>
                                    {u.isSubscribed && <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-brand-orange/10 text-brand-orange font-bold uppercase">PRO</span>}
                                </div>
                                <p className="text-xs text-brand-dark/40 truncate">{u.email}</p>
                            </div>
                            <div className="hidden md:flex items-center gap-8 text-center">
                                <div>
                                    <p className="text-[10px] font-bold text-brand-dark/30 uppercase mb-0.5">Questions</p>
                                    <p className="font-bold text-sm">{u.totalQuestions}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold text-brand-dark/30 uppercase mb-0.5">Accuracy</p>
                                    <p className={`font-bold text-sm ${u.accuracy > 80 ? 'text-green-500' : u.accuracy > 50 ? 'text-brand-orange' : 'text-red-500'}`}>
                                        {u.accuracy}%
                                    </p>
                                </div>
                            </div>
                            <ChevronRight size={20} className="text-brand-dark/20 group-hover:text-brand-blue group-hover:translate-x-1 transition-all" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
