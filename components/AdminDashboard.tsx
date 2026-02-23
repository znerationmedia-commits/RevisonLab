import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, CheckCircle, XCircle, Package, Users } from 'lucide-react';

interface Reward {
    id: string;
    name: string;
    description: string;
    emoji: string;
    coinCost: number;
    stock: number | null;
    isActive: boolean;
    createdAt: string;
}

interface AdminDashboardProps {
    token: string;
}

const API_BASE = '/api/admin';
const EMOJIS = ['🎁', '🏆', '📚', '✏️', '🖊️', '🌟', '💡', '🎓', '🎮', '🎨', '🛒', '💎', '🎵', '📱', '🍫'];

const emptyForm = { name: '', description: '', emoji: '🎁', coinCost: '', stock: '' };

const AdminDashboard: React.FC<AdminDashboardProps> = ({ token }) => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [tab, setTab] = useState<'rewards' | 'users'>('rewards');
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editReward, setEditReward] = useState<Reward | null>(null);
    const [form, setForm] = useState(emptyForm);
    const [saving, setSaving] = useState(false);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
    const [users, setUsers] = useState<any[]>([]);

    const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchRewards = async () => {
        try {
            const res = await fetch(`${API_BASE}/rewards`, { headers });
            if (res.ok) setRewards(await res.json());
        } catch { /* ignore */ }
    };

    const fetchUsers = async () => {
        try {
            const res = await fetch(`${API_BASE}/users`, { headers });
            if (res.ok) setUsers(await res.json());
        } catch { /* ignore */ }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            await Promise.all([fetchRewards(), fetchUsers()]);
            setLoading(false);
        };
        init();
    }, [token]);

    const openCreate = () => {
        setEditReward(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (r: Reward) => {
        setEditReward(r);
        setForm({ name: r.name, description: r.description, emoji: r.emoji, coinCost: String(r.coinCost), stock: r.stock !== null ? String(r.stock) : '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.name || !form.description || !form.coinCost) {
            showToast('Name, description, and coin cost are required', 'error');
            return;
        }
        setSaving(true);
        try {
            const url = editReward ? `${API_BASE}/rewards/${editReward.id}` : `${API_BASE}/rewards`;
            const method = editReward ? 'PUT' : 'POST';
            const res = await fetch(url, { method, headers, body: JSON.stringify(form) });
            if (res.ok) {
                await fetchRewards();
                setShowModal(false);
                showToast(editReward ? 'Reward updated!' : 'Reward created!', 'success');
            } else {
                const d = await res.json();
                showToast(d.error || 'Failed to save', 'error');
            }
        } catch {
            showToast('Network error', 'error');
        }
        setSaving(false);
    };

    const handleToggleActive = async (r: Reward) => {
        try {
            const res = await fetch(`${API_BASE}/rewards/${r.id}`, {
                method: 'PUT', headers,
                body: JSON.stringify({ isActive: !r.isActive })
            });
            if (res.ok) setRewards(prev => prev.map(x => x.id === r.id ? { ...x, isActive: !x.isActive } : x));
        } catch { /* ignore */ }
    };

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`${API_BASE}/rewards/${id}`, { method: 'DELETE', headers });
            if (res.ok) {
                setRewards(prev => prev.filter(r => r.id !== id));
                showToast('Reward deleted', 'success');
            }
        } catch { /* ignore */ }
        setDeleteConfirm(null);
    };

    return (
        <div className="max-w-5xl mx-auto pt-10 pb-16 px-4">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white text-sm animate-pop-in
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold">Admin Dashboard</h1>
                    <p className="text-brand-dark/40 text-sm mt-1">Manage rewards and view users</p>
                </div>
                {tab === 'rewards' && (
                    <button onClick={openCreate}
                        className="flex items-center gap-2 bg-gradient-to-r from-brand-orange to-brand-accent text-white font-bold px-5 py-2.5 rounded-2xl shadow-md hover:shadow-orange-200 transition-all text-sm">
                        <Plus size={16} /> Add Reward
                    </button>
                )}
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-white/50 p-1 rounded-2xl mb-6 w-fit">
                {([['rewards', '🎁 Rewards'], ['users', '👥 Users']] as const).map(([key, label]) => (
                    <button key={key} onClick={() => setTab(key)}
                        className={`px-5 py-2 rounded-xl font-bold text-sm transition-all
              ${tab === key ? 'bg-white shadow-sm text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark'}`}>
                        {label}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20 text-brand-dark/40 font-bold">Loading...</div>
            ) : tab === 'rewards' ? (
                rewards.length === 0 ? (
                    <div className="text-center py-24">
                        <Package size={48} className="mx-auto text-brand-dark/20 mb-4" />
                        <p className="text-brand-dark/40 font-bold">No rewards yet. Add your first one!</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {rewards.map(r => (
                            <div key={r.id} className={`bg-white/80 backdrop-blur rounded-2xl p-5 flex items-center gap-4 shadow-sm border transition-all
                ${r.isActive ? 'border-white/50' : 'border-brand-dark/5 opacity-60'}`}>
                                <span className="text-3xl">{r.emoji}</span>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <p className="font-bold text-brand-dark">{r.name}</p>
                                        <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${r.isActive ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                                            {r.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </div>
                                    <p className="text-sm text-brand-dark/50 truncate">{r.description}</p>
                                    <div className="flex gap-3 mt-1 text-xs text-brand-dark/40 font-bold">
                                        <span>🪙 {r.coinCost} coins</span>
                                        <span>{r.stock !== null ? `📦 ${r.stock} left` : '♾️ Unlimited'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <button onClick={() => handleToggleActive(r)} title={r.isActive ? 'Deactivate' : 'Activate'}
                                        className="p-2 rounded-xl hover:bg-brand-dark/5 transition-all text-brand-dark/40 hover:text-brand-dark">
                                        {r.isActive ? <ToggleRight size={20} className="text-green-500" /> : <ToggleLeft size={20} />}
                                    </button>
                                    <button onClick={() => openEdit(r)}
                                        className="p-2 rounded-xl hover:bg-blue-50 transition-all text-brand-dark/40 hover:text-brand-blue">
                                        <Edit2 size={16} />
                                    </button>
                                    <button onClick={() => setDeleteConfirm(r.id)}
                                        className="p-2 rounded-xl hover:bg-red-50 transition-all text-brand-dark/40 hover:text-red-500">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            ) : (
                <div className="space-y-3">
                    {users.map(u => (
                        <div key={u.id} className="bg-white/80 rounded-2xl p-4 flex items-center gap-4 border border-white/50 flex-wrap">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-indigo-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
                                {u.name?.[0]?.toUpperCase()}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-brand-dark text-sm">{u.name} {u.isAdmin && <span className="text-xs text-brand-orange font-bold">Admin</span>}</p>
                                <p className="text-xs text-brand-dark/40 truncate">{u.email}</p>
                            </div>
                            <div className="flex gap-4 text-xs font-bold text-brand-dark/50">
                                <span>⭐ {u.xp} XP</span>
                                <span>🪙 {u.coins}</span>
                                <span>🎮 {u.questsPlayed} quests</span>
                                {u.isSubscribed && <span className="text-green-500">PRO</span>}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
                    <div className="bg-white rounded-3xl p-8 max-w-md w-full mx-4 shadow-2xl animate-pop-in" onClick={e => e.stopPropagation()}>
                        <h2 className="font-display font-bold text-2xl mb-6">{editReward ? 'Edit Reward' : 'New Reward'}</h2>

                        {/* Emoji picker */}
                        <div className="mb-4">
                            <label className="text-xs font-bold text-brand-dark/50 uppercase tracking-wide block mb-2">Icon</label>
                            <div className="flex flex-wrap gap-2">
                                {EMOJIS.map(e => (
                                    <button key={e} onClick={() => setForm(f => ({ ...f, emoji: e }))}
                                        className={`text-xl p-2 rounded-xl transition-all ${form.emoji === e ? 'bg-brand-orange/10 ring-2 ring-brand-orange' : 'hover:bg-brand-dark/5'}`}>
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {[
                            { key: 'name', label: 'Reward Name', placeholder: 'e.g. Free Month Subscription', type: 'text' },
                            { key: 'description', label: 'Description', placeholder: 'e.g. One month free access to all courses', type: 'text' },
                            { key: 'coinCost', label: 'Coin Cost', placeholder: 'e.g. 500', type: 'number' },
                            { key: 'stock', label: 'Stock (leave blank = unlimited)', placeholder: 'e.g. 10', type: 'number' }
                        ].map(({ key, label, placeholder, type }) => (
                            <div key={key} className="mb-4">
                                <label className="text-xs font-bold text-brand-dark/50 uppercase tracking-wide block mb-1">{label}</label>
                                <input
                                    type={type}
                                    value={(form as any)[key]}
                                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                                    placeholder={placeholder}
                                    className="w-full px-4 py-3 bg-brand-dark/5 rounded-xl font-medium text-sm outline-none focus:ring-2 focus:ring-brand-orange/30 transition-all"
                                />
                            </div>
                        ))}

                        <div className="flex gap-3 mt-6">
                            <button onClick={() => setShowModal(false)} className="flex-1 py-3 rounded-2xl border border-brand-dark/10 font-bold text-brand-dark/60 hover:bg-brand-dark/5 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleSave} disabled={saving}
                                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-accent text-white font-bold shadow-md disabled:opacity-60 transition-all">
                                {saving ? 'Saving...' : editReward ? 'Update' : 'Create'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete confirm */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setDeleteConfirm(null)}>
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-pop-in text-center" onClick={e => e.stopPropagation()}>
                        <Trash2 size={40} className="mx-auto text-red-500 mb-4" />
                        <h3 className="font-bold text-xl mb-2">Delete Reward?</h3>
                        <p className="text-brand-dark/50 text-sm mb-6">This will also remove all associated redemption records.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-3 rounded-2xl border font-bold text-brand-dark/60 hover:bg-brand-dark/5 transition-all">Cancel</button>
                            <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
