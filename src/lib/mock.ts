// Mock user + day data for premium UI demos.
export const user = {
  name: "Skyler",
  avatar: "S",
  goal: "Recomp · Lean Bulk",
  streak: 23,
  workoutsCompleted: 142,
};

export const today = {
  date: new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" }),
  insight: "You're 320 cal under goal — a solid post-lift meal will close the gap.",
  calories: { goal: 2680, eaten: 1842, burned: 482 },
  macros: {
    protein: { value: 148, goal: 200 },
    carbs: { value: 186, goal: 280 },
    fat: { value: 52, goal: 78 },
  },
  steps: { value: 8421, goal: 10000 },
  water: { value: 1.8, goal: 3.0 }, // L
  weight: { value: 184.2, delta: -0.6 }, // lb
  active: { value: 482, goal: 650 },
  weightTrend: [186.1, 185.6, 185.3, 184.9, 185.0, 184.5, 184.2],
  volumeTrend: [12.1, 14.0, 11.8, 15.4, 13.7, 16.2, 17.0],
  macroTrend: [78, 82, 75, 88, 90, 84, 92],
};

export const todayWorkout = {
  type: "Push Day",
  muscles: ["Chest", "Shoulders", "Triceps"],
  duration: 58,
  calories: 410,
  exercises: [
    { name: "Barbell Bench Press", sets: "4 × 6", icon: "🏋️" },
    { name: "Incline DB Press", sets: "3 × 10" },
    { name: "Cable Fly", sets: "3 × 12" },
    { name: "Seated OHP", sets: "4 × 8" },
    { name: "Lateral Raise", sets: "3 × 15" },
    { name: "Tricep Pushdown", sets: "3 × 12" },
  ],
};

export const routines = [
  { name: "Push / Pull / Legs", days: 6, lastDone: "Yesterday", tint: "cyan" as const },
  { name: "Upper / Lower", days: 4, lastDone: "3d ago", tint: "violet" as const },
  { name: "Full Body Strength", days: 3, lastDone: "Last week", tint: "mint" as const },
];

export const meals = [
  {
    name: "Breakfast",
    cals: 612,
    items: [
      { name: "Greek Yogurt + Berries", cals: 220, p: 24, c: 28, f: 4 },
      { name: "Espresso w/ oat milk", cals: 92, p: 2, c: 9, f: 5 },
      { name: "3 Whole Eggs, scrambled", cals: 300, p: 21, c: 2, f: 22 },
    ],
  },
  {
    name: "Lunch",
    cals: 740,
    items: [
      { name: "Chicken Bowl, brown rice", cals: 620, p: 52, c: 64, f: 14 },
      { name: "Sparkling water", cals: 0, p: 0, c: 0, f: 0 },
      { name: "Apple", cals: 120, p: 0, c: 30, f: 0 },
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
      { name: "Whey Protein Shake", cals: 180, p: 30, c: 6, f: 3 },
      { name: "Almonds (1oz)", cals: 170, p: 6, c: 6, f: 15 },
      { name: "Rx Bar", cals: 210, p: 12, c: 24, f: 9 },
    ],
  },
];

export const supplements = [
  { time: "Morning", items: ["Creatine 5g", "Vitamin D3", "Omega-3", "Magnesium"], done: 4, total: 4 },
  { time: "Pre-Workout", items: ["Caffeine 200mg", "Beta-Alanine"], done: 2, total: 2 },
  { time: "Night", items: ["Zinc", "Ashwagandha", "L-Theanine"], done: 1, total: 3 },
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
  { name: "TRT — Test Cyp", schedule: "Mon · Thu", dose: "100mg", week: 14, total: 26, tint: "cyan" as const },
  { name: "GLP-1 Microdose", schedule: "Sunday", dose: "0.25mg", week: 6, total: 12, tint: "violet" as const },
  { name: "Creatine Loading", schedule: "Daily", dose: "5g", week: 3, total: 4, tint: "mint" as const },
];
