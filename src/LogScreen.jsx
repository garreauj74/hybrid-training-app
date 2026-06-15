import React, { useState } from ‘react’;
import { TYPE_COLORS, SECTION_ICONS, logKey, sessionKey } from ‘./data.js’;

export default function LogScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, logs, sessions, updateLog, updateSession, apiKey, isMobile, activePhase, setActivePhase, currentWeekNotes, currentDays, currentGetWeekSets }) {
const [viewMode, setViewMode] = useState(‘day’);
const [reviewing, setReviewing] = useState(false);
const [reviewText, setReviewText] = useState(’’);
const [reviewError, setReviewError] = useState(’’);
const [copied, setCopied] = useState(false);

const day = currentDays.find(d => d.id === activeDay);

const getLog = key => logs[key] || { weight: ‘’, reps: ‘’, rpe: ‘’, notes: ‘’, mobilityNotes: ‘’ };
const getSess = key => sessions[key] || { rpe: ‘’, notes: ‘’ };

const dayLogCount = (wk, dayId) => {
const d = currentDays.find(x => x.id === dayId);
if (!d) return 0;
return d.sections.flatMap((s, si) => s.items.map((_, ii) => logKey(wk, dayId, si, ii)))
.filter(k => { const l = logs[k]; return l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes); }).length;
};

const buildWeekSummary = (weekIdx) => {
const lines = [];
lines.push(`TRAINING LOG — Phase ${activePhase}, Week ${weekIdx + 1} (${currentWeekNotes[weekIdx].theme})`);
lines.push(`Athlete: 52yo, 6'1", 190lbs, Intermediate`);
lines.push(`Goals: Athletic performance + lean muscle`);
lines.push(‘═’.repeat(50));
currentDays.forEach(d => {
const sk = sessionKey(weekIdx, d.id);
const sess = getSess(sk);
const dayHasData = d.sections.some((s, si) =>
s.items.some((_, ii) => { const l = logs[logKey(weekIdx, d.id, si, ii)]; return l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes); })
);
if (!dayHasData && !sess.rpe && !sess.notes) return;
lines.push(`\n${d.day} — ${d.label} [${d.type}]`);
if (sess.rpe) lines.push(`  Session RPE: ${sess.rpe}`);
if (sess.notes) lines.push(`  Session Notes: ${sess.notes}`);
d.sections.forEach((section, si) => {
section.items.forEach((item, ii) => {
const l = logs[logKey(weekIdx, d.id, si, ii)];
if (!l || !(l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes)) return;
const prescribed = currentGetWeekSets(item, section.name, weekIdx);
lines.push(`  ${item.name} [prescribed: ${prescribed} sets × ${item.reps || '—'}]`);
if (l.weight) lines.push(`    Weight: ${l.weight} lbs`);
if (l.reps) lines.push(`    Reps done: ${l.reps}`);
if (l.rpe) lines.push(`    RPE: ${l.rpe}`);
if (l.notes) lines.push(`    Notes: ${l.notes}`);
if (l.mobilityNotes) lines.push(`    Mobility Notes: ${l.mobilityNotes}`);
});
});
});
lines.push(’\n’ + ‘═’.repeat(50));
return lines.join(’\n’);
};

const handleWeeklyReview = async () => {
if (!apiKey) {
setReviewError(‘No API key found. Please add your Anthropic API key in Settings.’);
return;
}
setReviewing(true);
setReviewText(’’);
setReviewError(’’);
const summary = buildWeekSummary(activeWeek);
const prompt = `You are an experienced hybrid cross-training coach and health sciences professional. Review the following training log for Week ${activeWeek + 1} of Phase 1 (Foundation) and provide:

1. Overall assessment of the week — energy, consistency, performance
1. Specific observations on individual lifts or movements (RPE trends, weight progression, any concerns)
1. What’s going well and what needs attention
1. Specific recommendations for next week (Week ${activeWeek + 1 < 4 ? activeWeek + 2 : ‘Phase 2’})
1. Any recovery or technique notes based on what was logged

Be direct, specific, and use the actual data provided. Reference specific exercises and numbers in lbs. Keep the tone professional but conversational.

${summary}`;

```
try {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });
  const data = await response.json();
  if (data.error) {
    setReviewError(`API error: ${data.error.message}`);
  } else {
    const text = data.content?.filter(b => b.type === 'text').map(b => b.text).join('') || '';
    setReviewText(text);
  }
} catch (e) {
  setReviewError(`Network error: ${e.message}`);
}
setReviewing(false);
```

};

