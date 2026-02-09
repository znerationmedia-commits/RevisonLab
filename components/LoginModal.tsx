import React, { useState } from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { ArrowLeft, LogIn, Mail, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/useAuth';

interface LoginModalProps {
    onClose: () => void;
}

export const LoginModal = ({ onClose }: LoginModalProps) => {
    const { login, signup, verifyCode, resendCode } = useAuth();
    const [isSignUp, setIsSignUp] = useState(false);
    const [needsVerification, setNeedsVerification] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState<'student' | 'teacher'>('teacher');
    const [loading, setLoading] = useState(false);

    const validateEmail = (email: string) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleVerify = async () => {
        if (!verificationCode) {
            alert("Please enter the 6-digit code sent to your email.");
            return;
        }
        setLoading(true);
        const success = await verifyCode(email, verificationCode);
        if (success) {
            onClose();
        }
        setLoading(false);
    };

    const handleResend = async () => {
        if (!email) return;
        setLoading(true);
        await resendCode(email);
        setLoading(false);
    };

    const handleSubmit = async () => {
        if (!email) {
            alert("Please enter your email or name.");
            return;
        }

        if (isSignUp && !validateEmail(email)) {
            alert("Please enter a valid email address for signup.");
            return;
        }

        setLoading(true);
        try {
            if (isSignUp) {
                if (!name || !password) {
                    alert("Please fill in all fields");
                    setLoading(false);
                    return;
                }
                const result = await signup(name, email, password, role);
                if (typeof result === 'object' && result.needsVerification) {
                    setEmail(result.email);
                    setNeedsVerification(true);
                } else if (result === true) {
                    onClose();
                }
            } else {
                if (!password) {
                    alert("Please enter your password");
                    setLoading(false);
                    return;
                }
                const result = await login(email, password);
                if (typeof result === 'object' && result.needsVerification) {
                    setEmail(result.email);
                    setNeedsVerification(true);
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

    if (needsVerification) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <Card className="max-w-md w-full p-8 relative animate-float">
                    <button onClick={() => setNeedsVerification(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                        <ArrowLeft size={20} />
                    </button>
                    <div className="text-center mb-6">
                        <div className="w-16 h-16 bg-brand-blue/10 rounded-full flex items-center justify-center mx-auto mb-4 text-brand-blue">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-2xl font-bold font-display">Verify Your Email</h3>
                        <p className="text-gray-500 text-sm">We've sent a 6-digit code to <b>{email}</b>. Please enter it below to activate your account.</p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">6-Digit Code</label>
                            <input
                                type="text"
                                maxLength={6}
                                value={verificationCode}
                                onChange={e => setVerificationCode(e.target.value)}
                                className="w-full p-4 text-center text-3xl tracking-[1em] font-bold rounded-lg border-2 border-brand-dark/10"
                                placeholder="000000"
                            />
                        </div>

                        <Button fullWidth onClick={handleVerify} disabled={loading}>
                            {loading ? <Loader2 className="animate-spin" /> : 'Verify & Continue'}
                        </Button>

                        <div className="text-center pt-2">
                            <button
                                onClick={handleResend}
                                disabled={loading}
                                className="text-brand-blue text-sm font-bold hover:underline disabled:opacity-50"
                            >
                                Resend Verification Code
                            </button>
                        </div>

                        <div className="text-center text-xs text-gray-400">
                            Didn't receive code? Check your spam folder or try signing up again.
                        </div>
                    </div>
                </Card>
            </div>
        );
    }

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
                        <label className="block text-xs font-bold uppercase text-brand-dark/50 mb-1">Password</label>
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
