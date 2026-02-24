import React from 'react';
import { Rocket, Sparkles, Star } from 'lucide-react';
import { Button } from './Button';

interface HeroProps {
    onStart: () => void;
    onViewPricing: () => void;
    isLoggedIn: boolean;
    isSubscribed: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onStart, onViewPricing, isLoggedIn, isSubscribed }) => {
    return (
        <section className="relative text-left space-y-8 py-16 sm:py-20 px-4 md:px-8 overflow-hidden">
            {/* Decorative background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-brand-orange/10 rounded-full blur-[120px] -z-10 animate-float" />
            <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-brand-blue/5 rounded-full blur-[80px] -z-10 animate-float delay-500" />

            {/* Badge */}
            <div className="flex justify-start animate-reveal-up delay-100">
                <div className="bg-white/80 backdrop-blur-md px-5 py-1.5 rounded-full shadow-md border border-brand-orange/10 text-brand-orange font-bold text-[10px] md:text-xs flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                    <Sparkles size={14} className="animate-pulse" /> The Future of Smart Revision
                </div>
            </div>

            {/* Headline */}
            <div className="space-y-4 max-w-4xl animate-reveal-up delay-200">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark tracking-tight leading-[1.15]">
                    Master Your{' '}
                    <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-orange to-brand-green">
                        Revision Journey
                    </span>
                </h1>

                <p className="text-sm sm:text-base lg:text-lg text-brand-dark/70 max-w-xl leading-relaxed font-medium px-2 animate-reveal-up delay-300">
                    The ultimate gamified AI learning platform.{' '}
                    <span className="text-brand-blue font-bold">Teachers</span> conduct interactive classes while{' '}
                    <span className="text-brand-orange font-bold">students</span> revise with AI-powered quests.
                </p>
            </div>

            {/* CTA Buttons — left-aligned */}
            <div className="flex flex-col items-start gap-3 pt-2 animate-reveal-up delay-400">
                <Button
                    size="lg"
                    onClick={onStart}
                    className="px-16 py-6 text-xl shadow-xl"
                >
                    {isLoggedIn ? 'Continue Learning' : 'Get Started for Free'}
                    <Rocket className="w-5 h-5 ml-2" />
                </Button>

                {!isSubscribed && (
                    <button
                        onClick={onViewPricing}
                        className="group flex items-center gap-1.5 font-bold text-brand-dark/50 hover:text-brand-dark transition-colors text-xs sm:text-sm"
                    >
                        <span className="underline decoration-2 decoration-brand-orange/20 underline-offset-4 group-hover:decoration-brand-orange/50 transition-all">
                            View Pricing Plans
                        </span>
                    </button>
                )}
            </div>

            {/* Trust badges */}
            <div className="pt-10 flex flex-wrap justify-start gap-6 sm:gap-12 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-reveal-up delay-500">
                {[
                    'Trusted by 10,000+ Users',
                    'KSSR/KSSM Aligned',
                    '4.9/5 Rating',
                ].map(text => (
                    <div key={text} className="flex items-center gap-2">
                        <Star className="text-brand-orange fill-brand-orange shrink-0" size={18} />
                        <span className="font-bold text-sm">{text}</span>
                    </div>
                ))}
            </div>
        </section>
    );
};
