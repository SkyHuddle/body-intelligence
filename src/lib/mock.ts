// Mock data for the GymMaxx premium UI demo.
// All weights/volumes use lbs; small portions in oz.

export const user = {
  name: "Skyler",
  fullName: "Skyler Maxwell",
  avatar: "S",
  goal: "Recomp · Lean Bulk",
  streak: 23,
  workoutsCompleted: 142,
};

const weekday = (offset: number) => {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
};

export const today = {
  date: weekday(0),
  insight: "320 cal under goal — a 6 oz chicken bowl will close the gap.",
  calories: { goal: 2680, eaten: 1842, burned: 482 },
  macros: {
    protein: { value: 148, goal: 200 },
    carbs: { value: 186, goal: 280 },
    fat: { value: 52, goal: 78 },
  },
  steps: { value: 8421, goal: 10000 },
  water: { value: 58, goal: 96 }, // fluid oz
  weight: { value: 184.2, delta: -0.6 }, // lb
  active: { value: 482, goal: 650 },
  sleep: { hours: 7.4, goal: 8 },
  restingHr: 58,
  weightTrend: [186.1, 185.6, 185.3, 184.9, 185.0, 184.5, 184.2],
  volumeTrend: [12.1, 14.0, 11.8, 15.4, 13.7, 16.2, 17.0],
  macroTrend: [78, 82, 75, 88, 90, 84, 92],
};

// Daily Score — composite of workout, nutrition, water, supplements, sleep
export const dailyScore = {
  total: 84,
  delta: +6,
  breakdown: [
    { key: "Training", value: 92, weight: 30, tint: "cyan" as const },
    { key: "Nutrition", value: 78, weight: 25, tint: "amber" as const },
    { key: "Hydration", value: 60, weight: 15, tint: "cyan" as const },
    { key: "Supplements", value: 88, weight: 15, tint: "violet" as const },
    { key: "Sleep", value: 90, weight: 15, tint: "mint" as const },
  ],
};

export const streaks = {
  workout: 23,
  nutrition: 11,
  supplements: 18,
};

// 35-day calendar grid (5 weeks back from today). 0=miss, 1=partial, 2=hit, 3=pr
export const calendar = {
  month: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
  days: [
    2, 2, 1, 2, 3, 2, 0,
    2, 2, 2, 0, 2, 3, 2,
    2, 1, 2, 2, 2, 2, 0,
    2, 3, 2, 2, 2, 2, 1,
    2, 2, 2, 2, 2, 2, 2,
  ],
};

