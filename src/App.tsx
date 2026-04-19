import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calculator, 
  ChevronRight, 
  RotateCcw, 
  CheckCircle2, 
  XCircle, 
  BarChart3, 
  BookOpen,
  Trophy,
  ArrowRight,
  Home
} from 'lucide-react';
import { generateQuestions } from './lib/mathUtils';
import { Question, Topic, QuizResult } from './types';

const TOPIC_LABELS: Record<Topic, string> = {
  potenciacao: 'Potenciação',
  racionalizacao: 'Racionalização',
  valor_numerico: 'Valor Numérico',
  polinomios: 'Polinômios'
};

export default function App() {
  const [gameState, setGameState] = useState<'start' | 'playing' | 'finished'>('start');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { selected: string; isCorrect: boolean }>>({});
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = () => {
    setQuestions(generateQuestions());
    setCurrentIndex(0);
    setAnswers({});
    setGameState('playing');
    setShowExplanation(false);
  };

  const handleAnswer = (option: string) => {
    if (showExplanation) return;

    const currentQuestion = questions[currentIndex];
    const isCorrect = option === currentQuestion.correctAnswer;
    
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: { selected: option, isCorrect }
    }));
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowExplanation(false);
    } else {
      setGameState('finished');
    }
  };

  const finishEarly = () => {
    setGameState('finished');
  };

  const results = useMemo((): QuizResult => {
    const answeredCount = Object.keys(answers).length;
    const correctCount = Object.values(answers).filter((a: any) => a.isCorrect).length;
    
    const topicResults: Record<Topic, { total: number; correct: number }> = {
      potenciacao: { total: 0, correct: 0 },
      racionalizacao: { total: 0, correct: 0 },
      valor_numerico: { total: 0, correct: 0 },
      polinomios: { total: 0, correct: 0 }
    };

    Object.entries(answers).forEach(([idx, ans]: [string, any]) => {
      const topic = questions[parseInt(idx)].topic;
      topicResults[topic].total += 1;
      if (ans.isCorrect) topicResults[topic].correct += 1;
    });

    return {
      totalQuestions: answeredCount,
      correctAnswers: correctCount,
      topicResults
    };
  }, [answers, questions]);

  const progressPercent = Math.round(((currentIndex + 1) / questions.length) * 100);

  return (
    <div className="min-h-screen bg-bg text-text-main font-sans selection:bg-blue-100 flex flex-col">
      {/* Header */}
      <header className="h-20 bg-white border-b border-border-theme flex items-center justify-between px-10 flex-shrink-0">
        <div className="font-extrabold text-2xl text-primary tracking-tighter">
          MATHMASTER <span className="font-light">7.0</span>
        </div>
        <div className="text-right">
          <span className="block text-[10px] text-text-sub uppercase tracking-widest font-bold">Estudante</span>
          <div className="font-semibold text-sm">Ensino Fundamental II</div>
        </div>
      </header>

      <main className="flex-1 overflow-auto">
        <div className="max-w-[1200px] mx-auto p-10 h-full">
          <AnimatePresence mode="wait">
            {gameState === 'start' && (
              <motion.div
                key="start"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="h-full flex flex-col items-center justify-center text-center space-y-8"
              >
                <div className="inline-flex p-6 bg-primary rounded-[2rem] shadow-2xl shadow-primary/20 mb-4">
                  <Calculator className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-4">
                  <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-text-main">
                    Desafio <span className="text-primary">70 Questões</span>
                  </h1>
                  <p className="text-xl text-text-sub max-w-2xl mx-auto leading-relaxed">
                    Domine a matemática com o MathMaster. Pratique potenciação, racionalização, 
                    valor numérico e polinômios em um ambiente focado no seu aprendizado.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
                  {Object.entries(TOPIC_LABELS).map(([key, label], idx) => (
                    <div key={key} className={`p-6 rounded-3xl border border-border-theme shadow-sm flex flex-col items-center gap-3 ${
                      idx === 0 ? 'bg-topic-1' : idx === 1 ? 'bg-topic-2' : idx === 2 ? 'bg-topic-3' : 'bg-topic-4'
                    }`}>
                      <BookOpen className="w-6 h-6 text-primary" />
                      <span className="text-xs font-bold text-text-main uppercase tracking-wider">{label}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={startQuiz}
                  className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-text-main rounded-2xl focus:outline-none hover:bg-slate-800 shadow-xl"
                >
                  Iniciar Desafio
                  <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            )}

            {gameState === 'playing' && questions[currentIndex] && (
              <motion.div
                key="playing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 h-full"
              >
                {/* Workspace */}
                <div className="bg-white rounded-[2rem] border border-border-theme p-10 flex flex-col relative shadow-sm">
                  <div className="mb-6">
                    <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
                      questions[currentIndex].topic === 'potenciacao' ? 'bg-topic-1 text-blue-600' :
                      questions[currentIndex].topic === 'racionalizacao' ? 'bg-topic-2 text-emerald-600' :
                      questions[currentIndex].topic === 'valor_numerico' ? 'bg-topic-3 text-orange-600' :
                      'bg-topic-4 text-purple-600'
                    }`}>
                      Área: {TOPIC_LABELS[questions[currentIndex].topic]}
                    </span>
                  </div>

                  <div className="flex-1 flex flex-col justify-center items-center text-center space-y-10">
                    <div className="space-y-4">
                      <p className="text-lg text-text-sub font-medium">
                        {questions[currentIndex].question.split(':')[0]}:
                      </p>
                      <div className="text-5xl md:text-6xl math-font font-bold text-text-main tracking-tight">
                        {questions[currentIndex].question.split(':').slice(1).join(':') || questions[currentIndex].question}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-[600px]">
                      {questions[currentIndex].options.map((option, idx) => {
                        const isSelected = answers[currentIndex]?.selected === option;
                        const isCorrect = option === questions[currentIndex].correctAnswer;
                        const showResult = showExplanation;

                        let buttonClass = "p-6 text-center rounded-2xl border-2 transition-all duration-200 text-xl font-semibold group ";
                        
                        if (!showResult) {
                          buttonClass += "border-border-theme hover:border-primary hover:bg-topic-1 bg-white";
                        } else {
                          if (isCorrect) {
                            buttonClass += "border-accent bg-emerald-50 text-emerald-900";
                          } else if (isSelected) {
                            buttonClass += "border-red-500 bg-red-50 text-red-900";
                          } else {
                            buttonClass += "border-border-theme bg-slate-50 opacity-50";
                          }
                        }

                        return (
                          <button
                            key={idx}
                            disabled={showResult}
                            onClick={() => handleAnswer(option)}
                            className={buttonClass}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <AnimatePresence>
                    {showExplanation && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-8 p-6 bg-slate-50 border-l-4 border-primary rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-primary/10 rounded-lg mt-0.5">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-bold text-sm text-text-main">Lembrete Visual:</p>
                            <p className="text-sm text-text-sub leading-relaxed">
                              {questions[currentIndex].explanation}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {showExplanation && (
                    <button
                      onClick={nextQuestion}
                      className="mt-6 w-full py-4 bg-text-main text-white font-bold rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg"
                    >
                      {currentIndex === questions.length - 1 ? 'Finalizar Desafio' : 'Próxima Questão'}
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Sidebar */}
                <aside className="flex flex-col gap-6">
                  <div className="bg-white rounded-[1.5rem] border border-border-theme p-6 shadow-sm">
                    <div className="text-[10px] font-bold text-text-sub uppercase tracking-widest mb-4">Progresso Geral</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-bg p-4 rounded-2xl text-center">
                        <span className="block text-xl font-bold text-primary">{currentIndex + 1} / {questions.length}</span>
                        <span className="text-[9px] text-text-sub uppercase font-bold">Questões</span>
                      </div>
                      <div className="bg-bg p-4 rounded-2xl text-center">
                        <span className="block text-xl font-bold text-primary">{progressPercent}%</span>
                        <span className="text-[9px] text-text-sub uppercase font-bold">Concluído</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-[1.5rem] border border-border-theme p-6 shadow-sm flex-1">
                    <div className="text-[10px] font-bold text-text-sub uppercase tracking-widest mb-6">Desempenho por Área</div>
                    <div className="space-y-6">
                      {(Object.entries(results.topicResults) as [Topic, { total: number; correct: number }][]).map(([topic, data], idx) => {
                        const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                        const colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6'];
                        return (
                          <div key={topic} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold">
                              <span className="text-text-main">{TOPIC_LABELS[topic]}</span>
                              <span className="text-text-sub">{percent}%</span>
                            </div>
                            <div className="h-2 bg-border-theme rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                className="h-full"
                                style={{ backgroundColor: colors[idx] }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-auto space-y-3">
                    <button 
                      onClick={finishEarly}
                      className="w-full py-4 bg-white border border-border-theme text-text-sub font-bold rounded-xl hover:bg-slate-50 transition-colors text-sm"
                    >
                      Encerrar Atividade
                    </button>
                  </div>
                </aside>
              </motion.div>
            )}

            {gameState === 'finished' && (
              <motion.div
                key="finished"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center space-y-10"
              >
                <div className="text-center space-y-4">
                  <div className="inline-flex p-6 bg-orange-50 rounded-full mb-2">
                    <Trophy className="w-16 h-16 text-orange-500" />
                  </div>
                  <h2 className="text-5xl font-black text-text-main tracking-tighter">Relatório de Desempenho</h2>
                  <p className="text-text-sub text-lg font-medium">Excelente trabalho! Confira seus resultados detalhados.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                  <div className="bg-white p-10 rounded-[2.5rem] border border-border-theme shadow-xl text-center space-y-4">
                    <span className="text-text-sub font-bold uppercase tracking-widest text-[10px]">Pontuação Geral</span>
                    <div className="text-8xl font-black text-primary tracking-tighter">
                      {Math.round((results.correctAnswers / (results.totalQuestions || 1)) * 100)}%
                    </div>
                    <p className="text-text-main font-bold text-lg">
                      {results.correctAnswers} acertos de {results.totalQuestions} respondidas
                    </p>
                  </div>

                  <div className="bg-text-main p-10 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                    <div className="flex items-center gap-3 text-primary mb-2">
                      <BarChart3 className="w-6 h-6" />
                      <span className="font-bold uppercase tracking-widest text-xs">Análise por Assunto</span>
                    </div>
                    <div className="space-y-6">
                      {(Object.entries(results.topicResults) as [Topic, { total: number; correct: number }][]).map(([topic, data]) => {
                        const percent = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
                        return (
                          <div key={topic} className="space-y-2">
                            <div className="flex justify-between text-sm font-bold">
                              <span className="text-slate-300">{TOPIC_LABELS[topic]}</span>
                              <span>{percent}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                              <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${percent}%` }}
                                className="bg-primary h-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
                  <button
                    onClick={startQuiz}
                    className="flex-1 py-5 bg-primary text-white font-bold rounded-2xl hover:bg-blue-600 transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                  >
                    <RotateCcw className="w-5 h-5" />
                    Novo Desafio
                  </button>
                  <button
                    onClick={() => setGameState('start')}
                    className="flex-1 py-5 bg-white text-text-main border-2 border-border-theme font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Home className="w-5 h-5" />
                    Menu Principal
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
