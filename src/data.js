// ---------------------------------------------------------------------------
// PHASE 2 -- STRENGTH FOCUS
// Mon Push | Tue WOD | Wed Rest | Thu Pull | Fri Legs | Sat WOD | Sun Rest
// Only the Strength Block and WODs are logged. Warm-up and core are shown in
// the Programme tab for reference. There is no cool-down.
// ---------------------------------------------------------------------------
export const APP_VERSION = '3.0';
export const PHASE_NUM = 2;
export const PHASE_NAME = 'Strength Focus';

// Week-1 base loads (lb). Editable in Settings. est = estimate, not from a log.
export const LIFTS = [
  { key: 'Barbell Overhead Press', base: 110 },
  { key: 'Barbell Bench Press', base: 150 },
  { key: 'DB Incline Press', base: 60 },
  { key: 'DB Lateral Raise', base: 15 },
  { key: 'Barbell Bent-Over Row', base: 130 },
  { key: 'Barbell RDL to Pendlay Row', base: 105 },
  { key: 'Single-Arm DB Row', base: 50, est: true },
  { key: 'DB Hammer Curl', base: 35 },
  { key: 'Barbell Back Squat', base: 155 },
  { key: 'Barbell Romanian Deadlift', base: 170 },
  { key: 'DB Bulgarian Split Squat', base: 20, est: true },
  { key: 'KB Single-Leg RDL', base: 35, est: true },
];
export const DEFAULT_LOADS = LIFTS.reduce(function (acc, l) { acc[l.key] = l.base; return acc; }, {});
export const EST_LIFTS = LIFTS.filter(function (l) { return l.est; }).map(function (l) { return l.key; });

export const WEEK_NOTES = [
  {
    week: 'Week 1', theme: 'Re-establish',
    note: 'Loads come from your Phase 1 logs. 4 sets of 5 at RPE 7. Lower every rep under control (about 3 seconds); no timed tempo or pause needed. Log what you actually lift.',
  },
  {
    week: 'Week 2', theme: 'Add load',
    note: 'Reps drop to 4. Bench, squat, RDL and row go up 5 lb; overhead press goes up 2.5 lb. Stay at RPE 8 or below. If a lift hits RPE 9, repeat the Week 1 load.',
  },
  {
    week: 'Week 3', theme: 'Heaviest week',
    note: 'Main lifts drop to sets of 3 at the heaviest loads of the block. Cap effort at RPE 8 and stop a set early if form slips. Pull-up volume peaks this week.',
  },
  {
    week: 'Week 4', theme: 'Deload and retest',
    note: 'Back to 3 sets of 5 at Week 1 loads. On your Saturday WOD, retest the Chipper (B7) and compare it with your 18:57 from Phase 1.',
  },
];

// P(sets, reps, add) -- one entry per week. add = lb added to the base load.
const P = function (s, r, add) { return { s: s, r: r, add: add || 0 }; };

const WARM = '#0A7C4E';
const STRENGTH = '#E8500A';
const CORE = '#1D5FA8';
const WODC = '#B5197A';
const REST = '#5A6472';

