// ─── APP VERSION ──────────────────────────────────────────────────────────────
// Bump this to clear old training logs on first load
export const APP_VERSION = '2.0';

// ─── STARTING LOADS ──────────────────────────────────────────────────────────
// Defaults -- editable in Settings
export const DEFAULT_LOADS = {
  'Barbell Overhead Press': 100,
  'Barbell Bench Press': 145,
  'Barbell Back Squat': 160,
  'Barbell Romanian Deadlift': 165,
  'Barbell Bent-Over Row': 125,
  'DB Incline Press': 45,
  'DB Bulgarian Split Squat': 20,
  'Pull-Up': 0,
};

// ─── PHASE 1 WEEK NOTES ───────────────────────────────────────────────────────
export const WEEK_NOTES = [
  {
    week: 'Week 1', theme: 'Learn the patterns',
    note: 'New split, new movement combinations. Use the starting loads from Settings -- conservative is correct here. Log every weight and RPE. This week is about establishing your baseline, not impressing yourself.',
    focus: ['Hit all 5 sessions', 'Log every exercise', 'RPE target 6-7 on all primary lifts'],
  },
  {
    week: 'Week 2', theme: 'Add load',
    note: 'Add 5lbs to all primary barbell lifts if Week 1 felt controlled at RPE 7 or below. If any lift hit RPE 8+, hold that load and focus on technique. Conditioning: try to beat your Week 1 WOD scores.',
    focus: ['+5lbs on primary lifts where RPE allows', 'Beat Week 1 WOD scores', 'Pull-up reps should feel more controlled'],
  },
  {
    week: 'Week 3', theme: 'Increase volume',
    note: 'Add 1 set to every Strength Block exercise. Loads stay at Week 2 levels. This is the overload week -- protect your sleep and hit your protein target.',
    focus: ['+1 set on all Strength Block exercises', 'Loads stay at Week 2 levels', 'Same WOD intensity -- volume is already high'],
  },
  {
    week: 'Week 4', theme: 'Deload',
    note: 'Sets return to Week 1-2 baseline. Loads stay at Week 3 levels. This is not going backwards -- the adaptation from Week 3 consolidates here. Use this week to assess what improved.',
    focus: ['Sets return to baseline', 'Loads stay at Week 3 levels', 'Assess: what is stronger? What needs work?'],
  },
];

