export type Topic = 'potenciacao' | 'racionalizacao' | 'valor_numerico' | 'polinomios';

export interface Question {
  id: number;
  topic: Topic;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface QuizResult {
  totalQuestions: number;
  correctAnswers: number;
  topicResults: Record<Topic, { total: number; correct: number }>;
}
