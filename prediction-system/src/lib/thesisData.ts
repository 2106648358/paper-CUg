import type { Project, Dimension } from '@/types';

export const dimensions: Dimension[] = [
  { id: 'popularity', name: '流行度', nameEn: 'Popularity' },
  { id: 'gender_equity', name: '性别平等', nameEn: 'Gender Equity' },
  { id: 'sustainability', name: '可持续性', nameEn: 'Sustainability' },
  { id: 'inclusivity', name: '包容性', nameEn: 'Inclusivity' },
  { id: 'innovation', name: '创新性', nameEn: 'Innovation' },
  { id: 'safety', name: '安全性', nameEn: 'Safety' },
];

export const RI_TABLE: Record<number, number> = {
  3: 0.52, 4: 0.89, 5: 1.12, 6: 1.26, 7: 1.36, 8: 1.41, 9: 1.46,
};

export const THRESHOLDS = {
  high: 0.7,
  medium: 0.4,
};

export const DIMENSION_IDS = [
  'popularity', 'gender_equity', 'sustainability',
  'inclusivity', 'innovation', 'safety',
] as const;

export const LABELS_CN = [
  '流行度', '性别平等', '可持续性', '包容性', '创新性', '安全性',
];

export const AHJ_JUDGMENT_MATRIX: number[][] = [
  [1.000, 1.644, 3.677, 4.338, 5.404, 2.000],
  [0.608, 1.000, 1.888, 1.888, 2.605, 1.000],
  [0.272, 0.530, 1.000, 1.149, 1.888, 0.574],
  [0.231, 0.530, 0.871, 1.000, 1.320, 0.488],
  [0.185, 0.384, 0.530, 0.758, 1.000, 0.308],
  [0.500, 1.000, 1.741, 2.048, 3.245, 1.000],
];

export const AHP_WEIGHTS: Record<string, number> = {
  popularity: 0.362,
  gender_equity: 0.189,
  sustainability: 0.106,
  inclusivity: 0.090,
  innovation: 0.064,
  safety: 0.189,
};

export const EWM_ENTROPY: Record<string, number> = {
  popularity: 0.902,
  gender_equity: 0.940,
  sustainability: 0.814,
  inclusivity: 0.859,
  innovation: 0.865,
  safety: 0.937,
};

export const EWM_UTILITY: Record<string, number> = {
  popularity: 0.098,
  gender_equity: 0.060,
  sustainability: 0.186,
  inclusivity: 0.141,
  innovation: 0.135,
  safety: 0.063,
};

export const EWM_WEIGHTS: Record<string, number> = {
  popularity: 0.144,
  gender_equity: 0.088,
  sustainability: 0.272,
  inclusivity: 0.206,
  innovation: 0.198,
  safety: 0.092,
};

export const HYBRID_WEIGHTS_05: Record<string, number> = {
  popularity: 0.253,
  gender_equity: 0.139,
  sustainability: 0.189,
  inclusivity: 0.148,
  innovation: 0.131,
  safety: 0.140,
};

export const DEFAULT_JUDGMENT_MATRIX: number[][] = [
  [1, 2.667, 3.667, 3.928, 4.718, 2.667],
  [0.375, 1, 2, 2.297, 3.301, 1.148],
  [0.273, 0.5, 1, 1.189, 2, 0.638],
  [0.255, 0.435, 0.841, 1, 1.741, 0.536],
  [0.212, 0.303, 0.5, 0.575, 1, 0.347],
  [0.375, 0.871, 1.568, 1.866, 2.884, 1],
];

export const EXPERT_PRIORITIES = [
  { name: '专家A（体育管理学者）', weights: [0.396, 0.194, 0.091, 0.075, 0.043, 0.201] },
  { name: '专家B（奥运研究专家）', weights: [0.310, 0.237, 0.102, 0.091, 0.077, 0.183] },
  { name: '专家C（体育经济学研究者）', weights: [0.456, 0.114, 0.088, 0.108, 0.096, 0.138] },
  { name: '专家D（体育行政管理人员）', weights: [0.272, 0.216, 0.151, 0.085, 0.085, 0.191] },
  { name: '专家E（国际体育研究学者）', weights: [0.366, 0.189, 0.097, 0.085, 0.036, 0.227] },
];

