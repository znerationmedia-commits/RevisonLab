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
        <section className="relative text-center space-y-10 py-20 px-4 overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-orange/10 rounded-full blur-[120px] -z-10 animate-float" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-blue/5 rounded-full blur-[80px] -z-10 animate-float delay-500" />

            <div className="inline-block animate-reveal-up delay-100">
                <div className="bg-white/80 backdrop-blur-md px-5 py-1.5 rounded-full shadow-md border border-brand-orange/10 text-brand-orange font-bold text-[10px] md:text-xs flex items-center gap-2 hover:scale-105 transition-transform cursor-default">
                    <Sparkles size={14} className="animate-pulse" /> The Future of Smart Revision
                </div>
            </div>

            <div className="space-y-4 md:space-y-5 max-w-4xl mx-auto">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-brand-dark tracking-tight leading-[1.15] animate-reveal-up delay-200">
                    Master Your <br className="hidden sm:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue via-brand-orange to-brand-green animate-gradient-x">
                        Revision Journey
                    </span>
                </h1>

                <p className="text-sm md:text-base lg:text-lg text-brand-dark/70 max-w-2xl mx-auto leading-relaxed font-medium px-4 animate-reveal-up delay-300">
                    The ultimate gamified AI learning platform. <span className="text-brand-blue font-bold">Teachers</span> conduct interactive classes for students to play, while <span className="text-brand-orange font-bold">Parents</span> help students revise with AI-powered focus.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 animate-reveal-up delay-400">
                <Button
                    size="lg"
                    onClick={onStart}
                    className="relative px-6 py-3 md:px-8 md:py-4 lg:px-10 lg:py-5 text-base md:text-lg shadow-brand-blue/20 shadow-xl hover:shadow-brand-blue/40 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group"
                >
                    <span className="relative z-10 flex items-center">
                        {isLoggedIn ? 'Continue Learning' : 'Start Revision Now'} <Rocket className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 -skew-x-12 -translate-x-full group-hover:animate-shimmer" />
                </Button>

                {!isSubscribed && (
                    <button
                        onClick={onViewPricing}
                        className="group flex items-center gap-2 font-bold text-brand-dark/60 hover:text-brand-dark transition-colors text-xs md:text-sm"
                    >
                        <span className="underline decoration-2 decoration-brand-orange/20 underline-offset-4 group-hover:decoration-brand-orange/40 transition-all">
                            View Pricing Plans
                        </span>
                    </button>
                )}
            </div>

            <div className="pt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 animate-reveal-up delay-500">
                <div className="flex items-center gap-2">
                    <Star className="text-brand-orange fill-brand-orange" size={20} />
                    <span className="font-bold">Trusted by 10,000+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="text-brand-orange fill-brand-orange" size={20} />
                    <span className="font-bold">KSSR/KSSM Aligned</span>
                </div>
                <div className="flex items-center gap-2">
                    <Star className="text-brand-orange fill-brand-orange" size={20} />
                    <span className="font-bold">4.9/5 Rating</span>
                </div>
            </div>
        </section>
    );
};
