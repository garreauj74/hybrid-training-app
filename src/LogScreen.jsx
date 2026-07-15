import React, { useState } from 'react';
import { TYPE_COLORS, SECTION_ICONS, logKey, sessionKey } from './data.js';

export default function LogScreen({
  activeWeek, setActiveWeek, activeDay, setActiveDay,
  logs, sessions, updateLog, updateSession,
  apiKey, isMobile,
  activePhase, setActivePhase,
  currentWeekNotes, currentDays, currentGetWeekSets
}) {
  const [viewMode, setViewMode] = useState('day');
  const [reviewing, setReviewing] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [copied, setCopied] = useState(false);

  const day = currentDays.find(d => d.id === activeDay);

  const getLog = (key) => logs[key] || { weight: '', reps: '', rpe: '', notes: '', mobilityNotes: '' };
  const getSess = (key) => sessions[key] || { rpe: '', notes: '' };

  const dayLogCount = (wk, dayId) => {
    const d = currentDays.find(x => x.id === dayId);
    if (!d) return 0;
    let count = 0;
    d.sections.forEach((s, si) => {
      s.items.forEach((_, ii) => {
        const k = logKey(activePhase, wk, dayId, si, ii);
        const l = logs[k];
        if (l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes)) count++;
      });
    });
    return count;
  };

  const buildWeekSummary = (weekIdx) => {
    const lines = [];
    lines.push('TRAINING LOG -- Phase ' + activePhase + ', Week ' + (weekIdx + 1) + ' (' + currentWeekNotes[weekIdx].theme + ')');
    lines.push("Athlete: 52yo, 6'1\", 190lbs, Intermediate");
    lines.push('Goals: Athletic performance + lean muscle');
    lines.push('='.repeat(50));
    currentDays.forEach((d) => {
      const sk = sessionKey(activePhase, weekIdx, d.id);
      const sess = getSess(sk);
      let dayHasData = false;
      d.sections.forEach((s, si) => {
        s.items.forEach((_, ii) => {
          const l = logs[logKey(activePhase, weekIdx, d.id, si, ii)];
          if (l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes)) dayHasData = true;
        });
      });
      if (!dayHasData && !sess.rpe && !sess.notes) return;
      lines.push('');
      lines.push(d.day + ' -- ' + d.label + ' [' + d.type + ']');
      if (sess.rpe) lines.push('  Session RPE: ' + sess.rpe);
      if (sess.notes) lines.push('  Session Notes: ' + sess.notes);
      d.sections.forEach((section, si) => {
        section.items.forEach((item, ii) => {
          const l = logs[logKey(activePhase, weekIdx, d.id, si, ii)];
          if (!l || !(l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes)) return;
          const prescribed = currentGetWeekSets(item, section.name, weekIdx);
          lines.push('  ' + item.name + ' [prescribed: ' + prescribed + ' sets x ' + (item.reps || '--') + ']');
          if (l.weight) lines.push('    Weight: ' + l.weight + ' lbs');
          if (l.reps) lines.push('    Reps done: ' + l.reps);
          if (l.rpe) lines.push('    RPE: ' + l.rpe);
          if (l.notes) lines.push('    Notes: ' + l.notes);
          if (l.mobilityNotes) lines.push('    Mobility Notes: ' + l.mobilityNotes);
        });
      });
    });
    lines.push('');
    lines.push('='.repeat(50));
    return lines.join('\n');
  };

  const handleWeeklyReview = async () => {
    if (!apiKey) { setReviewError('No API key found. Please add your Anthropic API key in Settings.'); return; }
    setReviewing(true); setReviewText(''); setReviewError('');
    const summary = buildWeekSummary(activeWeek);
    const nextWeek = activeWeek + 1 < 4 ? 'Week ' + (activeWeek + 2) : 'Phase ' + (activePhase + 1);
    const prompt = 'You are an experienced hybrid cross-training coach. Review this training log for Phase ' + activePhase + ' Week ' + (activeWeek + 1) + ' and provide:\n1. Overall assessment\n2. Specific observations on lifts (RPE trends, weight progression, concerns)\n3. What is going well and what needs attention\n4. Specific recommendations for ' + nextWeek + '\n5. Recovery or technique notes\n\nBe direct, specific, reference actual numbers in lbs.\n\n' + summary;
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
        setReviewError('API error: ' + data.error.message);
      } else {
        const text = (data.content || []).filter(b => b.type === 'text').map(b => b.text).join('');
        setReviewText(text);
      }
    } catch (e) {
      setReviewError('Network error: ' + e.message);
    }
    setReviewing(false);
  };

  const handleCopyLog = () => {
    navigator.clipboard.writeText(buildWeekSummary(activeWeek)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const weekBtn = (active) => ({
    padding: '5px 10px',
    background: active ? '#E8500A' : '#fff',
    border: active ? '1px solid #E8500A' : '1px solid #D0CCC4',
    borderRadius: 6, color: active ? '#fff' : '#555',
    cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: active ? 700 : 400,
  });

  const viewBtn = (active) => ({
    padding: '5px 10px',
    background: active ? '#1A1A1A' : '#fff',
    border: active ? '1px solid #1A1A1A' : '1px solid #D0CCC4',
    borderRadius: 6, color: active ? '#fff' : '#555',
    cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: active ? 700 : 400,
  });

  const dayBtn = (active, tc) => ({
    flexShrink: 0, padding: '6px 9px',
    background: active ? tc.bg : '#fff',
    border: '1px solid ' + (active ? tc.bg : '#D0CCC4'),
    borderRadius: 6, color: active ? '#fff' : '#555',
    cursor: 'pointer', fontFamily: 'monospace', fontSize: 11, fontWeight: active ? 700 : 400,
  });

  const inputStyle = (hasVal) => ({
    width: '100%', padding: '6px 8px', fontSize: 16,
    fontFamily: 'monospace',
    border: '1px solid ' + (hasVal ? '#10B981' : '#D0CCC4'),
    borderRadius: 5, outline: 'none',
    background: hasVal ? '#F0FDF4' : '#fff',
    boxSizing: 'border-box',
  });

  const mobilityStyle = (hasVal) => ({
    width: '100%', padding: '6px 8px', fontSize: 16,
    fontFamily: 'Georgia, serif',
    border: '1px solid ' + (hasVal ? '#7C3ACA' : '#D0CCC4'),
    borderRadius: 5, outline: 'none',
    background: hasVal ? '#F5F0FF' : '#fff',
    boxSizing: 'border-box',
  });

  const fieldGrid = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr 52px 1fr' : '1fr 1fr 60px 1.5fr',
    gap: 6, marginTop: 7,
  };

  const stickyHeader = {
    position: 'sticky', top: 48, zIndex: 50,
    background: '#FAFAF7', borderBottom: '2px solid #E0DDD6',
    padding: '10px 12px 8px',
  };

  // ── WEEKLY SUMMARY VIEW ──────────────────────────────────────────────────────
  if (viewMode === 'summary') {
    return (
      <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '0 12px 100px' : '0 16px 80px' }}>
        <div style={stickyHeader}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase' }}>Phase:</span>
              {[1, 2].map(p => (
                <button key={p} onClick={() => { setActivePhase(p); setActiveWeek(0); setActiveDay('d1'); }}
                  style={{ ...weekBtn(activePhase === p), background: activePhase === p ? '#1A1A1A' : '#fff', border: activePhase === p ? '1px solid #1A1A1A' : '1px solid #D0CCC4', color: activePhase === p ? '#fff' : '#666' }}>P{p}</button>
              ))}
            </div>
            <button onClick={() => setViewMode('day')} style={viewBtn(false)}>Day Log</button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', flexShrink: 0 }}>Week:</span>
            <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {currentWeekNotes.map((_, i) => (
                <button key={i} onClick={() => setActiveWeek(i)} style={{ ...weekBtn(activeWeek === i), flexShrink: 0 }}>W{i + 1}</button>
              ))}
            </div>
          </div>
        </div>

        <div style={{ paddingTop: 16 }}>
          <h2 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 4px' }}>Week {activeWeek + 1} Summary</h2>
          <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', marginBottom: 14 }}>{currentWeekNotes[activeWeek].theme}</p>
          {currentDays.map(d => {
            const tc = TYPE_COLORS[d.type];
            const total = d.sections.reduce((n, s) => n + s.items.length, 0);
            const logged = dayLogCount(activeWeek, d.id);
            const pct = total > 0 ? Math.round((logged / total) * 100) : 0;
            const sess = getSess(sessionKey(activePhase, activeWeek, d.id));
            return (
              <div key={d.id} style={{ background: '#fff', borderRadius: 8, border: '1px solid #E0DDD6', padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <span style={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700, background: tc.bg, color: tc.text, padding: '2px 6px', borderRadius: 3, flexShrink: 0 }}>{d.type}</span>
                <div style={{ flex: 1, minWidth: 120 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3 }}>{d.day} -- {d.label}</div>
                  <div style={{ background: '#F0EDE6', borderRadius: 20, height: 4, overflow: 'hidden' }}>
                    <div style={{ width: pct + '%', height: '100%', background: pct === 100 ? '#0A7C4E' : pct > 0 ? '#E8500A' : '#D0CCC4', borderRadius: 20 }} />
                  </div>
                  <div style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', marginTop: 2 }}>{logged}/{total} logged {sess.rpe ? '· RPE ' + sess.rpe : ''}</div>
                </div>
                <button onClick={() => { setActiveDay(d.id); setViewMode('day'); }} style={{ ...viewBtn(false), fontSize: 10, padding: '4px 9px' }}>Log</button>
              </div>
            );
          })}

          <div style={{ marginTop: 20, padding: '16px 18px', background: '#F5F5F0', borderRadius: 10, border: '1px solid #E0DDD6', borderLeft: '5px solid #E8500A' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 4 }}>Weekly Claude Review</div>
            <p style={{ fontSize: 12, color: '#666', lineHeight: 1.6, margin: '0 0 12px' }}>Send this week's full log to Claude for personalised coaching feedback.</p>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <button onClick={handleWeeklyReview} disabled={reviewing} style={{ padding: '11px 22px', background: reviewing ? '#ccc' : '#E8500A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 700, cursor: reviewing ? 'default' : 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {reviewing ? 'Analysing...' : 'Get Weekly Review'}
              </button>
              <button onClick={handleCopyLog} style={{ padding: '11px 22px', background: copied ? '#0A7C4E' : '#1A1A1A', color: '#fff', border: 'none', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {copied ? 'Copied' : 'Copy Log'}
              </button>
            </div>
            {reviewError && <div style={{ padding: '10px 14px', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: 13, color: '#DC2626', marginTop: 10 }}>{reviewError}</div>}
            {!apiKey && !reviewError && <div style={{ padding: '10px 14px', background: '#FFF8F5', border: '1px solid #F5D8CC', borderRadius: 8, fontSize: 13, color: '#C2440E', marginTop: 10 }}>Add your Anthropic API key in Settings to enable in-app reviews.</div>}
            {reviewText && (
              <div style={{ padding: '16px', background: '#fff', border: '1px solid #E0DDD6', borderRadius: 10, marginTop: 14, lineHeight: 1.8, fontSize: 14, color: '#333', whiteSpace: 'pre-wrap' }}>
                <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#E8500A', fontWeight: 700, marginBottom: 10, textTransform: 'uppercase' }}>Phase {activePhase} Week {activeWeek + 1} Review</div>
                {reviewText}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ── DAY LOG VIEW ─────────────────────────────────────────────────────────────
  return (
    <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '0 12px 100px' : '0 16px 80px' }}>

      {/* Sticky header */}
      <div style={stickyHeader}>
        {/* Row 1: Phase + View toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase' }}>Phase:</span>
            {[1, 2].map(p => (
              <button key={p} onClick={() => { setActivePhase(p); setActiveWeek(0); setActiveDay('d1'); }}
                style={{ ...weekBtn(activePhase === p), background: activePhase === p ? '#1A1A1A' : '#fff', border: activePhase === p ? '1px solid #1A1A1A' : '1px solid #D0CCC4', color: activePhase === p ? '#fff' : '#666' }}>P{p}</button>
            ))}
          </div>
          <button onClick={() => setViewMode('summary')} style={viewBtn(false)}>Week Summary</button>
        </div>

        {/* Row 2: Week selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginBottom: 6 }}>
          <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', flexShrink: 0 }}>Week:</span>
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {currentWeekNotes.map((_, i) => (
              <button key={i} onClick={() => setActiveWeek(i)} style={{ ...weekBtn(activeWeek === i), flexShrink: 0 }}>W{i + 1}</button>
            ))}
          </div>
        </div>

        {/* Row 3: Day selector */}
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 2 }}>
          {currentDays.map(d => {
            const dtc = TYPE_COLORS[d.type];
            const isActive = activeDay === d.id;
            const count = dayLogCount(activeWeek, d.id);
            return (
              <button key={d.id} onClick={() => setActiveDay(d.id)} style={dayBtn(isActive, dtc)}>
                {d.day}
                {count > 0 && (
                  <span style={{ marginLeft: 3, background: isActive ? 'rgba(255,255,255,0.35)' : '#10B981', color: '#fff', borderRadius: 8, padding: '0px 4px', fontSize: 8, fontWeight: 700 }}>{count}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Day header */}
      <div style={{ padding: '10px 14px', background: '#F5F5F0', borderRadius: '8px 8px 0 0', borderLeft: '5px solid ' + TYPE_COLORS[day.type].bg }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, background: TYPE_COLORS[day.type].bg, color: TYPE_COLORS[day.type].text, padding: '2px 8px', borderRadius: 3 }}>{day.type}</span>
          <span style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>Phase {activePhase} Week {activeWeek + 1}</span>
        </div>
        <div style={{ fontSize: isMobile ? 13 : 15, fontWeight: 700, color: '#1A1A1A' }}>{day.day} -- {day.label}</div>
      </div>

      {/* Exercise sections */}
      {day.sections.map((section, si) => (
        <div key={si}>
          <div style={{ padding: '7px 13px', background: section.color + '15', borderLeft: '3px solid ' + section.color }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: section.color }}>{SECTION_ICONS[section.name] || '•'} {section.name}</span>
          </div>

          {section.items.map((item, ii) => {
            const itemKey = logKey(activePhase, activeWeek, activeDay, si, ii);
            const itemLog = getLog(itemKey);
            const hasEntry = !!(itemLog.weight || itemLog.reps || itemLog.rpe || itemLog.notes || itemLog.mobilityNotes);
            const adjSets = currentGetWeekSets(item, section.name, activeWeek);

            return (
              <div key={si + '-' + ii} style={{ padding: '10px 13px', borderBottom: '1px solid #F0EDE6', background: hasEntry ? '#F0FDF4' : ii % 2 === 0 ? '#fff' : '#FDFDFB' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 6 }}>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{item.name}</div>
                    <div style={{ fontSize: 9, color: '#E8500A', fontFamily: 'monospace' }}>KEY: {itemKey}</div>
                    <div style={{ fontSize: 10, color: '#888', fontFamily: 'monospace', marginTop: 1 }}>
                      {adjSets && adjSets !== '--' ? adjSets + ' sets' : ''}{item.reps ? ' x ' + item.reps : ''}{item.rest ? ' · Rest ' + item.rest : ''}
                    </div>
                  </div>
                  {hasEntry && <span style={{ fontSize: 10, color: '#10B981', fontFamily: 'monospace', fontWeight: 700, flexShrink: 0 }}>✓</span>}
                </div>

                {/* Weight | Reps | RPE | Notes */}
                <div style={fieldGrid}>
                  <div>
                    <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Wt (lbs)</div>
                    <input type="text" placeholder="135" value={itemLog.weight || ''} autoComplete="off"
                      onChange={(e) => { const v = e.target.value; updateLog(itemKey, 'weight', v); }}
                      style={inputStyle(itemLog.weight)} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Reps</div>
                    <input type="text" placeholder="5,5,5" value={itemLog.reps || ''} autoComplete="off"
                      onChange={(e) => { const v = e.target.value; updateLog(itemKey, 'reps', v); }}
                      style={inputStyle(itemLog.reps)} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>RPE</div>
                    <input type="text" placeholder="7" value={itemLog.rpe || ''} autoComplete="off"
                      onChange={(e) => { const v = e.target.value; updateLog(itemKey, 'rpe', v); }}
                      style={inputStyle(itemLog.rpe)} />
                  </div>
                  <div>
                    <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Notes</div>
                    <input type="text" placeholder="Short note..." value={itemLog.notes || ''} autoComplete="off"
                      onChange={(e) => { const v = e.target.value; updateLog(itemKey, 'notes', v); }}
                      style={inputStyle(itemLog.notes)} />
                  </div>
                </div>

                {/* Mobility notes */}
                <div style={{ marginTop: 5 }}>
                  <div style={{ fontSize: 9, color: '#7C3ACA', fontFamily: 'monospace', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Mobility / Form Notes</div>
                  <input type="text" placeholder="Range of motion, tightness, technique cues..." value={itemLog.mobilityNotes || ''} autoComplete="off"
                    onChange={(e) => { const v = e.target.value; updateLog(itemKey, 'mobilityNotes', v); }}
                    style={mobilityStyle(itemLog.mobilityNotes)} />
                </div>
              </div>
            );
          })}
        </div>
      ))}

      {/* Session overview */}
      <div style={{ padding: '12px 14px', background: '#F5F5F0', border: '1px solid #E0DDD6', borderRadius: '0 0 8px 8px', marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Session Overview</div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '80px 1fr' : '120px 1fr', gap: 8 }}>
          <div>
            <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 2 }}>Session RPE</div>
            <input type="text" placeholder="1-10" autoComplete="off"
              value={getSess(sessionKey(activePhase, activeWeek, activeDay)).rpe}
              onChange={(e) => updateSession(sessionKey(activePhase, activeWeek, activeDay), 'rpe', e.target.value)}
              style={{ ...inputStyle(false), fontSize: 16 }} />
          </div>
          <div>
            <div style={{ fontSize: 9, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 2 }}>Session Notes</div>
            <input type="text" placeholder="Energy, soreness, anything notable..." autoComplete="off"
              value={getSess(sessionKey(activePhase, activeWeek, activeDay)).notes}
              onChange={(e) => updateSession(sessionKey(activePhase, activeWeek, activeDay), 'notes', e.target.value)}
              style={{ ...inputStyle(false), fontFamily: 'Georgia, serif' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