const handleCopyLog = () => {
const text = buildWeekSummary(activeWeek);
navigator.clipboard.writeText(text).then(() => {
setCopied(true);
setTimeout(() => setCopied(false), 2500);
});
};

// ── Styles ──────────────────────────────────────────────────────────────────
const s = {
// Sticky header wrapper
stickyHeader: {
position: ‘sticky’,
top: 0,
zIndex: 50,
background: ‘#FAFAF7’,
borderBottom: ‘1px solid #E0DDD6’,
paddingTop: 12,
paddingBottom: 10,
paddingLeft: isMobile ? 12 : 16,
paddingRight: isMobile ? 12 : 16,
marginLeft: isMobile ? -12 : -16,
marginRight: isMobile ? -12 : -16,
},
weekBtn: (active) => ({
padding: ‘5px 10px’,
background: active ? ‘#E8500A’ : ‘#fff’,
border: active ? ‘1px solid #E8500A’ : ‘1px solid #D0CCC4’,
borderRadius: 6,
color: active ? ‘#fff’ : ‘#555’,
cursor: ‘pointer’,
fontFamily: ‘monospace’,
fontSize: 12,
fontWeight: active ? 700 : 400,
}),
viewBtn: (active) => ({
padding: ‘5px 10px’,
background: active ? ‘#1A1A1A’ : ‘#fff’,
border: active ? ‘1px solid #1A1A1A’ : ‘1px solid #D0CCC4’,
borderRadius: 6,
color: active ? ‘#fff’ : ‘#555’,
cursor: ‘pointer’,
fontFamily: ‘monospace’,
fontSize: 12,
fontWeight: active ? 700 : 400,
}),
dayBtn: (active, tc) => ({
flex: ‘0 0 auto’,
padding: ‘6px 9px’,
background: active ? tc.bg : ‘#fff’,
border: `1px solid ${active ? tc.bg : '#D0CCC4'}`,
borderRadius: 6,
color: active ? ‘#fff’ : ‘#555’,
cursor: ‘pointer’,
fontFamily: ‘monospace’,
fontSize: 11,
fontWeight: active ? 700 : 400,
}),
sectionHead: (color) => ({
padding: ‘7px 14px’,
background: `${color}15`,
borderLeft: `4px solid ${color}`,
display: ‘flex’,
alignItems: ‘center’,
gap: 6,
}),
exerciseRow: (hasEntry, ii) => ({
padding: ‘10px 14px’,
borderBottom: ‘1px solid #F0EDE6’,
background: hasEntry ? ‘#F0FDF4’ : ii % 2 === 0 ? ‘#fff’ : ‘#FDFDFB’,
}),
// Compact 4-col grid on desktop, 4-col on mobile too (smaller inputs)
fieldGrid: {
display: ‘grid’,
gridTemplateColumns: isMobile ? ‘1fr 1fr 52px 1fr’ : ‘1fr 1fr 60px 1.5fr’,
gap: 6,
marginTop: 7,
},
// Second row for mobility notes — full width
mobilityRow: {
marginTop: 5,
},
fieldLabel: {
fontSize: 9,
color: ‘#999’,
fontFamily: ‘monospace’,
textTransform: ‘uppercase’,
letterSpacing: ‘0.08em’,
display: ‘block’,
marginBottom: 2,
},
fieldInput: (hasVal) => ({
width: ‘100%’,
padding: ‘6px 8px’,
fontSize: 12,
fontFamily: ‘monospace’,
border: hasVal ? ‘1px solid #10B981’ : ‘1px solid #D0CCC4’,
borderRadius: 5,
outline: ‘none’,
background: hasVal ? ‘#F0FDF4’ : ‘#fff’,
boxSizing: ‘border-box’,
}),
mobilityInput: (hasVal) => ({
width: ‘100%’,
padding: ‘6px 8px’,
fontSize: 12,
fontFamily: ‘Georgia, serif’,
border: hasVal ? ‘1px solid #7C3ACA’ : ‘1px solid #D0CCC4’,
borderRadius: 5,
outline: ‘none’,
background: hasVal ? ‘#F5F0FF’ : ‘#fff’,
boxSizing: ‘border-box’,
color: ‘#333’,
}),
sessCard: {
padding: ‘12px 14px’,
background: ‘#F5F5F0’,
border: ‘1px solid #E0DDD6’,
borderRadius: ‘0 0 8px 8px’,
marginBottom: 20,
},
reviewCard: {
padding: ‘16px’,
background: ‘#fff’,
border: ‘1px solid #E0DDD6’,
borderRadius: 10,
marginTop: 14,
lineHeight: 1.8,
fontSize: 14,
color: ‘#333’,
whiteSpace: ‘pre-wrap’,
},
primaryBtn: (color) => ({
padding: ‘11px 22px’,
background: color,
color: ‘#fff’,
border: ‘none’,
borderRadius: 8,
fontSize: 13,
fontFamily: ‘monospace’,
fontWeight: 700,
cursor: ‘pointer’,
transition: ‘background 0.2s’,
textTransform: ‘uppercase’,
letterSpacing: ‘0.06em’,
}),
errorBox: {
padding: ‘10px 14px’,
background: ‘#FEF2F2’,
border: ‘1px solid #FECACA’,
borderRadius: 8,
fontSize: 13,
color: ‘#DC2626’,
marginTop: 10,
},
};

