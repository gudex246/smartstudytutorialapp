import { Question } from '../types';
import { ADMIN_EMAIL } from './constants';

export const MATH_2014_EC_QUESTIONS: Question[] = [
  {
    id: 'math-2014-q1',
    subject: 'Mathematics',
    year: '2014 E.C.',
    topic: 'Sequences and Series: Arithmetic Progressions',
    questionText: '1. What is the sum of the first 25 terms of the arithmetic sequence 4, 9, 14, 19, ... ?',
    options: [
      '1,600',
      '1,550',
      '1,725',
      '1,475'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Here first term a = 4, common difference d = 9 - 4 = 5, and n = 25.
The sum formula is Sn = (n/2) * [2a + (n - 1)d].
S25 = (25/2) * [2(4) + (25 - 1)(5)]
S25 = (25/2) * [8 + 120] = (25/2) * 128 = 25 * 64 = 1,600.

🇪🇹 አማርኛ (Amharic):
የመጀመሪያው ቁጥር a = 4፣ የጋራ ልዩነት d = 5፣ የቁጥሮች ብዛት n = 25 ነው።
የድምር ቀመር: Sn = (n/2) * [2a + (n - 1)d] = (25/2) * [8 + 120] = 25 * 64 = 1,600።

🌳 Afaan Oromoo:
Gatiin duraa a = 4, garaagarummaan d = 5, lakkoofsi n = 25.
Ida'ama: S25 = (25/2) * [2(4) + 24(5)] = 25 * 64 = 1,600.`,
    hint: 'Use the formula Sn = (n/2) * [2a + (n - 1)d].',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2014-q2',
    subject: 'Mathematics',
    year: '2014 E.C.',
    topic: 'Calculus: Limits and Continuity',
    questionText: '2. What is the value of the limit: lim (x -> 3) [ (x² - 9) / (x - 3) ] ?',
    options: [
      '6',
      '3',
      '0',
      'Undefined'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Direct substitution yields the indeterminate form 0/0.
Factor the numerator as a difference of squares:
(x² - 9) = (x - 3)(x + 3)
lim (x -> 3) [ (x - 3)(x + 3) / (x - 3) ] = lim (x -> 3) (x + 3) = 3 + 3 = 6.

🇪🇹 አማርኛ (Amharic):
የላይኛውን ክፍል በልዩነት ስኩዌር ሲዘረዘር: (x - 3)(x + 3) ይሆናል። ከታች ካለው (x - 3) ጋር ሲጣፋ x + 3 ይቀራል። 3ን በx ቦታ ስንተካ 3 + 3 = 6 ይሆናል።

🌳 Afaan Oromoo:
(x² - 9) = (x - 3)(x + 3) waan ta'eef (x - 3) waliin wal balleessuun lim (x -> 3) (x + 3) = 6 ta'a.`,
    hint: 'Factor the numerator (x² - 9) as (x - 3)(x + 3).',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2014-q3',
    subject: 'Mathematics',
    year: '2014 E.C.',
    topic: 'Calculus: Derivative of Polynomial and Exponential Functions',
    questionText: '3. If f(x) = 3x⁴ - 5x² + 7eˣ, what is f\'(x)?',
    options: [
      '12x³ - 10x + 7eˣ',
      '12x³ - 5x + 7',
      '7x³ - 10x + 7eˣ',
      '12x⁴ - 10x² + 7eˣ'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Using power rule and derivative of eˣ:
d/dx [3x⁴] = 12x³
d/dx [-5x²] = -10x
d/dx [7eˣ] = 7eˣ
Therefore, f'(x) = 12x³ - 10x + 7eˣ.

🇪🇹 አማርኛ (Amharic):
የፓወር ሩል (Power rule) በመጠቀም የ3x⁴ ዴሪቬቲቭ 12x³፣ የ-5x² ደግሞ -10x፣ የ7eˣ ደግሞ 7eˣ ይሆናል። ስለዚህ f'(x) = 12x³ - 10x + 7eˣ።

🌳 Afaan Oromoo:
Seera dhiibbaa fayyadamuun: d/dx(3x⁴) = 12x³, d/dx(-5x²) = -10x, d/dx(7eˣ) = 7eˣ.`,
    hint: 'Apply d/dx(xⁿ) = n*xⁿ⁻¹ and d/dx(eˣ) = eˣ.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2014-q4',
    subject: 'Mathematics',
    year: '2014 E.C.',
    topic: 'Coordinate Geometry: Equation of a Circle',
    questionText: '4. What is the center and radius of the circle with equation (x - 4)² + (y + 2)² = 49?',
    options: [
      'Center (4, -2), Radius = 7',
      'Center (-4, 2), Radius = 7',
      'Center (4, -2), Radius = 49',
      'Center (-4, -2), Radius = 14'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
The standard equation of a circle is (x - h)² + (y - k)² = r², where (h, k) is the center and r is the radius.
Comparing (x - 4)² + (y - (-2))² = 7²:
Center = (4, -2) and radius r = √49 = 7.

🇪🇹 አማርኛ (Amharic):
የክብ መደበኛ ቀመር (x - h)² + (y - k)² = r² ነው። ከቀረበው ቀመር ጋር ስናነጻጽር ማዕከሉ (h, k) = (4, -2) ሲሆን ራዲየሱ r = √49 = 7 ነው።

🌳 Afaan Oromoo:
Bocni geengoo (x - h)² + (y - k)² = r² waan ta'eef, Giddu-galeessi (4, -2) fi Raadiyasiin r = √49 = 7 ta'a.`,
    hint: 'Compare with the standard form (x - h)² + (y - k)² = r².',
    difficulty: 'easy',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2014-q5',
    subject: 'Mathematics',
    year: '2014 E.C.',
    topic: 'Vectors: Dot Product and Orthogonality',
    questionText: '5. For what value of k are the vectors u = (3, k) and v = (4, -6) perpendicular (orthogonal)?',
    options: [
      '2',
      '-2',
      '3',
      '-3'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Two vectors are orthogonal if and only if their dot product equals 0:
u · v = 0
(3)(4) + (k)(-6) = 0
12 - 6k = 0  =>  6k = 12  =>  k = 2.

🇪🇹 አማርኛ (Amharic):
ሁለት ቬክተሮች ቀጤ-ነክ (Perpendicular) የሚሆኑት ነጥብ ማባዛታቸው (Dot Product) ዜሮ ሲሆን ነው:
(3)(4) + (k)(-6) = 0  =>  12 - 6k = 0  =>  k = 2።

🌳 Afaan Oromoo:
Veektarootni lama wal qaxxaamuruuf dot product isaanii 0 ta'uu qaba: (3)(4) - 6k = 0 => 6k = 12 => k = 2.`,
    hint: 'Set the dot product u · v = 0 and solve for k.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  }
];
