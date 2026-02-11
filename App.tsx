import React, { useState, useEffect } from 'react';
import { Subject, GradeLevel, ViewState, UserStats, Question, Syllabus, CustomQuest } from './types';
import { geminiService } from './services/geminiService';
import { GameSession } from './components/GameSession';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { TeacherDashboard } from './components/TeacherDashboard';
import { BookOpen, Trophy, Star, Sparkles, Loader2, ArrowLeft, RefreshCw, ScrollText, CheckCircle2, Zap, Brain, Rocket, Lock, LogIn, Mail, GraduationCap, Coins, Gift, LogOut, User as UserIcon, ShieldCheck, Coffee, Plus } from 'lucide-react';
import { useAuth } from './contexts/useAuth';
import { PaymentForm } from './components/PaymentForm';
import { Hero } from './components/Hero';
import { SyllabusExplorer } from './components/SyllabusExplorer';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { Testimonials } from './components/Testimonials';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { PromotionBanner } from './components/PromotionBanner';
import { LoginModal } from './components/LoginModal';


const INITIAL_STATS: UserStats = {
  xp: 0,
  level: 1,
  streak: 0,
  badges: [],
  completedQuizzes: 0,
  isSubscribed: false,
  leaderboardRank: 0,
  coins: 0
};

// Expanded Subject List for Malaysian Context
const SUBJECTS = [
  { id: Subject.BAHASA_MELAYU, icon: <span className="text-2xl font-bold">BM</span>, color: 'bg-yellow-100' },
  { id: Subject.ENGLISH, icon: <span className="text-2xl font-bold">BI</span>, color: 'bg-indigo-100' },
  { id: Subject.MATH, icon: <span className="text-2xl">➗</span>, color: 'bg-blue-100' },
  { id: Subject.SCIENCE, icon: <span className="text-2xl">🧬</span>, color: 'bg-green-100' },
  { id: Subject.SEJARAH, icon: <span className="text-2xl">🏛️</span>, color: 'bg-orange-100' },
  { id: Subject.GEOGRAPHY, icon: <span className="text-2xl">🌍</span>, color: 'bg-emerald-100' },
  { id: Subject.PENDIDIKAN_ISLAM, icon: <span className="text-2xl">🕌</span>, color: 'bg-green-50' },
  { id: Subject.PENDIDIKAN_MORAL, icon: <span className="text-2xl">🤝</span>, color: 'bg-pink-100' },
  { id: Subject.RBT, icon: <span className="text-2xl">🛠️</span>, color: 'bg-gray-100' },
  { id: Subject.ADD_MATH, icon: <span className="text-2xl">∫dx</span>, color: 'bg-red-100' },
  { id: Subject.PHYSICS, icon: <span className="text-2xl">⚛️</span>, color: 'bg-purple-100' },
  { id: Subject.CHEMISTRY, icon: <span className="text-2xl">🧪</span>, color: 'bg-lime-100' },
  { id: Subject.BIOLOGY, icon: <span className="text-2xl">🦠</span>, color: 'bg-teal-100' },
  { id: Subject.ECONOMICS, icon: <span className="text-2xl">📈</span>, color: 'bg-cyan-100' },
  { id: Subject.BUSINESS, icon: <span className="text-2xl">💼</span>, color: 'bg-amber-100' },
  { id: Subject.COMPUTER_SCIENCE, icon: <span className="text-2xl">💻</span>, color: 'bg-slate-200' },
];