export const projects: Project[] = [
  {
    id: 'athletics', name: '田径', nameEn: 'Athletics', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.814, gender_equity: 0.88, sustainability: 0.955, inclusivity: 1.000, innovation: 0.027, safety: 0.75 }
  },
  {
    id: 'swimming', name: '游泳', nameEn: 'Swimming', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.580, gender_equity: 0.95, sustainability: 0.716, inclusivity: 0.432, innovation: 0.418, safety: 0.88 }
  },
  {
    id: 'gymnastics', name: '体操', nameEn: 'Gymnastics', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.638, gender_equity: 0.85, sustainability: 0.935, inclusivity: 0.938, innovation: 0.008, safety: 0.62 }
  },
  {
    id: 'basketball', name: '篮球', nameEn: 'Basketball', category: 'core', yearAdded: 1936,
    indicators: { popularity: 0.503, gender_equity: 0.92, sustainability: 0.626, inclusivity: 0.269, innovation: 0.985, safety: 0.55 }
  },
  {
    id: 'football', name: '足球', nameEn: 'Football', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.692, gender_equity: 0.80, sustainability: 0.735, inclusivity: 0.756, innovation: 0.023, safety: 0.50 }
  },
  {
    id: 'tennis', name: '网球', nameEn: 'Tennis', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.85, gender_equity: 0.90, sustainability: 0.65, inclusivity: 0.60, innovation: 0.45, safety: 0.70 }
  },
  {
    id: 'volleyball', name: '排球', nameEn: 'Volleyball', category: 'core', yearAdded: 1964,
    indicators: { popularity: 0.82, gender_equity: 0.95, sustainability: 0.70, inclusivity: 0.75, innovation: 0.40, safety: 0.65 }
  },
  {
    id: 'cycling', name: '自行车', nameEn: 'Cycling', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.75, gender_equity: 0.85, sustainability: 0.80, inclusivity: 0.65, innovation: 0.50, safety: 0.60 }
  },
  {
    id: 'fencing', name: '击剑', nameEn: 'Fencing', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.55, gender_equity: 0.88, sustainability: 0.75, inclusivity: 0.50, innovation: 0.45, safety: 0.80 }
  },
  {
    id: 'judo', name: '柔道', nameEn: 'Judo', category: 'core', yearAdded: 1964,
    indicators: { popularity: 0.65, gender_equity: 0.85, sustainability: 0.80, inclusivity: 0.70, innovation: 0.45, safety: 0.55 }
  },
  {
    id: 'rowing', name: '赛艇', nameEn: 'Rowing', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.55, gender_equity: 0.90, sustainability: 0.85, inclusivity: 0.60, innovation: 0.35, safety: 0.75 }
  },
  {
    id: 'shooting', name: '射击', nameEn: 'Shooting', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.50, gender_equity: 0.85, sustainability: 0.60, inclusivity: 0.55, innovation: 0.40, safety: 0.90 }
  },
  {
    id: 'table_tennis', name: '乒乓球', nameEn: 'Table Tennis', category: 'core', yearAdded: 1988,
    indicators: { popularity: 0.78, gender_equity: 0.95, sustainability: 0.80, inclusivity: 0.65, innovation: 0.35, safety: 0.85 }
  },
  {
    id: 'weightlifting', name: '举重', nameEn: 'Weightlifting', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.55, gender_equity: 0.75, sustainability: 0.75, inclusivity: 0.55, innovation: 0.30, safety: 0.45 }
  },
  {
    id: 'diving', name: '跳水', nameEn: 'Diving', category: 'core', yearAdded: 1904,
    indicators: { popularity: 0.72, gender_equity: 0.90, sustainability: 0.60, inclusivity: 0.50, innovation: 0.55, safety: 0.55 }
  },
  {
    id: 'badminton', name: '羽毛球', nameEn: 'Badminton', category: 'core', yearAdded: 1992,
    indicators: { popularity: 0.75, gender_equity: 0.92, sustainability: 0.75, inclusivity: 0.60, innovation: 0.40, safety: 0.70 }
  },
  {
    id: 'boxing', name: '拳击', nameEn: 'Boxing', category: 'core', yearAdded: 1904,
    indicators: { popularity: 0.70, gender_equity: 0.65, sustainability: 0.70, inclusivity: 0.60, innovation: 0.35, safety: 0.35 }
  },
  {
    id: 'archery', name: '射箭', nameEn: 'Archery', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.50, gender_equity: 0.90, sustainability: 0.75, inclusivity: 0.60, innovation: 0.40, safety: 0.92 }
  },
  {
    id: 'equestrian', name: '马术', nameEn: 'Equestrian', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.45, gender_equity: 0.95, sustainability: 0.40, inclusivity: 0.45, innovation: 0.35, safety: 0.65 }
  },
  {
    id: 'handball', name: '手球', nameEn: 'Handball', category: 'core', yearAdded: 1936,
    indicators: { popularity: 0.60, gender_equity: 0.90, sustainability: 0.70, inclusivity: 0.65, innovation: 0.40, safety: 0.50 }
  },
  {
    id: 'hockey', name: '曲棍球', nameEn: 'Hockey', category: 'core', yearAdded: 1908,
    indicators: { popularity: 0.55, gender_equity: 0.88, sustainability: 0.65, inclusivity: 0.60, innovation: 0.35, safety: 0.55 }
  },
  {
    id: 'canoe', name: '皮划艇', nameEn: 'Canoe', category: 'core', yearAdded: 1936,
    indicators: { popularity: 0.50, gender_equity: 0.85, sustainability: 0.80, inclusivity: 0.55, innovation: 0.40, safety: 0.65 }
  },
  {
    id: 'sailing', name: '帆船', nameEn: 'Sailing', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.48, gender_equity: 0.88, sustainability: 0.85, inclusivity: 0.45, innovation: 0.50, safety: 0.75 }
  },
  {
    id: 'wrestling', name: '摔跤', nameEn: 'Wrestling', category: 'core', yearAdded: 1896,
    indicators: { popularity: 0.55, gender_equity: 0.60, sustainability: 0.75, inclusivity: 0.65, innovation: 0.30, safety: 0.45 }
  },
  {
    id: 'taekwondo', name: '跆拳道', nameEn: 'Taekwondo', category: 'core', yearAdded: 2000,
    indicators: { popularity: 0.70, gender_equity: 0.90, sustainability: 0.80, inclusivity: 0.75, innovation: 0.50, safety: 0.55 }
  },
  {
    id: 'triathlon', name: '铁人三项', nameEn: 'Triathlon', category: 'core', yearAdded: 2000,
    indicators: { popularity: 0.60, gender_equity: 0.92, sustainability: 0.75, inclusivity: 0.55, innovation: 0.60, safety: 0.60 }
  },
  {
    id: 'water_polo', name: '水球', nameEn: 'Water Polo', category: 'core', yearAdded: 1900,
    indicators: { popularity: 0.45, gender_equity: 0.85, sustainability: 0.60, inclusivity: 0.50, innovation: 0.35, safety: 0.60 }
  },
  {
    id: 'sport_climbing', name: '攀岩', nameEn: 'Sport Climbing', category: 'new', yearAdded: 2020,
    indicators: { popularity: 0.349, gender_equity: 0.90, sustainability: 0.568, inclusivity: 0.294, innovation: 0.985, safety: 0.85 }
  },
  {
    id: 'surfing', name: '冲浪', nameEn: 'Surfing', category: 'new', yearAdded: 2020,
    indicators: { popularity: 0.369, gender_equity: 0.90, sustainability: 0.626, inclusivity: 0.269, innovation: 0.985, safety: 0.80 }
  },
  {
    id: 'skateboarding', name: '滑板', nameEn: 'Skateboarding', category: 'new', yearAdded: 2020,
    indicators: { popularity: 0.394, gender_equity: 0.90, sustainability: 0.626, inclusivity: 0.294, innovation: 0.985, safety: 0.35 }
  },
  {
    id: 'breaking', name: '霹雳舞', nameEn: 'Breaking', category: 'new', yearAdded: 2024,
    indicators: { popularity: 0.327, gender_equity: 0.92, sustainability: 0.500, inclusivity: 0.110, innovation: 1.000, safety: 0.70 }
  },
  {
    id: 'rugby_sevens', name: '七人制橄榄球', nameEn: 'Rugby Sevens', category: 'new', yearAdded: 2016,
    indicators: { popularity: 0.65, gender_equity: 0.88, sustainability: 0.75, inclusivity: 0.70, innovation: 0.65, safety: 0.45 }
  },
  {
    id: 'golf', name: '高尔夫', nameEn: 'Golf', category: 'new', yearAdded: 2016,
    indicators: { popularity: 0.70, gender_equity: 0.85, sustainability: 0.35, inclusivity: 0.40, innovation: 0.30, safety: 0.85 }
  },
  {
    id: 'esports', name: '电子竞技', nameEn: 'Esports', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.95, gender_equity: 0.65, sustainability: 0.85, inclusivity: 0.55, innovation: 1.00, safety: 0.95 }
  },
  {
    id: 'cricket', name: '板球', nameEn: 'Cricket', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.205, gender_equity: 0.70, sustainability: 0.500, inclusivity: 0.247, innovation: 0.023, safety: 0.65 }
  },
  {
    id: 'squash', name: '壁球', nameEn: 'Squash', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.060, gender_equity: 0.88, sustainability: 0.500, inclusivity: 0.150, innovation: 0.500, safety: 0.65 }
  },
  {
    id: 'pickleball', name: '匹克球', nameEn: 'Pickleball', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.50, gender_equity: 0.88, sustainability: 0.78, inclusivity: 0.70, innovation: 0.82, safety: 0.90 }
  },
  {
    id: 'australian_football', name: '澳式足球', nameEn: 'Australian Football', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.60, gender_equity: 0.60, sustainability: 0.70, inclusivity: 0.45, innovation: 0.35, safety: 0.60 }
  },
  {
    id: 'flag_football', name: '腰旗橄榄球', nameEn: 'Flag Football', category: 'candidate', yearAdded: null,
    indicators: { popularity: 0.55, gender_equity: 0.85, sustainability: 0.75, inclusivity: 0.60, innovation: 0.45, safety: 0.70 }
  },
  {
    id: 'karate', name: '空手道', nameEn: 'Karate', category: 'removed', yearAdded: 2020, yearRemoved: 2024,
    indicators: { popularity: 0.500, gender_equity: 0.90, sustainability: 0.500, inclusivity: 0.185, innovation: 0.985, safety: 0.60 }
  },
  {
    id: 'baseball_softball', name: '棒球/垒球', nameEn: 'Baseball/Softball', category: 'removed', yearAdded: 1992, yearRemoved: 2008,
    indicators: { popularity: 0.445, gender_equity: 0.80, sustainability: 0.590, inclusivity: 0.296, innovation: 0.377, safety: 0.80 }
  },
];