// ─── PHASE 1 DAYS ─────────────────────────────────────────────────────────────
export const DAYS = [
  {
    id: 'd1', day: 'Monday', label: 'Strength -- Push', type: 'FULL',
    focus: 'Chest, Shoulders, Triceps + Pull-Up superset',
    equipment: 'Barbell, rack, incline bench, DB, KB, pull-up bar, bands',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min easy -- nasal breathing only, heart rate below 120', sets: '', reps: '2 min' },
        { name: 'Shoulder CARs', detail: 'Biggest controlled circle possible. Both arms separately. Extremely slow.', sets: '2', reps: '5 each direction' },
        { name: 'Band Pull-Aparts', detail: '3 variations -- arms high, mid, low. Retract scapulae at end range.', sets: '2', reps: '15 each variation' },
        { name: 'Wall Slides', detail: 'All contact points maintained throughout. Only go as high as you can keep contact.', sets: '2', reps: '10' },
        { name: 'Dead Hang', detail: 'Full passive hang from pull-up bar. Decompress spine and prepare shoulder capsule.', sets: '2', reps: '20 sec' },
      ]},
      { name: 'Strength Block', duration: '52 min', color: '#E8500A', items: [
        { name: 'Barbell Overhead Press + Pull-Up Superset', detail: 'OHP: Standing, ribs down, 3-sec press, 2-sec lower, full lockout. Immediately do strict pull-ups -- dead hang start, chin over bar, 3-sec descent. Rest 2:30 after both. See starting load in Settings.', sets: '4', reps: '5 OHP + 3 Pull-Ups', rest: '2:30', stability: 'Face Pull w/ External Rotation 15 reps between supersets' },
        { name: 'Barbell Bench Press', detail: 'Tempo 3-1-2. Scapulae retracted and depressed on bench throughout. 3-sec descent, 1-sec pause on chest, 2-sec press. See starting load in Settings.', sets: '4', reps: '5', rest: '2:30', stability: 'Prone Cobra 10 reps 3-sec hold' },
        { name: 'DB Incline Press', detail: 'Bench at 30-45 degrees. Tempo 3-1-2. Elbows at 45 degrees to torso -- not flared. See starting load in Settings.', sets: '3', reps: '8', rest: '2:00', stability: 'Y-T-W Raises 8 each at 5lbs' },
        { name: 'DB Lateral Raise', detail: 'Controlled -- 3-sec up, 3-sec down. Slight forward lean. Stop at shoulder height.', sets: '3', reps: '10', rest: '1:30', stability: null },
        { name: 'Band Tricep Pushdown', detail: 'Full extension at bottom. Controlled return. Band at face height.', sets: '3', reps: '12', rest: '1:00', stability: null },
      ]},
      { name: 'Core Finisher', duration: '7 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: 'Half-kneeling. Purple band. 2-sec hold at full extension. Resist the rotation -- brace before pressing.', sets: '3', reps: '10 each side' },
        { name: 'Plank Shoulder Taps', detail: 'Hips completely still -- this is the entire point. Slow deliberate taps.', sets: '3', reps: '12 each side' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Supported Chest Opener', detail: 'Arms in goalpost position on floor. Gravity opens the chest -- do not force it.', sets: '', reps: '90 sec' },
        { name: 'Doorway Chest Stretch', detail: '3 heights -- low, mid, high. 30 sec at each.', sets: '', reps: '30 sec each height' },
        { name: 'Crocodile Breathing', detail: 'Belly into floor. 360 degree rib expansion on inhale. Full parasympathetic reset.', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd2', day: 'Tuesday', label: 'Conditioning -- WOD', type: 'CONDITIONING',
    focus: 'WOD selected from library -- Category A suggested (Week 1)',
    equipment: 'Assault bike, rower, KB, barbell, box, jump rope, wallball, pull-up bar',
    totalTime: '60 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Easy Machine Warm-Up', detail: '4 min easy row or bike. Heart rate below 120bpm. Breathing through nose the whole time.', sets: '', reps: '4 min' },
        { name: 'Jump Rope', detail: 'Easy singles -- get the rhythm, not the intensity', sets: '', reps: '2 min' },
        { name: 'Hip CARs + Shoulder CARs', detail: '3 each direction per joint. Full controlled range.', sets: '1', reps: '3 each direction' },
        { name: 'Movement Prep', detail: 'Run through 2-3 movements from today\'s WOD at very easy effort', sets: '1', reps: '60 sec' },
      ]},
      { name: 'WOD', duration: '35-45 min', color: '#B5197A',
        note: 'Select your WOD from the WODs tab or use the selector below. The app suggests a category based on the weekly rotation. Log your score and how it felt in the notes field.',
        items: [
          { name: 'WOD -- Select from WODs Tab', detail: 'Go to the WODs tab to browse all 30 workouts and assign one to today. Your selected WOD will appear here. Record your score in the log.', sets: '', reps: 'See WOD' },
        ],
      },
      { name: 'Cool-Down', duration: '10 min', color: '#7C3ACA', items: [
        { name: 'Easy Bike or Row', detail: 'Very easy -- breathing normalisation only. Do not stop abruptly after high intensity work.', sets: '', reps: '5 min' },
        { name: 'Full Body Stretch', detail: 'Pigeon pose 60 sec each, frog stretch 60 sec, child\'s pose with lat reach 60 sec each side', sets: '', reps: '5 min' },
      ]},
    ],
  },
  {
    id: 'd3', day: 'Wednesday', label: 'Full Rest', type: 'REST',
    focus: 'Complete recovery -- mandatory between hard training days',
    equipment: 'None',
    totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', duration: '', color: '#5A6472', items: [
        { name: 'No structured training', detail: 'Wednesday sits between two heavy training days. This rest is not optional -- it is what allows Thursday to be productive.', sets: '', reps: '' },
        { name: 'Protein priority', detail: 'Aim 1g per lb bodyweight today -- 190g. Replenish glycogen from Monday and Tuesday.', sets: '', reps: '' },
        { name: 'Sleep first', detail: 'If you can get an extra 30-60 min tonight, take it. GH peaks during deep sleep -- this is when adaptation happens.', sets: '', reps: '' },
        { name: 'Light walking only', detail: '20-30 min easy walk is beneficial. Nothing more structured.', sets: '', reps: '' },
        { name: 'Optional breathing', detail: '5-10 min 90/90 diaphragmatic breathing if you feel tight or stressed. Nothing else.', sets: '', reps: 'Optional' },
      ]},
    ],
  },
  {
    id: 'd4', day: 'Thursday', label: 'Strength -- Pull', type: 'FULL',
    focus: 'Back, Biceps + Pull-Up volume priority',
    equipment: 'Barbell, pull-up bar, DB, KB, bands, rower',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Rower Easy Pull', detail: '2 min easy -- focus on hip hinge drive. Breathing through nose.', sets: '', reps: '2 min' },
        { name: 'Band Pull-Aparts', detail: '3 variations. Posterior shoulder prime before heavy pulling.', sets: '2', reps: '15 each' },
        { name: 'Dead Hang', detail: 'Full passive hang -- decompress and prepare shoulder capsule', sets: '2', reps: '20 sec' },
        { name: 'Thoracic Rotation Side-Lying', detail: '3-sec hold at open position each rep. Spine prep for rowing.', sets: '2', reps: '8 each side' },
        { name: 'Dead Bug', detail: 'Activation only -- 5 slow reps each side. Lower back pressed down.', sets: '1', reps: '5 each side' },
      ]},
      { name: 'Strength Block', duration: '52 min', color: '#E8500A', items: [
        { name: 'Pull-Up -- Volume Priority', detail: 'Dead hang start. Chin clearly over bar. 3-sec controlled descent. Stop 2 reps short of failure EVERY set -- never grind to failure. Target: add 1 rep per set each week. When you hit 8 clean reps per set, start adding weight.', sets: '5', reps: '3-5 strict BW', rest: '2:30', stability: 'Face Pull w/ External Rotation 15 reps between sets' },
        { name: 'Barbell Bent-Over Row', detail: 'Tempo 3-1-2. 45 degree hinge, pull to lower rib, 2-sec lower. Start at 125lbs -- this is intentionally conservative to protect your lower back. Build the pattern before adding load. See Settings for your load.', sets: '4', reps: '5', rest: '2:30', stability: 'Plank Shoulder Taps 12 each side' },
        { name: 'Barbell RDL to Pendlay Row', detail: 'NEW MOVEMENT: Hinge into RDL position with bar just below knee. Pause. Then row the bar to lower rib with a powerful pull. Lower bar completely to floor between reps. Start 95lbs -- pattern before load.', sets: '3', reps: '6', rest: '2:00', stability: null },
        { name: 'Single-Arm DB Row', detail: 'Tempo 3-1-2. Knee on bench. Full stretch at bottom, strong scapular retraction at top. No trunk rotation.', sets: '3', reps: '10 each side', rest: '1:30', stability: null },
        { name: 'DB Hammer Curl', detail: 'Strict -- no swing. Controlled 3-sec descent. Neutral grip throughout.', sets: '3', reps: '10', rest: '1:00', stability: null },
      ]},
      { name: 'Core Finisher', duration: '7 min', color: '#1D5FA8', items: [
        { name: 'Ab Wheel Rollout', detail: 'Short to medium range. Spine neutral -- stop before hips sag or lower back arches.', sets: '3', reps: '8' },
        { name: 'Suitcase Carry', detail: '60lbs KB. 30m each side. Tall spine, level hips -- do not lean toward or away from the weight.', sets: '3', reps: '30m each' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Doorway Lat Stretch', detail: 'Hip hinge away from the support arm. Feel the lat lengthen.', sets: '', reps: '60 sec each' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides. Breathe into the stretch.', sets: '', reps: '90 sec each' },
        { name: 'Crocodile Breathing', detail: 'Final reset. Full parasympathetic recovery.', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd5', day: 'Friday', label: 'Strength -- Legs', type: 'FULL',
    focus: 'Squat, Hinge, Single Leg -- posterior chain emphasis',
    equipment: 'Barbell, rack, KB, box, DB, bench',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min easy -- nasal breathing, get blood moving to the legs', sets: '', reps: '2 min' },
        { name: 'Turkish Get-Up', detail: 'BW or very light KB (26lbs max). Every transition deliberate. Spine warm-up and stability primer for the session.', sets: '2', reps: '2 each side' },
        { name: "World's Greatest Stretch", detail: 'All 3 positions slow -- hip flexor, hamstring, thoracic rotation. Do not rush this.', sets: '1', reps: '5 each side' },
        { name: 'Ankle Dorsiflexion Mob', detail: 'Half-kneeling wall drill. Drive knee forward keeping heel down. Directly affects squat depth -- do not skip.', sets: '2', reps: '15 each side' },
        { name: 'Glute Bridge with March', detail: '2-sec hold each side. Pelvis level throughout.', sets: '2', reps: '10 each side' },
      ]},
      { name: 'Strength Block', duration: '52 min', color: '#E8500A', items: [
        { name: 'Barbell Back Squat', detail: 'Tempo 3-1-2. 3-sec descent, 1-sec pause at bottom (eliminates stretch reflex), 2-sec drive up. See starting load in Settings.', sets: '4', reps: '5', rest: '2:30', stability: 'Single-Leg Balance Hold 30 sec each leg -- eyes closed' },
        { name: 'Barbell Romanian Deadlift', detail: 'Tempo 3-1-1. Hinge from hip, bar stays close to shins. Feel the hamstring load at the bottom. See starting load in Settings.', sets: '3', reps: '8', rest: '2:00', stability: 'Bird Dog 10 each side' },
        { name: 'DB Bulgarian Split Squat', detail: 'Rear foot elevated on bench. Front foot forward enough that shin stays vertical at bottom. 3-sec descent. See starting load in Settings.', sets: '3', reps: '8 each leg', rest: '2:00', stability: 'Lateral Band Walk 15 each direction' },
        { name: 'Single-Leg RDL', detail: 'KB in opposite hand. 3-sec descent. Hip square throughout -- do not let the free hip open.', sets: '3', reps: '10 each leg', rest: '1:30', stability: null },
        { name: 'Box Jump', detail: 'Full reset between reps -- 10 sec minimum. Step down controlled. Power focus -- not conditioning.', sets: '4', reps: '4', rest: '1:30', stability: null },
      ]},
      { name: 'Core Finisher', duration: '7 min', color: '#1D5FA8', items: [
        { name: 'Dead Bug', detail: 'Lower back glued to floor. Exhale fully before lowering. 3 sec per rep. Slow and controlled.', sets: '3', reps: '10 each side' },
        { name: 'Farmer Carry', detail: '60lbs each hand. 30m. Tall spine, shoulders packed down and back.', sets: '3', reps: '30m' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Pigeon Pose', detail: 'Passive hold -- let gravity work entirely. Breathe into the hip.', sets: '', reps: '90 sec each' },
        { name: 'Frog Stretch', detail: 'Passive hold. Breathe the groin open.', sets: '', reps: '60 sec' },
        { name: 'Crocodile Breathing', detail: 'Final parasympathetic reset to close the session.', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd6', day: 'Saturday', label: 'Conditioning -- WOD', type: 'CONDITIONING',
    focus: 'WOD selected from library -- different category from Tuesday',
    equipment: 'Assault bike, rower, KB, barbell, box, jump rope, wallball, pull-up bar',
    totalTime: '60 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Easy Machine Warm-Up', detail: '4 min easy bike or row. Heart rate below 120bpm.', sets: '', reps: '4 min' },
        { name: 'Jump Rope', detail: 'Easy singles to get rhythm', sets: '', reps: '2 min' },
        { name: 'Hip CARs + Shoulder CARs', detail: '3 each direction per joint. Full controlled range.', sets: '1', reps: '3 each direction' },
        { name: 'Movement Prep', detail: 'Run through WOD movements at easy effort', sets: '1', reps: '60 sec' },
      ]},
      { name: 'WOD', duration: '35-45 min', color: '#B5197A',
        note: 'Saturday category rotates opposite to Tuesday. Go to the WODs tab to select your workout. Log your score and round times.',
        items: [
          { name: 'WOD -- Select from WODs Tab', detail: 'Go to the WODs tab to browse all 30 workouts and assign one to today. Record your score in the log.', sets: '', reps: 'See WOD' },
        ],
      },
      { name: 'Cool-Down', duration: '10 min', color: '#7C3ACA', items: [
        { name: 'Easy Bike or Row', detail: 'Breathing normalisation -- 5 min easy. Do not stop abruptly.', sets: '', reps: '5 min' },
        { name: 'Full Body Stretch', detail: 'Hip flexors, hamstrings, shoulders, lats. Focus on whatever is tight.', sets: '', reps: '5 min' },
      ]},
    ],
  },
  {
    id: 'd7', day: 'Sunday', label: 'Full Rest', type: 'REST',
    focus: 'Complete recovery -- prepare for Monday',
    equipment: 'None',
    totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', duration: '', color: '#5A6472', items: [
        { name: 'No structured training', detail: 'Sunday rest prepares you for Monday push day. Arriving fresh to Monday matters more than any extra work today.', sets: '', reps: '' },
        { name: 'Protein and sleep', detail: '1g per lb bodyweight protein. 7-9 hours sleep. These two factors drive more adaptation than any additional session could.', sets: '', reps: '' },
        { name: 'Light walking only', detail: '20-30 min easy walk is beneficial. Nothing more.', sets: '', reps: '' },
        { name: 'Review the week', detail: 'Look at your logs from Mon-Sat. Note what felt strong, what felt heavy, anything to adjust for next week.', sets: '', reps: 'Optional' },
      ]},
    ],
  },
];