// ── Weekly summary view ──────────────────────────────────────────────────────
const weeklySummaryView = (
<div style={{ paddingTop: 16 }}>
<h2 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, margin: ‘0 0 4px’ }}>Week {activeWeek + 1} Summary</h2>
<p style={{ fontSize: 12, color: ‘#888’, fontStyle: ‘italic’, marginBottom: 14 }}>{currentWeekNotes[activeWeek].theme}</p>
{currentDays.map(d => {
const tc = TYPE_COLORS[d.type];
const total = d.sections.flatMap(s => s.items).length;
const logged = dayLogCount(activeWeek, d.id);
const pct = total > 0 ? Math.round((logged / total) * 100) : 0;
const sess = getSess(sessionKey(activeWeek, d.id));
return (
<div key={d.id} style={{ background: ‘#fff’, borderRadius: 8, border: ‘1px solid #E0DDD6’, padding: ‘12px 14px’, marginBottom: 8, display: ‘flex’, alignItems: ‘center’, gap: 10, flexWrap: ‘wrap’ }}>
<span style={{ fontSize: 9, fontFamily: ‘monospace’, fontWeight: 700, background: tc.bg, color: tc.text, padding: ‘2px 6px’, borderRadius: 3, flexShrink: 0 }}>{d.type}</span>
<div style={{ flex: 1, minWidth: 120 }}>
<div style={{ fontSize: 13, fontWeight: 700, color: ‘#1A1A1A’, marginBottom: 3 }}>{d.day} — {d.label}</div>
<div style={{ background: ‘#F0EDE6’, borderRadius: 20, height: 4, overflow: ‘hidden’ }}>
<div style={{ width: `${pct}%`, height: ‘100%’, background: pct === 100 ? ‘#0A7C4E’ : pct > 0 ? ‘#E8500A’ : ‘#D0CCC4’, borderRadius: 20 }} />
</div>
<div style={{ fontSize: 10, color: ‘#999’, fontFamily: ‘monospace’, marginTop: 2 }}>
{logged}/{total} logged {sess.rpe ? `· RPE ${sess.rpe}` : ‘’}
</div>
</div>
<button onClick={() => { setActiveDay(d.id); setViewMode(‘day’); }} style={{ …s.viewBtn(false), fontSize: 10, padding: ‘4px 9px’ }}>Log →</button>
</div>
);
})}

```
  {/* Weekly Review card */}
  <div style={{ marginTop: 20, padding: '16px 18px', background: '#F5F5F0', borderRadius: 10, border: '1px solid #E0DDD6', borderLeft: '5px solid #E8500A' }}>
    <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Weekly Claude Review</div>
    <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, margin: '0 0 12px' }}>
      Send this week's full log to Claude for personalised coaching feedback and load recommendations.
    </p>
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={handleWeeklyReview} disabled={reviewing} style={{ ...s.primaryBtn('#E8500A'), opacity: reviewing ? 0.7 : 1 }}>
        {reviewing ? '⏳ Analysing...' : '🤖 Get Weekly Review'}
      </button>
      <button onClick={handleCopyLog} style={{ ...s.primaryBtn(copied ? '#0A7C4E' : '#1A1A1A') }}>
        {copied ? '✓ Copied' : '📋 Copy Log'}
      </button>
    </div>
    {reviewError && <div style={s.errorBox}>{reviewError}</div>}
    {!apiKey && !reviewError && (
      <div style={{ ...s.errorBox, background: '#FFF8F5', borderColor: '#F5D8CC', color: '#C2440E' }}>
        Add your Anthropic API key in Settings to enable in-app reviews.
      </div>
    )}
    {reviewText && (
      <div style={s.reviewCard}>
        <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#E8500A', fontWeight: 700, marginBottom: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Phase {activePhase} · Week {activeWeek + 1} Review
        </div>
        {reviewText}
      </div>
    )}
  </div>
</div>
```

);

// ── Day log view ─────────────────────────────────────────────────────────────
const dayLogView = (
<div style={{ paddingTop: 12 }}>
{/* Day header */}
<div style={{ padding: ‘10px 14px’, background: ‘#F5F5F0’, borderRadius: ‘8px 8px 0 0’, borderLeft: `5px solid ${TYPE_COLORS[day.type].bg}` }}>
<div style={{ display: ‘flex’, alignItems: ‘center’, gap: 8, marginBottom: 3 }}>
<span style={{ fontSize: 10, fontFamily: ‘monospace’, fontWeight: 700, background: TYPE_COLORS[day.type].bg, color: TYPE_COLORS[day.type].text, padding: ‘2px 8px’, borderRadius: 3 }}>{day.type}</span>
<span style={{ fontSize: 11, color: ‘#888’, fontFamily: ‘monospace’ }}>Week {activeWeek + 1}</span>
</div>
<div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: ‘#1A1A1A’ }}>{day.day} — {day.label}</div>
</div>

```
  {/* Exercise sections */}
  {day.sections.map((section, si) => (
    <div key={si}>
      <div style={s.sectionHead(section.color)}>
        <span style={{ fontSize: 12 }}>{SECTION_ICONS[section.name] || '•'}</span>
        <span style={{ fontSize: 11, fontWeight: 700, color: section.color }}>{section.name}</span>
      </div>
      {section.items.map((item, ii) => {
        const key = logKey(activeWeek, activeDay, si, ii);
        const log = getLog(key);
        const hasEntry = log.weight || log.reps || log.rpe || log.notes || log.mobilityNotes;
        const adjSets = currentGetWeekSets(item, section.name, activeWeek);
        return (
          <div key={ii} style={s.exerciseRow(hasEntry, ii)}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{item.name}</div>
                <div style={{ fontSize: 10, color: '#888', fontFamily: 'monospace', marginTop: 1 }}>
                  {adjSets && adjSets !== '—' ? `${adjSets} sets` : ''}{item.reps ? ` × ${item.reps}` : ''}{item.rest ? ` · Rest ${item.rest}` : ''}
                </div>
              </div>
              {hasEntry && <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'monospace', fontWeight: 700, flexShrink: 0 }}>✓</span>}
            </div>

            {/* Row 1: Weight | Reps | RPE | Notes */}
            <div style={s.fieldGrid}>
              {[
                { field: 'weight', label: 'Wt (lbs)', placeholder: '135' },
                { field: 'reps', label: 'Reps', placeholder: '5,5,5' },
                { field: 'rpe', label: 'RPE', placeholder: '7' },
                { field: 'notes', label: 'Notes', placeholder: 'Short note...' },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={s.fieldLabel}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={log[field] || ''}
                    onChange={e => updateLog(key, field, e.target.value)}
                    style={s.fieldInput(log[field])}
                  />
                </div>
              ))}
            </div>

            {/* Row 2: Mobility notes — full width, purple accent */}
            <div style={s.mobilityRow}>
              <label style={{ ...s.fieldLabel, color: '#7C3ACA' }}>Mobility / Form Notes</label>
              <input
                type="text"
                placeholder="Range of motion, tightness, technique cues..."
                value={log.mobilityNotes || ''}
                onChange={e => updateLog(key, 'mobilityNotes', e.target.value)}
                style={s.mobilityInput(log.mobilityNotes)}
              />
            </div>
          </div>
        );
      })}
    </div>
  ))}

  {/* Session overview */}
  <div style={s.sessCard}>
    <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Session Overview</div>
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '80px 1fr' : '120px 1fr', gap: 8 }}>
      <div>
        <label style={s.fieldLabel}>Session RPE</label>
        <input
          type="text"
          placeholder="1–10"
          value={getSess(sessionKey(activeWeek, activeDay)).rpe}
          onChange={e => updateSession(sessionKey(activeWeek, activeDay), 'rpe', e.target.value)}
          style={{ ...s.fieldInput(false), fontSize: 15 }}
        />
      </div>
      <div>
        <label style={s.fieldLabel}>Session Notes</label>
        <input
          type="text"
          placeholder="Energy, soreness, anything notable..."
          value={getSess(sessionKey(activeWeek, activeDay)).notes}
          onChange={e => updateSession(sessionKey(activeWeek, activeDay), 'notes', e.target.value)}
          style={{ ...s.fieldInput(false), fontFamily: 'Georgia, serif' }}
        />
      </div>
    </div>
  </div>
</div>
```

);

// ── Main render ──────────────────────────────────────────────────────────────
return (
<div style={{ maxWidth: 980, margin: ‘0 auto’, padding: isMobile ? ‘0 12px 100px’ : ‘0 16px 80px’ }}>

```
  {/* ── Sticky header ── */}
  <div style={s.stickyHeader}>
    {/* Row 1: Week selector + view toggle */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8 }}>
      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
        {currentWeekNotes.map((_, i) => (
          <button key={i} onClick={() => setActiveWeek(i)} style={s.weekBtn(activeWeek === i)}>W{i + 1}</button>
        ))}
        <span style={{ margin: '0 4px', color: '#D0CCC4', fontSize: 12 }}>|</span>
        {[1, 2].map(p => (
          <button key={p} onClick={() => { setActivePhase(p); setActiveWeek(0); setActiveDay('d1'); }} style={{ ...s.weekBtn(activePhase === p), background: activePhase === p ? '#1A1A1A' : '#fff', border: activePhase === p ? '1px solid #1A1A1A' : '1px solid #D0CCC4' }}>P{p}</button>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 5 }}>
        {[['day', 'Day Log'], ['summary', 'Week Summary']].map(([id, label]) => (
          <button key={id} onClick={() => setViewMode(id)} style={s.viewBtn(viewMode === id)}>{isMobile ? (id === 'day' ? 'Day' : 'Week') : label}</button>
        ))}
      </div>
    </div>

    {/* Row 2: Day selector (only in day log view) */}
    {viewMode === 'day' && (
      <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
        {currentDays.map(d => {
          const dtc = TYPE_COLORS[d.type];
          const isActive = activeDay === d.id;
          const count = dayLogCount(activeWeek, d.id);
          return (
            <button key={d.id} onClick={() => setActiveDay(d.id)} style={s.dayBtn(isActive, dtc)}>
              {d.day}
              {count > 0 && (
                <span style={{ marginLeft: 3, background: isActive ? 'rgba(255,255,255,0.35)' : '#10B981', color: '#fff', borderRadius: 8, padding: '0px 4px', fontSize: 8, fontWeight: 700 }}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    )}
  </div>

  {/* ── Content ── */}
  {viewMode === 'summary' ? weeklySummaryView : dayLogView}
</div>
```

);
}