export const DAYS = [
  {
    id: 'd1', day: 'Monday', short: 'Mon', label: 'Strength -- Push', type: 'FULL',
    focus: 'Chest, shoulders, triceps, plus pull-ups paired with the press',
    equipment: 'Barbell, rack, incline bench, DB, pull-up bar, bands',
    totalTime: '70 min',
    sections: [
      { name: 'Warm-Up', kind: 'warmup', duration: '8 min', color: WARM, items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min easy, nasal breathing only.', sets: '', reps: '2 min' },
        { name: 'Shoulder CARs', detail: 'Biggest controlled circle you can make, each arm.', sets: '2', reps: '5 each direction' },
        { name: 'Band Pull-Aparts', detail: 'Arms high, mid, low. Squeeze the shoulder blades at the end.', sets: '2', reps: '15 each' },
        { name: 'Wall Slides', detail: 'Keep contact with the wall the whole way.', sets: '2', reps: '10' },
        { name: 'Dead Hang', detail: 'Passive hang to open the shoulders.', sets: '2', reps: '20-40 sec' },
      ] },
      { name: 'Strength Block', kind: 'strength', duration: '50 min', color: STRENGTH, items: [
        { name: 'Barbell Overhead Press + Pull-Up Superset', lift: 'Barbell Overhead Press', rest: '2:30',
          detail: 'Standing press, ribs down, full lockout. Do 3 strict pull-ups straight after every set of presses.',
          active: 'Face pulls, 15 reps, between supersets',
          plan: [P(4, '5', 0), P(4, '4', 2.5), P(4, '3', 5), P(3, '5', 0)] },
        { name: 'Barbell Bench Press', lift: 'Barbell Bench Press', rest: '2:30',
          detail: 'Shoulder blades pinched and down. Lower about 3 seconds, touch the chest, press.',
          active: 'Prone cobra, 10 reps',
          plan: [P(4, '5', 0), P(4, '4', 5), P(4, '3', 10), P(3, '5', 0)] },
        { name: 'DB Incline Press', lift: 'DB Incline Press', each: true, rest: '2:00',
          detail: 'Bench at 30-45 degrees. Elbows about 45 degrees from the body. Add weight only after hitting the top rep on every set.',
          active: 'Y-T-W raises, 8 each at 5 lb',
          plan: [P(3, '8', 0), P(3, '9', 0), P(3, '10', 0), P(3, '8', 0)] },
        { name: 'DB Lateral Raise', lift: 'DB Lateral Raise', each: true, rest: '1:30',
          detail: 'Slow up, slow down. Slight forward lean. Stop at shoulder height.',
          plan: [P(3, '10', 0), P(3, '11', 0), P(3, '12', 0), P(3, '10', 0)] },
        { name: 'Band Tricep Pushdown', fixed: 'Purple band', rest: '1:00',
          detail: 'Full extension at the bottom, slow return. Band at face height.',
          plan: [P(3, '12', 0), P(3, '13', 0), P(3, '15', 0), P(3, '12', 0)] },
      ] },
      { name: 'Core Finisher', kind: 'core', duration: '7 min', color: CORE, items: [
        { name: 'Pallof Press', detail: 'Half-kneeling. Resist the rotation. 2 sec hold at full reach.', sets: '3', reps: '10 each side' },
        { name: 'Plank Shoulder Taps', detail: 'Hips stay still. Slow taps.', sets: '3', reps: '12 each side' },
      ] },
    ],
  },
  {
    id: 'd2', day: 'Tuesday', short: 'Tue', label: 'Conditioning -- WOD', type: 'CONDITIONING',
    focus: 'Pick one or more WODs from the library',
    equipment: 'Assault bike, rower, KB, barbell, box, jump rope, wallball, pull-up bar',
    totalTime: 'Up to 60 min',
    sections: [
      { name: 'Warm-Up', kind: 'warmup', duration: '8 min', color: WARM, items: [
        { name: 'Easy Machine Warm-Up', detail: '4 min easy row or bike, heart rate under 120.', sets: '', reps: '4 min' },
        { name: 'Jump Rope', detail: 'Easy singles to find the rhythm.', sets: '', reps: '2 min' },
        { name: 'Hip CARs + Shoulder CARs', detail: 'Full controlled range.', sets: '1', reps: '3 each direction' },
        { name: 'Movement Prep', detail: 'Run 2-3 movements from the WOD at very easy effort.', sets: '1', reps: '60 sec' },
      ] },
      { name: 'WOD', kind: 'wod', duration: '10-45 min', color: WODC, items: [] },
    ],
  },
  {
    id: 'd3', day: 'Wednesday', short: 'Wed', label: 'Full Rest', type: 'REST',
    focus: 'Recovery between two hard days',
    equipment: 'None', totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', kind: 'rest', duration: '', color: REST, items: [
        { name: 'No structured training', detail: 'Wednesday sits between Tuesday conditioning and Thursday pull. It is what makes Thursday productive.', sets: '', reps: '' },
        { name: 'Protein and sleep', detail: 'About 1 g protein per lb of bodyweight and an extra 30-60 min of sleep if you can.', sets: '', reps: '' },
        { name: 'Light walking only', detail: '20-30 min easy walk is fine.', sets: '', reps: '' },
      ] },
    ],
  },
  {
    id: 'd4', day: 'Thursday', short: 'Thu', label: 'Strength -- Pull', type: 'FULL',
    focus: 'Back, biceps, and pull-up volume',
    equipment: 'Barbell, pull-up bar, DB, bench, bands, rower',
    totalTime: '70 min',
    sections: [
      { name: 'Warm-Up', kind: 'warmup', duration: '8 min', color: WARM, items: [
        { name: 'Rower Easy Pull', detail: '2 min easy, drive with the hips.', sets: '', reps: '2 min' },
        { name: 'Band Pull-Aparts', detail: 'Prime the back of the shoulders.', sets: '2', reps: '15 each' },
        { name: 'Dead Hang', detail: 'Passive hang.', sets: '2', reps: '20-40 sec' },
        { name: 'Thoracic Rotation Side-Lying', detail: '3 sec hold at the open position.', sets: '2', reps: '8 each side' },
        { name: 'Dead Bug', detail: 'Slow, lower back pressed down.', sets: '1', reps: '5 each side' },
      ] },
      { name: 'Strength Block', kind: 'strength', duration: '50 min', color: STRENGTH, items: [
        { name: 'Pull-Up -- Volume Priority', fixed: 'Bodyweight', rest: '2:30',
          detail: 'Dead hang start, chin over the bar, lower for 3 sec. Stop every set 1-2 reps before failure. When all 5 sets hit 5 clean reps, add 5 lb.',
          active: 'Face pulls, 15 reps, between sets',
          plan: [P(5, '4', 0), P(5, '4-5', 0), P(5, '5', 0), P(4, '4', 0)] },
        { name: 'Pull-Up Slow Negatives', fixed: 'Bodyweight', rest: '2:00',
          detail: 'Jump or step to the top, lower for 5 full seconds. Do these after the regular pull-up sets.',
          plan: [P(1, '3', 0), P(2, '3', 0), P(2, '3', 0), P(1, '3', 0)] },
        { name: 'Barbell Bent-Over Row', lift: 'Barbell Bent-Over Row', rest: '2:30',
          detail: 'Hinge to about 45 degrees, pull to the lower ribs. If your back is tight, hold the load or swap to a chest-supported DB row and log it.',
          active: 'Plank shoulder taps, 12 each side',
          plan: [P(4, '6', 0), P(4, '6', 5), P(4, '5', 5), P(3, '6', 0)] },
        { name: 'Barbell RDL to Pendlay Row', lift: 'Barbell RDL to Pendlay Row', rest: '2:00',
          detail: 'Hinge to just below the knee, pause, row to the lower ribs, return the bar to the floor between reps.',
          plan: [P(3, '6', 0), P(3, '6', 0), P(3, '6', 5), P(3, '5', 0)] },
        { name: 'Single-Arm DB Row', lift: 'Single-Arm DB Row', each: true, unit: 'each arm', rest: '1:30', est: true,
          detail: 'Knee on bench. Full stretch at the bottom, squeeze at the top. No trunk rotation. Estimate load -- adjust in Settings.',
          plan: [P(3, '10', 0), P(3, '10', 0), P(3, '10', 5), P(3, '8', 0)] },
        { name: 'DB Hammer Curl', lift: 'DB Hammer Curl', each: true, rest: '1:00',
          detail: 'Strict, no swing. Lower for 3 sec.',
          plan: [P(3, '12', 0), P(3, '12', 0), P(3, '10', 5), P(3, '10', 0)] },
      ] },
      { name: 'Core Finisher', kind: 'core', duration: '7 min', color: CORE, items: [
        { name: 'Ab Wheel Rollout', detail: 'Short to medium range. Stop before the hips sag.', sets: '3', reps: '8' },
        { name: 'Suitcase Carry', detail: '60 lb KB or DB. Stand tall, level hips.', sets: '3', reps: '30 m each side' },
      ] },
    ],
  },
  {
    id: 'd5', day: 'Friday', short: 'Fri', label: 'Strength -- Legs', type: 'FULL',
    focus: 'Squat, hinge, single leg',
    equipment: 'Barbell, rack, KB, box, DB, bench',
    totalTime: '70 min',
    sections: [
      { name: 'Warm-Up', kind: 'warmup', duration: '8 min', color: WARM, items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min easy to get blood to the legs.', sets: '', reps: '2 min' },
        { name: "World's Greatest Stretch", detail: 'All three positions, slow.', sets: '1', reps: '5 each side' },
        { name: 'Ankle Dorsiflexion Mob', detail: 'Half-kneeling wall drill. It directly affects squat depth.', sets: '2', reps: '15 each side' },
        { name: 'Glute Bridge with March', detail: '2 sec hold each side, pelvis level.', sets: '2', reps: '10 each side' },
      ] },
      { name: 'Strength Block', kind: 'strength', duration: '50 min', color: STRENGTH, items: [
        { name: 'Barbell Back Squat', lift: 'Barbell Back Squat', rest: '2:30',
          detail: 'Lower about 3 sec, drive up. If your back is tight, drop 10 lb, keep the reps, and note it.',
          active: 'Single-leg balance, 30 sec each leg',
          plan: [P(4, '5', 0), P(4, '4', 5), P(4, '3', 10), P(3, '5', 0)] },
        { name: 'Barbell Romanian Deadlift', lift: 'Barbell Romanian Deadlift', rest: '2:00',
          detail: 'Hinge from the hip, bar stays close to the shins. Feel the hamstrings load, lower about 3 sec.',
          active: 'Bird dog, 10 each side',
          plan: [P(3, '8', 0), P(3, '7', 5), P(3, '6', 10), P(3, '8', 0)] },
        { name: 'DB Bulgarian Split Squat', lift: 'DB Bulgarian Split Squat', each: true, unit: 'each leg', rest: '2:00', est: true,
          detail: 'Rear foot on a bench, front shin vertical at the bottom. Lower 3 sec. Estimate load -- adjust in Settings.',
          active: 'Lateral band walk, 15 each direction',
          plan: [P(3, '8', 0), P(3, '8', 5), P(3, '8', 5), P(3, '8', 0)] },
        { name: 'KB Single-Leg RDL', lift: 'KB Single-Leg RDL', unit: 'each leg', rest: '1:30', est: true,
          detail: 'KB in the opposite hand. Hips stay square. Estimate load -- adjust in Settings.',
          plan: [P(3, '10', 0), P(3, '10', 0), P(3, '10', 5), P(3, '8', 0)] },
        { name: 'Box Jump', fixed: 'Bodyweight', rest: '1:30',
          detail: 'Reset fully between reps, step down. Power, not conditioning.',
          plan: [P(4, '4', 0), P(4, '4', 0), P(4, '4', 0), P(3, '4', 0)] },
      ] },
      { name: 'Core Finisher', kind: 'core', duration: '7 min', color: CORE, items: [
        { name: 'Dead Bug', detail: 'Lower back glued to the floor, 3 sec per rep.', sets: '3', reps: '10 each side' },
        { name: 'Farmer Carry', detail: '60 lb in each hand. Stand tall, shoulders down.', sets: '3', reps: '30 m' },
      ] },
    ],
  },
  {
    id: 'd6', day: 'Saturday', short: 'Sat', label: 'Conditioning -- WOD', type: 'CONDITIONING',
    focus: 'Pick one or more WODs from the library',
    equipment: 'Assault bike, rower, KB, barbell, box, jump rope, wallball, pull-up bar',
    totalTime: 'Up to 60 min',
    sections: [
      { name: 'Warm-Up', kind: 'warmup', duration: '8 min', color: WARM, items: [
        { name: 'Easy Machine Warm-Up', detail: '4 min easy bike or row, heart rate under 120.', sets: '', reps: '4 min' },
        { name: 'Jump Rope', detail: 'Easy singles.', sets: '', reps: '2 min' },
        { name: 'Hip CARs + Shoulder CARs', detail: 'Full controlled range.', sets: '1', reps: '3 each direction' },
        { name: 'Movement Prep', detail: 'Run 2-3 movements from the WOD at very easy effort.', sets: '1', reps: '60 sec' },
      ] },
      { name: 'WOD', kind: 'wod', duration: '10-45 min', color: WODC, items: [] },
    ],
  },
  {
    id: 'd7', day: 'Sunday', short: 'Sun', label: 'Full Rest', type: 'REST',
    focus: 'Recovery before Monday',
    equipment: 'None', totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', kind: 'rest', duration: '', color: REST, items: [
        { name: 'No structured training', detail: 'Arriving fresh on Monday matters more than any extra work today.', sets: '', reps: '' },
        { name: 'Protein and sleep', detail: 'About 1 g protein per lb of bodyweight and 7-9 hours of sleep.', sets: '', reps: '' },
        { name: 'Look at the week', detail: 'Note what felt strong, what felt heavy, and anything to adjust.', sets: '', reps: 'Optional' },
      ] },
    ],
  },
];