// Today's workout w/ progression: target weights informed by last session + smart suggestion
export const todayWorkout = {
  type: "Push Day",
  week: 4,
  muscles: ["Chest", "Shoulders", "Triceps"],
  duration: 58,
  calories: 410,
  exercises: [
    {
      name: "Barbell Bench Press",
      target: "4 × 6",
      lastWeight: 225,
      suggestion: 230,
      pr: 245,
      isPrAttempt: false,
      sets: [
        { reps: 6, weight: 225, done: true, prevReps: 6, prevWeight: 225 },
        { reps: 6, weight: 230, done: true, prevReps: 6, prevWeight: 225 },
        { reps: 5, weight: 230, done: false, prevReps: 5, prevWeight: 225 },
        { reps: 0, weight: 0, done: false, prevReps: 5, prevWeight: 225 },
      ],
    },
    {
      name: "Incline DB Press",
      target: "3 × 10",
      lastWeight: 75,
      suggestion: 80,
      pr: 85,
      isPrAttempt: true,
      sets: [
        { reps: 0, weight: 0, done: false, prevReps: 10, prevWeight: 75 },
        { reps: 0, weight: 0, done: false, prevReps: 10, prevWeight: 75 },
        { reps: 0, weight: 0, done: false, prevReps: 8, prevWeight: 75 },
      ],
    },
    {
      name: "Cable Fly",
      target: "3 × 12",
      lastWeight: 35,
      suggestion: 35,
      pr: 40,
      isPrAttempt: false,
      sets: [
        { reps: 0, weight: 0, done: false, prevReps: 12, prevWeight: 35 },
        { reps: 0, weight: 0, done: false, prevReps: 12, prevWeight: 35 },
        { reps: 0, weight: 0, done: false, prevReps: 10, prevWeight: 35 },
      ],
    },
    {
      name: "Seated OHP",
      target: "4 × 8",
      lastWeight: 135,
      suggestion: 140,
      pr: 155,
      isPrAttempt: false,
      sets: [
        { reps: 0, weight: 0, done: false, prevReps: 8, prevWeight: 135 },
        { reps: 0, weight: 0, done: false, prevReps: 8, prevWeight: 135 },
        { reps: 0, weight: 0, done: false, prevReps: 7, prevWeight: 135 },
        { reps: 0, weight: 0, done: false, prevReps: 6, prevWeight: 135 },
      ],
    },
    {
      name: "Lateral Raise",
      target: "3 × 15",
      lastWeight: 20,
      suggestion: 20,
      pr: 25,
      isPrAttempt: false,
      sets: [
        { reps: 0, weight: 0, done: false, prevReps: 15, prevWeight: 20 },
        { reps: 0, weight: 0, done: false, prevReps: 15, prevWeight: 20 },
        { reps: 0, weight: 0, done: false, prevReps: 12, prevWeight: 20 },
      ],
    },
    {
      name: "Tricep Pushdown",
      target: "3 × 12",
      lastWeight: 60,
      suggestion: 65,
      pr: 70,
      isPrAttempt: false,
      sets: [
        { reps: 0, weight: 0, done: false, prevReps: 12, prevWeight: 60 },
        { reps: 0, weight: 0, done: false, prevReps: 12, prevWeight: 60 },
        { reps: 0, weight: 0, done: false, prevReps: 10, prevWeight: 60 },
      ],
    },
  ],
};

export const personalRecords = [
  { lift: "Barbell Bench", weight: 245, reps: 1, when: "12d ago", progress: [205, 215, 225, 230, 235, 240, 245] },
  { lift: "Back Squat", weight: 365, reps: 1, when: "5d ago", progress: [305, 315, 325, 335, 345, 355, 365] },
  { lift: "Deadlift", weight: 445, reps: 1, when: "20d ago", progress: [385, 395, 405, 415, 425, 435, 445] },
  { lift: "Overhead Press", weight: 165, reps: 1, when: "this week", progress: [135, 140, 145, 150, 155, 160, 165] },
];

export const routines = [
  { name: "Push / Pull / Legs", days: 6, lastDone: "Yesterday", tint: "cyan" as const },
  { name: "Upper / Lower", days: 4, lastDone: "3d ago", tint: "violet" as const },
  { name: "Full Body Strength", days: 3, lastDone: "Last week", tint: "mint" as const },
];

export const recentWorkouts = [
  { name: "Pull Day", when: "Yesterday · 1h 02m", vol: "14,200 lb", prs: 1 },
  { name: "Leg Day", when: "2d ago · 1h 14m", vol: "22,600 lb", prs: 0 },
  { name: "Push Day", when: "3d ago · 56m", vol: "13,900 lb", prs: 2 },
];

