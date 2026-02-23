import React, { useState, useEffect } from 'react';
import { Coins, ShoppingBag, Clock, CheckCircle, XCircle, Star, Package } from 'lucide-react';

interface Reward {
    id: string;
    name: string;
    description: string;
    emoji: string;
    coinCost: number;
    stock: number | null;
    isActive: boolean;
}

interface Redemption {
    id: string;
    redeemedAt: string;
    reward: Reward;
}

interface RewardsShopProps {
    userCoins: number;
    token: string;
    onCoinsUpdated: (newCoins: number) => void;
}

const API_BASE = '/api';

const RewardsShop: React.FC<RewardsShopProps> = ({ userCoins, token, onCoinsUpdated }) => {
    const [rewards, setRewards] = useState<Reward[]>([]);
    const [redemptions, setRedemptions] = useState<Redemption[]>([]);
    const [tab, setTab] = useState<'shop' | 'history'>('shop');
    const [loading, setLoading] = useState(true);
    const [confirmReward, setConfirmReward] = useState<Reward | null>(null);
    const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);
    const [redeeming, setRedeeming] = useState(false);

    const authHeaders = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

    const showToast = (msg: string, type: 'success' | 'error') => {
        setToast({ msg, type });
        setTimeout(() => setToast(null), 3500);
    };

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [rRes, hRes] = await Promise.all([
                    fetch(`${API_BASE}/rewards`, { headers: authHeaders }),
                    fetch(`${API_BASE}/rewards/my-redemptions`, { headers: authHeaders })
                ]);
                if (rRes.ok) setRewards(await rRes.json());
                if (hRes.ok) setRedemptions(await hRes.json());
            } catch { /* ignore */ }
            setLoading(false);
        };
        fetchAll();
    }, [token]);

    const handleRedeem = async () => {
        if (!confirmReward) return;
        setRedeeming(true);
        try {
            const res = await fetch(`${API_BASE}/rewards/redeem/${confirmReward.id}`, {
                method: 'POST',
                headers: authHeaders
            });
            const data = await res.json();
            if (!res.ok) {
                showToast(data.error || 'Redemption failed', 'error');
            } else {
                const newCoins = userCoins - confirmReward.coinCost;
                onCoinsUpdated(newCoins);
                // Update stock locally
                setRewards(prev => prev.map(r =>
                    r.id === confirmReward.id && r.stock !== null
                        ? { ...r, stock: r.stock - 1 }
                        : r
                ));
                // Add to history
                const newRedemption: Redemption = {
                    id: data.redemption.id,
                    redeemedAt: data.redemption.redeemedAt,
                    reward: confirmReward
                };
                setRedemptions(prev => [newRedemption, ...prev]);
                showToast(`🎉 "${confirmReward.name}" redeemed! -${confirmReward.coinCost} coins`, 'success');
            }
        } catch {
            showToast('Network error. Please try again.', 'error');
        }
        setRedeeming(false);
        setConfirmReward(null);
    };

    return (
        <div className="max-w-4xl mx-auto pt-10 pb-16 px-4">
            {/* Toast */}
            {toast && (
                <div className={`fixed top-6 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-2 px-6 py-3 rounded-2xl shadow-2xl font-bold text-white text-sm transition-all animate-pop-in
          ${toast.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                    {toast.type === 'success' ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-3">
                    <ShoppingBag size={40} className="text-brand-orange" />
                </div>
                <h1 className="text-4xl font-display font-bold">Rewards Shop</h1>
                <p className="text-brand-dark/50 mt-1">Spend your hard-earned coins on exclusive rewards</p>
                <div className="inline-flex items-center gap-2 mt-3 bg-yellow-100 border border-yellow-200 text-yellow-700 px-5 py-2 rounded-full font-bold text-lg">
                    <Coins className="fill-yellow-500 w-5 h-5" />
                    {userCoins} coins available
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-white/60 p-1 rounded-2xl mb-6 w-fit mx-auto">
                {(['shop', 'history'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-6 py-2 rounded-xl font-bold text-sm transition-all capitalize
              ${tab === t ? 'bg-white shadow-sm text-brand-dark' : 'text-brand-dark/40 hover:text-brand-dark'}`}>
                        {t === 'shop' ? '🛍️ Shop' : '📜 My Redemptions'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="text-center py-20 text-brand-dark/40 font-bold">Loading rewards...</div>
            ) : tab === 'shop' ? (
                rewards.length === 0 ? (
                    <div className="text-center py-20">
                        <Package size={48} className="mx-auto text-brand-dark/20 mb-4" />
                        <p className="text-brand-dark/40 font-bold text-lg">No rewards available yet.</p>
                        <p className="text-brand-dark/30 text-sm">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                        {rewards.map(reward => {
                            const canAfford = userCoins >= reward.coinCost;
                            const outOfStock = reward.stock !== null && reward.stock <= 0;
                            const disabled = !canAfford || outOfStock;
                            return (
                                <div key={reward.id}
                                    className={`bg-white/80 backdrop-blur rounded-3xl p-6 shadow-md border transition-all flex flex-col
                    ${disabled ? 'opacity-60 border-white/30' : 'border-white/50 hover:shadow-xl hover:-translate-y-1'}`}>
                                    <div className="text-5xl mb-3 text-center">{reward.emoji}</div>
                                    <h3 className="font-display font-bold text-lg text-center mb-1">{reward.name}</h3>
                                    <p className="text-brand-dark/50 text-sm text-center mb-4 flex-1">{reward.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-brand-dark/5">
                                        <span className="flex items-center gap-1 text-yellow-600 font-bold text-sm">
                                            <Coins className="fill-yellow-500 w-4 h-4" />{reward.coinCost}
                                        </span>
                                        {reward.stock !== null && (
                                            <span className="text-xs text-brand-dark/40 font-bold">
                                                {reward.stock > 0 ? `${reward.stock} left` : 'Sold out'}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => !disabled && setConfirmReward(reward)}
                                        disabled={disabled}
                                        className={`mt-3 w-full py-2.5 rounded-xl font-bold text-sm transition-all
                      ${disabled
                                                ? 'bg-brand-dark/5 text-brand-dark/30 cursor-not-allowed'
                                                : 'bg-gradient-to-r from-brand-orange to-brand-accent text-white shadow-md hover:shadow-orange-300/50 hover:scale-[1.02]'
                                            }`}>
                                        {outOfStock ? 'Out of Stock' : !canAfford ? `Need ${reward.coinCost - userCoins} more coins` : 'Redeem'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                redemptions.length === 0 ? (
                    <div className="text-center py-20">
                        <Clock size={48} className="mx-auto text-brand-dark/20 mb-4" />
                        <p className="text-brand-dark/40 font-bold">No redemptions yet.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {redemptions.map(r => (
                            <div key={r.id} className="bg-white/80 rounded-2xl p-5 flex items-center gap-4 shadow-sm border border-white/50">
                                <span className="text-3xl">{r.reward.emoji}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-brand-dark">{r.reward.name}</p>
                                    <p className="text-xs text-brand-dark/40">
                                        {new Date(r.redeemedAt).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <span className="flex items-center gap-1 text-yellow-600 font-bold text-sm bg-yellow-50 px-3 py-1 rounded-full">
                                    <Coins className="fill-yellow-500 w-3.5 h-3.5" />-{r.reward.coinCost}
                                </span>
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* Confirm Modal */}
            {confirmReward && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setConfirmReward(null)}>
                    <div className="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl animate-pop-in" onClick={e => e.stopPropagation()}>
                        <div className="text-6xl text-center mb-4">{confirmReward.emoji}</div>
                        <h3 className="font-display font-bold text-2xl text-center mb-2">{confirmReward.name}</h3>
                        <p className="text-brand-dark/60 text-sm text-center mb-6">{confirmReward.description}</p>
                        <div className="bg-yellow-50 rounded-2xl p-4 text-center mb-6 border border-yellow-200">
                            <p className="text-yellow-700 font-bold text-lg flex items-center justify-center gap-2">
                                <Coins className="fill-yellow-500 w-5 h-5" />
                                {confirmReward.coinCost} coins
                            </p>
                            <p className="text-yellow-600/70 text-xs mt-1">
                                Balance after: {userCoins - confirmReward.coinCost} coins
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setConfirmReward(null)} className="flex-1 py-3 rounded-2xl border border-brand-dark/10 font-bold text-brand-dark/60 hover:bg-brand-dark/5 transition-all">
                                Cancel
                            </button>
                            <button onClick={handleRedeem} disabled={redeeming}
                                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-brand-orange to-brand-accent text-white font-bold shadow-md hover:shadow-orange-200 transition-all disabled:opacity-60">
                                {redeeming ? 'Redeeming...' : 'Confirm 🎉'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RewardsShop;