export default function App() {
  const { user, login, signup, verifyCode, resendCode, logout, subscribe, cancelSubscription, isLoading: authLoading } = useAuth();
  const [view, setView] = useState<ViewState>('HOME');

  // Initialize stats from localStorage or default
  const [stats, setStats] = useState<UserStats>(() => {
    const saved = localStorage.getItem('quest_stats');
    return saved ? JSON.parse(saved) : INITIAL_STATS;
  });

  // Check for Subscription Success in URL
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get('success') === 'true') {
      const sessionId = query.get('session_id');
      const interval = query.get('interval') || 'month';

      if (sessionId && user && !user.isSubscribed) {
        const verifySubscription = async () => {
          try {
            const token = localStorage.getItem('quest_token');
            const res = await fetch(`/api/subscription/verify-session?session_id=${sessionId}&interval=${interval}`, {
              headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
              const data = await res.json();
              if (data.success) {
                alert("🎉 Subscription Active! Thank you for upgrading to Pro!");
                // Remove query params
                window.history.replaceState({}, document.title, window.location.pathname);
                // Reload user (simple way) or update context
                window.location.reload();
              }
            }
          } catch (e) {
            console.error("Verification failed", e);
          }
        };
        verifySubscription();
      }
    } else if (query.get('canceled') === 'true') {
      alert("Subscription canceled.");
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [user]);

  // Save stats whenever they change
  useEffect(() => {
    localStorage.setItem('quest_stats', JSON.stringify(stats));
  }, [stats]);

  // Sync stats from Server User
  useEffect(() => {
    if (user) {
      setStats(prev => ({
        ...prev,
        xp: (user as any).xp !== undefined ? (user as any).xp : prev.xp,
        coins: (user as any).coins !== undefined ? (user as any).coins : prev.coins,
        completedQuizzes: user.completedQuizzes !== undefined ? user.completedQuizzes : prev.completedQuizzes,
        questsPlayed: user.questsPlayed !== undefined ? user.questsPlayed : prev.questsPlayed,
        level: (user as any).level !== undefined ? (user as any).level : prev.level
      }));
    }
  }, [user]);

  // Setup State

  // Setup State
  const [selectedSyllabus, setSelectedSyllabus] = useState<Syllabus | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [loadingTopics, setLoadingTopics] = useState(false);

  // Custom Quest State
  const [customQuests, setCustomQuests] = useState<CustomQuest[]>([]);
  const [selectedCustomQuest, setSelectedCustomQuest] = useState<CustomQuest | null>(null);
  const [gameMode, setGameMode] = useState<'AI' | 'CUSTOM'>('AI');

  // Game State
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loadingGame, setLoadingGame] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [paymentClientSecret, setPaymentClientSecret] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState<number>(0);
  const [paymentInterval, setPaymentInterval] = useState<'month' | 'year'>('month');
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [showQuotaModal, setShowQuotaModal] = useState(false);
  const [currencyConfig, setCurrencyConfig] = useState({ code: 'MYR', symbol: 'RM', amount: 16.9, amountAll: 19.9 });
  const [showPromo, setShowPromo] = useState(true);
  const [selectedPlanLevel, setSelectedPlanLevel] = useState<'single' | 'all'>('single');
  const [selectedSubscriptionSyllabus, setSelectedSubscriptionSyllabus] = useState<Syllabus | null>(null);

  // Geolocation Effect
  useEffect(() => {
    const detectCountry = async () => {
      // --- TESTING OVERRIDE: Set to 'SG', 'US', or null to use real IP ---
      const testRegion: string | null = null;
      // -------------------------------------------------------------------

      if (testRegion) {
        console.log("Using testing override:", testRegion);
        if (testRegion === 'SG') {
          setCurrencyConfig({ code: 'SGD', symbol: 'S$', amount: 9 });
        } else if (testRegion === 'US') {
          setCurrencyConfig({ code: 'USD', symbol: '$', amount: 7 });
        } else {
          setCurrencyConfig({ code: 'MYR', symbol: 'RM', amount: 25 });
        }
        return;
      }

      try {
        console.log("Fetching geolocation...");
        // Use backend proxy to avoid CORS issues on Vercel
        const res = await fetch('/api/geolocation');
        if (!res.ok) throw new Error("API response not ok");
        const data = await res.json();
        const code = data.countryCode;
        console.log("Detected Country:", code);

        if (code === 'SG') {
          setCurrencyConfig({ code: 'SGD', symbol: 'S$', amount: 16.9, amountAll: 19.9 });
        } else if (code === 'MY') {
          setCurrencyConfig({ code: 'MYR', symbol: 'RM', amount: 16.9, amountAll: 19.9 });
        } else {
          setCurrencyConfig({ code: 'USD', symbol: '$', amount: 16.9, amountAll: 19.9 });
        }
      } catch (error) {
        console.error("Geolocation failed:", error);
        // Default to MYR
        setCurrencyConfig({ code: 'MYR', symbol: 'RM', amount: 16.9, amountAll: 19.9 });
      }
    };
    detectCountry();
  }, []);

  // Load custom quests whenever view changes (e.g. coming back from dashboard)
  // Load custom quests whenever view changes (e.g. coming back from dashboard)
  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const res = await fetch('/api/quests');
        if (res.ok) {
          const data = await res.json();
          setCustomQuests(data);
        }
      } catch (error) {
        console.error("Failed to load quests", error);
      }
    };
    fetchQuests();
  }, [view]);

  // Auto-select KSSR/KSSM if not selected
  useEffect(() => {
    if (view === 'GAME_SETUP' && !selectedSyllabus) {
      setSelectedSyllabus(Syllabus.KSSR_KSSM);
    }
  }, [view, selectedSyllabus]);

  // Reset grade if invalid for current syllabus
  useEffect(() => {
    if (selectedSyllabus && selectedGrade) {
      const available = getGradesBySyllabus(selectedSyllabus);
      const allValues = [...available.primary, ...available.secondary, ...(available.advanced || [])];
      if (!allValues.includes(selectedGrade)) {
        setSelectedGrade(null);
      }
    }
  }, [selectedSyllabus]);

  const getGradesBySyllabus = (syll: Syllabus) => {
    const all = Object.values(GradeLevel);
    switch (syll) {
      case Syllabus.IGCSE:
        return {
          primary: all.filter(g => ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6'].includes(g)),
          secondary: all.filter(g => ['Year 7', 'Year 8', 'Year 9', 'Year 10 (IGCSE)', 'Year 11 (IGCSE)'].includes(g)),
          advanced: all.filter(g => ['Year 12 (A-Level)', 'Year 13 (A-Level)'].includes(g))
        };
      case Syllabus.MOE_SINGAPORE:
        return {
          primary: all.filter(g => g.startsWith('Standard')), // Singapore P1-P6 maps well to Standard 1-6
          secondary: all.filter(g => g.startsWith('Secondary'))
        };
      case Syllabus.IB:
        return {
          primary: all.filter(g => g.startsWith('Year') && parseInt(g.split(' ')[1]) <= 6),
          secondary: all.filter(g => g.startsWith('Year') && parseInt(g.split(' ')[1]) > 6 && parseInt(g.split(' ')[1]) <= 11),
          advanced: all.filter(g => ['Year 12 (A-Level)', 'Year 13 (A-Level)'].includes(g)) // IB also uses Year 12-13
        };
      case Syllabus.KSSR_KSSM:
      default:
        return {
          primary: all.filter(g => g.startsWith('Standard')),
          secondary: all.filter(g => g.startsWith('Form'))
        };
    }
  };

  // Scroll Reveal Observer
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [view]);

  // Fetch syllabus whenever Subject or Grade changes
  const fetchSyllabus = async () => {
    if (!selectedSubject || !selectedSyllabus || !selectedGrade) {
      console.log("Skipping syllabus fetch: missing selections");
      return;
    }
    console.log("🔄 Fetching syllabus for:", selectedSubject, selectedGrade, selectedSyllabus);
    setLoadingTopics(true);
    setTopics([]);
    setSelectedTopic(null);

    try {
      const fetchedTopics = await geminiService.generateSyllabus(selectedSubject, selectedGrade, selectedSyllabus);
      console.log("✅ Fetched topics:", fetchedTopics.length);
      setTopics(fetchedTopics);
    } catch (error: any) {
      console.error("❌ Error fetching topics:", error);
      if (error.message === "QUOTA_EXCEEDED") {
        setShowQuotaModal(true);
      }
    } finally {
      setLoadingTopics(false);
    }
  };

  useEffect(() => {
    if (selectedSubject && selectedGrade && selectedSyllabus && view === 'GAME_SETUP') {
      fetchSyllabus();
    }
  }, [selectedSubject, selectedGrade, selectedSyllabus, view]);

  const handleStartProcess = () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    // Allow everyone to play (Demo/Free)
    const subLevel = (user as any)?.subscriptionLevel;
    const subSyllabus = (user as any)?.subscribedSyllabus;
    if (user?.isSubscribed && subLevel === 'single' && subSyllabus) {
      setSelectedSyllabus(subSyllabus as Syllabus);
    }
    setView('GAME_SETUP');
  };

  const handleSubscribe = async (interval: 'month' | 'year', planLevel: 'single' | 'all', syllabus: Syllabus | null = null) => {
    if (!user) {
      alert("Please login or signup first to purchase a subscription.");
      setShowLoginModal(true);
      return;
    }

    if (planLevel === 'single' && !syllabus) {
      alert("Please select a syllabus for the Single Syllabus plan.");
      return;
    }

    try {
      console.log(`Starting embedded checkout process for ${planLevel} plan (${interval})...`);
      const token = localStorage.getItem('quest_token');

      const baseAmount = planLevel === 'all' ? currencyConfig.amountAll : currencyConfig.amount;
      const amount = interval === 'year'
        ? baseAmount * 10 * 100 // Example: 10 months for price of 12
        : baseAmount * 100;

      const body = {
        amount: Math.round(amount),
        currency: currencyConfig.code.toLowerCase(),
        interval,
        planLevel,
        syllabus
      };

      const res = await fetch('/api/subscription/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });

      if (res.ok) {
        const data = await res.json();
        setPaymentClientSecret(data.clientSecret);
        setPaymentAmount(data.amount);
        setPaymentInterval(interval);
        setSelectedPlanLevel(planLevel);
        setSelectedSubscriptionSyllabus(syllabus);
      } else {
        const err = await res.json();
        console.error("Subscription failed:", err);
        alert(`Failed to start subscription: ${err.error}`);
      }
    } catch (e) {
      console.error("Payment error:", e);
      alert("Error starting subscription. Check console.");
    }
  };

  const handleStartGame = async () => {
    // Check Subscription Limit (Limit: 1 Quest for free users/guests)

    // Prioritize questsPlayed (Generation count) if available
    let usageCount = 0;
    if (user && user.questsPlayed !== undefined) {
      usageCount = user.questsPlayed;
    } else {
      // Fallback or Guest
      usageCount = user?.completedQuizzes ?? stats.completedQuizzes;
    }

    console.log("Usage Check:", usageCount);

    // Check if user is Pro
    const isPro = user?.isSubscribed;
    const subscriptionLevel = (user as any)?.subscriptionLevel;
    const subscribedSyllabus = (user as any)?.subscribedSyllabus;

    if (!isPro && usageCount >= 1) {
      setShowLimitModal(true);
      return;
    }

    // Access Control check for Single Syllabus Plan
    if (isPro && subscriptionLevel === 'single' && selectedSyllabus !== subscribedSyllabus) {
      alert(`Your current plan only covers the ${subscribedSyllabus} syllabus. Please upgrade to "All Syllabus" or choose your subscribed syllabus.`);
      setView('PRICING');
      return;
    }

    setLoadingGame(true);

    if (gameMode === 'CUSTOM') {
      if (!selectedCustomQuest) {
        setLoadingGame(false);
        return;
      }
      setQuestions(selectedCustomQuest.questions);
      setLoadingGame(false);
      setView('GAME_SESSION');
      return;
    }

    // AI Mode
    if (!selectedSubject || !selectedTopic || !selectedSyllabus || !selectedGrade) {
      setLoadingGame(false);
      return;
    }

    try {
      const generatedQuestions = await geminiService.generateContent(selectedSubject, selectedGrade, selectedTopic, selectedSyllabus);

      if (generatedQuestions.length > 0) {
        setQuestions(generatedQuestions);
        setView('GAME_SESSION');
      } else {
        alert("Oops! The AI teacher is taking a nap. Please try again or check your API key.");
      }
    } catch (error: any) {
      if (error.message === "QUOTA_EXCEEDED") {
        setShowQuotaModal(true);
      } else if (error.message === "USER_LIMIT_REACHED") {
        setShowLimitModal(true);
      } else {
        console.error(error);
        alert("Error generating quest. Please check your connection.");
      }
    } finally {
      setLoadingGame(false);
    }
  };

  const handleGameComplete = async (score: number) => {
    // Save to Database first
    if (user) {
      try {
        const token = localStorage.getItem('quest_token');
        const res = await fetch('/api/results', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({
            score,
            mode: gameMode,
            questId: selectedCustomQuest?.id
          })
        });
        if (!res.ok) console.error("Failed to save result");
      } catch (e) {
        console.error(e);
      }
    }

    // Optimistic update for immediate feedback (tracked in local storage for guests)
    const xpGained = score;
    const coinsGained = Math.floor(score / 10);
    const newXp = stats.xp + xpGained;
    const newLevel = Math.floor(newXp / 1000) + 1;
    const newQuizzes = stats.completedQuizzes + 1;

    setStats(prev => ({
      ...prev,
      xp: newXp,
      coins: (prev.coins || 0) + coinsGained,
      level: newLevel,
      completedQuizzes: newQuizzes,
      streak: prev.streak + 1
    }));

    // Re-fetch user profile (background) to ensure sync
    if (user) {
      fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${localStorage.getItem('quest_token')}` }
      }).then(res => {
        if (res.ok) return res.json();
      }).then(data => {
        // Ideally we update AuthContext user here
      });
    }

    setView('DASHBOARD');
  };

  const getDaysRemaining = (date?: string | Date) => {
    if (!date) return null;
    const end = new Date(date);
    const now = new Date();
    const diffTime = end.getTime() - now.getTime();
    if (diffTime < 0) return 0;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleCancelSubscription = async () => {
    if (window.confirm("Are you sure you want to cancel your Pro subscription? You will lose access to unlimited quizzes.")) {
      const success = await cancelSubscription();
      if (success) {
        alert("Your subscription has been cancelled.");
        setView('HOME');
      }
    }
  };




  const LimitReachedModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full p-8 relative animate-pop-in shadow-2xl border-2 border-brand-orange/20 overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-brand-orange/10 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-orange rotate-3 shadow-inner">
            <Lock size={40} className="-rotate-3" />
          </div>

          <h3 className="text-3xl font-display font-bold text-brand-dark mb-4 tracking-tight">
            Quest Limit Reached!
          </h3>

          <div className="bg-orange-50/50 p-4 rounded-2xl mb-6 border border-brand-orange/10">
            <p className="text-brand-dark/70 leading-relaxed font-medium">
              You've completed your <span className="text-brand-orange font-bold">1 free quiz</span>.
              Upgrade to Pro for unlimited quest creation and play to unlock your full potential!
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              fullWidth
              size="lg"
              onClick={() => {
                setShowLimitModal(false);
                setView('PRICING');
              }}
              className="bg-brand-orange hover:bg-orange-400 py-6 text-lg shadow-lg shadow-brand-orange/20"
            >
              Upgrade to Pro <Sparkles size={18} className="ml-2" />
            </Button>

            <button
              onClick={() => setShowLimitModal(false)}
              className="text-brand-dark/40 hover:text-brand-dark font-bold text-sm transition-colors py-2"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </Card>
    </div>
  );

  const AiQuotaModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100] flex items-center justify-center p-4 animate-in fade-in duration-300">
      <Card className="max-w-md w-full p-8 relative animate-pop-in shadow-2xl border-2 border-brand-orange/20 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-orange/10 rounded-full blur-3xl"></div>

        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-brand-orange/5 rounded-3xl flex items-center justify-center mx-auto mb-6 text-brand-orange rotate-6 shadow-inner">
            <Coffee size={40} className="-rotate-6" />
          </div>

          <h3 className="text-3xl font-display font-bold text-brand-dark mb-4 tracking-tight">
            AI is Taking a Break!
          </h3>

          <div className="bg-orange-50/50 p-4 rounded-2xl mb-6 border border-brand-orange/10">
            <p className="text-brand-dark/70 leading-relaxed font-medium">
              We've hit the <span className="text-brand-orange font-bold">daily AI limit</span> for today.
              Our AI teacher needs some rest (and we need to wait for the quota to reset)!
            </p>
            <p className="text-xs text-brand-dark/40 mt-4 italic">
              Try again in a few hours or tomorrow morning.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <Button
              fullWidth
              size="lg"
              onClick={() => setShowQuotaModal(false)}
              className="bg-brand-orange hover:bg-orange-400 py-6 text-lg shadow-lg"
            >
              Understand
            </Button>

            <p className="text-xs text-brand-dark/30 font-medium">
              Daily limits help keep RevisionLab free for everyone.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );

  const renderHome = () => (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {showPromo && (
        <PromotionBanner
          onClose={() => setShowPromo(false)}
          onAction={() => setView('PRICING')}
        />
      )}
      <Hero
        onStart={handleStartProcess}
        onViewPricing={() => setView('PRICING')}
        isLoggedIn={!!user}
        isSubscribed={!!user?.isSubscribed}
      />

      <Benefits />

      <SyllabusExplorer
        onSelectSubject={(subject, syllabus) => {
          setSelectedSubject(subject);
          setSelectedSyllabus(syllabus);
          handleStartProcess();
        }}
      />

      <HowItWorks />

      <Testimonials />

      <FAQ />

      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-8">
        <h2 className="text-4xl md:text-6xl font-display font-bold text-brand-dark">
          Ready to start your <span className="text-brand-blue">quest</span>?
        </h2>
        <p className="text-xl text-brand-dark/60 max-w-2xl mx-auto font-medium">
          Join thousands of Malaysian students mastering their syllabus with RevisionLab.
        </p>
        <Button size="lg" onClick={handleStartProcess} className="px-16 py-6 text-xl shadow-xl">
          Get Started For Free <Rocket className="ml-2" />
        </Button>
      </div>

      <Footer />
    </div>
  );

  const renderPricing = () => {
    const yearlyPrice = currencyConfig.amount * 10; // Exactly 10x monthly (Best Value)

    return (
      <div className="max-w-6xl mx-auto px-4 pb-20 animate-float-slow">
        <div className="text-center mb-16 space-y-4">
          <Button variant="outline" size="sm" onClick={() => setView('HOME')} className="mb-4 mx-auto">
            <ArrowLeft size={16} /> Back to Home
          </Button>
          <h2 className="text-5xl font-display font-bold text-brand-dark">Choose Your Plan</h2>
          <p className="text-xl opacity-60">Unlock unlimited access to the entire curriculum.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {paymentClientSecret ? (
            <div className="md:col-span-3 flex justify-center">
              <PaymentForm
                amount={paymentAmount}
                interval={paymentInterval}
                planLevel={selectedPlanLevel}
                syllabus={selectedSubscriptionSyllabus}
                clientSecret={paymentClientSecret}
                onCancel={() => setPaymentClientSecret(null)}
                onSuccess={() => {
                  setPaymentClientSecret(null);
                  window.location.reload();
                }}
              />
            </div>
          ) : (
            <>
              {/* Free Starter */}
              <Card className="p-8 md:p-10 flex flex-col items-center gap-8 border-2 border-transparent hover:border-brand-dark/10 opacity-60 transition-all bg-white/50">
                <div className="text-center space-y-3">
                  <h3 className="font-display font-bold text-3xl text-brand-dark/60">Starter</h3>
                  <div className="text-5xl font-display font-bold text-brand-dark/60">
                    {currencyConfig.symbol} 0
                  </div>
                </div>

                <ul className="space-y-5 w-full flex-1">
                  <li className="flex items-start gap-3 text-sm font-medium text-brand-dark/60">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span>1 free quiz and 1 free create question</span>
                  </li>
                </ul>

                <Button variant="outline" fullWidth onClick={() => setView('GAME_SETUP')} className="py-4">
                  Get Started
                </Button>
              </Card>

              {/* Single Syllabus Plan */}
              <Card className="p-8 md:p-10 flex flex-col items-center gap-8 border-2 border-brand-dark/5 shadow-xl relative bg-white rounded-3xl group hover:border-brand-orange/20 transition-all">
                <div className="text-center space-y-3">
                  <h3 className="font-display font-bold text-3xl text-brand-dark">Single Syllabus</h3>
                  <div className="text-5xl font-display font-bold text-brand-dark">
                    {currencyConfig.symbol} {currencyConfig.amount}
                    <span className="text-lg font-normal opacity-40">/mo</span>
                  </div>
                </div>

                <div className="w-full space-y-2">
                  <label className="text-xs font-bold text-brand-dark/40 uppercase">Choose Your Syllabus</label>
                  <select
                    className="w-full p-3 rounded-xl border border-gray-100 bg-gray-50 text-sm font-medium focus:ring-2 focus:ring-brand-orange/20 outline-none"
                    onChange={(e) => setSelectedSubscriptionSyllabus(e.target.value as Syllabus)}
                    value={selectedSubscriptionSyllabus || ''}
                  >
                    <option value="" disabled>Select Syllabus...</option>
                    {Object.values(Syllabus).map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <ul className="space-y-5 w-full flex-1">
                  <li className="flex items-start gap-3 text-sm font-bold text-brand-dark/80 bg-brand-orange/5 p-4 rounded-xl border border-brand-orange/10">
                    <CheckCircle2 size={20} className="text-brand-orange shrink-0" />
                    <span>Unlimited Question & Answer</span>
                  </li>
                  <li className="flex items-start gap-3 text-sm font-medium text-brand-dark/60">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span>One Selected Syllabus</span>
                  </li>
                </ul>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => handleSubscribe('month', 'single', selectedSubscriptionSyllabus)}
                  disabled={authLoading || user?.isSubscribed}
                  className="bg-brand-orange hover:bg-orange-400 py-6 text-lg shadow-xl shadow-brand-orange/20"
                >
                  {user?.isSubscribed ? 'Active Subscription' : 'Choose Single Plan'}
                </Button>
              </Card>

              {/* All Syllabus Plan */}
              <Card className="p-8 md:p-10 flex flex-col items-center gap-8 border-4 border-brand-orange relative shadow-2xl bg-white rounded-3xl scale-105 z-10 group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-orange text-white px-6 py-2 rounded-full font-bold text-sm shadow-xl whitespace-nowrap animate-bounce">
                  BEST VALUE · ALL ACCESS
                </div>

                <div className="text-center space-y-3">
                  <h3 className="font-display font-bold text-3xl text-brand-dark">All Syllabus</h3>
                  <div className="text-5xl font-display font-bold text-brand-dark">
                    {currencyConfig.symbol} {currencyConfig.amountAll}
                    <span className="text-lg font-normal opacity-40">/mo</span>
                  </div>
                </div>

                <ul className="space-y-5 w-full flex-1">
                  <li className="flex items-start gap-4 text-sm font-bold text-brand-dark/80 px-2">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span>Unlimited Generate Question & Quiz</span>
                  </li>
                  <li className="flex items-start gap-4 text-sm font-bold text-brand-dark/80 px-2">
                    <CheckCircle2 size={18} className="text-brand-green shrink-0" />
                    <span>All Syllabuses Included</span>
                  </li>
                </ul>

                <Button
                  variant="primary"
                  fullWidth
                  size="lg"
                  onClick={() => handleSubscribe('month', 'all')}
                  disabled={authLoading || user?.isSubscribed}
                  className="bg-brand-orange hover:bg-orange-400 py-6 text-lg shadow-xl shadow-brand-orange/30 group-hover:scale-[1.02] transition-transform"
                >
                  {user?.isSubscribed ? 'Active Subscription' : 'Upgrade to All Access'}
                </Button>
              </Card>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderDashboard = () => (
    <div className="max-w-4xl mx-auto space-y-8 pt-12 animate-float">
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 animate-pulse rounded-full"></div>
          <Trophy size={80} className="text-brand-accent relative z-10 mx-auto" />
        </div>
        <h2 className="text-4xl font-display font-bold">Quest Complete!</h2>
        <p className="text-brand-dark/60">Great job, {user?.name}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-white/80 p-6 flex flex-col items-center justify-center">
          <div className="p-3 bg-blue-100 rounded-full text-brand-blue mb-2"><Star /></div>
          <div className="text-4xl font-bold text-brand-blue mb-1">{stats.xp}</div>
          <div className="text-sm font-bold uppercase text-brand-dark/50">Total XP</div>
        </Card>
        <Card className="bg-white/80 p-6 flex flex-col items-center justify-center">
          <div className="p-3 bg-green-100 rounded-full text-brand-green mb-2"><Zap /></div>
          <div className="text-4xl font-bold text-brand-green mb-1">{stats.level}</div>
          <div className="text-sm font-bold uppercase text-brand-dark/50">Current Level</div>
        </Card>
        <Card className="bg-white/80 p-6 flex flex-col items-center justify-center">
          <div className="p-3 bg-orange-100 rounded-full text-brand-orange mb-2"><Trophy /></div>
          <div className="text-4xl font-bold text-brand-orange mb-1">{stats.streak}</div>
          <div className="text-sm font-bold uppercase text-brand-dark/50">Day Streak</div>
        </Card>
        <Card className="bg-white/80 p-6 flex flex-col items-center justify-center border-2 border-yellow-400/20">
          <div className="p-3 bg-yellow-100 rounded-full text-yellow-600 mb-2"><Coins /></div>
          <div className="text-4xl font-bold text-yellow-600 mb-1">{stats.coins || 0}</div>
          <div className="text-sm font-bold uppercase text-brand-dark/50">Gold Coins</div>
        </Card>
      </div>

      {stats.badges.length > 0 && (
        <div className="bg-white/50 p-6 rounded-3xl">
          <h3 className="font-bold text-xl mb-4 text-center">Your Badges</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {stats.badges.map((badge, idx) => (
              <div key={idx} className="bg-white p-3 rounded-xl shadow-sm flex items-center gap-2 border border-brand-dark/5 px-4">
                <span className="text-2xl">🏅</span>
                <span className="font-bold text-sm">{badge}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 justify-center">
        <Button variant="outline" onClick={() => setView('HOME')}>Home</Button>
        <Button onClick={() => setView('GAME_SETUP')}>New Quest</Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen relative overflow-x-hidden selection:bg-brand-orange selection:text-white flex flex-col">
      {/* Background Decorative Blobs */}
      <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/20 rounded-full blur-3xl -z-10 animate-float" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/10 rounded-full blur-3xl -z-10" />

      {/* Navbar */}
      <nav className="p-3 md:p-4 lg:p-5 flex justify-between items-center max-w-6xl mx-auto z-50 relative">
        <div className="flex items-center gap-2 cursor-pointer flex-shrink-0" onClick={() => setView('HOME')}>
          <BookOpen className="text-brand-orange w-5 h-5 md:w-6 md:h-6" />
          <span className="font-display font-bold text-base md:text-lg hidden sm:inline tracking-tight">RevisionLab</span>
        </div>

        <div className="hidden md:flex items-center gap-4 lg:gap-8 flex-1 justify-center px-4">
          <button onClick={() => { setView('HOME'); setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-bold text-brand-dark/60 hover:text-brand-blue transition-colors text-xs lg:text-sm whitespace-nowrap">Courses</button>
          <button onClick={() => setView('PRICING')} className="font-bold text-brand-dark/60 hover:text-brand-blue transition-colors text-xs lg:text-sm whitespace-nowrap">Pricing</button>
          <button onClick={() => { setView('HOME'); setTimeout(() => document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-bold text-brand-dark/60 hover:text-brand-blue transition-colors text-xs lg:text-sm whitespace-nowrap">Reviews</button>
          <button onClick={() => { setView('HOME'); setTimeout(() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' }), 100); }} className="font-bold text-brand-dark/60 hover:text-brand-blue transition-colors text-xs lg:text-sm whitespace-nowrap">FAQ</button>
        </div>

        <div className="flex items-center gap-4">
          {!user ? (
            <Button size="sm" onClick={() => setShowLoginModal(true)}>Log In</Button>
          ) : (
            <>
              {user.isSubscribed && (
                <div className="hidden sm:flex flex-col items-center bg-white/50 px-2 py-1 rounded-lg">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-brand-green">
                    <CheckCircle2 size={10} /> PRO
                  </div>
                  {user.subscriptionEndDate && (
                    <div className="text-[8px] font-bold text-brand-dark/40">
                      {getDaysRemaining(user.subscriptionEndDate)}d left
                    </div>
                  )}
                </div>
              )}
              {/* Show Coins in Navbar */}
              <div className="hidden items-center gap-1 bg-yellow-100/80 px-3 py-1 rounded-full border border-yellow-200 text-yellow-700 sm:flex">
                <Coins className="w-4 h-4 fill-yellow-500" />
                <span className="font-bold text-sm">{stats.coins || 0}</span>
              </div>

              <div className="flex items-center gap-2 bg-white/60 backdrop-blur px-3 py-1 rounded-full border border-white/50">
                <Star className="w-4 h-4 text-brand-accent fill-brand-accent" />
                <span className="font-bold text-sm">{stats.xp} XP</span>
              </div>
              <div className="relative">
                <div
                  className="w-10 h-10 rounded-full bg-brand-dark text-white flex items-center justify-center font-bold overflow-hidden border-2 border-white ring-2 ring-black/5 cursor-pointer hover:scale-105 transition-transform"
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  title="Profile Menu"
                >
                  {user.avatar ? <img src={user.avatar} alt="avatar" /> : user.name.charAt(0)}
                </div>

                {showProfileMenu && (
                  <div className="absolute right-0 top-12 w-48 bg-white rounded-xl shadow-xl border border-brand-dark/10 overflow-hidden animate-pop-in z-50">
                    <div className="p-4 border-b border-brand-dark/5 bg-brand-dark/5">
                      <p className="font-bold text-brand-dark truncate">{user.name}</p>
                      <p className="text-xs text-brand-dark/50 truncate">{user.email}</p>
                    </div>
                    <button
                      onClick={() => { setView('DASHBOARD'); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-brand-blue/5 text-sm font-bold text-brand-dark/70 hover:text-brand-blue flex items-center gap-2 transition-colors"
                    >
                      <UserIcon size={16} /> Dashboard
                    </button>
                    {user.isSubscribed && (
                      <div className="px-4 py-2 bg-brand-orange/5 border-b border-brand-dark/5">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                          <span className="text-brand-dark/40 uppercase">Status</span>
                          <span className="text-brand-orange uppercase">Pro Active</span>
                        </div>
                        {user.subscriptionEndDate && (
                          <div className="flex justify-between items-center text-[10px] font-bold mt-1">
                            <span className="text-brand-dark/40 uppercase">Expires in</span>
                            <span className="text-brand-dark">{getDaysRemaining(user.subscriptionEndDate)} days</span>
                          </div>
                        )}
                      </div>
                    )}
                    {user.isSubscribed && (
                      <button
                        onClick={() => { handleCancelSubscription(); setShowProfileMenu(false); }}
                        className="w-full text-left px-4 py-3 hover:bg-brand-orange/5 text-sm font-bold text-brand-orange flex items-center gap-2 transition-colors"
                      >
                        <ShieldCheck size={16} /> Cancel Subscription
                      </button>
                    )}
                    <button
                      onClick={() => { logout(); setShowProfileMenu(false); }}
                      className="w-full text-left px-4 py-3 hover:bg-red-50 text-sm font-bold text-red-500 flex items-center gap-2 transition-colors"
                    >
                      <LogOut size={16} /> Log Out
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-20 relative z-10">
        {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} />}
        {showLimitModal && <LimitReachedModal />}
        {showQuotaModal && <AiQuotaModal />}

        {view === 'HOME' && renderHome()}
        {view === 'PRICING' && renderPricing()}
        {view === 'TEACHER_DASHBOARD' && (
          <TeacherDashboard
            onBack={() => setView('HOME')}
            onViewPricing={() => setView('PRICING')}
          />
        )}

        {view === 'GAME_SETUP' && (
          <div className="max-w-4xl mx-auto space-y-8 animate-float">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" size="sm" onClick={() => setView('HOME')}>
                <ArrowLeft size={20} /> Back
              </Button>
              <h2 className="text-3xl font-display font-bold text-brand-dark">Setup Your Quest</h2>
            </div>

            <Card>
              {/* Mode Selection */}
              <div className="flex gap-4 mb-8 border-b border-brand-dark/10 pb-6">
                <button
                  onClick={() => setGameMode('AI')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'AI' ? 'bg-brand-blue text-white shadow-lg' : 'bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                >
                  <Sparkles size={18} /> AI Generated Quest
                </button>
                <button
                  onClick={() => setGameMode('CUSTOM')}
                  className={`flex-1 py-3 px-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${gameMode === 'CUSTOM' ? 'bg-brand-orange text-white shadow-lg' : 'bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                >
                  <GraduationCap size={18} /> Teacher / Custom Quest
                </button>
              </div>

              {gameMode === 'AI' ? (
                <>
                  {/* Step 1: Syllabus Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">1. Select Syllabus</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
                      {Object.values(Syllabus).map((syll) => {
                        const isPro = user?.isSubscribed;
                        const subLevel = (user as any)?.subscriptionLevel;
                        const subSyllabus = (user as any)?.subscribedSyllabus;
                        const isLocked = isPro && subLevel === 'single' && subSyllabus && subSyllabus !== syll;

                        return (
                          <button
                            key={syll}
                            onClick={() => !isLocked && setSelectedSyllabus(syll)}
                            disabled={isLocked}
                            className={`p-4 rounded-xl border-2 font-bold text-left transition-all flex items-center justify-between gap-3 ${selectedSyllabus === syll ? 'border-brand-accent bg-orange-50 text-brand-accent shadow-sm' : 'border-brand-dark/10 bg-white/50 hover:bg-white hover:border-brand-dark/20'} ${isLocked ? 'opacity-40 cursor-not-allowed bg-gray-50' : ''}`}
                          >
                            <div className="flex items-center gap-3">
                              <ScrollText size={20} className={selectedSyllabus === syll ? 'text-brand-accent' : 'text-brand-dark/40'} />
                              <span>{syll}</span>
                            </div>
                            {isLocked && (
                              <div className="bg-brand-orange/10 text-brand-orange text-[10px] px-2 py-1 rounded-lg flex items-center gap-1">
                                <Lock size={10} /> LOCKED
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Step 2: Grade Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">2. Select Grade / Level</label>
                    <div className="space-y-4">
                      {selectedSyllabus && (() => {
                        const grades = getGradesBySyllabus(selectedSyllabus);
                        return (
                          <>
                            {grades.primary.length > 0 && (
                              <div>
                                <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Primary / Elementary</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
                                  {grades.primary.map((grade) => (
                                    <button
                                      key={grade}
                                      onClick={() => setSelectedGrade(grade)}
                                      className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                    >
                                      {grade}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {grades.secondary.length > 0 && (
                              <div>
                                <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Secondary / Middle School</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                                  {grades.secondary.map((grade) => (
                                    <button
                                      key={grade}
                                      onClick={() => setSelectedGrade(grade)}
                                      className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                    >
                                      {grade}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                            {grades.advanced && grades.advanced.length > 0 && (
                              <div>
                                <span className="text-xs font-bold text-brand-dark/40 mb-2 block uppercase">Advanced / Pre-U</span>
                                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
                                  {grades.advanced.map((grade) => (
                                    <button
                                      key={grade}
                                      onClick={() => setSelectedGrade(grade)}
                                      className={`p-2 py-3 rounded-xl border-2 font-bold text-xs transition-all ${selectedGrade === grade ? 'border-brand-blue bg-blue-50 text-brand-blue' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                                    >
                                      {grade}
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Step 3: Subject Selection */}
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider mb-3">3. Choose Subject</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                      {SUBJECTS.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => setSelectedSubject(sub.id)}
                          className={`p-3 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${selectedSubject === sub.id ? 'border-brand-blue bg-white shadow-md scale-105' : 'border-transparent bg-brand-dark/5 hover:bg-brand-dark/10'}`}
                        >
                          <div className={`${sub.color} w-10 h-10 flex items-center justify-center rounded-full text-lg shadow-sm`}>{sub.icon}</div>
                          <span className="font-bold text-xs text-center leading-tight">{sub.id}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Step 4: Topic Selection */}
                  <div className="flex justify-between items-center mb-3">
                    <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider">4. Select Topic</label>
                    {selectedSubject && selectedGrade && (
                      <button onClick={fetchSyllabus} className="text-xs text-brand-blue flex items-center gap-1 hover:underline">
                        <RefreshCw size={12} /> Refresh Topics
                      </button>
                    )}
                  </div>

                  <div className="min-h-[120px] mb-8">
                    {!selectedSubject || !selectedSyllabus || !selectedGrade ? (
                      <div className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-brand-dark/20 rounded-xl text-brand-dark/40">
                        <BookOpen size={32} className="mb-2" />
                        <p>Select syllabus, grade and subject first</p>
                      </div>
                    ) : loadingTopics ? (
                      <div className="flex flex-col items-center justify-center h-32 space-y-3">
                        <Loader2 className="animate-spin text-brand-blue" size={32} />
                        <p className="text-sm font-bold text-brand-blue animate-pulse">Scanning {selectedSyllabus} Syllabus...</p>
                      </div>
                    ) : topics.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {topics.map((topic, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedTopic(topic)}
                            className={`p-3 text-left rounded-xl border-2 font-bold transition-all text-sm ${selectedTopic === topic ? 'border-brand-accent bg-orange-50 text-brand-accent shadow-sm' : 'border-brand-dark/10 bg-white/50 hover:bg-white hover:border-brand-dark/20'}`}
                          >
                            {topic}
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center p-8 text-brand-dark/50">
                        <p>No topics found. Try refreshing.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-bold text-brand-dark/60 uppercase tracking-wider">Select a Custom Quest</label>
                    {user && (
                      <button
                        onClick={() => setView('TEACHER_DASHBOARD')}
                        className="text-xs font-bold text-brand-orange flex items-center gap-1 hover:underline bg-brand-orange/5 px-3 py-1.5 rounded-lg border border-brand-orange/20 transition-all hover:bg-brand-orange/10"
                      >
                        <Plus size={14} /> Manage / Create Quests
                      </button>
                    )}
                  </div>

                  {customQuests.length === 0 ? (
                    <div className="text-center p-12 border-2 border-dashed border-brand-dark/10 rounded-xl">
                      <p className="text-brand-dark/60 mb-4">No custom quests found.</p>
                      {user ? (
                        <Button onClick={() => setView('TEACHER_DASHBOARD')}>Create Your First Quest</Button>
                      ) : (
                        <p className="text-sm text-brand-dark/40 italic">Ask your teacher or parent to create one!</p>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {customQuests.map((quest) => (
                        <button
                          key={quest.id}
                          onClick={() => setSelectedCustomQuest(quest)}
                          className={`p-4 rounded-xl border-2 text-left transition-all ${selectedCustomQuest?.id === quest.id ? 'border-brand-orange bg-orange-50 ring-2 ring-brand-orange/20' : 'border-brand-dark/10 bg-white hover:border-brand-orange/50'}`}
                        >
                          <div className="font-bold text-lg mb-1">{quest.title}</div>
                          <div className="text-xs font-bold text-brand-dark/50">
                            {quest.questions.length} Questions • {new Date(quest.createdAt).toLocaleDateString()}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <Button
                fullWidth
                size="lg"
                disabled={gameMode === 'AI' ? (!selectedSubject || !selectedTopic || !selectedSyllabus || !selectedGrade || loadingGame) : (!selectedCustomQuest)}
                onClick={handleStartGame}
              >
                {loadingGame ? <><Loader2 className="animate-spin" /> Preparing Quest...</> : 'Start Adventure'}
              </Button>
            </Card>
          </div>
        )}

        {view === 'GAME_SESSION' && (
          <GameSession
            questions={questions}
            onComplete={handleGameComplete}
            onExit={() => setView('HOME')}
          />
        )}
        {view === 'DASHBOARD' && renderDashboard()}
      </main>
    </div>
  );
}