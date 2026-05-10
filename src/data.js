export const WEEK_NOTES = [
  {
    week: 'Week 1', theme: 'Learn the patterns',
    note: 'Use conservative loads — 60–65% of your estimated max on all barbell work. The goal is perfect movement, not impressing yourself. Record every weight used.',
    focus: ['Establish movement baselines', 'Learn the circuit pacing', 'Note tight areas from mobility work'],
  },
  {
    week: 'Week 2', theme: 'Build confidence',
    note: 'Add 2.5–5kg to upper body barbell lifts and 5kg to lower body if Week 1 felt controlled. Endurance circuits should feel slightly easier — that\'s adaptation working.',
    focus: ['Small load increases on strength days', 'Push endurance circuit pace slightly', 'Deepen mobility holds'],
  },
  {
    week: 'Week 3', theme: 'Increase demand',
    note: 'Add another 2.5–5kg increment. Add 1 set to every exercise in the Strength Block and Core & Stability blocks. Endurance work: try to beat Week 1 times/distances.',
    focus: ['Add 1 set to all strength & core lifts', 'Aim to beat endurance benchmarks', 'Progress stability progressions one step'],
  },
  {
    week: 'Week 4', theme: 'Accumulation peak + mini-deload',
    note: 'Maintain Week 3 loads. Sets return to baseline (same as Weeks 1–2) — this controlled reduction lets the adaptation from the Week 3 overload consolidate before Phase 2.',
    focus: ['Sets return to baseline counts', 'Focus on technique at existing loads', 'Assess: what improved? What still needs work?'],
  },
];

