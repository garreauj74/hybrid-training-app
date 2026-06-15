export const WEEK_NOTES = [
  {
    week: 'Week 1', theme: 'Learn the patterns',
    note: 'Use conservative loads -- 60-65% of your estimated max on all barbell work. The goal is perfect movement, not impressing yourself. Record every weight used.',
    focus: ['Establish movement baselines', 'Learn the circuit pacing', 'Note tight areas from mobility work'],
  },
  {
    week: 'Week 2', theme: 'Build confidence',
    note: 'Add 2.5-5kg to upper body barbell lifts and 5kg to lower body if Week 1 felt controlled. Endurance circuits should feel slightly easier -- that's adaptation working.',
    focus: ['Small load increases on strength days', 'Push endurance circuit pace slightly', 'Deepen mobility holds'],
  },
  {
    week: 'Week 3', theme: 'Increase demand',
    note: 'Add another 2.5-5kg increment. Add 1 set to every exercise in the Strength Block and Core & Stability blocks. Endurance work: try to beat Week 1 times/distances.',
    focus: ['Add 1 set to all strength & core lifts', 'Aim to beat endurance benchmarks', 'Progress stability progressions one step'],
  },
  {
    week: 'Week 4', theme: 'Accumulation peak + mini-deload',
    note: 'Maintain Week 3 loads. Sets return to baseline (same as Weeks 1-2) -- this controlled reduction lets the adaptation from the Week 3 overload consolidate before Phase 2.',
    focus: ['Sets return to baseline counts', 'Focus on technique at existing loads', 'Assess: what improved? What still needs work?'],
  },
];

