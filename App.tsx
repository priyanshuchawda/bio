import React, { useState, useEffect, useMemo, useCallback } from 'react';
import CellDiagram from './components/CellDiagram';
import { plantCellData, animalCellData, DIFFERENCES, QUIZ_QUESTIONS, ACHIEVEMENTS_DATA } from './constants';
import type { CellPart, Achievement, CellDifference } from './types';

// SVG Icon components
const Sun = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m4.93 19.07 1.41-1.41"></path><path d="m17.66 6.34 1.41-1.41"></path></svg>;
const Moon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg>;
const XCircle = ({ size = 24 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;
const Trophy = ({ className = "w-8 h-8" }: { className?: string }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V6h4v8.66"/><path d="M10 14.66c-1.92.52-3.48 2.08-3.48 4.14A3.5 3.5 0 0 0 10 22h4a3.5 3.5 0 0 0 3.48-3.2c0-2.06-1.56-3.62-3.48-4.14"/></svg>;
const BookOpen = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>;
const GitCompare = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="18" r="3"></circle><circle cx="6" cy="6" r="3"></circle><path d="M13 6h3a2 2 0 0 1 2 2v7"></path><path d="M11 18H8a2 2 0 0 1-2-2V9"></path></svg>;
const HelpCircle = ({ size = 18 }: { size?: number }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>;
const AchievementIcon = ({ path, className = "w-8 h-8" }: { path: string, className?: string }) => <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d={path}></path></svg>;

// Main App Component
const App: React.FC = () => {
  // State
  const [selectedPart, setSelectedPart] = useState<CellPart | null>(null);
  const [view, setView] = useState<'explore' | 'compare' | 'quiz'>('explore');
  const [isDarkMode, setIsDarkMode] = useState(() => window.matchMedia?.('(prefers-color-scheme: dark)').matches);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Set<string>>(new Set());
  const [visitedParts, setVisitedParts] = useState<Set<string>>(new Set());
  const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
  const [recentAchievement, setRecentAchievement] = useState<string | null>(null);

  // Compare View State
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [compareStartTime, setCompareStartTime] = useState<number | null>(null);

  // Quiz State
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<{ answer: string; isCorrect: boolean } | null>(null);

  // Handlers
  const handlePartClick = (part: CellPart) => {
    setSelectedPart(part);
    setVisitedParts(prev => new Set(prev).add(part.id));
  };
  
  const handleViewChange = useCallback((newView: 'explore' | 'compare' | 'quiz') => {
    setView(newView);
    if (newView === 'compare' && compareStartTime === null) {
      setCompareStartTime(Date.now());
    }
  }, [compareStartTime]);
  
  const unlockAchievement = useCallback((id: string) => {
    setUnlockedAchievements(prev => {
      if (prev.has(id)) return prev;
      const newSet = new Set(prev);
      newSet.add(id);
      setRecentAchievement(id);
      setTimeout(() => setRecentAchievement(null), 4000); // Notification lasts 4s
      return newSet;
    });
  }, []);

  // Achievement Logic
  useEffect(() => {
    // Cell Explorer
    const totalParts = plantCellData.parts.length + animalCellData.parts.length;
    if (visitedParts.size === totalParts) {
      unlockAchievement('explorer');
    }
    // Quiz Master
    if (quizFinished && score === QUIZ_QUESTIONS.length) {
      unlockAchievement('quiz_master');
    }
  }, [visitedParts, quizFinished, score, unlockAchievement]);

  // Dark Mode Effect
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Card Flip Logic
  const handleCardFlip = (id: number) => {
    const newFlipped = new Set(flippedCards);
    newFlipped.add(id);
    setFlippedCards(newFlipped);

    if (newFlipped.size === DIFFERENCES.length) {
      unlockAchievement('discoverer');
      if (compareStartTime) {
        const timeTaken = (Date.now() - compareStartTime) / 1000;
        if (timeTaken < 30) {
          unlockAchievement('speed_learner');
        }
      }
    }
  };

  // Quiz Logic
  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    const isCorrect = QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer === answer;
    if (isCorrect) setScore(s => s + 1);
    setSelectedAnswer({ answer, isCorrect });
  };
  
  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setQuizFinished(false);
    setSelectedAnswer(null);
  };
  
  // Render methods for views
  const exploreViewContent = (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 md:p-8">
      <CellDiagram data={plantCellData} onPartClick={handlePartClick} />
      <CellDiagram data={animalCellData} onPartClick={handlePartClick} />
    </div>
  );

  const compareViewContent = (
    <div className="p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-2">Can You Spot the Differences?</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-8">Click on the cards to flip them over and learn!</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 perspective-1000">
        {DIFFERENCES.map((diff) => (
          <div key={diff.id} className="h-64 cursor-pointer" onClick={() => handleCardFlip(diff.id)}>
            <div className={`relative w-full h-full transform-style-3d transition-transform duration-700 ${flippedCards.has(diff.id) ? 'rotate-y-180' : ''}`}>
              {/* Card Front */}
              <div className="absolute w-full h-full backface-hidden bg-white dark:bg-gray-700 rounded-2xl shadow-lg flex flex-col items-center justify-center p-4 text-center border-2 border-blue-300 dark:border-blue-700">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{diff.feature}</h3>
                <p className="text-gray-500 dark:text-gray-400 mt-2">(Click to reveal)</p>
              </div>
              {/* Card Back */}
              <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-blue-100 dark:bg-slate-800 rounded-2xl shadow-xl flex flex-col justify-center p-4 border-2 border-blue-400">
                <h4 className="text-lg font-bold text-blue-800 dark:text-blue-300 mb-2">{diff.feature}</h4>
                <p className="text-sm"><strong className="text-green-600">Plant Cell:</strong> {diff.plant}</p>
                <p className="text-sm mt-2"><strong className="text-pink-600">Animal Cell:</strong> {diff.animal}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const quizViewContent = useMemo(() => {
    if (quizFinished) {
      return (
        <div className="p-4 md:p-8 max-w-2xl mx-auto text-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
          <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-4">Quiz Complete!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">You scored {score} out of {QUIZ_QUESTIONS.length}.</p>
          {score === QUIZ_QUESTIONS.length && <p className="text-lg font-semibold text-green-500 mb-4">Perfect Score! "Quiz Master" badge earned!</p>}
          <button onClick={restartQuiz} className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">Try Again</button>
        </div>
      );
    }
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    return (
      <div className="p-4 md:p-8 max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Question {currentQuestionIndex + 1} of {QUIZ_QUESTIONS.length}</p>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">{question.question}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option) => {
            const isSelected = selectedAnswer?.answer === option;
            const isCorrect = question.correctAnswer === option;
            let buttonClass = 'p-4 text-left bg-gray-100 dark:bg-gray-700 rounded-lg transition-all duration-300';
            if (selectedAnswer) {
              if (isCorrect) buttonClass += ' bg-green-200 dark:bg-green-800 ring-2 ring-green-500';
              else if (isSelected) buttonClass += ' bg-red-200 dark:bg-red-800 ring-2 ring-red-500';
              else buttonClass += ' opacity-50';
            } else {
              buttonClass += ' hover:bg-blue-100 dark:hover:bg-blue-900';
            }
            return <button key={option} onClick={() => handleAnswer(option)} disabled={!!selectedAnswer} className={buttonClass}>{option}</button>;
          })}
        </div>
        {selectedAnswer && <button onClick={handleNextQuestion} className="w-full mt-6 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">Next Question</button>}
      </div>
    );
  }, [quizFinished, currentQuestionIndex, score, selectedAnswer]);
  
  const NavButton = ({ currentView, targetView, children }: { currentView: string, targetView: string, children: React.ReactNode}) => (
    <button onClick={() => handleViewChange(targetView as any)} className={`flex-1 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 px-3 py-2 rounded-lg transition-all duration-300 font-semibold ${currentView === targetView ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-md' : 'text-gray-500 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-slate-700/50'}`}>
        {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-sky-100 dark:bg-slate-900 text-gray-900 dark:text-gray-50 transition-colors duration-300">
      <style>{`
        @keyframes modal-enter { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
        .animate-modal-enter { animation: modal-enter 0.2s ease-out forwards; }
        @keyframes toast-in { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-toast-in { animation: toast-in 0.5s cubic-bezier(0.25, 1, 0.5, 1) forwards; }
        @keyframes pulse-slow { 0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(253, 224, 71, 0.7); } 50% { transform: scale(1.1); box-shadow: 0 0 0 8px rgba(253, 224, 71, 0); } }
        .animate-pulse-slow { animation: pulse-slow 2.5s infinite; }
      `}</style>

      <header className="sticky top-0 z-20 bg-gradient-to-b from-white/90 to-white/70 dark:from-slate-800/90 dark:to-slate-800/70 backdrop-blur-lg shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-300">Cell Explorer</h1>
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="hidden md:flex items-center gap-1 bg-gray-200 dark:bg-slate-800 p-1 rounded-xl">
                <NavButton currentView={view} targetView='explore'><BookOpen size={18}/> Explore</NavButton>
                <NavButton currentView={view} targetView='compare'><GitCompare size={18}/> Compare</NavButton>
                <NavButton currentView={view} targetView='quiz'><HelpCircle size={18}/> Quiz</NavButton>
            </nav>
            <button onClick={() => setIsAchievementsModalOpen(true)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"><Trophy className="w-6 h-6"/></button>
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700">{isDarkMode ? <Sun /> : <Moon />}</button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-2 pb-24">{view === 'explore' ? exploreViewContent : view === 'compare' ? compareViewContent : quizViewContent}</main>

      <nav className="fixed bottom-0 left-0 right-0 z-20 md:hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg border-t border-gray-200 dark:border-gray-700 flex justify-around p-2 gap-2">
          <NavButton currentView={view} targetView='explore'><BookOpen size={20}/> <span className="text-xs">Explore</span></NavButton>
          <NavButton currentView={view} targetView='compare'><GitCompare size={20}/> <span className="text-xs">Compare</span></NavButton>
          <NavButton currentView={view} targetView='quiz'><HelpCircle size={20}/> <span className="text-xs">Quiz</span></NavButton>
      </nav>

      {/* Cellpedia Modal */}
      {selectedPart && (
        <div className="fixed inset-0 z-30 bg-black/50 flex items-center justify-center p-4" onClick={() => setSelectedPart(null)}>
          <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full relative transform animate-modal-enter overflow-hidden`} onClick={(e) => e.stopPropagation()}>
            <div className={`p-6 md:p-8 ${selectedPart.id.startsWith('plant') ? 'bg-green-100 dark:bg-green-900' : 'bg-pink-100 dark:bg-pink-900'}`}>
              <h3 className={`text-3xl font-bold mb-4 ${selectedPart.id.startsWith('plant') ? 'text-green-800 dark:text-green-200' : 'text-pink-800 dark:text-pink-200'}`}>{selectedPart.name}</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300">{selectedPart.longDescription}</p>
            </div>
            <div className="p-6 md:p-8 bg-gray-50 dark:bg-gray-700/50">
                <p className="font-semibold text-blue-800 dark:text-blue-200">Analogy:</p>
                <p className="text-blue-700 dark:text-blue-300">{selectedPart.analogy}</p>
            </div>
            <button onClick={() => setSelectedPart(null)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><XCircle /></button>
          </div>
        </div>
      )}

      {/* Achievements Modal */}
      {isAchievementsModalOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4" onClick={() => setIsAchievementsModalOpen(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 max-w-lg w-full relative transform animate-modal-enter" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setIsAchievementsModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"><XCircle /></button>
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-6">My Badges</h3>
            <div className="grid grid-cols-2 gap-4">
              {ACHIEVEMENTS_DATA.map(ach => {
                const isUnlocked = unlockedAchievements.has(ach.id);
                return (
                  <div key={ach.id} className={`p-4 rounded-lg flex items-center gap-4 border-2 ${isUnlocked ? 'border-green-400 bg-green-50 dark:bg-green-900/50' : 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700/50'}`}>
                    <div className={isUnlocked ? 'text-green-500' : 'text-gray-400 dark:text-gray-500'}>
                        <AchievementIcon path={ach.icon} className="w-10 h-10"/>
                    </div>
                    <div>
                      <p className={`font-bold ${isUnlocked ? 'text-gray-800 dark:text-gray-100' : 'text-gray-500 dark:text-gray-400'}`}>{ach.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{ach.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {recentAchievement && (
        <div className="fixed bottom-20 right-4 md:bottom-4 md:right-4 z-50">
            <div className="bg-green-500 text-white p-4 rounded-lg shadow-lg flex items-center gap-3 animate-toast-in">
                 <AchievementIcon path={ACHIEVEMENTS_DATA.find(a => a.id === recentAchievement)?.icon || ''} className="w-8 h-8"/>
                <div>
                    <p className="font-bold">Achievement Unlocked!</p>
                    <p className="text-sm">{ACHIEVEMENTS_DATA.find(a => a.id === recentAchievement)?.name}</p>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default App;