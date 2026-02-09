import React, { useState, useEffect } from 'react';
import { GameState, Question, UserStats } from '../types';
import { Button } from './Button';
import { Card } from './Card';
import { CheckCircle, XCircle, Award, ArrowRight, Brain, Lightbulb, Volume2, Coins } from 'lucide-react';


interface GameSessionProps {
  questions: Question[];
  onComplete: (score: number) => void;
  onExit: () => void;
}

export const GameSession: React.FC<GameSessionProps> = ({ questions, onComplete, onExit }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [streak, setStreak] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;

  // Simple Sound Effects (using browser Audio API fallback or placeholder)
  const playSound = (type: 'correct' | 'wrong') => {
    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    if (type === 'correct') {
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(600, audioCtx.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.1);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.5);
    } else {
      oscillator.type = 'sawtooth';
      oscillator.frequency.setValueAtTime(200, audioCtx.currentTime);
      oscillator.frequency.linearRampToValueAtTime(100, audioCtx.currentTime + 0.3);
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.3);
    }
  };

  const handleOptionSelect = (index: number) => {
    if (selectedOption !== null) return; // Prevent changing answer
    setSelectedOption(index);
    setShowExplanation(true);

    if (index === currentQuestion.correctAnswerIndex) {
      setScore(prev => prev + 100 + (streak * 10)); // Bonus for streaks
      setStreak(prev => prev + 1);


      playSound('correct');

    } else {
      setStreak(0);
      playSound('wrong');
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(score);
    } else {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    }
  };

  const progressPercentage = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="max-w-3xl mx-auto w-full p-4 space-y-6">
      {/* Header Stats */}
      <div className="flex justify-between items-center mb-6">
        <Button variant="outline" size="sm" onClick={onExit}>Quit</Button>
        <div className="flex items-center gap-4">
          <div className="bg-brand-cream px-4 py-2 rounded-xl font-bold text-brand-orange flex items-center gap-2 animate-bounce-sm">
            <Coins className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span>{score}</span>
          </div>
          <div className="bg-brand-cream px-4 py-2 rounded-xl font-bold text-brand-green">
            Streak: {streak} 🔥
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-white/50 rounded-full h-4 mb-8 overflow-hidden border border-white/50">
        <div
          className="bg-brand-green h-full rounded-full transition-all duration-500 ease-out shadow-[0_0_10px_rgba(0,200,83,0.5)]"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Question Card */}
      <Card className="relative overflow-hidden min-h-[300px] flex flex-col justify-center animate-slide-up bg-white/90 backdrop-blur-xl">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Brain size={150} />
        </div>

        <div className="flex justify-between items-start mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-dark/40 bg-brand-dark/5 px-2 py-1 rounded">Question {currentIndex + 1}</span>
          <button className="text-brand-dark/20 hover:text-brand-dark"><Volume2 size={20} /></button>
        </div>

        <h2 className="text-2xl md:text-3xl font-display font-bold text-brand-dark mb-8 relative z-10 leading-snug">
          {currentQuestion.text}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
          {currentQuestion.options.map((option, idx) => {
            let buttonVariant: 'outline' | 'primary' | 'secondary' | 'accent' = 'outline';
            let icon = null;

            if (selectedOption !== null) {
              if (idx === currentQuestion.correctAnswerIndex) {
                buttonVariant = 'secondary'; // Correct
                icon = <CheckCircle className="ml-auto w-5 h-5" />;
              } else if (idx === selectedOption) {
                buttonVariant = 'accent'; // Wrong
                icon = <XCircle className="ml-auto w-5 h-5" />;
              }
            }

            return (
              <Button
                key={idx}
                variant={selectedOption === null ? 'outline' : buttonVariant}
                className={`!justify-start text-left h-auto py-4 px-6 text-lg transition-all transform ${selectedOption === null ? 'hover:bg-brand-blue/10 hover:border-brand-blue hover:scale-[1.02]' : ''}`}
                onClick={() => handleOptionSelect(idx)}
                disabled={selectedOption !== null}
                fullWidth
              >
                <span className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm font-bold transition-colors ${selectedOption === idx ? 'bg-white/20 text-white' : 'bg-brand-dark/10 text-brand-dark/60'}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                {option}
                {icon}
              </Button>
            );
          })}
        </div>
      </Card>

      {/* Explanation Feedback */}
      {showExplanation && (
        <div className="animate-pop-in">
          <Card className={`!bg-opacity-95 ${selectedOption === currentQuestion.correctAnswerIndex ? '!bg-green-50' : '!bg-orange-50'} border-l-8 ${selectedOption === currentQuestion.correctAnswerIndex ? 'border-l-brand-green' : 'border-l-brand-accent'} shadow-xl`}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                <h3 className="font-bold text-2xl flex items-center gap-2">
                  {selectedOption === currentQuestion.correctAnswerIndex ?
                    <><span className="text-3xl">🎉</span> Awesome Job!</> :
                    <><span className="text-3xl">💪</span> Nice try! Keep going!</>}
                </h3>
                <Button onClick={handleNext} variant="primary" className="shrink-0 w-full md:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all">
                  {isLastQuestion ? 'Finish Quest' : 'Next Question'} <ArrowRight size={18} />
                </Button>
              </div>

              {selectedOption !== currentQuestion.correctAnswerIndex && (
                <div className="bg-red-100/50 p-4 rounded-xl border border-red-200 icon-shake">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Correct Answer:</span>
                  <p className="font-bold text-lg text-brand-dark mt-1">
                    {currentQuestion.options[currentQuestion.correctAnswerIndex]}
                  </p>
                </div>
              )}

              <div className="bg-white/60 p-5 rounded-xl border border-white/50">
                <div className="flex items-center gap-2 mb-3 text-brand-blue">
                  <Lightbulb size={20} className="fill-brand-blue text-brand-blue" />
                  <span className="font-bold text-sm uppercase tracking-wide">Learner's Note</span>
                </div>
                <div className="text-brand-dark/90 leading-relaxed font-medium space-y-2 text-left">
                  {currentQuestion.explanation.split('\n').map((line, i) => (
                    <p key={i} className={line.startsWith('Step') ? 'mb-2' : ''}>
                      {line.split(/(\*\*.*?\*\*)/).map((part, j) =>
                        part.startsWith('**') && part.endsWith('**') ?
                          <strong key={j} className="text-brand-blue">{part.slice(2, -2)}</strong> :
                          part
                      )}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};