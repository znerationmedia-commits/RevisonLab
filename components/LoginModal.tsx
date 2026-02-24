import React, { useState } from 'react';
import { Button } from './Button';
import { ArrowLeft, LogIn, Mail, Loader2, KeyRound, ShieldCheck, Lock, Eye, EyeOff, UserPlus, CheckCircle2, X } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

interface LoginModalProps {
    onClose: () => void;
}

type ModalView = 'login' | 'signup' | 'verify' | 'forgot_email' | 'forgot_otp' | 'forgot_newpass';

// ── Shared input style ──────────────────────────────────────────────────────
const inputCls = `
  w-full px-4 py-3 rounded-xl border-2 border-gray-200
  bg-white text-gray-800 placeholder-gray-400 text-base
  focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100
  transition-all duration-200
`.trim();

const labelCls = 'block text-xs font-bold uppercase tracking-wide text-gray-500 mb-1.5';

// ── Step indicator for forgot-password flow ─────────────────────────────────
const StepDots = ({ current }: { current: 1 | 2 | 3 }) => (
    <div className="flex items-center justify-center gap-2 mb-6">
        {[1, 2, 3].map(n => (
            <React.Fragment key={n}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${n < current ? 'bg-green-500 text-white' :
                        n === current ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-110' :
                            'bg-gray-100 text-gray-400'
                    }`}>
                    {n < current ? <CheckCircle2 size={16} /> : n}
                </div>
                {n < 3 && <div className={`h-px w-8 transition-all duration-300 ${n < current ? 'bg-green-400' : 'bg-gray-200'}`} />}
            </React.Fragment>
        ))}
    </div>
);

// ── Modal shell ─────────────────────────────────────────────────────────────
const Shell = ({ children, onClose, onBack }: { children: React.ReactNode; onClose: () => void; onBack?: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div
            className="relative w-full sm:max-w-[440px] bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden
                       animate-[slideUp_0.35s_cubic-bezier(0.34,1.56,0.64,1)_forwards] sm:animate-[popIn_0.3s_cubic-bezier(0.34,1.56,0.64,1)_forwards]"
            style={{ maxHeight: '96dvh' }}
            onClick={e => e.stopPropagation()}
        >
            {/* Drag handle (mobile only) */}
            <div className="sm:hidden flex justify-center pt-3 pb-1">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
            </div>

            {/* Top bar */}
            <div className="flex items-center justify-between px-5 py-3">
                {onBack ? (
                    <button onClick={onBack} className="p-2 -ml-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                        <ArrowLeft size={20} />
                    </button>
                ) : <div className="w-10" />}
                <button onClick={onClose} className="p-2 -mr-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="px-6 pb-8 overflow-y-auto" style={{ maxHeight: 'calc(96dvh - 70px)' }}>
                {children}
            </div>
        </div>
    </div>
);

// ── Branded header ──────────────────────────────────────────────────────────
const Header = ({ icon: Icon, iconBg, title, subtitle }: { icon: any; iconBg: string; title: string; subtitle: string }) => (
    <div className="text-center mb-6">
        <div className={`w-16 h-16 ${iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm`}>
            <Icon size={30} />
        </div>
        <h2 className="text-2xl font-extrabold text-gray-900 mb-1">{title}</h2>
        <p className="text-sm text-gray-500 leading-relaxed">{subtitle}</p>
    </div>
);

// ── Error / Success alerts ──────────────────────────────────────────────────
const ErrorAlert = ({ msg }: { msg: string }) => msg ? (
    <div className="flex items-start gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm font-medium">
        <X size={16} className="mt-0.5 shrink-0 text-red-500" />{msg}
    </div>
) : null;

const SuccessAlert = ({ msg }: { msg: string }) => msg ? (
    <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl p-3 text-sm font-medium">
        <CheckCircle2 size={16} className="shrink-0" />{msg}
    </div>
) : null;

// ── OTP input ───────────────────────────────────────────────────────────────
const OtpInput = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
    <input
        type="text" inputMode="numeric" maxLength={6} value={value}
        onChange={e => onChange(e.target.value.replace(/\D/g, ''))}
        className="w-full py-4 text-center text-4xl font-extrabold tracking-[0.6em] rounded-2xl border-2 border-gray-200
                   bg-gray-50 text-gray-800 focus:outline-none focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
        placeholder="––––––"
    />
);

// ── Password input with show/hide ───────────────────────────────────────────
const PasswordInput = ({ value, onChange, placeholder, onEnter }: { value: string; onChange: (v: string) => void; placeholder?: string; onEnter?: () => void }) => {
    const [show, setShow] = useState(false);
    return (
        <div className="relative">
            <input
                type={show ? 'text' : 'password'}
                value={value} onChange={e => onChange(e.target.value)}
                className={`${inputCls} pr-12`}
                placeholder={placeholder || '••••••••'}
                onKeyDown={e => e.key === 'Enter' && onEnter?.()}
            />
            <button type="button" onClick={() => setShow(s => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
    );
};

// ══════════════════════════════════════════════════════════════════════════════
//  Main Component
// ══════════════════════════════════════════════════════════════════════════════
export const LoginModal = ({ onClose }: LoginModalProps) => {
    const { login, signup, verifyCode, resendCode } = useAuth();
    const [view, setView] = useState<ModalView>('login');
    const [isSignUp, setIsSignUp] = useState(false);

    // Login / Signup
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('teacher');
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Forgot Password
    const [fpEmail, setFpEmail] = useState('');
    const [fpOtp, setFpOtp] = useState('');
    const [fpToken, setFpToken] = useState('');
    const [fpNewPw, setFpNewPw] = useState('');
    const [fpConfirmPw, setFpConfirmPw] = useState('');
    const [fpError, setFpError] = useState('');
    const [fpSuccess, setFpSuccess] = useState('');

    const validEmail = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    const wrap = async (fn: () => Promise<void>) => { setLoading(true); try { await fn(); } finally { setLoading(false); } };

    // ── Auth actions ──────────────────────────────────────────────────────────
    const handleVerify = () => wrap(async () => {
        if (!code) return;
        const ok = await verifyCode(email, code);
        if (ok) onClose();
    });

    const handleResend = () => wrap(async () => { await resendCode(email); });

    const handleSubmit = () => wrap(async () => {
        if (!email) return;
        if (isSignUp) {
            if (!name || !password || !validEmail(email)) { alert('Please fill all fields with a valid email.'); return; }
            const r = await signup(name, email, password, role);
            if (typeof r === 'object' && r.needsVerification) { setEmail(r.email); setView('verify'); }
            else if (r === true) onClose();
        } else {
            if (!password) { alert('Please enter your password.'); return; }
            const r = await login(email, password);
            if (typeof r === 'object' && r.needsVerification) { setEmail(r.email); setView('verify'); }
            else if (r === true) onClose();
        }
    });

    // ── Forgot password actions ───────────────────────────────────────────────
    const fpSendOtp = () => wrap(async () => {
        setFpError('');
        if (!validEmail(fpEmail)) { setFpError('Please enter a valid email address.'); return; }
        const res = await fetch('/api/auth/forgot-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fpEmail }) });
        const data = await res.json();
        if (!res.ok) setFpError(data.error || 'Failed to send code.');
        else setView('forgot_otp');
    });

    const fpVerifyOtp = () => wrap(async () => {
        setFpError('');
        if (fpOtp.length !== 6) { setFpError('Please enter the full 6-digit code.'); return; }
        const res = await fetch('/api/auth/verify-reset-otp', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: fpEmail, otp: fpOtp }) });
        const data = await res.json();
        if (!res.ok) setFpError(data.error || 'Invalid code.');
        else { setFpToken(data.resetToken); setView('forgot_newpass'); }
    });

    const fpReset = () => wrap(async () => {
        setFpError('');
        if (fpNewPw.length < 6) { setFpError('Password must be at least 6 characters.'); return; }
        if (fpNewPw !== fpConfirmPw) { setFpError('Passwords do not match.'); return; }
        const res = await fetch('/api/auth/reset-password', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ resetToken: fpToken, newPassword: fpNewPw }) });
        const data = await res.json();
        if (!res.ok) setFpError(data.error || 'Failed to reset password.');
        else {
            setFpSuccess('Password reset! Returning to login…');
            setTimeout(() => { setView('login'); setFpEmail(''); setFpOtp(''); setFpToken(''); setFpNewPw(''); setFpConfirmPw(''); setFpSuccess(''); setFpError(''); }, 2200);
        }
    });

    // ══════════════════════════════════════════════════════════════════════
    //  EMAIL VERIFICATION VIEW
    // ══════════════════════════════════════════════════════════════════════
    if (view === 'verify') return (
        <Shell onClose={onClose} onBack={() => setView('login')}>
            <Header icon={Mail} iconBg="bg-blue-50 text-blue-500" title="Check Your Email" subtitle={<>We sent a 6-digit code to <b className="text-gray-700">{email}</b></>} />
            <div className="space-y-4">
                <div>
                    <label className={labelCls}>Verification Code</label>
                    <OtpInput value={code} onChange={setCode} />
                </div>
                <Button fullWidth onClick={handleVerify} disabled={loading || code.length < 6}>
                    {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify & Continue'}
                </Button>
                <p className="text-center text-sm text-gray-500 pt-1">
                    Didn't get it?{' '}
                    <button onClick={handleResend} disabled={loading} className="font-semibold text-orange-500 hover:underline disabled:opacity-50">
                        Resend code
                    </button>
                </p>
                <p className="text-center text-xs text-gray-400">Also check your spam folder.</p>
            </div>
        </Shell>
    );

    // ══════════════════════════════════════════════════════════════════════
    //  FORGOT PASSWORD — STEP 1: Email
    // ══════════════════════════════════════════════════════════════════════
    if (view === 'forgot_email') return (
        <Shell onClose={onClose} onBack={() => { setView('login'); setFpError(''); }}>
            <Header icon={KeyRound} iconBg="bg-orange-50 text-orange-500" title="Forgot Password?" subtitle="Enter your email and we'll send you a reset code." />
            <StepDots current={1} />
            <div className="space-y-4">
                <div>
                    <label className={labelCls}>Email Address</label>
                    <input type="email" value={fpEmail} onChange={e => setFpEmail(e.target.value)}
                        className={inputCls} placeholder="your@email.com"
                        onKeyDown={e => e.key === 'Enter' && fpSendOtp()} />
                </div>
                <ErrorAlert msg={fpError} />
                <Button fullWidth onClick={fpSendOtp} disabled={loading || !fpEmail}>
                    {loading ? <Loader2 className="animate-spin" size={18} /> : 'Send Reset Code →'}
                </Button>
            </div>
        </Shell>
    );

    // ══════════════════════════════════════════════════════════════════════
    //  FORGOT PASSWORD — STEP 2: OTP
    // ══════════════════════════════════════════════════════════════════════
    if (view === 'forgot_otp') return (
        <Shell onClose={onClose} onBack={() => { setView('forgot_email'); setFpError(''); setFpOtp(''); }}>
            <Header icon={ShieldCheck} iconBg="bg-blue-50 text-blue-500" title="Enter Reset Code"
                subtitle={<>Code sent to <b className="text-gray-700">{fpEmail}</b></>} />
            <StepDots current={2} />
            <div className="space-y-4">
                <OtpInput value={fpOtp} onChange={setFpOtp} />
                <ErrorAlert msg={fpError} />
                <Button fullWidth onClick={fpVerifyOtp} disabled={loading || fpOtp.length !== 6}>
                    {loading ? <Loader2 className="animate-spin" size={18} /> : 'Verify Code →'}
                </Button>
                <p className="text-center text-sm text-gray-500">
                    <button onClick={() => { setFpOtp(''); setView('forgot_email'); setFpError(''); }} className="font-semibold text-orange-500 hover:underline">
                        Resend or use different email
                    </button>
                </p>
            </div>
        </Shell>
    );

    // ══════════════════════════════════════════════════════════════════════
    //  FORGOT PASSWORD — STEP 3: New Password
    // ══════════════════════════════════════════════════════════════════════
    if (view === 'forgot_newpass') return (
        <Shell onClose={onClose}>
            <Header icon={Lock} iconBg="bg-green-50 text-green-600" title="Set New Password" subtitle="Choose a strong password for your account." />
            <StepDots current={3} />
            {fpSuccess ? (
                <SuccessAlert msg={fpSuccess} />
            ) : (
                <div className="space-y-4">
                    <div>
                        <label className={labelCls}>New Password</label>
                        <PasswordInput value={fpNewPw} onChange={setFpNewPw} placeholder="At least 6 characters" />
                    </div>
                    <div>
                        <label className={labelCls}>Confirm Password</label>
                        <PasswordInput value={fpConfirmPw} onChange={setFpConfirmPw} placeholder="Repeat your password" onEnter={fpReset} />
                    </div>
                    <ErrorAlert msg={fpError} />
                    <Button fullWidth onClick={fpReset} disabled={loading || !fpNewPw || !fpConfirmPw}>
                        {loading ? <Loader2 className="animate-spin" size={18} /> : 'Reset Password ✓'}
                    </Button>
                </div>
            )}
        </Shell>
    );

    // ══════════════════════════════════════════════════════════════════════
    //  MAIN LOGIN / SIGNUP VIEW
    // ══════════════════════════════════════════════════════════════════════
    return (
        <Shell onClose={onClose}>
            {/* Tab switcher */}
            <div className="flex bg-gray-100 rounded-2xl p-1 mb-6">
                <button onClick={() => setIsSignUp(false)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${!isSignUp ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    Log In
                </button>
                <button onClick={() => setIsSignUp(true)}
                    className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center justify-center gap-1.5 ${isSignUp ? 'bg-white shadow text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}>
                    <UserPlus size={15} /> Create Account
                </button>
            </div>

            <div className="space-y-4">
                {isSignUp && (
                    <div>
                        <label className={labelCls}>Full Name</label>
                        <input type="text" value={name} onChange={e => setName(e.target.value)}
                            className={inputCls} placeholder="e.g. Ahmad bin Ali" />
                    </div>
                )}

                <div>
                    <label className={labelCls}>{isSignUp ? 'Email Address' : 'Email or Username'}</label>
                    <input type={isSignUp ? 'email' : 'text'} value={email} onChange={e => setEmail(e.target.value)}
                        className={inputCls} placeholder={isSignUp ? 'student@email.com' : 'Email or Name'} />
                </div>

                {isSignUp && (
                    <div>
                        <label className={labelCls}>I am a…</label>
                        <div className="grid grid-cols-2 gap-3">
                            {(['student', 'teacher'] as const).map(r => (
                                <button key={r} onClick={() => setRole(r)}
                                    className={`py-3 rounded-xl border-2 text-sm font-bold capitalize transition-all duration-200 ${role === r ? 'border-orange-400 bg-orange-50 text-orange-600' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                    {r === 'student' ? '🎓 Student' : '👩‍🏫 Teacher'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div>
                    <div className="flex justify-between items-center mb-1.5">
                        <label className={labelCls.replace('mb-1.5', '')}>Password</label>
                        {!isSignUp && (
                            <button type="button" onClick={() => { setFpEmail(email); setFpError(''); setView('forgot_email'); }}
                                className="text-xs font-semibold text-orange-500 hover:underline">
                                Forgot password?
                            </button>
                        )}
                    </div>
                    <PasswordInput value={password} onChange={setPassword} onEnter={handleSubmit} />
                </div>

                <Button fullWidth onClick={handleSubmit} disabled={loading} className="!mt-2">
                    {loading
                        ? <Loader2 className="animate-spin" size={18} />
                        : isSignUp ? <><UserPlus size={16} /> Create Account</> : <><LogIn size={16} /> Log In</>}
                </Button>
            </div>

            {/* Sign-up disclaimer */}
            {isSignUp && (
                <p className="text-center text-xs text-gray-400 mt-4 leading-relaxed">
                    By signing up you agree to our Terms of Service and Privacy Policy.
                </p>
            )}
        </Shell>
    );
};