export const TYPE_COLORS = {
  FULL: { bg: '#E8500A', text: '#fff' },
  CONDITIONING: { bg: '#B5197A', text: '#fff' },
  REST: { bg: '#5A6472', text: '#fff' },
};
export const TYPE_LABEL = { FULL: 'STRENGTH', CONDITIONING: 'WOD', REST: 'REST' };
export const SECTION_ICONS = {
  'Warm-Up': '🔥', 'Strength Block': '💪', 'WOD': '⚡', 'Core Finisher': '🔩', 'Rest Day Guidelines': '😴',
};

// ---------------------------------------------------------------------------
// HELPERS
// ---------------------------------------------------------------------------
export const slug = function (s) {
  return String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
};
// Log keys use the exercise name, not its position, so reordering never misaligns data.
export const logKey = function (w, d, name) { return 'w' + w + '-' + d + '-' + slug(name); };
export const sessionKey = function (w, d) { return 'session-w' + w + '-' + d; };
export const wodSlotKey = function (w, d) { return 'w' + w + '-' + d; };

export const isLoggedEntry = function (l) {
  return !!(l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes));
};
export const loggableItems = function (day) {
  const out = [];
  day.sections.forEach(function (section) {
    if (section.kind === 'strength') {
      section.items.forEach(function (item) { out.push({ section: section, item: item }); });
    }
  });
  return out;
};

