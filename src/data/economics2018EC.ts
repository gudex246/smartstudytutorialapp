import { Question } from '../types';
import { ADMIN_EMAIL } from './constants';

export const ECONOMICS_2018_EC_QUESTIONS: Question[] = [
  {
    id: 'econ-2018-q1',
    subject: 'Economics',
    year: '2018 E.C.',
    topic: 'Microeconomics: Price Elasticity of Demand & Total Revenue',
    questionText: '1. If the price elasticity of demand (|Ed|) for teff is 0.4 (inelastic), what will happen to the total revenue of grain merchants if the market price of teff increases by 15%?',
    options: [
      'Total revenue will increase because the percentage decrease in quantity demanded is smaller than the percentage increase in price',
      'Total revenue will drop to zero because buyers will instantly switch to wheat',
      'Total revenue will decline sharply due to consumer boycotts',
      'Total revenue remains completely unchanged regardless of price adjustments'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
When demand is inelastic (|Ed| < 1), the percentage drop in quantity demanded is proportionately smaller than the percentage rise in price. Therefore, the gain from selling each unit at a higher price outweighs the loss from fewer units sold, causing total revenue (P × Q) to increase.

🇪🇹 አማርኛ (Amharic):
የፍላጎት ዋጋ የመለጠጥ ባህሪ (Elasticity) ከ1 በታች (Inelastic) በሚሆንበት ጊዜ፣ ዋጋ በ15% ሲጨምር የሚቀንሰው የፍላጎት መጠን ከ15% በጣም ያነሰ ስለሚሆን የነጋዴዎች ጠቅላላ ገቢ (Total Revenue) ይጨምራል።

🌳 Afaan Oromoo:
Yeroo fedhiin jijjiirama gatiitiif hin dachaane (|Ed| < 1), gatiin yoo dabalu gurgurtaan dhabamu xiqqoo waan ta\'eef galiin waliigalaa (Total Revenue) ni dabala.`,
    hint: 'For inelastic goods, price and total revenue move in the same direction.',
    difficulty: 'medium',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'econ-2018-q2',
    subject: 'Economics',
    year: '2018 E.C.',
    topic: 'Macroeconomics: Gross Domestic Product (GDP) Measurement',
    questionText: '2. Which of the following transactions is strictly EXCLUDED from the calculation of a nation’s current year Gross Domestic Product (GDP)?',
    options: [
      'The sale of a used secondhand car manufactured five years ago',
      'The construction of a new commercial warehouse in Dukem',
      'The fee paid to an accountant for legal auditing services this year',
      'The purchase of freshly baked bread from a local bakery'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
GDP only measures the market value of final goods and services produced within a country's borders during the current accounting period. The resale of a secondhand car produced five years ago was already accounted for in that previous year's GDP and does not represent new current production.

🇪🇹 አማርኛ (Amharic):
አጠቃላይ የሀገር ውስጥ ምርት (GDP) የሚለካው በተጠቀሰው አመት ውስጥ የተመረቱ አዳዲስ እቃዎችን እና አገልግሎቶችን ብቻ ነው። ከአምስት አመት በፊት የተመረተ አሮጌ መኪናን መሸጥ ከአሁን አመት አዲስ ምርት ጋር ግንኙነት ስለሌለው በGDP ስሌት ውስጥ አይካተትም።

🌳 Afaan Oromoo:
Oomisha Waliigalaa Biyya Keessaa (GDP) keessatti kan shallagamu oomisha haaraa bara sana oomishame qofa waan ta\'eef konkolaataa dur hojjetame gurguruun GDP keessatti hin lakkaawamu.`,
    hint: 'Secondhand and used goods are excluded from current GDP to avoid double counting.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'econ-2018-q3',
    subject: 'Economics',
    year: '2018 E.C.',
    topic: 'Fiscal Policy: Managing Inflation and Aggregate Demand',
    questionText: '3. When an economy experiences severe demand-pull inflation, which contractionary fiscal policy measure should the Ministry of Finance adopt?',
    options: [
      'Decrease government spending and increase taxes to reduce aggregate demand',
      'Double public expenditure on infrastructure subsidies and cut income taxes to zero',
      'Mandate the central bank to print new banknotes unconditionally',
      'Abolish all import tariffs to encourage borrowing'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Contractionary fiscal policy aims to cool down an overheating inflationary economy by shifting aggregate demand to the left. The government achieves this by cutting government purchases (G) and raising taxation (T), decreasing disposable income and consumer spending.

🇪🇹 አማርኛ (Amharic):
ከፍተኛ የዋጋ ንረት (Inflation) በሚከሰትበት ጊዜ መንግስት የሚወስደው አፋኝ የበጀት ፖሊሲ (Contractionary Fiscal Policy) የመንግስትን ወጪ መቀነስ እና ግብርን መጨመር ሲሆን፤ ይህም የህዝብን ፍላጎትና ወጪ በማቀዝቀዝ የዋጋ መረጋጋት ያመጣል።

🌳 Afaan Oromoo:
Gatiin meeshaalee yeroo baay\'ee dabalu mootummaan baasii isaa hir\'isuu fi gibira dabaluun maallaqa gabaa keessa jiru hir\'isee tasgabbii uuma.`,
    hint: 'To fight high inflation, the government cuts spending and increases taxes.',
    difficulty: 'medium',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'econ-2018-q4',
    subject: 'Economics',
    year: '2018 E.C.',
    topic: 'Market Structures: Perfect Competition vs Monopoly',
    questionText: '4. In long-run competitive equilibrium under Perfect Competition, a profit-maximizing firm operates at a point where:',
    options: [
      'Price equals Marginal Cost equals Minimum Average Total Cost (P = MC = min ATC)',
      'Price exceeds Marginal Cost, earning perpetual supernormal economic profits',
      'Average Revenue is less than Average Variable Cost, necessitating immediate shutdown',
      'Marginal Revenue equals Marginal Cost at the maximum point of Average Total Cost'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
In the long-run equilibrium of perfect competition, free entry and exit of firms drive economic profit to zero. At this point, allocative efficiency (P = MC) and productive efficiency (P = minimum ATC) are simultaneously achieved.

🇪🇹 አማርኛ (Amharic):
ፍፁም ፉክክር ባለበት ገበያ (Perfect Competition) ውስጥ በረጅም ጊዜ ሂደት ድርጅቶች ዜሮ ኢኮኖሚያዊ ትርፍ የሚያገኙበት ደረጃ ላይ የሚደርሱት ዋጋ (P) = የህዳግ ወጪ (MC) = ዝቅተኛው አማካይ ጠቅላላ ወጪ (Min ATC) በሚሆንበት ጊዜ ነው።

🌳 Afaan Oromoo:
Dorgommii Guutuu keessatti yeroo dheeraa keessatti bu\'aan bu\'uuraa qofa kan argamu yoo Gatiin (P) = Baasii Dabalataa (MC) = Baasii Giddu-galeessaa Gad-aanaa (Min ATC) ta\'edha.`,
    hint: 'Both allocative and productive efficiency are met at minimum ATC.',
    difficulty: 'hard',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'econ-2018-q5',
    subject: 'Economics',
    year: '2018 E.C.',
    topic: 'Monetary Economics: Functions of Money & Central Banking',
    questionText: '5. What primary tool does the National Bank of Ethiopia (NBE) utilize to regulate commercial bank credit and control the domestic money supply?',
    options: [
      'Adjusting the reserve requirement ratio, policy interest rates, and open market operations',
      'Dictating the retail selling price of agricultural crops',
      'Confiscating gold jewelry from commercial passengers at airports',
      'Banning the use of digital mobile money platforms'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
The central bank (National Bank of Ethiopia) controls monetary conditions through key policy instruments: the reserve requirement ratio (the percentage of deposits commercial banks must keep in reserve), the policy interest rate, and open market repo/reverse repo operations.

🇪🇹 አማርኛ (Amharic):
የኢትዮጵያ ብሄራዊ ባንክ የገንዘብ ዝውውርን እና የብድር መጠንን ለመቆጣጠር የሚጠቀምባቸው ዋና ዋና የገንዘብ ፖሊሲ መሳሪያዎች የመጠባበቂያ ሂሳብ ምጣኔ (Reserve Requirement)፣ የፖሊሲ ወለድ ምጣኔ እና የቦንድ ግዥና ሽያጭ ናቸው።

🌳 Afaan Oromoo:
Baankiin Biyyooleessaa Itoophiyaa (NBE) liqaa baankota daldalaa to\'achuuf meeshaalee akka kaffaltii qophii (Reserve Requirement) fi reetii dhalataa fayyadama.`,
    hint: 'Central banks use reserve requirements and policy interest rates.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  }
];