// ─── WEEK SET ADJUSTMENT ──────────────────────────────────────────────────────
export const TRAINING_SET_SECTIONS = ['Strength Block', 'Core Finisher'];

export const getWeekSets = (item, sectionName, weekIdx) => {
  const base = parseInt(item.sets, 10);
  if (!base || isNaN(base)) return item.sets || '--';
  if (!TRAINING_SET_SECTIONS.includes(sectionName)) return String(base);
  if (weekIdx === 2) return String(base + 1);
  return String(base);
};

// ─── STORAGE KEYS ─────────────────────────────────────────────────────────────
export const logKey = (p, w, d, si, ii) => 'p' + p + '-w' + w + '-' + d + '-s' + si + '-i' + ii;
export const sessionKey = (p, w, d) => 'p' + p + '-session-w' + w + '-' + d;
export const wodKey = (p, w, d) => 'p' + p + '-wod-w' + w + '-' + d;

// ─── TYPE COLORS + ICONS ──────────────────────────────────────────────────────
export const TYPE_COLORS = {
  FULL: { bg: '#E8500A', text: '#fff' },
  CONDITIONING: { bg: '#B5197A', text: '#fff' },
  REST: { bg: '#5A6472', text: '#fff' },
};

export const SECTION_ICONS = {
  'Warm-Up': '🔥',
  'Strength Block': '💪',
  'WOD': '⚡',
  'Core Finisher': '🔩',
  'Cool-Down': '🌊',
  'Rest Day Guidelines': '😴',
};

