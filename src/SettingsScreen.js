import React, { useState } from 'react';
import { formatDate } from './hooks';

export default function SettingsScreen({ apiKey, setApiKey, startDate, setStartDate, syncFromDate, onChangeDateRequest, isMobile }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState(false);

  const handleSave = () => {
    setApiKey(inputKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const s = {
    page: { maxWidth: 680, margin: '0 auto', padding: isMobile ? '20px 16px 80px' : '28px 24px 80px' },
    heading: { fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#1A1A1A', margin: '0 0 4px' },
    sub: { fontSize: 14, color: '#666', margin: '0 0 28px', fontStyle: 'italic' },
    card: { background: '#fff', borderRadius: 12, border: '1px solid #E0DDD6', marginBottom: 16, overflow: 'hidden' },
    cardHeader: { padding: '14px 18px', borderBottom: '1px solid #F0EDE6', background: '#F5F5F0' },
    cardTitle: { fontSize: 15, fontWeight: 700, color: '#1A1A1A', margin: 0 },
    cardBody: { padding: '18px 18px' },
    label: { fontSize: 12, fontFamily: 'monospace', color: '#888', textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 6 },
    input: { width: '100%', padding: '10px 12px', fontSize: 14, fontFamily: 'monospace', border: '1px solid #D0CCC4', borderRadius: 8, outline: 'none', background: '#fff', boxSizing: 'border-box' },
    btn: { padding: '11px 24px', background: saved ? '#0A7C4E' : '#E8500A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', letterSpacing: '0.06em', marginTop: 12 },
    infoBox: { padding: '12px 16px', background: '#FFF8F5', borderRadius: 8, border: '1px solid #F5D8CC', fontSize: 13, color: '#666', lineHeight: 1.7, marginTop: 12 },
    row: { display: 'flex', gap: 8, alignItems: 'center' },
    toggleBtn: { padding: '10px 12px', background: '#F5F5F0', border: '1px solid #E0DDD6', borderRadius: 8, fontSize: 12, color: '#666', cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'monospace' },
  };

  return (
    <div style={s.page}>
      <h1 style={s.heading}>Settings</h1>
      <p style={s.sub}>Configure your app and API connection</p>

      {/* API Key */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>🔑 Anthropic API Key</p></div>
        <div style={s.cardBody}>
          <label style={s.label}>API Key</label>
          <div style={s.row}>
            <input
              type={showKey ? 'text' : 'password'}
              placeholder="sk-ant-api03-..."
              value={inputKey}
              onChange={e => setInputKey(e.target.value)}
              style={{ ...s.input, flex: 1 }}
            />
            <button onClick={() => setShowKey(v => !v)} style={s.toggleBtn}>
              {showKey ? 'Hide' : 'Show'}
            </button>
          </div>
          <button onClick={handleSave} style={s.btn}>
            {saved ? '✓ Saved' : 'Save Key'}
          </button>
          <div style={s.infoBox}>
            <strong>Where to get your API key:</strong><br />
            1. Go to <strong>console.anthropic.com</strong><br />
            2. Click <strong>API Keys</strong> in the left sidebar<br />
            3. Click <strong>Create Key</strong> — copy it here<br /><br />
            Your key is stored only on this device and never sent anywhere except directly to Anthropic when you request a weekly review.
          </div>
        </div>
      </div>

      {/* Athlete Profile */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>👤 Athlete Profile</p></div>
        <div style={s.cardBody}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
            {[['Age', '52'], ['Height', "6'1\""], ['Weight', '190lbs'], ['Level', 'Intermediate']].map(([label, val]) => (
              <div key={label}>
                <label style={s.label}>{label}</label>
                <div style={{ padding: '10px 12px', background: '#F5F5F0', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', color: '#444' }}>{val}</div>
              </div>
            ))}
          </div>
          <div style={{ ...s.infoBox, marginTop: 0 }}>
            Profile details are used in weekly Claude reviews to provide age-appropriate, personalised feedback.
          </div>
        </div>
      </div>

      {/* Programme Date */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>📅 Programme Schedule</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 12 }}>
            <strong>Start Date:</strong> {startDate ? formatDate(startDate) : 'Not set'}<br />
            The app uses this to automatically track your current week and day.
          </div>
          <button onClick={onChangeDateRequest} style={{ ...s.btn, background: '#1A1A1A', marginTop: 0 }}>
            Change Start Date
          </button>
        </div>
      </div>

      {/* Phase 2 */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>🚀 Build Phase 2</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#555', lineHeight: 1.7, marginBottom: 12 }}>
            When you've completed Phase 1, use this to generate a summary of your training data. Paste it into Claude and Phase 2 will be built based on your actual performance.
          </div>
          <Phase2Generator startDate={startDate} isMobile={isMobile} />
        </div>
      </div>

      {/* About */}
      <div style={s.card}>
        <div style={s.cardHeader}><p style={s.cardTitle}>ℹ️ About</p></div>
        <div style={s.cardBody}>
          <div style={{ fontSize: 13, color: '#666', lineHeight: 1.8 }}>
            <strong>Hybrid Training Programme</strong><br />
            Phase 1 — Foundation · Weeks 1–4<br /><br />
            Built for: 52yo · 6'1" · 190lbs · Intermediate<br />
            Goals: Athletic performance + lean muscle<br /><br />
            <span style={{ color: '#999' }}>Your training data is stored locally on this device. Weekly reviews are sent securely to Anthropic via your API key.</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PHASE 2 GENERATOR ───────────────────────────────────────────────────────
function Phase2Generator({ startDate, isMobile }) {
  const [copied, setCopied] = useState(false);

  const generateSummary = () => {
    const lines = [];
    lines.push('═══════════════════════════════════════════════════');
    lines.push('PHASE 1 COMPLETE — BUILD PHASE 2');
    lines.push('═══════════════════════════════════════════════════');
    lines.push('Athlete: 52yo · 6'1" · 190lbs · Intermediate');
    lines.push('Goals: Athletic performance + lean muscle');
    lines.push('Equipment: Full home gym — barbell, rack, DB, KB,');
    lines.push('  pull-up bar, box, wallball, jump rope,');
    lines.push('  assault bike, rower');
    lines.push('Outside activity: Running/cycling + hiking');
    lines.push('Phase 1 duration: 4 weeks');
    lines.push('Session length: 90 min · Morning training');
    lines.push('');
    lines.push('Phase 1 structure was:');
    lines.push('  Day 1: Strength — Lower Body (squat/hinge)');
    lines.push('  Day 2: Strength — Upper Push + Shoulder Stability');
    lines.push('  Day 3: Muscular Endurance — Full Body Circuit');
    lines.push('  Day 4: Active Recovery — Mobility & Stability');
    lines.push('  Day 5: Strength — Upper Pull + Spine Stability');
    lines.push('  Day 6: Muscular Endurance — Lower Body & Core');
    lines.push('  Day 7: Full Rest');
    lines.push('');
    lines.push('Weekly progression:');
    lines.push('  Week 1–2: Baseline sets, conservative loads');
    lines.push('  Week 3: +1 set on all strength/core exercises');
    lines.push('  Week 4: Mini-deload — sets return to baseline');
    lines.push('');
    lines.push('Please design Phase 2 (Weeks 5–8) that:');
    lines.push('1. Builds logically on Phase 1 foundation');
    lines.push('2. Increases intensity/complexity appropriately');
    lines.push('3. Maintains the same 7-day structure');
    lines.push('4. Incorporates mobility and stability as before');
    lines.push('5. Is appropriate for a 52-year-old intermediate athlete');
    lines.push('');
    lines.push('NOTE: Attach your Week 4 log review for personalised');
    lines.push('load recommendations in Phase 2.');
    lines.push('═══════════════════════════════════════════════════');
    return lines.join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateSummary()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        style={{ padding: '11px 22px', background: copied ? '#0A7C4E' : '#E8500A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s', textTransform: 'uppercase', letterSpacing: '0.06em' }}
      >
        {copied ? '✓ Copied to Clipboard' : '📋 Copy Phase 2 Request'}
      </button>
      <div style={{ marginTop: 10, fontSize: 12, color: '#999', lineHeight: 1.6 }}>
        Paste this into Claude along with your Week 4 log review. Claude will design Phase 2 based on your actual performance data.
      </div>
    </div>
  );
}
