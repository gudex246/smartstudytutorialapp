import { Question } from '../types';
import { ADMIN_EMAIL } from './constants';

export const GEOGRAPHY_2018_EC_QUESTIONS: Question[] = [
  {
    id: 'geog-2018-q1',
    subject: 'Geography',
    year: '2018 E.C.',
    topic: 'Drainage Systems of Ethiopia: The Abbay (Blue Nile) Basin',
    questionText: '1. What proportion of the total annual discharge of the main Nile River in Egypt and Sudan originates from the Ethiopian highlands (primarily the Abbay, Baro-Akobo, and Tekeze basins)?',
    options: [
      'Approximately 84% to 86%',
      'Approximately 25% to 30%',
      'Exactly 50%',
      'Less than 15%'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Hydrological studies conclusively show that roughly 84% to 86% of the Nile River's annual flow at Aswan originates from the Ethiopian highlands, dominated by the Abbay (Blue Nile ~60%), Baro-Akobo (Sobat ~14%), and Tekeze (Atbara ~12%).

🇪🇹 አማርኛ (Amharic):
የአባይ ወንዝን ጨምሮ ከኢትዮጵያ ደጋማ ስፍራዎች የሚነሱት ወንዞች (አባይ፣ ባሮ-አኮቦ እና ተከዜ) ለታላቁ አባይ (ናይል) ወንዝ አመታዊ ፍሰት ከ84% እስከ 86% የሚሆነውን ውሀ ያበረክታሉ።

🌳 Afaan Oromoo:
Laga Abbayyaa, Baaroo fi Takazee dabalatee laggeen lafa ol-ka\'aa Itoophiyaa irraa maddan dhibbeentaa 84%-86% bishaan Laga Naayilii gumaachu.`,
    hint: 'Over four-fifths of the Nile water comes from the Ethiopian highlands.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'geog-2018-q2',
    subject: 'Geography',
    year: '2018 E.C.',
    topic: 'Geological Formation: The Ethiopian Rift Valley & Plate Tectonics',
    questionText: '2. Which major tectonic process created the East African Rift System that divides Ethiopia into the Northwestern and Southeastern Highlands?',
    options: [
      'Divergent plate boundary movement causing tension, faulting, and crustal rifting',
      'Convergent continental collision producing fold mountains similar to the Himalayas',
      'Massive coastal wave abrasion during the Quaternary period',
      'Glacial erosion and moraine deposition during the Ice Age'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
The Great East African Rift Valley in Ethiopia was formed during the Tertiary and Quaternary periods by divergent plate tectonic forces (extensional stress pulling the African Nubian plate and Somali plate apart), resulting in normal faulting, grabens, and volcanic activity.

🇪🇹 አማርኛ (Amharic):
የታላቁ ምስራቅ አፍሪካ ስምጥ ሸለቆ የተፈጠረው በምድር ውስጣዊ ኃይል ሳቢያ የመሬት ሰሌዳዎች (ፕሌቶች) ወደ ተቃራኒ አቅጣጫ በመራራቃቸው (Divergence/Tension) ምክንያት በተፈጠረ የመሬት ስብራት እና መንሸራተት ነው።

🌳 Afaan Oromoo:
Sululli Guddaan Baha Afrikaa sochiin lafaa wal-dhiibu (Divergence/Tension) gargar babal\'achuun killeewwan lafaa addaan baasuun kan uumamedha.`,
    hint: 'Tension pulling tectonic plates apart creates rift valleys.',
    difficulty: 'medium',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'geog-2018-q3',
    subject: 'Geography',
    year: '2018 E.C.',
    topic: 'Agro-Ecological Zones: Traditional Climatic Classification of Ethiopia',
    questionText: '3. Which traditional Ethiopian climatic zone is situated at altitudes between 1,500 and 2,300 meters above sea level, characterized by temperate conditions and supporting the highest concentration of the rural population and teff cultivation?',
    options: [
      'Woina Dega (Sub-tropical/Temperate)',
      'Bereha (Hot Arid Lowlands)',
      'Kolla (Warm Semi-arid)',
      'Wurch (Cold Alpine Afro-alpine)'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Woina Dega (altitude 1,500m to 2,300m, temperature 15°C to 20°C) is Ethiopia's most habitable and productive temperate zone. It features fertile volcanic soils, moderate rainfall, comfortable human habitation, and widespread cultivation of teff, maize, and pulses.

🇪🇹 አማርኛ (Amharic):
ከባህር ጠለል በላይ ከ1,500 እስከ 2,300 ሜትር ከፍታ ላይ የሚገኘው፣ ተስማሚና መካከለኛ አየር ጠባይ ያለው፣ ከፍተኛ የህዝብ ቁጥር የሚኖርበት እና ለጤፍና ጥራጥሬ ልማት ምቹ የሆነው ባህላዊ የአየር ንብረት ዞን ወይና ደጋ ይባላል።

🌳 Afaan Oromoo:
Naannoon qilleensaa aadaa ol-ka\'iinsa lafaa meetira 1,500 hanga 2,300 qabu, qilleensa madaalawaa kan qabuu fi baay\'inaan xaafoof oolu "Baddaa-Dareedha" (Woina Dega).`,
    hint: 'This zone literally means "Wine of the Highlands" or temperate transitional highland.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: true,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'geog-2018-q4',
    subject: 'Geography',
    year: '2018 E.C.',
    topic: 'Geographic Information Systems (GIS): Spatial Data Analysis',
    questionText: '4. In modern Geographic Information Systems (GIS), what is the key distinction between Vector data and Raster data models?',
    options: [
      'Vector data represents features as points, lines, and polygons, whereas Raster data represents continuous geographic space as a matrix of grid cells (pixels)',
      'Vector data only shows ocean currents, while Raster data only displays topographic contours',
      'Raster data uses zero computer storage, while Vector data requires external servers',
      'Vector data cannot store geographical coordinates'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
In GIS:
• Vector data uses discrete geometric primitives (Points for trees/wells, Lines for roads/rivers, Polygons for lakes/boundaries) defined by exact coordinate pairs.
• Raster data models continuous real-world phenomena (satellite imagery, elevation, temperature) as an array of uniform cells/pixels with specific values.

🇪🇹 አማርኛ (Amharic):
በጂ አይ ኤስ (GIS) የቬክተር ዳታ ጂኦግራፊያዊ ገጽታዎችን በነጥብ (Points)፣ በመስመር (Lines) እና በፖሊጎን (Polygons) ሲገልጽ፤ ራስተር ዳታ ግን መልክዓ ምድርን በፒክስል ወይም በግሪድ ሴሎች (Grid cells) ረድፍ ይወክላል።

🌳 Afaan Oromoo:
GIS keessatti daataan Veektaraa tuqaa, sararaa fi boca lakkoofsaan yoo ibsu, daataan Raastarii immoo piiksilii ykn qubee walduraa duubaan lafa ibsa.`,
    hint: 'Vector uses coordinates for points/lines/polygons; Raster uses pixels.',
    difficulty: 'medium',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  },
  {
    id: 'geog-2018-q5',
    subject: 'Geography',
    year: '2018 E.C.',
    topic: 'Demography: Population Dynamics in Ethiopia',
    questionText: '5. What demographic structure best describes Ethiopia’s current national population pyramid?',
    options: [
      'An expansive broad-base pyramid indicating a very young population with high child dependency and high birth rates',
      'A constrictive beehive pyramid with an aging population and declining birth rates',
      'A stationary rectangular pyramid with zero population growth',
      'An inverted pyramid with over 60% of citizens aged above 70'
    ],
    correctOptionIndex: 0,
    explanation: `🇬🇧 English:
Ethiopia's population pyramid is typically expansive (triangular with a broad base), characterized by a high proportion of youth (over 40% under age 15 and over 60% under age 25), reflecting sustained high fertility rates and a substantial child dependency ratio.

🇪🇹 አማርኛ (Amharic):
የኢትዮጵያ የህዝብ ቁጥር ፒራሚድ ሰፊ መሰረት ያለው ትሪያንግል ቅርጽ ያለው (Expansive Pyramid) ሲሆን፤ ይህም አብዛኛው የህብረተሰብ ክፍል ወጣትና ህፃናት መሆናቸውን እና ከፍተኛ የልደት ምጣኔ መኖሩን ያሳያል።

🌳 Afaan Oromoo:
Piraamiidiin baay\'ina uummata Itoophiyaa bal\'aa kan jala qabu (Expansive) yoo ta\'u, kunis baay\'inni daa\'immanii fi dargaggootaa olaanaa ta\'uu mul\'isa.`,
    hint: 'A broad base represents high birth rate and a youth-dominated demographic.',
    difficulty: 'easy',
    points: 10,
    isFreePreview: false,
    createdAt: '2026-09-01',
    createdBy: ADMIN_EMAIL
  }
];