export const meals = [
  {
    name: "Breakfast",
    cals: 612,
    items: [
      { name: "Greek Yogurt + Berries", portion: "8 oz", cals: 220, p: 24, c: 28, f: 4 },
      { name: "Espresso w/ oat milk", portion: "6 oz", cals: 92, p: 2, c: 9, f: 5 },
      { name: "3 Whole Eggs, scrambled", portion: "—", cals: 300, p: 21, c: 2, f: 22 },
    ],
  },
  {
    name: "Lunch",
    cals: 740,
    items: [
      { name: "Chicken Bowl, brown rice", portion: "12 oz", cals: 620, p: 52, c: 64, f: 14 },
      { name: "Sparkling water", portion: "12 oz", cals: 0, p: 0, c: 0, f: 0 },
      { name: "Apple", portion: "1 med", cals: 120, p: 0, c: 30, f: 0 },
    ],
  },
  {
    name: "Dinner",
    cals: 0,
    items: [],
  },
  {
    name: "Snacks",
    cals: 490,
    items: [
      { name: "Whey Protein Shake", portion: "—", cals: 180, p: 30, c: 6, f: 3 },
      { name: "Almonds", portion: "1 oz", cals: 170, p: 6, c: 6, f: 15 },
      { name: "Rx Bar", portion: "—", cals: 210, p: 12, c: 24, f: 9 },
    ],
  },
];

export const suggestedFoods = [
  { name: "6 oz Grilled Chicken", cals: 280, p: 52, c: 0, f: 6 },
  { name: "Whey Protein Shake", cals: 180, p: 30, c: 6, f: 3 },
  { name: "Greek Yogurt", cals: 150, p: 22, c: 8, f: 0 },
  { name: "Cottage Cheese", cals: 180, p: 24, c: 8, f: 5 },
];

export type SupplementItem = { name: string; dose: string; done: boolean };
export const supplements: { time: string; items: SupplementItem[] }[] = [
  {
    time: "Morning",
    items: [
      { name: "Creatine", dose: "5 g", done: true },
      { name: "Vitamin D3", dose: "5,000 IU", done: true },
      { name: "Omega-3", dose: "2 g", done: true },
      { name: "Magnesium Glycinate", dose: "400 mg", done: true },
    ],
  },
  {
    time: "Pre-Workout",
    items: [
      { name: "Caffeine", dose: "200 mg", done: true },
      { name: "Beta-Alanine", dose: "3.2 g", done: true },
    ],
  },
  {
    time: "Night",
    items: [
      { name: "Zinc", dose: "25 mg", done: true },
      { name: "Ashwagandha", dose: "600 mg", done: false },
      { name: "L-Theanine", dose: "200 mg", done: false },
    ],
  },
];

export const biomarkers = [
  { name: "Testosterone", value: "742", unit: "ng/dL", status: "optimal" as const, range: "264–916" },
  { name: "Vitamin D", value: "58", unit: "ng/mL", status: "optimal" as const, range: "30–100" },
  { name: "LDL Cholesterol", value: "118", unit: "mg/dL", status: "high" as const, range: "<100" },
  { name: "HDL", value: "62", unit: "mg/dL", status: "optimal" as const, range: ">40" },
  { name: "HbA1c", value: "5.2", unit: "%", status: "optimal" as const, range: "<5.7" },
  { name: "Ferritin", value: "42", unit: "ng/mL", status: "low" as const, range: "50–400" },
];

export const measurements = [
  { name: "Weight", value: "184.2 lb", delta: "-0.6", trend: "down" as const },
  { name: "Body Fat", value: "14.8 %", delta: "-0.3", trend: "down" as const },
  { name: "Lean Mass", value: "157.0 lb", delta: "+0.2", trend: "up" as const },
  { name: "Waist", value: "32.5 in", delta: "-0.2", trend: "down" as const },
  { name: "Chest", value: "42.1 in", delta: "+0.1", trend: "up" as const },
  { name: "Arms", value: "15.6 in", delta: "+0.2", trend: "up" as const },
];

export const protocols = [
  { name: "TRT — Test Cyp", schedule: "Mon · Thu", dose: "100 mg", week: 14, total: 26, tint: "cyan" as const },
  { name: "GLP-1 Microdose", schedule: "Sunday", dose: "0.25 mg", week: 6, total: 12, tint: "violet" as const },
  { name: "Creatine Loading", schedule: "Daily", dose: "5 g", week: 3, total: 4, tint: "mint" as const },
];
