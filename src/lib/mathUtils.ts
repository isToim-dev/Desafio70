import { Question, Topic } from '../types';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export function generateQuestions(): Question[] {
  const questions: Question[] = [];
  let id = 1;

  // 1. Potenciação (18 questions)
  for (let i = 0; i < 18; i++) {
    const base = getRandomInt(-10, 15);
    const exp = getRandomInt(0, 4);
    const result = Math.pow(base, exp);
    
    const options = new Set<string>();
    options.add(result.toString());
    while (options.size < 4) {
      const offset = getRandomInt(-10, 10);
      if (offset !== 0) options.add((result + offset).toString());
    }

    questions.push({
      id: id++,
      topic: 'potenciacao',
      question: `Calcule o valor de (${base})^${exp}:`,
      options: shuffleArray(Array.from(options)),
      correctAnswer: result.toString(),
      explanation: `A potenciação é a multiplicação da base por ela mesma ${exp} vezes. (${base})^${exp} = ${result}.`
    });
  }

  // 2. Racionalização (17 questions)
  // Form: k / sqrt(n) -> (k * sqrt(n)) / n
  const primes = [2, 3, 5, 6, 7, 10, 11];
  for (let i = 0; i < 17; i++) {
    const k = getRandomInt(1, 10);
    const n = primes[getRandomInt(0, primes.length - 1)];
    
    // If k is multiple of n, simplify
    let displayAns = '';
    if (k % n === 0) {
      const simplifiedK = k / n;
      displayAns = simplifiedK === 1 ? `√${n}` : `${simplifiedK}√${n}`;
    } else {
      displayAns = `(${k}√${n})/${n}`;
    }

    const options = new Set<string>();
    options.add(displayAns);
    while (options.size < 4) {
      const wrongN = primes[getRandomInt(0, primes.length - 1)];
      const wrongK = getRandomInt(1, 10);
      options.add(`(${wrongK}√${wrongN})/${wrongN}`);
      if (options.size < 4) options.add(`${wrongK}√${wrongN}`);
    }

    questions.push({
      id: id++,
      topic: 'racionalizacao',
      question: `Racionalize o denominador da expressão: ${k} / √${n}`,
      options: shuffleArray(Array.from(options)),
      correctAnswer: displayAns,
      explanation: `Para racionalizar ${k}/√${n}, multiplicamos o numerador e o denominador por √${n}. Assim: (${k} * √${n}) / (√${n} * √${n}) = (${k}√${n}) / ${n}.`
    });
  }

  // 3. Valor Numérico (18 questions)
  for (let i = 0; i < 18; i++) {
    const a = getRandomInt(-5, 5);
    const b = getRandomInt(-5, 5);
    const x = getRandomInt(-3, 3);
    const y = getRandomInt(-3, 3);
    
    const type = getRandomInt(1, 3);
    let expr = '';
    let result = 0;
    let explanation = '';

    if (type === 1) {
      expr = `${a}x + ${b}y`;
      result = a * x + b * y;
      explanation = `Substituindo x=${x} e y=${y}: ${a}(${x}) + ${b}(${y}) = ${a*x} + ${b*y} = ${result}.`;
    } else if (type === 2) {
      expr = `x² + ${a}x + ${b}`;
      result = x * x + a * x + b;
      explanation = `Substituindo x=${x}: (${x})² + ${a}(${x}) + ${b} = ${x*x} + ${a*x} + ${b} = ${result}.`;
    } else {
      expr = `${a}(x + y)²`;
      result = a * Math.pow(x + y, 2);
      explanation = `Substituindo x=${x} e y=${y}: ${a}(${x} + ${y})² = ${a}(${x+y})² = ${a}(${Math.pow(x+y, 2)}) = ${result}.`;
    }

    const options = new Set<string>();
    options.add(result.toString());
    while (options.size < 4) {
      options.add((result + getRandomInt(-5, 5)).toString());
    }

    questions.push({
      id: id++,
      topic: 'valor_numerico',
      question: `Determine o valor numérico da expressão ${expr} para x = ${x} e y = ${y}:`,
      options: shuffleArray(Array.from(options)),
      correctAnswer: result.toString(),
      explanation
    });
  }

  // 4. Redução de Polinômios (17 questions)
  for (let i = 0; i < 17; i++) {
    const a1 = getRandomInt(1, 10);
    const a2 = getRandomInt(1, 10);
    const b1 = getRandomInt(1, 10);
    const b2 = getRandomInt(1, 10);
    
    const opA = Math.random() > 0.5 ? '+' : '-';
    const opB = Math.random() > 0.5 ? '+' : '-';
    
    const resA = opA === '+' ? a1 + a2 : a1 - a2;
    const resB = opB === '+' ? b1 + b2 : b1 - b2;
    
    const expr = `${a1}x ${opB} ${b1}y ${opA} ${a2}x ${opB === '+' ? '-' : '+'} ${b2}y`;
    // Wait, let's make it simpler to avoid confusion
    // a1x + b1y + a2x + b2y
    const signA = Math.random() > 0.5 ? 1 : -1;
    const signB = Math.random() > 0.5 ? 1 : -1;
    const signC = Math.random() > 0.5 ? 1 : -1;
    const signD = Math.random() > 0.5 ? 1 : -1;
    
    const v1 = a1 * signA;
    const v2 = b1 * signB;
    const v3 = a2 * signC;
    const v4 = b2 * signD;
    
    const polyExpr = `${v1}x ${v2 >= 0 ? '+' : '-'} ${Math.abs(v2)}y ${v3 >= 0 ? '+' : '-'} ${Math.abs(v3)}x ${v4 >= 0 ? '+' : '-'} ${Math.abs(v4)}y`;
    const finalX = v1 + v3;
    const finalY = v2 + v4;
    
    const formatTerm = (val: number, char: string, isFirst: boolean) => {
      if (val === 0) return '';
      let s = val > 0 ? (isFirst ? '' : '+ ') : '- ';
      let v = Math.abs(val) === 1 ? '' : Math.abs(val).toString();
      return `${s}${v}${char} `;
    };

    const ansX = formatTerm(finalX, 'x', true);
    const ansY = formatTerm(finalY, 'y', finalX === 0);
    const correctAnswer = (ansX + ansY).trim() || '0';

    const options = new Set<string>();
    options.add(correctAnswer);
    while (options.size < 4) {
      const offsetX = getRandomInt(-5, 5);
      const offsetY = getRandomInt(-5, 5);
      if (offsetX === 0 && offsetY === 0) continue;
      
      const wX = formatTerm(finalX + offsetX, 'x', true);
      const wY = formatTerm(finalY + offsetY, 'y', (finalX + offsetX) === 0);
      options.add((wX + wY).trim() || '0');
    }

    questions.push({
      id: id++,
      topic: 'polinomios',
      question: `Reduza os termos semelhantes do polinômio: ${polyExpr}`,
      options: shuffleArray(Array.from(options)),
      correctAnswer: correctAnswer,
      explanation: `Agrupamos os termos com x: (${v1} + ${v3})x = ${finalX}x. Agrupamos os termos com y: (${v2} + ${v4})y = ${finalY}y. Resultado: ${correctAnswer}.`
    });
  }

  return shuffleArray(questions);
}