// ─── WOD LIBRARY ─────────────────────────────────────────────────────────────
export const WOD_CATEGORIES = {
  A: { label: 'Category A', subtitle: 'Short & High Burst', duration: '10-15 min', color: '#E8500A', description: 'Pure intensity. Maximum effort, full recovery between rounds.' },
  B: { label: 'Category B', subtitle: 'Medium & Medium Burst', duration: '20-30 min', color: '#B5197A', description: 'Mixed modal. Uncomfortable but sustainable pace.' },
  C: { label: 'Category C', subtitle: 'Longer & Light Burst', duration: '35-45 min', color: '#1D5FA8', description: 'Aerobic base. Heart rate controlled, full range of motion.' },
};

export const WOD_LIBRARY = {
  A: [
    { id: 'A1', name: 'Tabata Assault', duration: '12 min', description: '20 sec on / 10 sec off x 8 rounds each movement. Rest 1 min between movements.', movements: ['Assault Bike -- 8 rounds Tabata (record calories each round)', 'KB Swing 53lbs -- 8 rounds Tabata', 'Jump Rope -- 8 rounds Tabata (max reps)'], scoring: 'Record total calories on bike, total KB swings, total jump rope reps' },
    { id: 'A2', name: '500m Sprint x3', duration: '15 min', description: '3 rounds. Each round is a 500m all-out row sprint. Rest exactly 2 min between rounds.', movements: ['Row 500m -- maximum effort (record split time each round)', 'Rest 2 min exactly'], scoring: 'Record 500m split time each round. Target: splits within 5 sec of each other' },
    { id: 'A3', name: 'EMOM 12', duration: '12 min', description: 'Every Minute On the Minute for 12 min. Alternate movements. Remainder of each minute is rest.', movements: ['Odd minutes: 10 Box Jumps (full hip extension, step down)', 'Even minutes: 15 KB Swings 53lbs'], scoring: 'Complete all 12 rounds. Scale if you cannot finish reps in under 45 sec by round 6' },
    { id: 'A4', name: 'Death by Bike', duration: '10-15 min', description: 'Minute 1: 1 calorie. Minute 2: 2 calories. Add 1 calorie each minute until you cannot complete the round.', movements: ['Assault Bike -- add 1 calorie per minute', 'Rest is whatever is left of each minute'], scoring: 'Record the last round you completed successfully' },
    { id: 'A5', name: 'KB Complex Sprint', duration: '12 min', description: '4 rounds for time. All KB movements unbroken within each round. Rest 60 sec between rounds.', movements: ['10 KB Swings 53lbs', '10 KB Goblet Squats 53lbs', '10 KB High Pulls 53lbs', 'Rest 60 sec'], scoring: 'Record total time. Target sub 10 min' },
    { id: 'A6', name: 'Jump Rope AMRAP', duration: '10 min', description: 'AMRAP 10 minutes. As many rounds as possible.', movements: ['30 Jump Rope singles (or 15 double unders)', '10 Burpees', '10 Box Jumps'], scoring: 'Record total rounds and reps' },
    { id: 'A7', name: 'Rower KB Ladder', duration: '15 min', description: '5 rounds descending ladder. Move immediately between movements.', movements: ['Round 1: Row 250m + 20 KB Swings', 'Round 2: Row 200m + 16 KB Swings', 'Round 3: Row 150m + 12 KB Swings', 'Round 4: Row 100m + 8 KB Swings', 'Round 5: Row 50m + 4 KB Swings'], scoring: 'Record total time' },
    { id: 'A8', name: 'Bike Wallball Sprint', duration: '12 min', description: '6 rounds for time. Rest 30 sec between rounds.', movements: ['10 calories Assault Bike (sprint)', '10 Wallball 20lbs', 'Rest 30 sec'], scoring: 'Record total time excluding rest. Target sub 9 min' },
    { id: 'A9', name: 'The 300', duration: '15 min', description: 'For time -- 300 reps total broken as needed.', movements: ['100 KB Swings 44lbs', '100 Jump Rope singles', '100 KB Swings 44lbs'], scoring: 'Record total time. Target sub 12 min' },
    { id: 'A10', name: 'EMOM Ascending', duration: '10 min', description: 'EMOM 10. Each minute add 1 box jump rep starting at 5.', movements: ['Minute 1: 5 Box Jumps + 10 KB Swings', 'Minute 2: 6 Box Jumps + 10 KB Swings', 'Continue adding 1 box jump each minute through minute 10'], scoring: 'Complete all 10 rounds. Record any missed rounds' },
  ],
  B: [
    { id: 'B1', name: 'Cindy', duration: '20 min', description: 'AMRAP 20 minutes. The classic CrossFit benchmark.', movements: ['5 Pull-Ups (strict)', '10 Push-Ups', '15 Air Squats'], scoring: 'Record total rounds and reps. Note pull-up quality -- strict only' },
    { id: 'B2', name: 'Barbell Cycling', duration: '25 min', description: '5 rounds for time. All barbell at 95lbs. Rest 90 sec between rounds.', movements: ['7 Deadlifts 95lbs', '7 Hang Power Cleans 95lbs', '7 Front Squats 95lbs', '7 Push Press 95lbs', 'Rest 90 sec'], scoring: 'Record total time. Scale load if form breaks' },
    { id: 'B3', name: 'Row Push Pull', duration: '30 min', description: '4 rounds for time. Rest 90 sec between rounds.', movements: ['Row 500m', '15 Pull-Ups (strict or scale)', '20 Push-Ups', '15 DB Renegade Rows 35lbs each'], scoring: 'Record total time. Note pull-up breakdown per round' },
    { id: 'B4', name: 'Wallball Assault', duration: '25 min', description: '5 rounds. Rest 1:1 work to rest.', movements: ['20 Wallball 20lbs', '15 calories Assault Bike', '20 KB Goblet Squats 53lbs', '15 Box Jumps'], scoring: 'Record time for each round. Target consistent splits' },
    { id: 'B5', name: 'The Grind', duration: '30 min', description: 'AMRAP 30 minutes at sustainable pace. RPE 6-7 throughout -- never push hard.', movements: ['10 Pull-Ups', '20 KB Swings 53lbs', '30 Jump Rope singles', '20 cal Assault Bike or 400m Row'], scoring: 'Record total rounds. Pace allows conversation' },
    { id: 'B6', name: 'Thruster Row 21-15-9', duration: '25 min', description: '21-15-9 rep scheme for time. Classic CrossFit structure -- this is a sprint.', movements: ['Barbell Thrusters 75lbs -- 21 then 15 then 9', 'Row calories -- 21 then 15 then 9'], scoring: 'Record total time. Go hard' },
    { id: 'B7', name: 'Chipper', duration: '30 min', description: 'For time. Complete all reps before moving on.', movements: ['50 Jump Rope singles', '40 KB Swings 53lbs', '30 Box Jumps', '20 Pull-Ups', '10 Barbell Thrusters 95lbs', '20 Pull-Ups', '30 Box Jumps', '40 KB Swings', '50 Jump Rope singles'], scoring: 'Record total time' },
    { id: 'B8', name: 'Every 3 Min', duration: '24 min', description: 'Every 3 minutes x 8 rounds alternating A and B. Rest is remainder of each 3-min window.', movements: ['Round A: 15 cal Assault Bike + 10 Wallball', 'Round B: 250m Row + 10 DB Renegade Row 35lbs'], scoring: 'Record if any rounds exceeded 3 min. Target 90 sec rest each round' },
    { id: 'B9', name: 'KB Jump Rope Ladder', duration: '25 min', description: '10 to 1 descending ladder for time.', movements: ['KB Swings 53lbs -- 10 down to 1', 'Goblet Squats 53lbs -- 10 down to 1', 'Jump Rope singles x 10 each round (100 total)'], scoring: 'Record total time. Target sub 20 min' },
    { id: 'B10', name: 'Push Pull Circuit', duration: '30 min', description: '5 rounds. Each superset back to back. Rest 90 sec between rounds.', movements: ['10 Barbell Push Press 95lbs + 10 Pull-Ups', '15 Push-Ups + 15 DB Rows 40lbs each', '20 Wallball + 20 KB Swings 44lbs'], scoring: 'Record total time. Note pull-up quality each round' },
  ],
  C: [
    { id: 'C1', name: 'Steady State Pyramid', duration: '40 min', description: 'Low intensity aerobic work. Heart rate stays below 140bpm. If HR exceeds 140 slow down.', movements: ['10 min Assault Bike easy 60-70% effort', '10 min Row easy 18-20 spm', '10 min Assault Bike 70-75% effort', '10 min Row moderate 22-24 spm'], scoring: 'Record total calories on bike and total meters on rower' },
    { id: 'C2', name: 'Carry and Breathe', duration: '45 min', description: 'Alternating carries and breathing resets. Deliberate pace throughout.', movements: ['3 rounds: Farmer Carry 40m 60lbs each + 10 Crocodile Breaths + Suitcase Carry 40m 70lbs + 10 Crocodile Breaths', '15 min easy Assault Bike to finish'], scoring: 'Record carry weights. Note posture and breathing quality' },
    { id: 'C3', name: 'Aerobic Flow', duration: '40 min', description: 'Continuous movement at RPE 5-6. Never stop, never push. Heart rate 120-135bpm.', movements: ['5 min Row', '5 min Assault Bike', '5 min Jump Rope easy singles', '5 min Row', '5 min Assault Bike', '5 min Jump Rope', '10 min Assault Bike cool down'], scoring: 'Record total calories and meters' },
    { id: 'C4', name: 'Mobility Conditioning', duration: '45 min', description: 'Alternating low-intensity cardio and active mobility. Recovery session.', movements: ['8 min Assault Bike easy', '5 min: Hip CARs + World Greatest Stretch + 90/90 flow', '8 min Row easy', '5 min: Shoulder CARs + Thread the Needle + Child Pose', '8 min Assault Bike moderate', '5 min: Pigeon Pose + Frog Stretch + Crocodile Breathing'], scoring: 'Record bike and row output. This is recovery -- do not push' },
    { id: 'C5', name: 'TGU Flow', duration: '40 min', description: 'Turkish Get-Up skill work combined with easy cardio.', movements: ['5 min easy Row', '5 min Turkish Get-Ups 26lbs unhurried', '5 min easy Assault Bike', '5 min Turkish Get-Ups', '5 min easy Row', '5 min Turkish Get-Ups', '10 min easy Assault Bike'], scoring: 'Record TGU reps per block. Record bike and row output' },
    { id: 'C6', name: 'Long Slow Row', duration: '40 min', description: '30 min continuous rowing at controlled pace. Best aerobic base builder in your gym.', movements: ['30 min continuous Row at 2:10-2:20 per 500m', '10 min easy Assault Bike cool down'], scoring: 'Record total meters. Target 6500-7000m for 30 min' },
    { id: 'C7', name: 'Carries and Cardio', duration: '45 min', description: 'Alternating loaded carries with easy machine work. Grip, posture, breathing focus.', movements: ['5 min Assault Bike easy', 'Farmer Carry 50m 60lbs each x 4 (walk back between)', '5 min Row easy', 'Suitcase Carry 50m each side 70lbs x 4', '5 min Assault Bike easy', 'Overhead Carry 30m each side 25lb plate x 4', '5 min cool down'], scoring: 'Record carry weights. Note postural breakdown if any' },
    { id: 'C8', name: 'Zone 2', duration: '40 min', description: 'True Zone 2 training. Heart rate 120-135bpm the entire time. If you cannot hold a conversation, slow down.', movements: ['20 min Assault Bike at Zone 2 120-135bpm', '20 min Row at Zone 2 120-135bpm'], scoring: 'Record average heart rate if possible. Record total output' },
    { id: 'C9', name: 'Jump Rope Skill', duration: '40 min', description: 'Jump rope skill development combined with easy machine work.', movements: ['3 rounds: 3 min singles easy + 10 min Assault Bike easy', 'Between rounds: 2 min practice on double unders or speed singles', '10 min easy Row to finish'], scoring: 'Record jump rope improvements. Record bike and row output' },
    { id: 'C10', name: 'Active Recovery', duration: '45 min', description: 'Easiest conditioning session. Use on high fatigue weeks.', movements: ['15 min easy Assault Bike 60% effort', '5 min Hip and Spine mobility flow', '15 min easy Row 60% effort', '10 min: Suitcase Carry light + Crocodile Breathing + Pigeon Pose'], scoring: 'Record output. RPE never exceeds 5. This is recovery.' },
  ],
};

// ─── WOD ROTATION ─────────────────────────────────────────────────────────────
// Week index 0-3, conditioning days: d2=Tuesday, d6=Saturday
export const WOD_ROTATION = [
  { d2: 'A', d6: 'B' },
  { d2: 'C', d6: 'A' },
  { d2: 'B', d6: 'C' },
  { d2: 'A', d6: 'B' },
];

export const getSuggestedCategory = (weekIdx, dayId) => {
  const rotation = WOD_ROTATION[weekIdx] || WOD_ROTATION[0];
  return rotation[dayId] || 'A';
};

export const getAllWODs = () => {
  const all = [];
  ['A', 'B', 'C'].forEach(cat => {
    WOD_LIBRARY[cat].forEach(wod => all.push({ ...wod, category: cat }));
  });
  return all;
};
