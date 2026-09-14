import React, { useState } from 'react';
import { DEFAULT_LOADS } from './data.js';
import { formatDate } from './hooks.js';

export default function SettingsScreen({ apiKey, setApiKey, startDate, setStartDate, syncFromDate, onChangeDateRequest, customLoads, setCustomLoads, isMobile }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [editLoads, setEditLoads] = useState(false);
  const [loadValues, setLoadValues] = useState({ ...DEFAULT_LOADS, ...customLoads });
  const [loadsSaved, setLoadsSaved] = useState(false);

  const handleSaveKey = () => { setApiKey(inputKey.trim()); setKeySaved(true); setTimeout(() => setKeySaved(false), 2000); };
  const handleSaveLoads = () => { setCustomLoads(loadValues); setLoadsSaved(true); setEditLoads(false); setTimeout(() => setLoadsSaved(false), 2000); };

  const s = {
    page: { maxWidth: 680, margin: '0 auto', padding: isMobile ? '20px 16px 80px' : '28px 24px 80px' },
    card: { background: '#fff', borderRadius: 12, border: '1px solid #E0DDD6', marginBottom: 16, overflow: 'hidden' },
    cardHeader: { padding: '12px 16px', background: '#F5F5F0', borderBottom: '1px solid #F0EDE6' },
    cardTitle: { fontSize: 14, fontWeight: 700, margin: 0 },
    cardBody: { padding: '16px' },
    label: { fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 5 },
    input: { width: '100%', padding: '10px 12px', fontSize: 16, fontFamily: 'monospace', border: '1px solid #D0CCC4', borderRadius: 8, outline: 'none', background: '#fff', boxSizing: 'border-box' },
    btn: (color) => ({ padding: '10px 20px', background: color, color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', marginTop: 10 }),
    infoBox: { padding: '10px 14px', background: '#FFF8F5', borderRadius: 8, border: '1px solid #F5D8CC', fontSize: 12, color: '#666', lineHeight: 1.7, marginTop: 10 },
  };

  const loads = { ...DEFAULT_LOADS, ...customLoads };

  return (
    <div style={s.page}>
      <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, margin: '0 0 4px' }}>Settings</h1>
      <p style={{ fontSize: 13, color: '#888', fontStyle: 'italic', margin: '0 0 24px' }}>Configure your app</p>

      {/* API Key */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>🔑 Anthropic API Key</p></div>
        <div style={s.cardBody}>
          <label style={s.label}>API Key</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input type={showKey ? 'text' : 'password'} placeholder="sk-ant-api03-..." value={inputKey} onChange={e => setInputKey(e.target.value)} style={{ ...s.input, flex: 1 }} />
            <button onClick={() => setShowKey(v => !v)} style={{ padding: '10px 12px', background: '#F5F5F0', border: '1px solid #D0CCC4', borderRadius: 8, fontSize: 12, color: '#666', cursor: 'pointer', fontFamily: 'monospace', flexShrink: 0 }}>{showKey ? 'Hide' : 'Show'}</button>
          </div>
          <button onClick={handleSaveKey} style={s.btn(keySaved ? '#0A7C4E' : '#E8500A')}>{keySaved ? '✓ Saved' : 'Save Key'}</button>
          <div style={s.infoBox}>Go to <strong>console.anthropic.com</strong> → API Keys → Create Key. Your key is stored only on this device.</div>
        </div>
      </div>

      {/* Starting Loads */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>🏋️ Starting Loads</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 12, color: '#666', marginBottom: 12, lineHeight: 1.6 }}>
            These are your Week 1 starting loads. Edit them if you want to adjust from the defaults. The programme tab shows these loads next to each exercise.
          </div>
          {!editLoads ? (
            <div>
              {Object.entries(loads).map(([name, weight]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F0EDE6' }}>
                  <div style={{ fontSize: 13, color: '#333' }}>{name}</div>
                  <div style={{ fontSize: 13, fontFamily: 'monospace', fontWeight: 700, color: '#E8500A' }}>{weight === 0 ? 'BW' : weight + ' lbs'}</div>
                </div>
              ))}
              <button onClick={() => setEditLoads(true)} style={s.btn('#1A1A1A')}>Edit Loads</button>
            </div>
          ) : (
            <div>
              {Object.entries(loadValues).map(([name, weight]) => (
                <div key={name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <label style={{ fontSize: 12, color: '#333', flex: 1 }}>{name}</label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <input type="number" value={weight} onChange={e => setLoadValues(prev => ({ ...prev, [name]: parseInt(e.target.value) || 0 }))} style={{ width: 80, padding: '7px 10px', fontSize: 14, fontFamily: 'monospace', border: '1px solid #D0CCC4', borderRadius: 6, outline: 'none', textAlign: 'center' }} />
                    <span style={{ fontSize: 12, color: '#999', fontFamily: 'monospace' }}>lbs</span>
                  </div>
                </div>
              ))}
              <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                <button onClick={handleSaveLoads} style={s.btn(loadsSaved ? '#0A7C4E' : '#E8500A')}>{loadsSaved ? '✓ Saved' : 'Save Loads'}</button>
                <button onClick={() => { setLoadValues({ ...DEFAULT_LOADS, ...customLoads }); setEditLoads(false); }} style={{ ...s.btn('#666'), marginTop: 10 }}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Programme Schedule */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>📅 Programme Schedule</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>Start Date:</strong> {startDate ? formatDate(startDate) : 'Not set'}<br />
            The app uses this to track your current week and day automatically.
          </div>
          <button onClick={onChangeDateRequest} style={s.btn('#1A1A1A')}>Change Start Date</button>
        </div>
      </div>

      {/* Build Next Phase */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>🚀 Build Next Phase</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 12 }}>When you complete Phase 1, use this to generate a summary for Claude. Paste it along with your Week 4 log review and Claude will design Phase 2 based on your actual performance.</div>
          <PhaseBuilder />
        </div>
      </div>

      {/* About */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>ℹ️ About</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
            <strong>Hybrid Training Programme</strong><br />
            Phase 1 -- Strength and Conditioning<br />
            Structure: Push / Pull / Legs + 2 WOD days + 2 Rest days<br /><br />
            Athlete: 52yo · 6\'1" · 190lbs · Intermediate<br />
            Goals: Athletic performance + lean muscle<br /><br />
            <span style={{ color: '#AAA', fontSize: 12 }}>Training data is stored locally on this device. Weekly reviews are sent to Anthropic via your API key.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PhaseBuilder() {
  const [copied, setCopied] = useState(false);
  const generate = () => {
    const lines = [
      '================================================',
      'PHASE 1 COMPLETE -- BUILD PHASE 2',
      '================================================',
      'Athlete: 52yo, 6\'1", 190lbs, Intermediate',
      'Goals: Athletic performance + lean muscle',
      'Equipment: Barbell, rack, incline bench, DB, KB,',
      '  pull-up bar, box, wallball, jump rope,',
      '  assault bike, rower',
      '',
      'Phase 1 structure (4 weeks):',
      '  Monday: Strength -- Push (75 min)',
      '  Tuesday: Conditioning -- WOD (60 min)',
      '  Wednesday: Rest',
      '  Thursday: Strength -- Pull (75 min)',
      '  Friday: Strength -- Legs (75 min)',
      '  Saturday: Conditioning -- WOD (60 min)',
      '  Sunday: Rest',
      '',
      'Weekly progression:',
      '  Week 1: Baseline loads, RPE 6-7',
      '  Week 2: +5lbs primary lifts',
      '  Week 3: +1 set all Strength Block exercises',
      '  Week 4: Deload -- sets return to baseline',
      '',
      'WOD categories:',
      '  A: Short and High Burst (10-15 min)',
      '  B: Medium and Medium Burst (20-30 min)',
      '  C: Longer and Light Burst (35-45 min)',
      '  Rotation: Week 1 Tue=A Sat=B, Week 2 Tue=C Sat=A, etc.',
      '',
      'Please design Phase 2 (next 4 weeks) that:',
      '1. Builds on Phase 1 with appropriate progression',
      '2. Maintains Push/Pull/Legs + 2 WOD + 2 Rest structure',
      '3. Increases intensity and complexity appropriately',
      '4. Is appropriate for a 52-year-old intermediate athlete',
      '5. Keeps sessions at 75 min strength, 60 min conditioning',
      '',
      'NOTE: Attach your Week 4 log review for personalised',
      'load recommendations in Phase 2.',
      '================================================',
    ];
    navigator.clipboard.writeText(lines.join('\n')).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
  };
  return (
    <div>
      <button onClick={generate} style={{ padding: '10px 20px', background: copied ? '#0A7C4E' : '#E8500A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase' }}>{copied ? '✓ Copied' : '📋 Copy Phase 2 Request'}</button>
      <div style={{ marginTop: 8, fontSize: 11, color: '#999', lineHeight: 1.6 }}>Paste into Claude along with your Week 4 log review.</div>
    </div>
  );
}
