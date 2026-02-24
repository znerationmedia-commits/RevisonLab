import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { ArrowLeft, LogIn, Mail, Loader2, KeyRound, ShieldCheck, Lock } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

interface LoginModalProps {
    onClose: () => void;
}

type ModalView = 'login' | 'verify' | 'forgot_email' | 'forgot_otp' | 'forgot_newpass';

export const LoginModal = ({ onClose }: LoginModalProps) => {
    const { login, signup, verifyCode, resendCode } = useAuth();
    const [view, setView] = useState<ModalView>('login');
    const [isSignUp, setIsSignUp] = useState(false);

    // Login / Signup fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('teacher');
    const [verificationCode, setVerificationCode] = useState('');
    const [loading, setLoading] = useState(false);

    // Forgot password fields
    const [fpEmail, setFpEmail] = useState('');
    const [fpOtp, setFpOtp] = useState('');
    const [fpResetToken, setFpResetToken] = useState('');
    const [fpNewPassword, setFpNewPassword] = useState('');
    const [fpConfirmPassword, setFpConfirmPassword] = useState('');
    const [fpError, setFpError] = useState('');
    const [fpSuccess, setFpSuccess] = useState('');

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[-?][^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleVerify = async () => {
        if (!verificationCode) { alert("Please enter the 6-digit code sent to your email."); return; }
        setLoading(true);
        const success = await verifyCode(email, verificationCode);
        if (success) onClose();
        setLoading(false);
    };

    const handleResend = async () => {
        if (!email) return;
        setLoading(true);
        await resendCode(email);
        setLoading(false);
    };

    const handleSubmit = async () => {
        if (!email) { alert("Please enter your email or name."); return; }
        if (isSignUp && !validateEmail(email)) { alert("Please enter a valid email address for signup."); return; }
        setLoading(true);
        try {
            if (isSignUp) {
                if (!name || !password) { alert("Please fill in all fields"); setLoading(false); return; }
                const result = await signup(name, email, password, role);
                if (typeof result === 'object' && result.needsVerification) {
                    setEmail(result.email);
                    setView('verify');
                } else if (result === true) {
                    onClose();
                }
            } else {
                if (!password) { alert("Please enter your password"); setLoading(false); return; }
                const result = await login(email, password);
                if (typeof result === 'object' && result.needsVerification) {
                    setEmail(result.email);
                    setView('verify');
                } else if (result === true) {
                    onClose();
                }
            }
        } catch (e) {
            console.error(e);
            alert("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ── FORGOT PASSWORD STEP 1: Send OTP ───────────────────────────
    const handleForgotSendOtp = async () => {
        setFpError('');
        if (!fpEmail) { setFpError('Please enter your email address.'); return; }
        if (!validateEmail(fpEmail)) { setFpError('Please enter a valid email address.'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: fpEmail })
            });
            const data = await res.json();
            if (!res.ok) { setFpError(data.error || 'Failed to send reset code.'); }
            else { setView('forgot_otp'); }
        } catch {
            setFpError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── FORGOT PASSWORD STEP 2: Verify OTP ─────────────────────────
    const handleForgotVerifyOtp = async () => {
        setFpError('');
        if (!fpOtp || fpOtp.length !== 6) { setFpError('Please enter the 6-digit code.'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/verify-reset-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: fpEmail, otp: fpOtp })
            });
            const data = await res.json();
            if (!res.ok) { setFpError(data.error || 'Invalid code.'); }
            else { setFpResetToken(data.resetToken); setView('forgot_newpass'); }
        } catch {
            setFpError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── FORGOT PASSWORD STEP 3: Set New Password ────────────────────
    const handleForgotResetPassword = async () => {
        setFpError('');
        if (!fpNewPassword || fpNewPassword.length < 6) { setFpError('Password must be at least 6 characters.'); return; }
        if (fpNewPassword !== fpConfirmPassword) { setFpError('Passwords do not match.'); return; }
        setLoading(true);
        try {
            const res = await fetch('/api/auth/reset-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resetToken: fpResetToken, newPassword: fpNewPassword })
            });
            const data = await res.json();
            if (!res.ok) { setFpError(data.error || 'Failed to reset password.'); }
            else {
                setFpSuccess('Password reset successfully! You can now log in.');
                setTimeout(() => {
                    setView('login');
                    setFpEmail(''); setFpOtp(''); setFpResetToken('');
                    setFpNewPassword(''); setFpConfirmPassword('');
                    setFpSuccess(''); setFpError('');
                }, 2500);
            }
        } catch {
            setFpError('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // ── EMAIL VERIFICATION VIEW ────────────────────────────────────
    if (view === 'verify') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 relative animate-float">
                    <button onClick={() => setView('login')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Verify Your Email</h3>
                        <p className="text-gray-500 text-sm">We've sent a 6-digit code to <b>{email}</b>. Please enter it below.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">6-Digit Code</label>
                            <input
                                type="text" maxLength={6} value={verificationCode}
                                onChange={e => setVerificationCode(e.target.value)}
                                className="w-full p-4 text-center text-3xl tracking-[1em] font-bold rounded-lg border-2 border-brand-dark/10"
                                placeholder="000000"
                            />
                        </div>
                        <Button fullWidth onClick={handleVerify} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                        </Button>
                        <div className="text-center pt-2">
                            <button onClick={handleResend} disabled={loading} className="text-brand-blue text-sm font-bold hover:underline disabled:opacity-50">
                                Resend Verification Code
                            </button>
                        </div>
                        <div className="text-center text-xs text-gray-400">Didn't receive code? Check your spam folder.</div>
                    </div>
                </Card>
            </div>
        );
    }

    // ── FORGOT PASSWORD: STEP 1 – Enter Email ──────────────────────
    if (view === 'forgot_email') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 relative animate-float">
                    <button onClick={() => { setView('login'); setFpError(''); }} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <div className="text-center mb-6 mt-4">
                        <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
                            <KeyRound size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Forgot Password?</h3>
                        <p className="text-gray-500 text-sm">Enter your email and we'll send you a reset code.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">Email Address</label>
                            <input
                                type="email" value={fpEmail} onChange={e => setFpEmail(e.target.value)}
                                className="w-full p-3 rounded-lg border-2 border-brand-dark/10"
                                placeholder="your@email.com"
                                onKeyDown={e => e.key === 'Enter' && handleForgotSendOtp()}
                            />
                        </div>
                        {fpError && <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg">{fpError}</p>}
                        <Button fullWidth onClick={handleForgotSendOtp} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Send Reset Code'}
                        </Button>
                    </div>
                </Card>
            </div>
        );
    }

    // ── FORGOT PASSWORD: STEP 2 – Enter OTP ───────────────────────
    if (view === 'forgot_otp') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 relative animate-float">
                    <button onClick={() => { setView('forgot_email'); setFpError(''); }} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 flex items-center gap-1 text-sm">
                        <ArrowLeft size={16} /> Back
                    </button>
                    <div className="text-center mb-6 mt-4">
                        <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue">
                            <ShieldCheck size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Enter Reset Code</h3>
                        <p className="text-gray-500 text-sm">We sent a 6-digit code to <b>{fpEmail}</b>.</p>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">6-Digit Code</label>
                            <input
                                type="text" maxLength={6} value={fpOtp}
                                onChange={e => setFpOtp(e.target.value)}
                                className="w-full p-4 text-center text-3xl tracking-[1em] font-bold rounded-lg border-2 border-brand-dark/10"
                                placeholder="000000"
                            />
                        </div>
                        {fpError && <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg">{fpError}</p>}
                        <Button fullWidth onClick={handleForgotVerifyOtp} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify Code'}
                        </Button>
                        <div className="text-center pt-1">
                            <button onClick={() => { setFpOtp(''); setView('forgot_email'); setFpError(''); }} className="text-brand-blue text-sm font-bold hover:underline">
                                Didn't receive it? Try again
                            </button>
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

    // ── FORGOT PASSWORD: STEP 3 – New Password ─────────────────────
    if (view === 'forgot_newpass') {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 relative animate-float">
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-green">
                            <Lock size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Set New Password</h3>
                        <p className="text-gray-500 text-sm">Choose a strong password for your account.</p>
                    </div>
                    <div className="space-y-4">
                        {fpSuccess ? (
                            <div className="bg-green-50 border border-green-200 text-green-700 font-medium p-4 rounded-lg text-center">
                                ✅ {fpSuccess}
                            </div>
                        ) : (
                            <>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">New Password</label>
                                    <input
                                        type="password" value={fpNewPassword}
                                        onChange={e => setFpNewPassword(e.target.value)}
                                        className="w-full p-3 rounded-lg border-2 border-brand-dark/10"
                                        placeholder="At least 6 characters"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">Confirm Password</label>
                                    <input
                                        type="password" value={fpConfirmPassword}
                                        onChange={e => setFpConfirmPassword(e.target.value)}
                                        className="w-full p-3 rounded-lg border-2 border-brand-dark/10"
                                        placeholder="Repeat your password"
                                        onKeyDown={e => e.key === 'Enter' && handleForgotResetPassword()}
                                    />
                                </div>
                                {fpError && <p className="text-sm text-red-500 font-medium bg-red-50 p-3 rounded-lg">{fpError}</p>}
                                <Button fullWidth onClick={handleForgotResetPassword} disabled={loading}>
                                    {loading ? <Loader2 className="animate-spin" /> : 'Reset Password'}
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </div>
        );
    }

    // ── MAIN LOGIN / SIGNUP VIEW ───────────────────────────────────
    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="max-w-md w-full p-8 relative animate-float">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                    <ArrowLeft size={20} />
                </button>
                <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-brand-orange/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-orange">
                        <LogIn size={32} />
                    </div>
                    <h3 className="text-2xl font-bold font-display">{isSignUp ? 'Create Account' : 'Welcome Back!'}</h3>
                    <p className="text-gray-500">{isSignUp ? 'Join RevisionLab today!' : 'Log in to continue your quest.'}</p>
                </div>

                <div className="space-y-4">
                    {isSignUp && (
                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">Full Name</label>
                            <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 rounded-lg border-2 border-brand-dark/10" placeholder="e.g. Ali bin Abu" />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">{isSignUp ? 'Email Address' : 'Email or Name'}</label>
                        <input type="text" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 rounded-lg border-2 border-brand-dark/10" placeholder={isSignUp ? "student@demo.com" : "Email or Name"} />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1">
                            <label className="block text-xs font-bold uppercase text-brand-dark/50">Password</label>
                            {!isSignUp && (
                                <button
                                    type="button"
                                    onClick={() => { setFpEmail(email); setFpError(''); setView('forgot_email'); }}
                                    className="text-xs text-brand-blue font-bold hover:underline"
                                >
                                    Forgot Password?
                                </button>
                            )}
                        </div>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 rounded-lg border-2 border-brand-dark/10" placeholder="••••••••" />
                    </div>

                    <Button fullWidth onClick={handleSubmit} disabled={loading}>
                        {loading ? <Loader2 className="animate-spin" /> : (isSignUp ? 'Sign Up' : 'Log In')}
                    </Button>

                    <div className="text-center text-sm pt-2">
                        <span className="text-brand-dark/50">{isSignUp ? 'Already have an account?' : 'New here?'}</span>
                        <button onClick={() => setIsSignUp(!isSignUp)} className="font-bold text-brand-blue ml-1 hover:underline">
                            {isSignUp ? 'Log In' : 'Create Account'}
                        </button>
                    </div>
                </div>
            </Card>
        </div>
    );
};