export const OLYMPIC_SIZE_HISTORY = [
  { year: 1896, events: 43, sports: 11 },
  { year: 1900, events: 95, sports: 19 },
  { year: 1904, events: 91, sports: 16 },
  { year: 1908, events: 110, sports: 22 },
  { year: 1912, events: 102, sports: 18 },
  { year: 1920, events: 156, sports: 22 },
  { year: 1924, events: 126, sports: 17 },
  { year: 1928, events: 109, sports: 14 },
  { year: 1932, events: 117, sports: 15 },
  { year: 1936, events: 129, sports: 20 },
  { year: 1948, events: 136, sports: 17 },
  { year: 1952, events: 149, sports: 17 },
  { year: 1956, events: 151, sports: 16 },
  { year: 1960, events: 150, sports: 17 },
  { year: 1964, events: 163, sports: 19 },
  { year: 1968, events: 172, sports: 20 },
  { year: 1972, events: 195, sports: 22 },
  { year: 1976, events: 198, sports: 21 },
  { year: 1980, events: 203, sports: 23 },
  { year: 1984, events: 221, sports: 23 },
  { year: 1988, events: 237, sports: 23 },
  { year: 1992, events: 257, sports: 25 },
  { year: 1996, events: 271, sports: 26 },
  { year: 2000, events: 300, sports: 28 },
  { year: 2004, events: 301, sports: 28 },
  { year: 2008, events: 302, sports: 28 },
  { year: 2012, events: 302, sports: 26 },
  { year: 2016, events: 306, sports: 28 },
  { year: 2020, events: 339, sports: 33 },
  { year: 2024, events: 329, sports: 32 },
  { year: 2028, events: 340, sports: 32 },
];

export const CATEGORY_LABELS: Record<string, string> = {
  core: '核心项目',
  new: '新增项目',
  candidate: '候选项目',
  removed: '已移除项目',
};