export const DAYS = [
  {
    id: 'd1', day: 'Day 1', label: 'Strength -- Lower Body', type: 'FULL',
    focus: 'Hinge & Squat dominant', equipment: 'Barbell, rack, KB, box', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min @ low effort -- nasal breathing only', sets: '', reps: '2 min' },
        { name: 'Hip CARs', detail: 'Full controlled rotation each hip', sets: '2', reps: '5 each direction' },
        { name: "World's Greatest Stretch", detail: 'Flow through all 3 positions slowly', sets: '1', reps: '5 each side' },
        { name: 'Glute Bridge with March', detail: 'Pelvis level throughout', sets: '2', reps: '10 each side' },
        { name: 'Ankle Dorsiflexion Mob', detail: 'Half-kneeling wall drill', sets: '2', reps: '15 each side' },
      ]},
      { name: 'Strength Block', duration: '55 min', color: '#E8500A', items: [
        { name: 'Barbell Back Squat', detail: '3-sec descent, 1-sec pause at bottom. RPE 7/10.', sets: '4', reps: '5', rest: '2:30', stability: 'Single-Leg Balance Hold 30s each leg' },
        { name: 'Romanian Deadlift', detail: 'Hinge from hip, soft knee, bar close to shins.', sets: '3', reps: '8', rest: '2:00', stability: 'Bird Dog 8 each side' },
        { name: 'Goblet Squat', detail: 'KB at chest, elbows drive knees out, full depth.', sets: '3', reps: '10', rest: '1:30', stability: 'Lateral Band Walk 15 each direction' },
        { name: 'Single-Leg RDL', detail: 'KB opposite hand, hip square, spine long.', sets: '3', reps: '8 each', rest: '1:30', stability: null },
        { name: 'Box Jump', detail: 'Controlled landing, reset between reps.', sets: '4', reps: '4', rest: '1:30', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '10 min', color: '#1D5FA8', items: [
        { name: 'Dead Bug', detail: 'Lower back pressed to floor, exhale on lower.', sets: '3', reps: '8 each side' },
        { name: 'Suitcase Carry', detail: 'KB moderate load, 20m each side.', sets: '3', reps: '20m each' },
      ]},
      { name: 'Cool-Down', duration: '13 min', color: '#7C3ACA', items: [
        { name: 'Pigeon Pose', detail: 'Passive hold -- gravity only', sets: '', reps: '90s each' },
        { name: '90/90 Hip Flow', detail: 'Slow controlled transitions', sets: '', reps: '2 min' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides', sets: '', reps: '60s each' },
        { name: 'Crocodile Breathing', detail: 'Belly into floor, full exhale', sets: '', reps: '5 breaths' },
      ]},
    ],
  },
  {
    id: 'd2', day: 'Day 2', label: 'Strength -- Upper Push + Shoulder Stability', type: 'FULL',
    focus: 'Horizontal & vertical push, scapular control', equipment: 'Barbell, rack, DB, KB, pull-up bar, bands', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Rower Easy Pull', detail: '2 min @ 18-20 spm, easy effort', sets: '', reps: '2 min' },
        { name: 'Shoulder CARs', detail: 'Biggest circle possible, extremely slow', sets: '2', reps: '5 each direction' },
        { name: 'Band Pull-Aparts', detail: '3 variations: arms high, mid, low', sets: '2', reps: '15 each' },
        { name: 'Wall Slides', detail: 'Maintain all contact points', sets: '2', reps: '10' },
        { name: 'Bear Rolls', detail: 'Chest opener + t-spine prep', sets: '1', reps: '10 each side' },
      ]},
      { name: 'Strength Block', duration: '55 min', color: '#E8500A', items: [
        { name: 'Barbell Overhead Press', detail: 'Standing, ribs down, 3-sec press, 2-sec lower.', sets: '4', reps: '5', rest: '2:30', stability: 'Face Pull w/ External Rotation 15 reps' },
        { name: 'Barbell Bench Press', detail: '3-sec descent, 1-sec pause, scapulae retracted.', sets: '4', reps: '6', rest: '2:30', stability: 'Prone Cobra 12 reps 3-sec hold' },
        { name: 'DB Arnold Press', detail: 'Seated, rotational press, full ROM.', sets: '3', reps: '10', rest: '1:30', stability: 'Y-T-W-L Raises 10 each' },
        { name: 'Half-Kneeling KB Press', detail: 'Bottoms-up KB, start very light.', sets: '3', reps: '6 each', rest: '1:30', stability: null },
        { name: 'Push-Up Variations', detail: 'Wide → close → explosive, one variation per set.', sets: '3', reps: '10-12', rest: '1:00', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '10 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: 'Band at chest height, resist rotation.', sets: '3', reps: '10 each side' },
        { name: 'Plank Shoulder Taps', detail: 'Hips absolutely still.', sets: '3', reps: '10 each side' },
      ]},
      { name: 'Cool-Down', duration: '13 min', color: '#7C3ACA', items: [
        { name: 'Supported Chest Opener', detail: 'Arms in goalpost, gravity opens chest', sets: '', reps: '2 min' },
        { name: 'Doorway Chest Stretch', detail: '3 heights, PAILs at each', sets: '', reps: '30s each height' },
        { name: 'Overhead Band Distraction', detail: '2-3 angles, stay at restricted spots', sets: '', reps: '45s each' },
        { name: 'Diaphragmatic Breathing 90/90', detail: '360° rib expansion on inhale', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd3', day: 'Day 3', label: 'Muscular Endurance -- Full Body', type: 'FULL',
    focus: 'Aerobic capacity, work threshold', equipment: 'Assault bike, rower, KB, wallball, jump rope, barbell', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Jump Rope', detail: 'Easy singles, just get rhythm going', sets: '', reps: '3 min' },
        { name: 'Cat-Cow', detail: 'Full spinal wave, slow breath cycles', sets: '1', reps: '10' },
        { name: 'Thread the Needle', detail: 'Flow version, rhythmic', sets: '2', reps: '8 each side' },
        { name: 'Hip CARs', detail: '3 each direction per leg', sets: '1', reps: '3 each direction' },
        { name: 'Chin Tucks + Neck Half-Circles', detail: '10 tucks, 5 half-circles', sets: '1', reps: 'As described' },
      ]},
      { name: 'Endurance Circuit -- 4 Rounds', duration: '52 min', color: '#B5197A',
        note: 'Complete all 6 movements back to back as one round, then rest 90 sec. RPE 6-7/10.',
        items: [
          { name: 'Assault Bike', detail: 'Moderate effort, consistent RPM', sets: '4 rounds', reps: '3 min' },
          { name: 'Wallball', detail: 'Full squat, drive hips, throw to target', sets: '4 rounds', reps: '20 reps' },
          { name: 'KB Swing (Two-Hand)', detail: 'Hip hinge power, control the return', sets: '4 rounds', reps: '20 reps' },
          { name: 'Rower', detail: 'Powerful drive, relaxed recovery', sets: '4 rounds', reps: '300m' },
          { name: 'Jump Rope', detail: 'DUs if you have them, otherwise 3:1 singles', sets: '4 rounds', reps: '40/20 DU' },
          { name: 'DB Renegade Row', detail: 'Plank position, hips square', sets: '4 rounds', reps: '8 each side' },
        ],
      },
      { name: 'Core Finisher', duration: '8 min', color: '#1D5FA8', items: [
        { name: 'Ab Wheel Rollout', detail: 'Short range, hips don\'t sag, 3-sec out', sets: '3', reps: '8' },
        { name: 'Bird Dog', detail: 'Slow, 3-sec hold at extension', sets: '2', reps: '8 each side' },
      ]},
      { name: 'Cool-Down', duration: '20 min', color: '#7C3ACA', items: [
        { name: 'Rower Easy Pull', detail: 'Breathing normalisation', sets: '', reps: '5 min' },
        { name: 'Frog Stretch', detail: 'Let groin fully release', sets: '', reps: '90s' },
        { name: 'Thoracic Rotation Side-Lying', detail: 'Hold open position each rep', sets: '', reps: '10 each side' },
        { name: 'Levator Scapulae Stretch', detail: 'Anchor shoulder, chin to floor', sets: '', reps: '60s each side' },
        { name: 'Crocodile Breathing', detail: 'Full parasympathetic reset', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd4', day: 'Day 4', label: 'Active Recovery -- Mobility & Stability', type: 'LIGHT',
    focus: 'Joint health, nervous system recovery', equipment: 'KB light, bands, foam roller, mat', totalTime: '60-75 min',
    sections: [
      { name: 'Mobility -- Lower Body', duration: '20 min', color: '#0A7C4E',
        note: 'Move slowly -- this is maintenance, not a workout.',
        items: [
          { name: 'Hip CARs', detail: '5 each direction per leg', sets: '2', reps: '5 each' },
          { name: '90/90 Hip Flow', detail: '10 slow switches each direction', sets: '2', reps: '10 switches' },
          { name: 'Kneeling Hip Flexor PAILs/RAILs', detail: '90s passive, 2 rounds contractions', sets: '1', reps: 'Full protocol' },
          { name: 'Pigeon Pose', detail: 'Passive, let gravity work', sets: '1', reps: '90s each' },
          { name: 'Frog Stretch', detail: 'Passive hold, breathe into groin', sets: '1', reps: '90s' },
          { name: 'Cossack Squat', detail: '3-sec hold at depth', sets: '2', reps: '8 each side' },
        ],
      },
      { name: 'Mobility -- Spine & Shoulder', duration: '20 min', color: '#1D5FA8', items: [
        { name: 'Cat-Cow', detail: 'Full spinal wave, 15 slow cycles', sets: '2', reps: '15' },
        { name: 'Thread the Needle', detail: 'Pause at full rotation', sets: '2', reps: '8 each side' },
        { name: 'Foam Roller T-Spine', detail: 'Segment through each level', sets: '2', reps: '10' },
        { name: 'Shoulder CARs', detail: 'Biggest circle, both arms', sets: '2', reps: '5 each' },
        { name: 'Sleeper Stretch PAILs', detail: 'Full protocol both sides', sets: '1', reps: 'Full protocol' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides', sets: '1', reps: '90s each' },
      ]},
      { name: 'Stability Circuit -- Low Load', duration: '20 min', color: '#B5197A',
        note: 'No heavy loading. Focus on control and coordination.',
        items: [
          { name: 'Turkish Get-Up', detail: 'BW or very light KB, every transition deliberate', sets: '3', reps: '3 each side' },
          { name: 'Single-Leg Balance + Head Turns', detail: '30s eyes open, 30s eyes closed', sets: '2', reps: '30s each' },
          { name: 'Gaze Stabilisation Drills', detail: 'Thumb tracking, opposing movements', sets: '2', reps: '30s each' },
          { name: 'Tandem Walk', detail: 'Heel-to-toe, add head turns', sets: '3', reps: '10m each way' },
          { name: 'Pallof Press Light Band', detail: 'Half-kneeling, slow and deliberate', sets: '2', reps: '10 each side' },
        ],
      },
      { name: 'Neck & Breathing', duration: '10 min', color: '#7C3ACA', items: [
        { name: 'Neck CARs', detail: 'Extremely slow, 3 each direction', sets: '1', reps: '3 each' },
        { name: 'Chin Tucks', detail: '2-sec hold', sets: '2', reps: '15' },
        { name: 'Jaw & Suboccipital Release', detail: 'Passive, jaw hanging open', sets: '1', reps: '90s' },
        { name: '90/90 Diaphragmatic Breathing', detail: '360° rib expansion', sets: '1', reps: '10 breaths' },
      ]},
    ],
  },
  {
    id: 'd5', day: 'Day 5', label: 'Strength -- Upper Pull + Spine Stability', type: 'FULL',
    focus: 'Vertical & horizontal pull, posterior chain upper body', equipment: 'Barbell, pull-up bar, DB, KB, bands, rower', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Rower', detail: '2 min building effort -- start easy, finish moderate', sets: '', reps: '2 min' },
        { name: 'Band Pull-Aparts', detail: '3 variations, shoulders down', sets: '2', reps: '15 each' },
        { name: 'Thoracic Rotation Side-Lying', detail: '3-sec hold at open position', sets: '2', reps: '10 each side' },
        { name: 'Dead Bug', detail: 'Lower back pressed down', sets: '2', reps: '8 each side' },
        { name: 'Shoulder CARs', detail: '3 each direction per arm', sets: '1', reps: '3 each direction' },
      ]},
      { name: 'Strength Block', duration: '55 min', color: '#E8500A', items: [
        { name: 'Weighted Pull-Up / Chin-Up', detail: '3-sec descent, full hang at bottom.', sets: '4', reps: '5-6', rest: '2:30', stability: 'Bird Dog 8 each side' },
        { name: 'Barbell Bent-Over Row', detail: '45° hinge, pull to lower rib, 2-sec lower.', sets: '4', reps: '6', rest: '2:30', stability: 'Plank Shoulder Taps 10 each side' },
        { name: 'Single-Arm DB Row', detail: 'Full stretch bottom, strong retraction top.', sets: '3', reps: '10 each', rest: '1:30', stability: 'Face Pull w/ External Rotation 15' },
        { name: 'KB Single-Arm High Pull', detail: 'Hip drive generates the pull.', sets: '3', reps: '8 each', rest: '1:30', stability: null },
        { name: 'Barbell Deadlift', detail: 'Conventional, 3-sec lower, brace every rep.', sets: '3', reps: '5', rest: '2:30', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '10 min', color: '#1D5FA8', items: [
        { name: 'Ab Wheel Rollout', detail: 'Controlled short range, spine neutral', sets: '3', reps: '8' },
        { name: 'Suitcase Carry', detail: 'Heavier than Day 1, level hips', sets: '3', reps: '20m each' },
      ]},
      { name: 'Cool-Down', duration: '13 min', color: '#7C3ACA', items: [
        { name: 'Doorway Lat Stretch', detail: 'Hip hinge away from support arm', sets: '', reps: '60s each' },
        { name: "Child's Pose with Lat Reach", detail: 'Breathe into the stretch', sets: '', reps: '90s each' },
        { name: 'Foam Roller T-Spine', detail: 'Linger at tight spots', sets: '', reps: '2 min' },
        { name: 'Crocodile Breathing', detail: 'Belly into the floor', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd6', day: 'Day 6', label: 'Muscular Endurance -- Lower Body & Core', type: 'FULL',
    focus: 'Lower body conditioning, core endurance', equipment: 'Assault bike, rower, KB, barbell, box, jump rope', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike', detail: '2 min easy building to moderate', sets: '', reps: '2 min' },
        { name: "World's Greatest Stretch", detail: 'Full flow, 5 each side', sets: '1', reps: '5 each side' },
        { name: 'Glute Bridge with March', detail: 'Pelvis level both sides', sets: '2', reps: '10 each side' },
        { name: 'Lateral Band Walks', detail: '15 steps each direction', sets: '2', reps: '15 each way' },
      ]},
      { name: 'Strength Primer', duration: '20 min', color: '#E8500A',
        note: 'Moderate load, higher tempo. Sets the pattern before endurance work.',
        items: [
          { name: 'Barbell Front Squat', detail: 'Upright torso, 2-sec down, 1-sec up.', sets: '3', reps: '8', rest: '1:30' },
          { name: 'KB Romanian Deadlift', detail: 'Two KBs, hinge focus, controlled.', sets: '3', reps: '10', rest: '1:00' },
        ],
      },
      { name: 'Endurance Circuit -- 3 Rounds', duration: '40 min', color: '#B5197A',
        note: 'Complete all 6 movements back to back as one round, then rest 2 min. RPE 7-8/10.',
        items: [
          { name: 'Rower Sprint', detail: 'All-out effort', sets: '3 rounds', reps: '250m' },
          { name: 'Barbell Thruster', detail: 'Front squat into overhead press, unbroken', sets: '3 rounds', reps: '10 reps' },
          { name: 'Box Jump', detail: 'Soft landing, full hip extension, step down', sets: '3 rounds', reps: '8 reps' },
          { name: 'KB Goblet Squat -- Slow Eccentric', detail: '4-sec descent', sets: '3 rounds', reps: '12 reps' },
          { name: 'Assault Bike Sprint', detail: 'Maximum effort', sets: '3 rounds', reps: '45 sec' },
          { name: 'Jump Rope', detail: 'Active recovery pace', sets: '3 rounds', reps: '1 min' },
        ],
      },
      { name: 'Core Finisher', duration: '8 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: '3 positions per side', sets: '3', reps: '10 each side' },
        { name: 'Dead Bug', detail: 'Quality over quantity at end of session', sets: '2', reps: '8 each side' },
      ]},
      { name: 'Cool-Down', duration: '12 min', color: '#7C3ACA', items: [
        { name: 'Rower Easy', detail: 'Breathing normalisation', sets: '', reps: '4 min' },
        { name: 'Pigeon Pose', detail: 'Passive hold', sets: '', reps: '90s each' },
        { name: '90/90 Hip Flow', detail: 'Slow transitions', sets: '', reps: '2 min' },
        { name: 'Crocodile Breathing', detail: 'Final reset', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd7', day: 'Day 7', label: 'Full Rest', type: 'REST',
    focus: 'Complete recovery', equipment: 'None', totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', duration: '', color: '#5A6472', items: [
        { name: 'No structured training', detail: 'This is where adaptation happens. The work you did Mon-Sat is only useful if the body has time to rebuild.', sets: '', reps: '' },
        { name: 'Light walking is fine', detail: 'Keep it easy and enjoyable -- not a training stimulus.', sets: '', reps: '' },
        { name: 'Hydration & nutrition', detail: 'Aim 0.7-1g protein per lb bodyweight. Replenish glycogen with quality carbs.', sets: '', reps: '' },
        { name: 'Sleep priority', detail: 'Extra 30-60 min if possible -- GH peaks during sleep and muscle repair is most active.', sets: '', reps: '' },
        { name: 'Optional breathing', detail: '90/90 diaphragmatic breathing, jaw release. Nothing more.', sets: '', reps: 'Optional' },
      ]},
    ],
  },
];

export const TYPE_COLORS = {
  FULL:  { bg: '#E8500A', text: '#fff' },
  LIGHT: { bg: '#0A7C4E', text: '#fff' },
  REST:  { bg: '#5A6472', text: '#fff' },
};

export const SECTION_ICONS = {
  'Warm-Up': '🔥',
  'Strength Block': '💪',
  'Endurance Circuit -- 4 Rounds': '⚡',
  'Endurance Circuit -- 3 Rounds': '⚡',
  'Strength Primer': '🎯',
  'Core & Stability Finisher': '🔩',
  'Core Finisher': '🔩',
  'Cool-Down': '🌊',
  'Mobility -- Lower Body': '🦵',
  'Mobility -- Spine & Shoulder': '🔄',
  'Stability Circuit -- Low Load': '⚖️',
  'Neck & Breathing': '🧠',
  'Rest Day Guidelines': '😴',
};

export const TRAINING_SET_SECTIONS = [
  'Strength Block', 'Strength Primer',
  'Core & Stability Finisher', 'Core Finisher',
];

export const getWeekSets = (item, sectionName, weekIdx) => {
  const base = parseInt(item.sets, 10);
  if (!base || isNaN(base)) return item.sets || '--';
  if (!TRAINING_SET_SECTIONS.includes(sectionName)) return String(base);
  if (weekIdx === 2) return String(base + 1);
  return String(base);
};

export const logKey = (w, d, si, ii) => `w${w}-${d}-s${si}-i${ii}`;
export const sessionKey = (w, d) => `session-w${w}-${d}`;

// ─── PHASE 2 DATA ─────────────────────────────────────────────────────────────
// Development Block -- Weeks 5-8
// Focus: Hypertrophy, athletic development, tempo discipline, pull-up volume

export const PHASE2_WEEK_NOTES = [
  {
    week: 'Week 5', theme: 'Learn Phase 2 patterns',
    note: 'New rep schemes and strict tempo make this harder than it looks even at conservative loads. Start 5-10lbs below your Phase 1 peak on all barbell work and focus on the tempo prescription. Every rep should have a controlled descent.',
    focus: ['Nail the tempo on every set', 'Conservative loads -- build the pattern first', 'Log your pull-up reps carefully -- this is your baseline'],
  },
  {
    week: 'Week 6', theme: 'Build the load',
    note: 'Add 5lbs to all primary barbell lifts if Week 5 felt controlled at RPE 7 or below. Push accessory reps to the top of the prescribed range. Pull-up volume is the priority -- if reps feel easy, add one more set not more reps per set.',
    focus: ['+5lbs on primary lifts if RPE allows', 'Push reps to top of range on accessories', 'Pull-up volume -- add a set before adding reps'],
  },
  {
    week: 'Week 7', theme: 'Peak volume week',
    note: 'Add 1 set to every Strength Block and Core & Stability Finisher exercise. Loads stay the same as Week 6 -- the extra set is the overload stimulus. This is the hardest week of Phase 2. Protect your sleep and nutrition.',
    focus: ['+1 set on all strength and core exercises', 'Loads stay at Week 6 levels', 'Prioritise recovery -- sleep and protein intake matter most this week'],
  },
  {
    week: 'Week 8', theme: 'Deload -- consolidate adaptation',
    note: 'Sets return to Week 5-6 baseline. Loads stay at Week 7 levels. This is not going backwards -- the adaptation from Weeks 5-7 consolidates here. Use this week to assess your pull-up progress and prepare for Phase 3.',
    focus: ['Sets return to baseline', 'Maintain loads from Week 7', 'Assess pull-up numbers -- target should be 7-9 clean reps by end of Week 8'],
  },
];

export const PHASE2_DAYS = [
  {
    id: 'd1', day: 'Day 1', label: 'Strength -- Lower Body', type: 'FULL',
    focus: 'Squat & hinge -- tempo discipline, posterior chain volume',
    equipment: 'Barbell, rack, KB, box, pull-up bar',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min @ low effort -- nasal breathing, heart rate below 120', sets: '', reps: '2 min' },
        { name: 'Turkish Get-Up', detail: 'BW or light KB. Every transition deliberate -- this is skill practice not conditioning. Sets the stability pattern for the session.', sets: '2', reps: '2 each side' },
        { name: "World's Greatest Stretch", detail: 'Flow all 3 positions -- hip flexor, hamstring, thoracic rotation. Slow and deliberate.', sets: '1', reps: '5 each side' },
        { name: 'Ankle Dorsiflexion Mob', detail: 'Half-kneeling wall drill. Drive knee forward keeping heel down. This directly affects squat depth -- do not skip.', sets: '2', reps: '15 each side' },
        { name: 'Glute Bridge with March', detail: 'Pelvis level throughout. Slow march -- 2 sec hold each side.', sets: '1', reps: '10 each side' },
      ]},
      { name: 'Strength Block', duration: '45 min', color: '#E8500A', items: [
        { name: 'Barbell Back Squat', detail: 'Tempo: 3-1-2 (3 sec down, 1 sec pause at bottom, 2 sec up). Start at 155lbs. RPE target 7. The pause eliminates stretch reflex -- harder than it sounds.', sets: '4', reps: '6', rest: '2:00', stability: 'Single-Leg Balance Hold 30s each leg -- eyes closed' },
        { name: 'Barbell Romanian Deadlift', detail: 'Tempo: 3-1-1. Hinge from hip, bar stays close to shins, feel the hamstring load at bottom. Controlled return -- do not bounce. Start at 155lbs.', sets: '3', reps: '10', rest: '2:00', stability: 'Bird Dog 10 each side' },
        { name: 'DB Bulgarian Split Squat', detail: 'Rear foot elevated on bench, front foot forward enough that shin is vertical at bottom. 3-sec descent. This replaces goblet squat -- higher single-leg demand. Start light -- 20-25lbs each hand.', sets: '3', reps: '8 each leg', rest: '1:30', stability: 'Lateral Band Walk 15 each direction' },
        { name: 'Single-Leg RDL', detail: 'KB in opposite hand. 3-sec descent. Hip square throughout -- do not let the free hip open. This is a stability and strength exercise simultaneously.', sets: '3', reps: '10 each leg', rest: '1:30', stability: null },
        { name: 'Box Jump', detail: 'Reset completely between reps -- 10 sec minimum. Step down, do not jump down. 4 reps is the prescription -- quality not fatigue.', sets: '4', reps: '4', rest: '1:30', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '8 min', color: '#1D5FA8', items: [
        { name: 'Dead Bug', detail: 'Lower back glued to floor. Exhale fully before lowering. Slow -- 3 sec per rep.', sets: '3', reps: '10 each side' },
        { name: 'Suitcase Carry', detail: '60lbs KB. 30m each side. Tall spine, level hips -- do not lean toward or away from the weight.', sets: '3', reps: '30m each' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Pigeon Pose', detail: 'Passive -- let gravity work. Breathe into the hip.', sets: '', reps: '60s each' },
        { name: 'Frog Stretch', detail: 'Passive hold. Breathe the groin open.', sets: '', reps: '60s' },
        { name: 'Crocodile Breathing', detail: 'Belly into floor, 360° rib expansion on inhale. Parasympathetic reset.', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd2', day: 'Day 2', label: 'Strength -- Upper Push + Pull Superset', type: 'FULL',
    focus: 'Horizontal & vertical push/pull paired -- shoulder health and balance',
    equipment: 'Barbell, rack, incline bench, DB, KB, pull-up bar, bands',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Rower Easy Pull', detail: '2 min @ 18 spm easy -- hip hinge drive focus', sets: '', reps: '2 min' },
        { name: 'Shoulder CARs', detail: 'Biggest controlled circle possible. Move through full range deliberately.', sets: '2', reps: '5 each direction per arm' },
        { name: 'Band Pull-Aparts', detail: '3 variations -- arms high, mid, low. Retract scapulae at end range.', sets: '2', reps: '15 each variation' },
        { name: 'Wall Slides', detail: 'All contact points maintained. Only go as high as you can keep contact.', sets: '2', reps: '10' },
        { name: 'Dead Hang', detail: 'Full passive hang from pull-up bar -- decompress the spine and prepare shoulder capsule.', sets: '2', reps: '20s' },
      ]},
      { name: 'Strength Block', duration: '45 min', color: '#E8500A', items: [
        { name: 'Barbell Overhead Press + Pull-Up Superset', detail: 'OHP: Tempo 2-1-2. Standing, ribs down, full lockout. Start 95lbs. Immediately superset with 3 strict pull-ups -- dead hang start, chin over bar, 3-sec descent. Rest 2 min after both.', sets: '4', reps: '6 OHP + 3 Pull-Ups', rest: '2:00', stability: 'Face Pull w/ External Rotation 15 reps between supersets' },
        { name: 'Barbell Bench Press', detail: 'Tempo 3-1-2. Scapulae retracted and depressed on bench throughout. 3-sec descent, 1-sec pause on chest, 2-sec press. Start 135lbs. Do not bounce off chest.', sets: '4', reps: '6', rest: '2:00', stability: 'Prone Cobra 10 reps 3-sec hold' },
        { name: 'Incline DB Press', detail: 'Bench at 30-45°. Tempo 3-1-2. Elbows at 45° to torso -- not flared. Start 35lbs each hand. Replaces Arnold Press -- upper chest and shoulder emphasis.', sets: '3', reps: '10', rest: '1:30', stability: 'Y-T-W raises 8 each at 5lbs' },
        { name: 'Half-Kneeling KB Press', detail: 'Bottoms-up KB. 26lbs. The unstable centre of mass demands rotator cuff engagement on every rep. Press slowly -- control the wobble.', sets: '3', reps: '6 each side', rest: '1:30', stability: null },
        { name: 'Push-Up Variations', detail: 'Set 1: Wide grip. Set 2: Close grip (diamond). Set 3: Explosive. Each set a different variation. 3-sec descent on sets 1 and 2.', sets: '3', reps: '12', rest: '1:00', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '8 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: 'Half-kneeling. Purple band. Resist the rotation -- brace before pressing. 2-sec hold at full extension.', sets: '3', reps: '10 each side' },
        { name: 'Plank Shoulder Taps', detail: 'Hips absolutely still -- this is the whole point. Slow taps.', sets: '3', reps: '12 each side' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Supported Chest Opener', detail: 'Arms goalpost on floor -- gravity opens the chest', sets: '', reps: '90s' },
        { name: 'Doorway Chest Stretch', detail: '3 heights -- low, mid, high. 30s each.', sets: '', reps: '30s each height' },
        { name: 'Overhead Band Shoulder Distraction', detail: 'Spend time at restricted angles', sets: '', reps: '45s each angle' },
      ]},
    ],
  },
  {
    id: 'd3', day: 'Day 3', label: 'Muscular Endurance -- Full Body', type: 'FULL',
    focus: 'Aerobic capacity, Tabata intervals, full body conditioning',
    equipment: 'Assault bike, rower, KB, wallball, jump rope, barbell',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Jump Rope', detail: 'Easy singles -- rhythm only, not speed. 3 min.', sets: '', reps: '3 min' },
        { name: 'Cat-Cow', detail: 'Full spinal wave, slow breath cycles', sets: '1', reps: '10' },
        { name: 'Hip CARs', detail: '3 each direction per leg', sets: '1', reps: '3 each direction' },
        { name: 'Band Pull-Aparts', detail: 'Mid position -- prime the posterior shoulder before loading', sets: '1', reps: '15' },
      ]},
      { name: 'Tabata Bike Intervals', duration: '8 min', color: '#B5197A',
        note: '8 rounds of 20 sec ALL-OUT effort / 10 sec complete rest. Total 4 minutes work. This is significantly more intense than Phase 1 steady state. Maximum RPM on the 20 sec -- hold nothing back. Note your calorie count each round.',
        items: [
          { name: 'Assault Bike Tabata', detail: '20 sec maximum effort / 10 sec rest × 8 rounds. Record calories each round. Your Round 1 number is your benchmark -- try to stay within 2 calories per round across all 8.', sets: '8 rounds', reps: '20 sec on / 10 sec off' },
        ],
      },
      { name: 'Endurance Circuit -- 3 Rounds', duration: '40 min', color: '#B5197A',
        note: 'Rest 3 min between rounds. All 6 movements back to back = 1 round. RPE 7/10 -- sustainable but uncomfortable. Record your round time. Target: consistent round times within 30 sec of each other.',
        items: [
          { name: 'Rower', detail: 'Powerful drive, relaxed recovery. 1:30 pace or better.', sets: '3 rounds', reps: '400m' },
          { name: 'Wallball', detail: '20lbs ball. Full squat every rep. Unbroken target. Drive hips through -- the legs generate the throw.', sets: '3 rounds', reps: '20 reps' },
          { name: 'KB Swing (Two-Hand)', detail: '53lbs. Hip hinge power -- not a squat. Hike the bell back aggressively, drive the hips through hard. Control the return.', sets: '3 rounds', reps: '25 reps' },
          { name: 'Barbell Thruster', detail: 'Front squat into overhead press -- one fluid movement. 65lbs. Unbroken. Drive from the legs through the press -- do not muscle it.', sets: '3 rounds', reps: '10 reps' },
          { name: 'Jump Rope', detail: 'Fast singles or double unders. Active recovery pace -- bring heart rate down before the rower.', sets: '3 rounds', reps: '60 singles / 30 DU' },
          { name: 'DB Renegade Row', detail: '35lbs each. Plank position -- hips do not rotate. Row one side, return, row other. Slow and controlled.', sets: '3 rounds', reps: '8 each side' },
        ],
      },
      { name: 'Core Finisher', duration: '6 min', color: '#1D5FA8', items: [
        { name: 'Ab Wheel Rollout', detail: 'Short to medium range. Hips do not sag -- stop before lower back arches.', sets: '3', reps: '10' },
        { name: 'Bird Dog', detail: '3-sec hold at extension. Spine neutral -- do not let the hip hike.', sets: '2', reps: '10 each side' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Rower Easy Pull', detail: 'Very easy. Breathing normalisation.', sets: '', reps: '4 min' },
        { name: 'Frog Stretch', detail: 'Passive hold -- let the groin release', sets: '', reps: '60s' },
        { name: 'Crocodile Breathing', detail: 'Full parasympathetic reset to close the session', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd4', day: 'Day 4', label: 'Active Recovery -- Mobility', type: 'LIGHT',
    focus: 'Joint maintenance -- 45 minutes maximum. Non-negotiable.',
    equipment: 'Mat, foam roller, bands',
    totalTime: '45 min',
    sections: [
      { name: 'Lower Body Mobility', duration: '20 min', color: '#0A7C4E',
        note: 'Move slowly and deliberately. This is not a workout -- it is structural maintenance. Every minute here protects the strength work you did on Days 1-3.',
        items: [
          { name: 'Hip CARs', detail: '5 each direction per leg -- maximum controlled range', sets: '2', reps: '5 each direction' },
          { name: '90/90 Hip Flow', detail: 'Slow switches -- feel the internal and external rotators working', sets: '2', reps: '10 switches each direction' },
          { name: 'Kneeling Hip Flexor PAILs/RAILs', detail: '90s passive hold, then press shin into floor 10s (PAILs), then lift knee actively 10s (RAILs). Repeat twice per side.', sets: '1', reps: 'Full protocol each side' },
          { name: 'Pigeon Pose', detail: 'Passive. Let gravity work entirely.', sets: '1', reps: '90s each side' },
          { name: 'Cossack Squat', detail: '3-sec hold at depth each side. Use counterbalance if needed.', sets: '2', reps: '8 each side' },
        ],
      },
      { name: 'Spine & Shoulder Mobility', duration: '15 min', color: '#1D5FA8', items: [
        { name: 'Cat-Cow', detail: 'Full spinal wave -- thoracic emphasis, not just lumbar', sets: '2', reps: '15 slow cycles' },
        { name: 'Thread the Needle', detail: 'Pause at full rotation. Exhale deeper into the position.', sets: '2', reps: '8 each side' },
        { name: 'Foam Roller T-Spine Extension', detail: 'Segment each level of upper back. Linger where restricted.', sets: '2', reps: '10' },
        { name: 'Shoulder CARs', detail: 'Full range -- biggest circle possible', sets: '2', reps: '5 each direction per arm' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides -- breathe into the stretch', sets: '1', reps: '90s each side' },
      ]},
      { name: 'Neck & Breathing', duration: '10 min', color: '#7C3ACA', items: [
        { name: 'Neck CARs', detail: 'Extremely slow. 3 each direction.', sets: '1', reps: '3 each direction' },
        { name: 'Chin Tucks', detail: '2-sec hold. Draws chin straight back -- not down.', sets: '2', reps: '15' },
        { name: '90/90 Diaphragmatic Breathing', detail: '360° rib expansion on inhale. This is the close of Day 4.', sets: '1', reps: '10 slow breaths' },
      ]},
    ],
  },
  {
    id: 'd5', day: 'Day 5', label: 'Strength -- Upper Pull + Spine Stability', type: 'FULL',
    focus: 'Vertical & horizontal pull -- posterior chain, pull-up volume priority',
    equipment: 'Barbell, pull-up bar, DB, KB, bands, rower',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E', items: [
        { name: 'Rower', detail: '2 min building -- start easy, last 30 sec moderate', sets: '', reps: '2 min' },
        { name: 'Band Pull-Aparts', detail: '3 variations -- prime the posterior shoulder', sets: '2', reps: '15 each' },
        { name: 'Dead Hang', detail: 'Full passive hang. Decompress and prepare.', sets: '2', reps: '20s' },
        { name: 'Thoracic Rotation Side-Lying', detail: '3-sec hold at open position each rep', sets: '2', reps: '8 each side' },
        { name: 'Dead Bug', detail: 'Activation only -- 5 reps each side, slow', sets: '1', reps: '5 each side' },
      ]},
      { name: 'Strength Block', duration: '45 min', color: '#E8500A', items: [
        { name: 'Pull-Up -- Volume Priority', detail: 'Dead hang start, chin clearly over bar, 3-sec controlled descent. Stop 2 reps short of failure EVERY set -- never grind to failure. Rest 2 min between sets. If 5 reps is your max, do 3 per set. Add 1 rep per set when all sets feel like RPE 7 or below.', sets: '5', reps: '3-5 strict BW', rest: '2:00', stability: 'Face Pull w/ External Rotation 15 reps between sets' },
        { name: 'Barbell Bent-Over Row', detail: 'Tempo 3-1-2. Hinge at 45°, pull to lower rib, 2-sec controlled lower. Start 135lbs. Do not let the lower back round under fatigue.', sets: '4', reps: '8', rest: '2:00', stability: 'Plank Shoulder Taps 12 each side' },
        { name: 'Barbell RDL to Pendlay Row', detail: 'NEW MOVEMENT: Hinge into RDL position (bar just below knee), pause, then row the bar to lower rib with a powerful pull. Lower bar to floor completely between reps. Start 95lbs -- this is a complex movement, load is secondary to pattern. Combines posterior chain hinge with horizontal pull.', sets: '3', reps: '6', rest: '2:00', stability: null },
        { name: 'Single-Arm DB Row', detail: 'Tempo 3-1-2. Knee on bench. Full stretch at bottom, strong scapular retraction at top. No trunk rotation.', sets: '3', reps: '12 each side', rest: '1:30', stability: null },
        { name: 'KB Single-Arm High Pull', detail: 'Hip drive generates the pull -- the arm just guides the bell. Explosive hip extension.', sets: '3', reps: '8 each side', rest: '1:30', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '8 min', color: '#1D5FA8', items: [
        { name: 'Ab Wheel Rollout', detail: 'Medium range. Spine neutral -- stop before hips sag.', sets: '3', reps: '10' },
        { name: 'Suitcase Carry', detail: '60lbs. 30m each side. Tall spine, level hips.', sets: '3', reps: '30m each' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Doorway Lat Stretch', detail: 'Hip hinge away from the support arm', sets: '', reps: '60s each' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides', sets: '', reps: '90s each' },
        { name: 'Crocodile Breathing', detail: 'Final reset', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd6', day: 'Day 6', label: 'Muscular Endurance -- Lower Body & Core', type: 'FULL',
    focus: 'Lower body conditioning, barbell complex, core endurance',
    equipment: 'Assault bike, rower, KB, barbell, box, jump rope',
    totalTime: '75 min',
    sections: [
      { name: 'Warm-Up', duration: '8 min', color: '#0A7C4E',
        note: '🚵 Mountain bike note: If you rode 12+ miles today, this session is optional. Do the warm-up and Strength Primer only, then cool-down. Your bike ride counts as the conditioning stimulus.',
        items: [
          { name: 'Assault Bike Easy Spin', detail: '2 min easy -- get the legs moving after rest day', sets: '', reps: '2 min' },
          { name: "World's Greatest Stretch", detail: 'Full flow -- 5 each side', sets: '1', reps: '5 each side' },
          { name: 'Glute Bridge with March', detail: 'Activate the glutes before loading', sets: '2', reps: '10 each side' },
          { name: 'Lateral Band Walks', detail: 'Glute med activation -- 15 steps each direction', sets: '2', reps: '15 each direction' },
        ],
      },
      { name: 'Strength Primer', duration: '15 min', color: '#E8500A',
        note: 'Moderate load, higher tempo. Neuromuscular primer before the circuit work.',
        items: [
          { name: 'Barbell Front Squat', detail: 'Tempo 2-1-1. Upright torso throughout -- elbows up. Start 95lbs. 2-sec descent, 1-sec pause, 1-sec drive.', sets: '3', reps: '8', rest: '1:30' },
          { name: 'KB Romanian Deadlift', detail: 'Two KBs. Hinge focus. 3-sec descent. 53lbs each hand.', sets: '3', reps: '10', rest: '1:00' },
        ],
      },
      { name: 'Endurance Circuit -- 3 Rounds', duration: '35 min', color: '#B5197A',
        note: 'Rest 2 min between rounds. All movements back to back = 1 round. RPE 7-8/10. Record round times.',
        items: [
          { name: 'Rower Sprint', detail: 'All-out effort. Full power every stroke.', sets: '3 rounds', reps: '300m' },
          { name: 'Barbell Thruster', detail: '75lbs. Front squat drives directly into overhead press -- one fluid movement. Unbroken.', sets: '3 rounds', reps: '10 reps' },
          { name: 'Box Jump', detail: 'Full hip extension at top, step down controlled. Power focus -- reset 5 sec between reps.', sets: '3 rounds', reps: '8 reps' },
          { name: 'KB Goblet Squat -- Slow Eccentric', detail: '53lbs. 4-sec descent. Build positional strength under fatigue.', sets: '3 rounds', reps: '12 reps' },
          { name: 'Assault Bike Sprint', detail: 'Maximum RPM. Everything left.', sets: '3 rounds', reps: '45 sec' },
          { name: 'Jump Rope', detail: 'Active recovery pace -- bring heart rate down.', sets: '3 rounds', reps: '60 singles' },
        ],
      },
      { name: 'Core Finisher', duration: '7 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: '3 positions -- standing, half-kneeling, kneeling. 2-sec hold at extension.', sets: '3', reps: '10 each side' },
        { name: 'Dead Bug', detail: 'Quality over quantity at end of session. Slow.', sets: '2', reps: '10 each side' },
      ]},
      { name: 'Cool-Down', duration: '8 min', color: '#7C3ACA', items: [
        { name: 'Rower Easy Pull', detail: 'Breathing normalisation', sets: '', reps: '3 min' },
        { name: 'Pigeon Pose', detail: 'Passive hold both sides', sets: '', reps: '60s each' },
        { name: 'Crocodile Breathing', detail: 'Final reset', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd7', day: 'Day 7', label: 'Full Rest', type: 'REST',
    focus: 'Complete recovery -- do not compromise this',
    equipment: 'None',
    totalTime: '--',
    sections: [
      { name: 'Rest Day Guidelines', duration: '', color: '#5A6472', items: [
        { name: 'No structured training', detail: 'Phase 2 places higher demands on the nervous system than Phase 1. This rest day is more important, not less. Do not train.', sets: '', reps: '' },
        { name: 'Protein priority', detail: 'Aim 1g per lb bodyweight today -- 190g protein. This is when muscle protein synthesis is most active following the week\'s training.', sets: '', reps: '' },
        { name: 'Sleep is the priority', detail: 'If you can get 8 hours tonight, do it. GH peaks in deep sleep -- this is when the adaptation from the week actually happens.', sets: '', reps: '' },
        { name: 'Light walking only', detail: 'A 20-30 min easy walk is fine and beneficial. Nothing more.', sets: '', reps: '' },
        { name: 'Optional breathing', detail: '5 min of 90/90 diaphragmatic breathing if you feel tight or stressed. Nothing else.', sets: '', reps: 'Optional' },
      ]},
    ],
  },
];

export const PHASE2_TRAINING_SET_SECTIONS = [
  'Strength Block',
  'Strength Primer',
  'Core & Stability Finisher',
  'Core Finisher',
];

export const getPhase2WeekSets = (item, sectionName, weekIdx) => {
  const base = parseInt(item.sets, 10);
  if (!base || isNaN(base)) return item.sets || '--';
  if (!PHASE2_TRAINING_SET_SECTIONS.includes(sectionName)) return String(base);
  // Week 7 (index 2): +1 set on all training sections
  if (weekIdx === 2) return String(base + 1);
  // All other weeks: baseline
  return String(base);
};