export const getPlan = function (item, w) { return (item.plan && item.plan[w]) || null; };
const fmt = function (n) { return String(Math.round(n * 100) / 100); };

export const getLoad = function (item, w, loads) {
  const plan = getPlan(item, w);
  if (item.lift) {
    const stored = loads && loads[item.lift] != null ? Number(loads[item.lift]) : NaN;
    const base = isNaN(stored) ? DEFAULT_LOADS[item.lift] : stored;
    const num = base + (plan ? plan.add : 0);
    return { num: num, text: fmt(num) + ' lb' + (item.each ? ' each' : '') };
  }
  return { num: null, text: item.fixed || '' };
};
export const rxText = function (item, w, loads) {
  const plan = getPlan(item, w);
  if (!plan) return '';
  const load = getLoad(item, w, loads);
  return plan.s + ' x ' + plan.r + (item.unit ? ' ' + item.unit : '') + (load.text ? ' @ ' + load.text : '');
};
export const repsPlaceholder = function (item, w) {
  const plan = getPlan(item, w);
  if (!plan) return '5,5,5';
  const first = String(plan.r).split('-')[0];
  return new Array(plan.s).fill(first).join(',');
};

// ---------------------------------------------------------------------------
// WOD LIBRARY (30). Kettlebells owned: 35 lb and 53 lb.
// ---------------------------------------------------------------------------
export const WOD_CATEGORIES = {
  A: { label: 'Category A', subtitle: 'Short and High Burst', duration: '10-15 min', color: '#E8500A', description: 'Pure intensity. Maximum effort, full recovery between rounds.' },
  B: { label: 'Category B', subtitle: 'Medium and Medium Burst', duration: '20-30 min', color: '#B5197A', description: 'Mixed modal. Uncomfortable but sustainable pace.' },
  C: { label: 'Category C', subtitle: 'Longer and Light Burst', duration: '35-45 min', color: '#1D5FA8', description: 'Aerobic base. Heart rate controlled, full range of motion.' },
};