export const DAYS = [
  {
    id: 'd1', day: 'Day 1', label: 'Strength — Lower Body', type: 'FULL',
    focus: 'Hinge & Squat dominant', equipment: 'Barbell, rack, KB, box', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Assault Bike Easy Spin', detail: '2 min @ low effort — nasal breathing only', sets: '', reps: '2 min' },
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
        { name: 'Pigeon Pose', detail: 'Passive hold — gravity only', sets: '', reps: '90s each' },
        { name: '90/90 Hip Flow', detail: 'Slow controlled transitions', sets: '', reps: '2 min' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides', sets: '', reps: '60s each' },
        { name: 'Crocodile Breathing', detail: 'Belly into floor, full exhale', sets: '', reps: '5 breaths' },
      ]},
    ],
  },
  {
    id: 'd2', day: 'Day 2', label: 'Strength — Upper Push + Shoulder Stability', type: 'FULL',
    focus: 'Horizontal & vertical push, scapular control', equipment: 'Barbell, rack, DB, KB, pull-up bar, bands', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Rower Easy Pull', detail: '2 min @ 18–20 spm, easy effort', sets: '', reps: '2 min' },
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
        { name: 'Push-Up Variations', detail: 'Wide → close → explosive, one variation per set.', sets: '3', reps: '10–12', rest: '1:00', stability: null },
      ]},
      { name: 'Core & Stability Finisher', duration: '10 min', color: '#1D5FA8', items: [
        { name: 'Pallof Press', detail: 'Band at chest height, resist rotation.', sets: '3', reps: '10 each side' },
        { name: 'Plank Shoulder Taps', detail: 'Hips absolutely still.', sets: '3', reps: '10 each side' },
      ]},
      { name: 'Cool-Down', duration: '13 min', color: '#7C3ACA', items: [
        { name: 'Supported Chest Opener', detail: 'Arms in goalpost, gravity opens chest', sets: '', reps: '2 min' },
        { name: 'Doorway Chest Stretch', detail: '3 heights, PAILs at each', sets: '', reps: '30s each height' },
        { name: 'Overhead Band Distraction', detail: '2–3 angles, stay at restricted spots', sets: '', reps: '45s each' },
        { name: 'Diaphragmatic Breathing 90/90', detail: '360° rib expansion on inhale', sets: '', reps: '8 breaths' },
      ]},
    ],
  },
  {
    id: 'd3', day: 'Day 3', label: 'Muscular Endurance — Full Body', type: 'FULL',
    focus: 'Aerobic capacity, work threshold', equipment: 'Assault bike, rower, KB, wallball, jump rope, barbell', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Jump Rope', detail: 'Easy singles, just get rhythm going', sets: '', reps: '3 min' },
        { name: 'Cat-Cow', detail: 'Full spinal wave, slow breath cycles', sets: '1', reps: '10' },
        { name: 'Thread the Needle', detail: 'Flow version, rhythmic', sets: '2', reps: '8 each side' },
        { name: 'Hip CARs', detail: '3 each direction per leg', sets: '1', reps: '3 each direction' },
        { name: 'Chin Tucks + Neck Half-Circles', detail: '10 tucks, 5 half-circles', sets: '1', reps: 'As described' },
      ]},
      { name: 'Endurance Circuit — 4 Rounds', duration: '52 min', color: '#B5197A',
        note: 'Complete all 6 movements back to back as one round, then rest 90 sec. RPE 6–7/10.',
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
    id: 'd4', day: 'Day 4', label: 'Active Recovery — Mobility & Stability', type: 'LIGHT',
    focus: 'Joint health, nervous system recovery', equipment: 'KB light, bands, foam roller, mat', totalTime: '60–75 min',
    sections: [
      { name: 'Mobility — Lower Body', duration: '20 min', color: '#0A7C4E',
        note: 'Move slowly — this is maintenance, not a workout.',
        items: [
          { name: 'Hip CARs', detail: '5 each direction per leg', sets: '2', reps: '5 each' },
          { name: '90/90 Hip Flow', detail: '10 slow switches each direction', sets: '2', reps: '10 switches' },
          { name: 'Kneeling Hip Flexor PAILs/RAILs', detail: '90s passive, 2 rounds contractions', sets: '1', reps: 'Full protocol' },
          { name: 'Pigeon Pose', detail: 'Passive, let gravity work', sets: '1', reps: '90s each' },
          { name: 'Frog Stretch', detail: 'Passive hold, breathe into groin', sets: '1', reps: '90s' },
          { name: 'Cossack Squat', detail: '3-sec hold at depth', sets: '2', reps: '8 each side' },
        ],
      },
      { name: 'Mobility — Spine & Shoulder', duration: '20 min', color: '#1D5FA8', items: [
        { name: 'Cat-Cow', detail: 'Full spinal wave, 15 slow cycles', sets: '2', reps: '15' },
        { name: 'Thread the Needle', detail: 'Pause at full rotation', sets: '2', reps: '8 each side' },
        { name: 'Foam Roller T-Spine', detail: 'Segment through each level', sets: '2', reps: '10' },
        { name: 'Shoulder CARs', detail: 'Biggest circle, both arms', sets: '2', reps: '5 each' },
        { name: 'Sleeper Stretch PAILs', detail: 'Full protocol both sides', sets: '1', reps: 'Full protocol' },
        { name: "Child's Pose with Lat Reach", detail: 'Both sides', sets: '1', reps: '90s each' },
      ]},
      { name: 'Stability Circuit — Low Load', duration: '20 min', color: '#B5197A',
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
    id: 'd5', day: 'Day 5', label: 'Strength — Upper Pull + Spine Stability', type: 'FULL',
    focus: 'Vertical & horizontal pull, posterior chain upper body', equipment: 'Barbell, pull-up bar, DB, KB, bands, rower', totalTime: '90 min',
    sections: [
      { name: 'Warm-Up', duration: '10 min', color: '#0A7C4E', items: [
        { name: 'Rower', detail: '2 min building effort — start easy, finish moderate', sets: '', reps: '2 min' },
        { name: 'Band Pull-Aparts', detail: '3 variations, shoulders down', sets: '2', reps: '15 each' },
        { name: 'Thoracic Rotation Side-Lying', detail: '3-sec hold at open position', sets: '2', reps: '10 each side' },
        { name: 'Dead Bug', detail: 'Lower back pressed down', sets: '2', reps: '8 each side' },
        { name: 'Shoulder CARs', detail: '3 each direction per arm', sets: '1', reps: '3 each direction' },
      ]},
      { name: 'Strength Block', duration: '55 min', color: '#E8500A', items: [
        { name: 'Weighted Pull-Up / Chin-Up', detail: '3-sec descent, full hang at bottom.', sets: '4', reps: '5–6', rest: '2:30', stability: 'Bird Dog 8 each side' },
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
    id: 'd6', day: 'Day 6', label: 'Muscular Endurance — Lower Body & Core', type: 'FULL',
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
      { name: 'Endurance Circuit — 3 Rounds', duration: '40 min', color: '#B5197A',
        note: 'Complete all 6 movements back to back as one round, then rest 2 min. RPE 7–8/10.',
        items: [
          { name: 'Rower Sprint', detail: 'All-out effort', sets: '3 rounds', reps: '250m' },
          { name: 'Barbell Thruster', detail: 'Front squat into overhead press, unbroken', sets: '3 rounds', reps: '10 reps' },
          { name: 'Box Jump', detail: 'Soft landing, full hip extension, step down', sets: '3 rounds', reps: '8 reps' },
          { name: 'KB Goblet Squat — Slow Eccentric', detail: '4-sec descent', sets: '3 rounds', reps: '12 reps' },
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
    focus: 'Complete recovery', equipment: 'None', totalTime: '—',
    sections: [
      { name: 'Rest Day Guidelines', duration: '', color: '#5A6472', items: [
        { name: 'No structured training', detail: 'This is where adaptation happens. The work you did Mon–Sat is only useful if the body has time to rebuild.', sets: '', reps: '' },
        { name: 'Light walking is fine', detail: 'Keep it easy and enjoyable — not a training stimulus.', sets: '', reps: '' },
        { name: 'Hydration & nutrition', detail: 'Aim 0.7–1g protein per lb bodyweight. Replenish glycogen with quality carbs.', sets: '', reps: '' },
        { name: 'Sleep priority', detail: 'Extra 30–60 min if possible — GH peaks during sleep and muscle repair is most active.', sets: '', reps: '' },
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
  'Endurance Circuit — 4 Rounds': '⚡',
  'Endurance Circuit — 3 Rounds': '⚡',
  'Strength Primer': '🎯',
  'Core & Stability Finisher': '🔩',
  'Core Finisher': '🔩',
  'Cool-Down': '🌊',
  'Mobility — Lower Body': '🦵',
  'Mobility — Spine & Shoulder': '🔄',
  'Stability Circuit — Low Load': '⚖️',
  'Neck & Breathing': '🧠',
  'Rest Day Guidelines': '😴',
};

export const TRAINING_SET_SECTIONS = [
  'Strength Block', 'Strength Primer',
  'Core & Stability Finisher', 'Core Finisher',
];

export const getWeekSets = (item, sectionName, weekIdx) => {
  const base = parseInt(item.sets, 10);
  if (!base || isNaN(base)) return item.sets || '—';
  if (!TRAINING_SET_SECTIONS.includes(sectionName)) return String(base);
  if (weekIdx === 2) return String(base + 1);
  return String(base);
};

export const logKey = (w, d, si, ii) => `w${w}-${d}-s${si}-i${ii}`;
export const sessionKey = (w, d) => `session-w${w}-${d}`;
