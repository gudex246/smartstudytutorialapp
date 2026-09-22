import React, { useState, useMemo } from 'react';
import {
  Layers,
  CheckCircle,
  XCircle,
  HelpCircle,
  Sparkles,
  Timer,
  Award,
  RotateCcw,
  Lock,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Filter,
  Search,
  BookOpen,
  ArrowUp
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Question, User } from '../../types';
import { ALL_SUBJECTS, AVAILABLE_YEARS, ADMIN_EMAIL } from '../../data/initialData';
import { saveQuizAttempt } from '../../utils/storage';
import { TrilingualExplanation } from '../common/TrilingualExplanation';
import { cleanTutorText } from '../../utils/textFormatter';

interface QuestionsViewProps {
  questions: Question[];
  currentUser: User;
  onOpenSubscriptionModal: () => void;
  onAskAITutor: (prompt: string, context?: string) => void;
  onOpenInstallModal?: () => void;
}

export const QuestionsView: React.FC<QuestionsViewProps> = ({
  questions,
  currentUser,
  onOpenSubscriptionModal,
  onAskAITutor,
  onOpenInstallModal
}) => {
  const isAdmin = currentUser.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
  const isSubscribed = isAdmin || currentUser.subscription?.status === 'active';

  // Mode: 'practice' or 'timed-exam' or 'exam-result'
  const [viewMode, setViewMode] = useState<'practice' | 'exam' | 'result'>('practice');
  const [selectedSubject, setSelectedSubject] = useState<string>('All');
  const [selectedYear, setSelectedYear] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Practice state - all questions rendered continuously down
  const [userSelectedAnswers, setUserSelectedAnswers] = useState<Record<string, number>>({});
  const [showHints, setShowHints] = useState<Record<string, boolean>>({});
  const [aiExplainingQId, setAiExplainingQId] = useState<string | null>(null);
  const [aiDeepExplanations, setAiDeepExplanations] = useState<Record<string, string>>({});

  // Exam state
  const [examSubject, setExamSubject] = useState(ALL_SUBJECTS[0]);
  const [examYear, setExamYear] = useState('All');
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [currentExamIdx, setCurrentExamIdx] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, number>>({});
  const [examTimeRemaining, setExamTimeRemaining] = useState(300); // 5 mins default
  const [examScore, setExamScore] = useState<{ score: number; total: number; percentage: number } | null>(null);

  // Dynamic available years and question counts for the currently selected subject
  const availableYearsData = useMemo(() => {
    const yearCounts = new Map<string, number>();
    let totalForSubject = 0;

    questions.forEach((q) => {
      const qSub = q.subject === 'Economics & General' ? 'Economics' : q.subject;
      const isModel =
        q.subject === 'Smart Study Model Exam' ||
        q.year === '2017 E.C. Model Exam' ||
        q.year?.toLowerCase().includes('model');

      const matchesSub =
        selectedSubject === 'All' ||
        (selectedSubject === 'Smart Study Model Exam' ? isModel : qSub === selectedSubject);

      if (matchesSub) {
        totalForSubject++;
        const yr = isModel ? '2017 E.C. Model Exam' : (q.year || '2018 E.C.');
        yearCounts.set(yr, (yearCounts.get(yr) || 0) + 1);
      }
    });

    const standardOrder = [
      '2018 E.C.',
      '2017 E.C.',
      '2017 E.C. Model Exam',
      '2016 E.C.',
      '2015 E.C.',
      '2014 E.C.',
      '2013 E.C.'
    ];

    const sorted = standardOrder.filter((y) => (yearCounts.get(y) || 0) > 0);
    yearCounts.forEach((_, y) => {
      if (!sorted.includes(y)) sorted.push(y);
    });

    return {
      years: sorted,
      counts: yearCounts,
      total: totalForSubject
    };
  }, [questions, selectedSubject]);

  // Handle subject change with automatic year validation
  const handleSelectSubject = (newSubject: string) => {
    setSelectedSubject(newSubject);

    // If current selectedYear is not valid for this new subject, reset to 'All'
    if (selectedYear !== 'All') {
      const hasQuestionsForYear = questions.some((q) => {
        const qSub = q.subject === 'Economics & General' ? 'Economics' : q.subject;
        const isModel =
          q.subject === 'Smart Study Model Exam' ||
          q.year === '2017 E.C. Model Exam' ||
          q.year?.toLowerCase().includes('model');

        const matchesSub =
          newSubject === 'All' ||
          (newSubject === 'Smart Study Model Exam' ? isModel : qSub === newSubject);

        if (!matchesSub) return false;

        if (selectedYear === '2017 E.C. Model Exam') return isModel;
        return q.year === selectedYear && !isModel;
      });

      if (!hasQuestionsForYear) {
        setSelectedYear('All');
      }
    }
  };

  const handleSelectYear = (newYear: string) => {
    setSelectedYear(newYear);
  };

  // Filter and sort practice questions
  const filteredQuestions = useMemo(() => {
    const list = questions.filter((q) => {
      const qSub = q.subject === 'Economics & General' ? 'Economics' : q.subject;
      const isModel =
        q.subject === 'Smart Study Model Exam' ||
        q.year === '2017 E.C. Model Exam' ||
        q.year?.toLowerCase().includes('model') ||
        q.topic?.toLowerCase().includes('model');

      const matchesSubject =
        selectedSubject === 'All' ||
        (selectedSubject === 'Smart Study Model Exam' ? isModel : qSub === selectedSubject);

      const matchesYear =
        selectedYear === 'All' ||
        (selectedYear === '2017 E.C. Model Exam' ? isModel : (q.year === selectedYear && !isModel));

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        q.questionText.toLowerCase().includes(query) ||
        q.topic.toLowerCase().includes(query) ||
        (q.year && q.year.toLowerCase().includes(query)) ||
        (q.subject && q.subject.toLowerCase().includes(query)) ||
        q.options.some((opt) => opt.toLowerCase().includes(query));

      return matchesSubject && matchesYear && matchesSearch;
    });

    const parseQuestionNum = (q: Question) => {
      const match = q.questionText.match(/^(\d+)\./);
      if (match) return parseInt(match[1], 10);
      const idMatch = q.id.match(/-q0*(\d+)$/);
      if (idMatch) return parseInt(idMatch[1], 10);
      return 9999;
    };

    return [...list].sort((a, b) => {
      // If same subject & year, sort by question number starting strictly from 1
      if (a.subject === b.subject && a.year === b.year) {
        const numA = parseQuestionNum(a);
        const numB = parseQuestionNum(b);
        if (numA !== numB) return numA - numB;
      }
      return 0;
    });
  }, [questions, selectedSubject, selectedYear, searchQuery]);

  // Answered count for progress tracking
  const answeredCount = useMemo(() => {
    return filteredQuestions.filter((q) => userSelectedAnswers[q.id] !== undefined).length;
  }, [filteredQuestions, userSelectedAnswers]);

  const handleSelectOption = (questionId: string, optionIdx: number) => {
    setUserSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx
    }));
  };

  const handleToggleHint = (questionId: string) => {
    setShowHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  const handleAskAIDeepExplain = async (q: Question) => {
    setAiExplainingQId(q.id);
    try {
      const res = await fetch('/api/ai/explain-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          questionText: q.questionText,
          options: q.options,
          correctOptionIndex: q.correctOptionIndex,
          userSelectedOptionIndex: userSelectedAnswers[q.id],
          explanation: q.explanation,
          subject: q.subject
        })
      });
      const data = await res.json();
      if (data && data.explanation) {
        setAiDeepExplanations((prev) => ({
          ...prev,
          [q.id]: cleanTutorText(data.explanation)
        }));
      } else {
        setAiDeepExplanations((prev) => ({
          ...prev,
          [q.id]: `Solution Breakdown\n\nCorrect Option: ${String.fromCharCode(65 + q.correctOptionIndex)} (${q.options[q.correctOptionIndex]})\n\n${q.explanation || 'Refer to the curriculum notes for this question.'}`
        }));
      }
    } catch (e) {
      console.error('Failed to get AI explanation', e);
      setAiDeepExplanations((prev) => ({
        ...prev,
        [q.id]: `Solution Breakdown\n\nCorrect Option: ${String.fromCharCode(65 + q.correctOptionIndex)} (${q.options[q.correctOptionIndex]})\n\n${q.explanation || 'Refer to the curriculum notes for this question.'}`
      }));
    } finally {
      setAiExplainingQId(null);
    }
  };

  const renderQuestionCard = (q: Question, globalIndex: number, inStepMode: boolean = false) => {
    const isFreeQuestion = q.isFreePreview || globalIndex < 5;
    const isLocked = !isSubscribed && !isFreeQuestion;
    const selectedOpt = userSelectedAnswers[q.id];
    const isAnswered = selectedOpt !== undefined;
    const isCorrect = isAnswered && selectedOpt === q.correctOptionIndex;

    return (
      <div
        id={`question-${globalIndex + 1}`}
        key={`${q.id}-${globalIndex}`}
        className={`bg-slate-900 border rounded-2xl p-5 transition-all relative scroll-mt-24 ${
          isLocked
            ? 'border-slate-800/60 opacity-90'
            : isAnswered
            ? isCorrect
              ? 'border-emerald-500/40 bg-emerald-950/10'
              : 'border-rose-500/40 bg-rose-950/10'
            : 'border-slate-800 hover:border-slate-700'
        }`}
      >
        {/* Badges */}
        <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-6 h-6 rounded-lg bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
              {globalIndex + 1}
            </span>
            <span className="text-xs px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30">
              {q.subject}
            </span>
            {q.year && (
              <span className="text-xs px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                {q.year}
              </span>
            )}
            <span className="text-xs text-slate-400">{q.topic}</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`text-[10px] px-2 py-0.5 rounded-md font-bold uppercase ${
                q.difficulty === 'easy'
                  ? 'bg-emerald-500/20 text-emerald-400'
                  : q.difficulty === 'medium'
                  ? 'bg-amber-500/20 text-amber-400'
                  : 'bg-rose-500/20 text-rose-400'
              }`}
            >
              {q.difficulty} • {q.points} pts
            </span>

            {isFreeQuestion && !isSubscribed && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                FREE REVIEW
              </span>
            )}
            {isLocked && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold border border-amber-500/30">
                LOCKED (PRO)
              </span>
            )}
          </div>
        </div>

        {/* Question Text */}
        <p className="text-sm sm:text-base font-semibold text-white mb-4 leading-relaxed">
          {q.questionText}
        </p>

        {/* Locked Paywall Overlay for Non-Subscribers */}
        {isLocked ? (
          <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-5 text-center space-y-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <p className="text-xs sm:text-sm font-bold text-white">
              Question #{globalIndex + 1} Locked — Free Review Limit Reached
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Free review allows exploring questions 1 to 5 of this exam. Unlock all 80+ questions, step-by-step solutions, videos & notes with the 300 ETB Semester Pass.
            </p>
            <button
              type="button"
              onClick={onOpenSubscriptionModal}
              className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg shadow-amber-500/20 cursor-pointer hover:from-amber-400 hover:to-amber-500 transition-transform active:scale-95"
            >
              Unlock Full Access (300 ETB)
            </button>
          </div>
        ) : (
          <>
            {/* Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-4">
              {q.options.map((opt, optIdx) => {
                const isOptionSelected = selectedOpt === optIdx;
                const isOptionCorrect = optIdx === q.correctOptionIndex;

                let optionClass = 'bg-slate-800/70 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600';
                if (isAnswered) {
                  if (isOptionCorrect) {
                    optionClass = 'bg-emerald-500/20 border-emerald-500 text-emerald-200 font-semibold';
                  } else if (isOptionSelected && !isOptionCorrect) {
                    optionClass = 'bg-rose-500/20 border-rose-500 text-rose-200 font-semibold';
                  } else {
                    optionClass = 'bg-slate-950/40 border-slate-800/80 text-slate-500';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(q.id, optIdx)}
                    className={`p-3 rounded-xl border text-left text-xs sm:text-sm flex items-start gap-3 transition-all cursor-pointer ${optionClass}`}
                  >
                    <span className="w-6 h-6 rounded-lg bg-slate-900/80 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {isAnswered && isOptionCorrect && (
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    )}
                    {isAnswered && isOptionSelected && !isOptionCorrect && (
                      <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Action Bar (Hint, AI Explain, Reset) */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 flex-wrap gap-2 text-xs">
              <div className="flex items-center gap-2">
                {q.hint && (
                  <button
                    type="button"
                    onClick={() => handleToggleHint(q.id)}
                    className="text-slate-400 hover:text-amber-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <HelpCircle className="w-3.5 h-3.5" />
                    <span>{showHints[q.id] ? 'Hide Hint' : 'View Hint'}</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => handleAskAIDeepExplain(q)}
                  disabled={aiExplainingQId === q.id}
                  className="text-violet-400 hover:text-violet-300 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{aiExplainingQId === q.id ? 'Explaining...' : 'Ask AI Tutor to Explain'}</span>
                </button>
              </div>

              {isAnswered && (
                <button
                  type="button"
                  onClick={() => {
                    const copy = { ...userSelectedAnswers };
                    delete copy[q.id];
                    setUserSelectedAnswers(copy);
                  }}
                  className="text-slate-400 hover:text-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Retry</span>
                </button>
              )}
            </div>

            {/* Hint Card */}
            {showHints[q.id] && q.hint && (
              <div className="mt-3 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
                <strong className="text-amber-300">💡 Hint:</strong> {q.hint}
              </div>
            )}

            {/* Standard Explanation */}
            {isAnswered && q.explanation && (
              <div className="mt-3">
                <TrilingualExplanation explanation={q.explanation} subject={q.subject} />
              </div>
            )}

            {/* AI Deep Breakdown */}
            {aiDeepExplanations[q.id] && (
              <div className="mt-3 bg-violet-950/30 border border-violet-500/40 rounded-xl p-3.5 text-xs text-violet-200 space-y-1.5">
                <p className="font-bold text-violet-300 flex items-center gap-1.5 border-b border-violet-500/20 pb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  <span>Gemini AI Tutor Explanation:</span>
                </p>
                <div className="whitespace-pre-line leading-relaxed text-slate-200 text-xs sm:text-[13px] pt-1">
                  {cleanTutorText(aiDeepExplanations[q.id])}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  // Start Exam
  const handleStartExam = (customSubject?: string) => {
    const subjectToUse = customSubject || examSubject;
    let pool = questions.filter((q) => {
      if (subjectToUse === 'All') return true;
      if (subjectToUse === 'Smart Study Model Exam') {
        return (
          q.subject === 'Smart Study Model Exam' ||
          (q.year && q.year.toLowerCase().includes('model')) ||
          (q.topic && q.topic.toLowerCase().includes('model'))
        );
      }
      return q.subject === subjectToUse;
    });
    if (!isSubscribed) {
      pool = pool.filter((q) => q.isFreePreview);
    }
    if (pool.length === 0) {
      pool = questions.slice(0, 5);
    }
    // Shuffle and pick up to 10
    const shuffled = [...pool].sort(() => 0.5 - Math.random()).slice(0, Math.min(pool.length, 10));
    setExamSubject(subjectToUse);
    setExamQuestions(shuffled);
    setExamAnswers({});
    setCurrentExamIdx(0);
    setExamTimeRemaining(shuffled.length * 60); // 1 min per question
    setViewMode('exam');
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (examAnswers[q.id] === q.correctOptionIndex) {
        correctCount += 1;
      }
    });

    const total = examQuestions.length;
    const percentage = Math.round((correctCount / total) * 100);
    const scoreObj = { score: correctCount, total, percentage };
    setExamScore(scoreObj);

    // Save to storage
    saveQuizAttempt({
      userId: currentUser.id,
      subject: examSubject,
      score: correctCount,
      totalQuestions: total,
      percentage,
      timeSpentSec: examQuestions.length * 60 - examTimeRemaining,
      answers: examAnswers
    });

    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }

    setViewMode('result');
  };

  return (
    <div className="space-y-6">
      
      {/* Mode Selector & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-4 sm:p-5 rounded-2xl">
        <div>
          <h2 className="text-xl font-bold font-display text-white">Interactive Practice & Question Bank</h2>
          <p className="text-xs text-slate-400">Master problem solving with instant feedback, hints, and AI explanations.</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            id="mode-practice-btn"
            onClick={() => setViewMode('practice')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              viewMode === 'practice'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            Practice Mode
          </button>

          <button
            id="mode-exam-btn"
            onClick={() => {
              if (viewMode !== 'exam' && viewMode !== 'result') {
                handleStartExam();
              } else {
                setViewMode('exam');
              }
            }}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'exam' || viewMode === 'result'
                ? 'bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-sm'
                : 'bg-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>Timed Exam Test</span>
          </button>

          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1.5 transition-all cursor-pointer"
              title="Install PWA for Offline Practice"
            >
              <span>📲</span>
              <span className="hidden md:inline">Install Offline App</span>
              <span className="md:hidden">Install</span>
            </button>
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* PRACTICE MODE */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'practice' && (
        <div className="space-y-4">
          
          {/* Simple, Non-Complex Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 p-3 sm:p-4 rounded-2xl">
            <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[260px]">
              {/* Subject Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                <span className="text-xs text-slate-400 font-medium">Subject:</span>
                <select
                  id="question-subject-select"
                  value={selectedSubject}
                  onChange={(e) => handleSelectSubject(e.target.value)}
                  className="bg-transparent text-xs text-white font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900 text-white">All Subjects</option>
                  {ALL_SUBJECTS.map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-white">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year Dropdown */}
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 rounded-xl px-3 py-2">
                <span className="text-xs text-slate-400 font-medium">Year:</span>
                <select
                  id="question-year-select"
                  value={selectedYear}
                  onChange={(e) => handleSelectYear(e.target.value)}
                  className="bg-transparent text-xs text-amber-300 font-bold focus:outline-none cursor-pointer"
                >
                  <option value="All" className="bg-slate-900 text-slate-300">
                    All Years ({availableYearsData.total})
                  </option>
                  {availableYearsData.years.map((y) => {
                    const count = availableYearsData.counts.get(y) || 0;
                    return (
                      <option key={y} value={y} className="bg-slate-900 text-white">
                        {y} ({count} Qs)
                      </option>
                    );
                  })}
                </select>
              </div>

              {/* Search Field */}
              <div className="relative flex-1 min-w-[140px] max-w-xs">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search questions..."
                  className="w-full pl-8 pr-2.5 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Questions Counter & Answered Status */}
            <div className="flex items-center gap-3 text-xs text-slate-300 shrink-0">
              <span className="font-semibold text-slate-300">
                <strong className="text-indigo-400 font-bold">{filteredQuestions.length}</strong> Questions
              </span>

              {answeredCount > 0 && (
                <div className="flex items-center gap-2 pl-3 border-l border-slate-800">
                  <span className="text-slate-400">
                    Answered: <strong className="text-emerald-400 font-bold">{answeredCount}</strong>/{filteredQuestions.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => setUserSelectedAnswers({})}
                    className="p-1 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-md text-xs cursor-pointer transition-colors"
                    title="Reset Answers"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Question Cards */}
          <div className="space-y-4">
            {filteredQuestions.length === 0 ? (
              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 text-center text-slate-400 space-y-4">
                <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-base text-slate-200">
                    No questions found for {selectedSubject !== 'All' ? selectedSubject : ''} {selectedYear !== 'All' ? `(${selectedYear})` : ''}
                  </p>
                  <p className="text-xs text-slate-400 max-w-md mx-auto">
                    {availableYearsData.years.length > 0
                      ? `${selectedSubject} questions are available for the following years. Tap any year below to view questions instantly:`
                      : 'Try resetting your search query or switching to All Subjects.'}
                  </p>
                </div>

                {availableYearsData.years.length > 0 && (
                  <div className="flex items-center justify-center gap-2 flex-wrap pt-1">
                    {availableYearsData.years.map((y) => (
                      <button
                        key={y}
                        onClick={() => handleSelectYear(y)}
                        className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{y}</span>
                        <span className="px-1.5 py-0.2 bg-amber-950/60 rounded text-[10px]">
                          {availableYearsData.counts.get(y)} Qs
                        </span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-center gap-3 pt-2">
                  {selectedYear !== 'All' && (
                    <button
                      onClick={() => handleSelectYear('All')}
                      className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md cursor-pointer"
                    >
                      Show All {selectedSubject !== 'All' ? selectedSubject : ''} Questions ({availableYearsData.total})
                    </button>
                  )}
                  <button
                    onClick={() => {
                      handleSelectSubject('All');
                      handleSelectYear('All');
                      setSearchQuery('');
                    }}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                </div>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => renderQuestionCard(q, idx))
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* TIMED EXAM MODE */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'exam' && examQuestions.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6">
          {/* Exam Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300">
                {examSubject} Mock Exam
              </span>
              <h3 className="text-lg font-bold text-white mt-1">
                Question {currentExamIdx + 1} of {examQuestions.length}
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 font-mono text-sm font-bold border border-slate-700">
                <Timer className="w-4 h-4 text-amber-400" />
                <span>
                  {Math.floor(examTimeRemaining / 60)}:
                  {String(examTimeRemaining % 60).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>

          {/* Current Question */}
          {examQuestions[currentExamIdx] && (
            <div className="space-y-4">
              <p className="text-base sm:text-lg font-semibold text-white leading-relaxed">
                {examQuestions[currentExamIdx].questionText}
              </p>

              <div className="space-y-2.5">
                {examQuestions[currentExamIdx].options.map((opt, optIdx) => {
                  const currentQId = examQuestions[currentExamIdx].id;
                  const isSelected = examAnswers[currentQId] === optIdx;

                  return (
                    <button
                      key={optIdx}
                      onClick={() =>
                        setExamAnswers((prev) => ({
                          ...prev,
                          [currentQId]: optIdx
                        }))
                      }
                      className={`w-full p-3.5 rounded-2xl border text-left text-sm flex items-center gap-3 transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white font-semibold'
                          : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                          isSelected
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-900 text-slate-400'
                        }`}
                      >
                        {String.fromCharCode(65 + optIdx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Exam Navigation Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800">
            <button
              disabled={currentExamIdx === 0}
              onClick={() => setCurrentExamIdx((prev) => Math.max(0, prev - 1))}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 text-xs font-semibold rounded-xl"
            >
              Previous Question
            </button>

            {currentExamIdx < examQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentExamIdx((prev) => Math.min(examQuestions.length - 1, prev + 1))}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
              >
                <span>Next Question</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitExam}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30"
              >
                Submit Exam Answers
              </button>
            )}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* EXAM RESULT REPORT */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'result' && examScore && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center mx-auto shadow-xl shadow-indigo-500/20">
            <Award className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs uppercase font-extrabold text-indigo-400 tracking-wider">
              Exam Complete
            </span>
            <h3 className="text-3xl font-extrabold text-white mt-1">
              Score: {examScore.percentage}%
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              You answered <strong className="text-emerald-400">{examScore.score}</strong> out of <strong className="text-white">{examScore.total}</strong> questions correctly.
            </p>
          </div>

          {/* Breakdown Review */}
          <div className="space-y-4 text-left max-w-2xl mx-auto">
            <h4 className="text-xs font-bold uppercase text-slate-400">Answer Review & Explanations</h4>
            {examQuestions.map((q, idx) => {
              const studentChoice = examAnswers[q.id];
              const isCorrect = studentChoice === q.correctOptionIndex;

              return (
                <div key={`${q.id}-${idx}`} className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                    <span className="font-semibold text-white">Question {idx + 1} ({q.subject})</span>
                    <span
                      className={`font-bold px-2 py-0.5 rounded-md text-[11px] ${
                        isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      }`}
                    >
                      {isCorrect ? 'Correct (+10 pts)' : 'Incorrect (0 pts)'}
                    </span>
                  </div>
                  <p className="text-slate-200 font-medium leading-relaxed">{q.questionText}</p>
                  <div className="bg-slate-900/80 rounded-xl p-2.5 border border-slate-800 space-y-1 text-[11px]">
                    <p className="text-slate-300">
                      Your Choice: <span className={isCorrect ? 'text-emerald-400 font-bold' : 'text-rose-400 font-bold'}>{studentChoice !== undefined ? `${String.fromCharCode(65 + studentChoice)}. ${q.options[studentChoice]}` : 'Unanswered'}</span>
                    </p>
                    <p className="text-emerald-400 font-semibold">
                      Correct Answer: {String.fromCharCode(65 + q.correctOptionIndex)}. {q.options[q.correctOptionIndex]}
                    </p>
                  </div>
                  {q.explanation && (
                    <div className="pt-1">
                      <TrilingualExplanation explanation={q.explanation} subject={q.subject} showHeading={false} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => handleStartExam()}
              className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl flex items-center gap-1.5"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Mock Exam</span>
            </button>
            <button
              onClick={() => setViewMode('practice')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl"
            >
              Back to Practice Bank
            </button>
          </div>
        </div>
      )}

      {/* Floating Back to Top Button */}
      {viewMode === 'practice' && filteredQuestions.length > 5 && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-40 px-3.5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow-2xl hover:shadow-indigo-500/30 border border-indigo-400/30 transition-all active:scale-95 cursor-pointer flex items-center gap-2 text-xs font-bold"
          title="Scroll Back to Top"
        >
          <ArrowUp className="w-4 h-4" />
          <span>Top</span>
        </button>
      )}
    </div>
  );
};