export const WOD_LIBRARY = {
  A: [
    { id: 'A1', name: 'Tabata Assault', duration: '12 min', description: '20 sec on / 10 sec off x 8 rounds per movement. Rest 1 min between movements.', movements: ['Assault Bike: 8 rounds Tabata (record calories each round)', 'KB Swing 53 lb: 8 rounds Tabata', 'Jump Rope: 8 rounds Tabata (max reps)'], scoring: 'Total bike calories, KB swings, jump rope reps' },
    { id: 'A2', name: '500m Sprint x3', duration: '15 min', description: '3 rounds. Each round is an all-out 500 m row. Rest exactly 2 min between rounds.', movements: ['Row 500 m, maximum effort (record the split)', 'Rest 2 min exactly'], scoring: '500 m time each round. Aim for splits within 5 sec of each other' },
    { id: 'A3', name: 'EMOM 12', duration: '12 min', description: 'Every minute on the minute for 12 minutes, alternating movements. The rest of each minute is recovery.', movements: ['Odd minutes: 10 Box Jumps', 'Even minutes: 15 KB Swings 53 lb'], scoring: 'Finish all 12 rounds. Scale if reps take over 45 sec by round 6' },
    { id: 'A4', name: 'Death by Bike', duration: '10-15 min', description: 'Minute 1: 1 calorie. Minute 2: 2 calories. Add 1 calorie each minute until you cannot finish a round.', movements: ['Assault Bike: add 1 calorie per minute', 'Rest is whatever is left of each minute'], scoring: 'Last round completed' },
    { id: 'A5', name: 'KB Complex Sprint', duration: '12 min', description: '4 rounds for time. Rest 60 sec between rounds.', movements: ['10 KB Swings 53 lb', '10 KB Goblet Squats 53 lb', '10 KB High Pulls 35 lb'], scoring: 'Total time. Target under 10 min' },
    { id: 'A6', name: 'Jump Rope AMRAP', duration: '10 min', description: 'AMRAP 10 minutes.', movements: ['30 Jump Rope singles (or 15 double unders)', '10 Burpees', '10 Box Jumps'], scoring: 'Total rounds and reps' },
    { id: 'A7', name: 'Rower KB Ladder', duration: '15 min', description: '5 round descending ladder. Move straight from one movement to the next.', movements: ['Round 1: Row 250 m + 20 KB Swings', 'Round 2: Row 200 m + 16 KB Swings', 'Round 3: Row 150 m + 12 KB Swings', 'Round 4: Row 100 m + 8 KB Swings', 'Round 5: Row 50 m + 4 KB Swings'], scoring: 'Total time' },
    { id: 'A8', name: 'Bike Wallball Sprint', duration: '12 min', description: '6 rounds for time. Rest 30 sec between rounds.', movements: ['10 calories Assault Bike (sprint)', '10 Wallball 20 lb'], scoring: 'Total time excluding rest. Target under 9 min' },
    { id: 'A9', name: 'The 300', duration: '15 min', description: 'For time. 300 reps total, broken up as needed.', movements: ['100 KB Swings 35 lb', '100 Jump Rope singles', '100 KB Swings 35 lb'], scoring: 'Total time. Target under 12 min' },
    { id: 'A10', name: 'EMOM Ascending', duration: '10 min', description: 'EMOM 10. Add 1 box jump each minute, starting at 5.', movements: ['Minute 1: 5 Box Jumps + 10 KB Swings', 'Minute 2: 6 Box Jumps + 10 KB Swings', 'Keep adding 1 box jump each minute through minute 10'], scoring: 'Finish all 10 rounds. Note any missed rounds' },
  ],
  B: [
    { id: 'B1', name: 'Cindy', duration: '20 min', description: 'AMRAP 20 minutes. The classic benchmark.', movements: ['5 Pull-Ups (strict)', '10 Push-Ups', '15 Air Squats'], scoring: 'Total rounds and reps. Note pull-up quality' },
    { id: 'B2', name: 'Barbell Cycling', duration: '25 min', description: '5 rounds for time with 95 lb. Rest 90 sec between rounds.', movements: ['7 Deadlifts 95 lb', '7 Hang Power Cleans 95 lb', '7 Front Squats 95 lb', '7 Push Press 95 lb'], scoring: 'Total time. Scale the load if form breaks' },
    { id: 'B3', name: 'Row Push Pull', duration: '30 min', description: '4 rounds for time. Rest 90 sec between rounds.', movements: ['Row 500 m', '15 Pull-Ups (strict or scaled)', '20 Push-Ups', '15 DB Renegade Rows 35 lb each'], scoring: 'Total time. Note pull-up breakdown per round' },
    { id: 'B4', name: 'Wallball Assault', duration: '25 min', description: '5 rounds. Rest equals work time between rounds.', movements: ['20 Wallball 20 lb', '15 calories Assault Bike', '20 KB Goblet Squats 53 lb', '15 Box Jumps'], scoring: 'Time for each round. Aim for consistent splits' },
    { id: 'B5', name: 'The Grind', duration: '30 min', description: 'AMRAP 30 minutes at a sustainable pace, RPE 6-7 throughout.', movements: ['10 Pull-Ups', '20 KB Swings 53 lb', '30 Jump Rope singles', '20 cal Assault Bike or 400 m Row'], scoring: 'Total rounds. You should be able to talk in short sentences' },
    { id: 'B6', name: 'Thruster Row 21-15-9', duration: '25 min', description: '21-15-9 for time. A sprint.', movements: ['Barbell Thrusters 75 lb: 21, then 15, then 9', 'Row calories: 21, then 15, then 9'], scoring: 'Total time' },
    { id: 'B7', name: 'Chipper', duration: '30 min', description: 'For time. Finish all reps of a movement before moving on. Phase 1 benchmark: 18:57.', movements: ['50 Jump Rope singles', '40 KB Swings 53 lb', '30 Box Jumps', '20 Pull-Ups', '10 Barbell Thrusters 95 lb', '20 Pull-Ups', '30 Box Jumps', '40 KB Swings', '50 Jump Rope singles'], scoring: 'Total time. Note pull-up style (strict or kipping) so retests compare fairly' },
    { id: 'B8', name: 'Every 3 Min', duration: '24 min', description: 'Every 3 minutes for 8 rounds, alternating A and B. Rest is what is left of each window.', movements: ['Round A: 15 cal Assault Bike + 10 Wallball', 'Round B: 250 m Row + 10 DB Renegade Rows 35 lb'], scoring: 'Note any round that took longer than 3 min. Aim for about 90 sec rest' },
    { id: 'B9', name: 'KB Jump Rope Ladder', duration: '25 min', description: '10 to 1 descending ladder for time.', movements: ['KB Swings 53 lb: 10 down to 1', 'Goblet Squats 53 lb: 10 down to 1', '10 Jump Rope singles after every round'], scoring: 'Total time. Target under 20 min' },
    { id: 'B10', name: 'Push Pull Circuit', duration: '30 min', description: '3 rounds for time. Each superset back to back. Rest 90 sec between rounds.', movements: ['10 Barbell Push Press 95 lb + 10 Pull-Ups', '15 Push-Ups + 15 DB Rows 40 lb each', '20 Wallball + 20 KB Swings 35 lb'], scoring: 'Total time. Note pull-up quality each round' },
  ],
  C: [
    { id: 'C1', name: 'Steady State Pyramid', duration: '40 min', description: 'Low intensity aerobic work. Keep heart rate under 140. Slow down if it climbs.', movements: ['10 min Assault Bike easy (60-70%)', '10 min Row easy (18-20 spm)', '10 min Assault Bike (70-75%)', '10 min Row moderate (22-24 spm)'], scoring: 'Total bike calories and rower meters' },
    { id: 'C2', name: 'Carry and Breathe', duration: '45 min', description: 'Alternating carries and breathing resets at a deliberate pace.', movements: ['3 rounds: Farmer Carry 40 m (60 lb each) + 10 Crocodile Breaths + Suitcase Carry 40 m (60 lb) + 10 Crocodile Breaths', '15 min easy Assault Bike to finish'], scoring: 'Carry weights. Note posture and breathing quality' },
    { id: 'C3', name: 'Aerobic Flow', duration: '40 min', description: 'Continuous movement at RPE 5-6, heart rate 120-135.', movements: ['5 min Row', '5 min Assault Bike', '5 min Jump Rope easy singles', '5 min Row', '5 min Assault Bike', '5 min Jump Rope', '10 min Assault Bike easy'], scoring: 'Total calories and meters' },
    { id: 'C4', name: 'Mobility Conditioning', duration: '45 min', description: 'Easy cardio alternating with active mobility. A recovery session.', movements: ['8 min Assault Bike easy', '5 min: Hip CARs + World Greatest Stretch + 90/90 flow', '8 min Row easy', '5 min: Shoulder CARs + Thread the Needle + Childs Pose', '8 min Assault Bike moderate', '5 min: Pigeon Pose + Frog Stretch + Crocodile Breathing'], scoring: 'Bike and row output. Do not push' },
    { id: 'C5', name: 'TGU Flow', duration: '40 min', description: 'Turkish Get-Up skill work with easy cardio.', movements: ['5 min easy Row', '5 min Turkish Get-Ups 26 lb, unhurried', '5 min easy Assault Bike', '5 min Turkish Get-Ups', '5 min easy Row', '5 min Turkish Get-Ups', '10 min easy Assault Bike'], scoring: 'TGU reps per block and bike/row output' },
    { id: 'C6', name: 'Long Slow Row', duration: '40 min', description: '30 min continuous rowing at a controlled pace.', movements: ['30 min continuous Row at 2:10-2:20 per 500 m', '10 min easy Assault Bike'], scoring: 'Total meters. Target 6500-7000 m' },
    { id: 'C7', name: 'Carries and Cardio', duration: '45 min', description: 'Loaded carries alternating with easy machine work.', movements: ['5 min Assault Bike easy', 'Farmer Carry 50 m, 60 lb each, x 4', '5 min Row easy', 'Suitcase Carry 50 m each side, 60 lb, x 4', '5 min Assault Bike easy', 'Overhead Carry 30 m each side, 25 lb plate, x 4', '5 min easy cool down'], scoring: 'Carry weights. Note any posture breakdown' },
    { id: 'C8', name: 'Zone 2', duration: '40 min', description: 'True Zone 2. Heart rate 120-135 the whole time. If you cannot hold a conversation, slow down.', movements: ['20 min Assault Bike at Zone 2', '20 min Row at Zone 2'], scoring: 'Average heart rate if you have it, plus total output' },
    { id: 'C9', name: 'Jump Rope Skill', duration: '40 min', description: 'Jump rope skill work combined with easy machine work.', movements: ['3 rounds: 3 min singles easy + 10 min Assault Bike easy', 'Between rounds: 2 min practice on double unders or speed singles', '10 min easy Row to finish'], scoring: 'Jump rope progress plus bike and row output' },
    { id: 'C10', name: 'Active Recovery', duration: '45 min', description: 'The easiest conditioning session. Use it on high fatigue weeks.', movements: ['15 min easy Assault Bike (60% effort)', '5 min hip and spine mobility flow', '15 min easy Row (60% effort)', '10 min: light Suitcase Carry + Crocodile Breathing + Pigeon Pose'], scoring: 'Output only. RPE never above 5' },
  ],
};

export const WOD_ROTATION = [
  { d2: 'A', d6: 'B' },
  { d2: 'C', d6: 'A' },
  { d2: 'B', d6: 'C' },
  { d2: 'A', d6: 'B' },
];
export const getSuggestedCategory = function (weekIdx, dayId) {
  const r = WOD_ROTATION[weekIdx] || WOD_ROTATION[0];
  return r[dayId] || 'A';
};
