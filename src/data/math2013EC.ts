import { Question } from '../types';
import { ADMIN_EMAIL } from './constants';

export const MATH_2013_EC_QUESTIONS: Question[] = [
  {
    id: 'math-2013-q1',
    subject: 'Mathematics',
    year: '2013 E.C.',
    topic: 'Integral Calculus: Definite Integrals',
    questionText: '1. What is the value of the definite integral: ∫ (from 0 to 2) (3x² + 4x - 1) dx ?',
    options: [
      '14',
      '12',
      '16',
      '18'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Find the antiderivative:
∫ (3x² + 4x - 1) dx = x³ + 2x² - x
Evaluate from 0 to 2:
At x = 2: (2)³ + 2(2)² - 2 = 8 + 8 - 2 = 14
At x = 0: 0 + 0 - 0 = 0
Result = 14 - 0 = 14.

🇪🇹 አማርኛ (Amharic):
የኢንቴግራል ስሌት:
∫ (3x² + 4x - 1) dx = x³ + 2x² - x
በ2 ሲሰላ: 8 + 8 - 2 = 14
በ0 ሲሰላ: 0
ውጤቱ: 14 - 0 = 14።

🌳 Afaan Oromoo:
Fantiisa: x³ + 2x² - x.
Bakka x=2tti: (2)³ + 2(2)² - 2 = 8 + 8 - 2 = 14.`,
    hint: 'Integrate term by term to get x³ + 2x² - x, then evaluate at limits 2 and 0.',
    difficulty: 'medium',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2013-q2',
    subject: 'Mathematics',
    year: '2013 E.C.',
    topic: 'Matrices and Determinants: 2x2 Matrix Inversion',
    questionText: '2. What is the determinant of the matrix A = [[5, -2], [3, 4]] ?',
    options: [
      '26',
      '14',
      '-26',
      '20'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
For a 2x2 matrix [[a, b], [c, d]], the determinant is ad - bc.
det(A) = (5)(4) - (-2)(3) = 20 - (-6) = 20 + 6 = 26.

🇪🇹 አማርኛ (Amharic):
የዲተርሚናንት ስሌት ለ2x2 ማትሪክስ: ad - bc = (5)(4) - (-2)(3) = 20 + 6 = 26።

🌳 Afaan Oromoo:
Shallaggii determinante: (5)(4) - (-2)(3) = 20 - (-6) = 26.`,
    hint: 'Use the formula ad - bc.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'math-2013-q3',
    subject: 'Mathematics',
    year: '2013 E.C.',
    topic: 'Probability: Independent Events',
    questionText: '3. A bag contains 5 red balls and 3 blue balls. If two balls are drawn one after another with replacement, what is the probability that both balls drawn are red?',
    options: [
      '25/64',
      '5/14',
      '15/56',
      '9/64'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Total balls = 5 + 3 = 8.
Because drawing is WITH replacement, the two events are independent.
P(First is red) = 5/8
P(Second is red) = 5/8
P(Both red) = (5/8) * (5/8) = 25/64.

🇪🇹 አማርኛ (Amharic):
ጠቅላላ ኳሶች = 8። ኳሱ ተመልሶ ስለሚተካ (With replacement):
P(ቀይ እና ቀይ) = (5/8) * (5/8) = 25/64።

🌳 Afaan Oromoo:
Ida'ama kubbaa = 8.
Kubbaa deebisuun waan fudhatameef: (5/8) * (5/8) = 25/64.`,
    hint: 'Since the ball is replaced, multiply (5/8) by (5/8).',
    difficulty: 'easy',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  }
];
