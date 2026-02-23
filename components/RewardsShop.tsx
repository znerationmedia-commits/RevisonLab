import React, { useState, useEffect } from 'react';
import { Coins, ShoppingBag, Clock, CheckCircle, XCircle, Star, Package } from 'lucide-react';

interface Reward {
    id: string;
    title: string;
    description: string;
    icon: string;
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
                showToast(`🎉 "${confirmReward.title}" redeemed! -${confirmReward.coinCost} coins`, 'success');
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
                <h1 className="text-4xl font-display font-bold italic tracking-tight">Rewards Shop</h1>
                <p className="text-brand-dark/50 mt-1 font-medium">Claim your hard-earned achievements</p>
                <div className="inline-flex items-center gap-2 mt-4 bg-brand-dark/5 border border-brand-dark/10 text-brand-dark px-6 py-3 rounded-2xl font-bold text-xl shadow-inner group">
                    <Coins className="text-brand-orange fill-brand-orange/20 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {userCoins.toLocaleString()} <span className="text-[10px] text-brand-dark/40 uppercase tracking-widest mt-1 ml-1">Coins</span>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 bg-white p-1.5 rounded-2xl mb-10 w-fit mx-auto shadow-sm border border-brand-dark/5">
                {(['shop', 'history'] as const).map(t => (
                    <button key={t} onClick={() => setTab(t)}
                        className={`px-8 py-2.5 rounded-xl font-bold text-sm transition-all
              ${tab === t ? 'bg-brand-dark text-white shadow-lg' : 'text-brand-dark/40 hover:text-brand-dark hover:bg-brand-dark/5'}`}>
                        {t === 'shop' ? 'Catalog' : 'My Redemptions'}
                    </button>
                ))}
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 opacity-20">
                    <ShoppingBag size={48} className="animate-spin-slow mb-4" />
                    <span className="font-bold uppercase tracking-widest text-[10px]">Restocking Store</span>
                </div>
            ) : tab === 'shop' ? (
                rewards.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-brand-dark/5">
                        <Package size={64} className="mx-auto text-brand-dark/10 mb-6" />
                        <p className="text-brand-dark/40 font-bold text-xl italic mb-2">The shop is currently empty.</p>
                        <p className="text-brand-dark/30 text-sm">Our team is preparing new rewards for you!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {rewards.map(reward => {
                            const canAfford = userCoins >= reward.coinCost;
                            const outOfStock = reward.stock !== null && reward.stock <= 0;
                            const disabled = !canAfford || outOfStock;
                            return (
                                <div key={reward.id}
                                    className={`bg-white rounded-[32px] p-8 border transition-all flex flex-col relative group
                                    ${disabled ? 'opacity-50 grayscale' : 'border-brand-dark/5 shadow-sm hover:shadow-2xl hover:border-brand-orange/20 hover:-translate-y-2'}`}>
                                    <div className="text-6xl mb-6 text-center group-hover:scale-110 transition-transform duration-500">{reward.icon}</div>
                                    <h3 className="font-display font-bold text-xl text-center mb-2 tracking-tight">{reward.title}</h3>
                                    <p className="text-brand-dark/40 text-sm text-center mb-6 flex-1 font-medium leading-relaxed">{reward.description}</p>
                                    <div className="flex items-center justify-between mt-auto pt-6 border-t border-brand-dark/5">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-brand-dark/30 uppercase tracking-widest">Price</span>
                                            <span className="flex items-center gap-1.5 text-brand-orange font-bold text-lg">
                                                <Coins className="fill-brand-orange/20 w-4 h-4" />{reward.coinCost}
                                            </span>
                                        </div>
                                        {reward.stock !== null && (
                                            <span className="text-[10px] font-black px-3 py-1 bg-gray-50 rounded-lg text-brand-dark/30 uppercase tracking-tighter">
                                                {reward.stock > 0 ? `${reward.stock} Left` : 'Sold Out'}
                                            </span>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => !disabled && setConfirmReward(reward)}
                                        disabled={disabled}
                                        className={`mt-6 w-full py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95
                                            ${disabled
                                                ? 'bg-gray-100 text-brand-dark/20 cursor-not-allowed shadow-none'
                                                : 'bg-brand-dark text-white hover:bg-brand-orange hover:shadow-brand-orange/20'
                                            }`}>
                                        {outOfStock ? 'Depleted' : !canAfford ? 'Low Balance' : 'Redeem Now'}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )
            ) : (
                redemptions.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-brand-dark/5">
                        <Clock size={64} className="mx-auto text-brand-dark/10 mb-6" />
                        <p className="text-brand-dark/40 font-bold text-xl italic">No redemption history yet.</p>
                        <p className="text-brand-dark/30 text-sm mt-2">Spend some coins to see history here!</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {redemptions.map(r => (
                            <div key={r.id} className="bg-white rounded-3xl p-6 flex items-center gap-6 shadow-sm border border-brand-dark/5 hover:border-brand-orange/10 transition-colors">
                                <span className="text-4xl shrink-0">{r.reward.icon}</span>
                                <div className="flex-1">
                                    <p className="font-bold text-brand-dark text-lg">{r.reward.title}</p>
                                    <p className="text-xs text-brand-dark/40 font-bold uppercase tracking-widest mt-0.5">
                                        Redeemed {new Date(r.redeemedAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="flex items-center gap-1.5 text-brand-orange font-black text-sm bg-brand-orange/5 px-4 py-2 rounded-xl border border-brand-orange/10">
                                        -{r.reward.coinCost} <Coins className="fill-brand-orange/20 w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )
            )}

            {/* Confirm Modal */}
            {confirmReward && (
                <div className="fixed inset-0 z-[400] flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-sm" onClick={() => setConfirmReward(null)} />
                    <div className="relative bg-white rounded-[40px] p-10 max-w-sm w-full shadow-2xl animate-pop-in border border-brand-dark/10" onClick={e => e.stopPropagation()}>
                        <div className="text-7xl text-center mb-6">{confirmReward.icon}</div>
                        <h3 className="font-display font-bold text-3xl text-center mb-2 italic tracking-tight">{confirmReward.title}</h3>
                        <p className="text-brand-dark/40 text-sm text-center mb-8 font-medium leading-relaxed">{confirmReward.description}</p>

                        <div className="bg-brand-orange/5 rounded-3xl p-6 text-center mb-8 border border-brand-orange/10">
                            <p className="text-brand-orange font-black text-2xl flex items-center justify-center gap-2">
                                <Coins className="fill-brand-orange/20 w-6 h-6 rotate-12" />
                                {confirmReward.coinCost} Coins
                            </p>
                            <p className="text-brand-dark/30 text-[10px] font-bold uppercase tracking-widest mt-2">
                                New Balance: {(userCoins - confirmReward.coinCost).toLocaleString()}
                            </p>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button onClick={handleRedeem} disabled={redeeming}
                                className="w-full py-5 rounded-3xl bg-brand-dark text-white font-bold text-lg shadow-xl hover:bg-brand-orange hover:shadow-brand-orange/20 transition-all active:scale-95 disabled:opacity-50">
                                {redeeming ? 'Processing...' : 'Confirm Redemption'}
                            </button>
                            <button onClick={() => setConfirmReward(null)} className="w-full py-4 rounded-2xl font-bold text-brand-dark/30 hover:text-brand-dark transition-colors text-sm">
                                Not right now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RewardsShop;
