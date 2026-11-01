import React, { useState } from 'react';
import {
  DAYS, WEEK_NOTES, TYPE_COLORS, TYPE_LABEL, PHASE_NUM, logKey, sessionKey, loggableItems, isLoggedEntry,
  getLoad, rxText, repsPlaceholder, getSuggestedCategory, WOD_CATEGORIES,
} from './data.js';
import { F, C, MONO, ScrollArea, WeekDayBar, WodDetail, Label, inputStyle } from './ui.jsx';
import WodPicker from './WodPicker.jsx';

const toggleBtn = (active) => ({
  padding: '5px 10px', background: active ? C.ink : '#fff', border: '1px solid ' + (active ? C.ink : '#D0CCC4'),
  borderRadius: 6, color: active ? '#fff' : '#555', fontFamily: MONO, fontSize: F(12), fontWeight: active ? 700 : 400, flex: '0 0 auto',
});

export default function LogScreen(props) {
  const { activeWeek, setActiveWeek, activeDay, setActiveDay, logs, sessions, getWODs, isMobile } = props;
  const [view, setView] = useState('day');
  const day = DAYS.find((d) => d.id === activeDay);

  // Number of logged items per day, shown as badges in the day row.
  const counts = {};
  DAYS.forEach((d) => {
    if (d.type === 'FULL') {
      counts[d.id] = loggableItems(d).filter((x) => isLoggedEntry(logs[logKey(activeWeek, d.id, x.item.name)])).length;
    } else if (d.type === 'CONDITIONING') {
      counts[d.id] = getWODs(activeWeek, d.id).length;
    } else {
      counts[d.id] = 0;
    }
  });

  const toggle = (
    <div style={{ display: 'flex', gap: 5 }}>
      <button data-testid="view-day" onClick={() => setView('day')} style={toggleBtn(view === 'day')}>Day</button>
      <button data-testid="view-week" onClick={() => setView('summary')} style={toggleBtn(view === 'summary')}>Week</button>
    </div>
  );

  return (
    <>
      <WeekDayBar testId="log-header" showDays={view === 'day'} activeWeek={activeWeek} setActiveWeek={setActiveWeek}
        activeDay={activeDay} onDay={setActiveDay} counts={counts} right={toggle} />
      <ScrollArea key={view + '-' + activeWeek + '-' + activeDay}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '12px 12px 40px' : '16px 16px 40px' }}>
          {view === 'summary'
            ? <WeekSummary {...props} setView={setView} counts={counts} />
            : <DayLog {...props} day={day} />}
        </div>
      </ScrollArea>
    </>
  );
}

// ---------------------------------------------------------------------------
function DayLog(props) {
  const { day, activeWeek, activeDay, sessions, updateSession, isMobile } = props;
  const tc = TYPE_COLORS[day.type];
  const sk = sessionKey(activeWeek, activeDay);
  const sess = sessions[sk] || { rpe: '', notes: '' };

  return (
    <div>
      <div style={{ padding: '10px 14px', background: '#F5F5F0', borderRadius: 8, borderLeft: '5px solid ' + tc.bg, marginBottom: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
          <span style={{ fontSize: F(10), fontFamily: MONO, fontWeight: 700, background: tc.bg, color: tc.text, padding: '2px 8px', borderRadius: 3 }}>{TYPE_LABEL[day.type]}</span>
          <span style={{ fontSize: F(11), color: '#888', fontFamily: MONO }}>Week {activeWeek + 1}</span>
        </div>
        <div style={{ fontSize: F(isMobile ? 14 : 16), fontWeight: 700 }}>{day.day} - {day.label}</div>
      </div>

      {day.type === 'REST' && (
        <div data-testid="rest-msg" style={{ padding: 16, background: '#fff', border: '1px solid ' + C.line, borderRadius: 8, fontSize: F(13), color: '#666' }}>
          Rest day. Nothing to log.
        </div>
      )}
      {day.type === 'FULL' && <StrengthLog {...props} />}
      {day.type === 'CONDITIONING' && <WodLog {...props} />}

      {day.type !== 'REST' && (
        <div style={{ marginTop: 12, padding: '12px 14px', background: '#F5F5F0', border: '1px solid ' + C.line, borderRadius: 8 }}>
          <div style={{ fontSize: F(12), fontWeight: 700, marginBottom: 8 }}>Session Overview</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '80px 1fr' : '120px 1fr', gap: 8 }}>
            <div>
              <Label>Session RPE</Label>
              <input data-testid="sess-rpe" type="text" placeholder="1-10" autoComplete="off" value={sess.rpe}
                onChange={(e) => updateSession(sk, 'rpe', e.target.value)} style={inputStyle(!!sess.rpe)} />
            </div>
            <div>
              <Label>Session Notes</Label>
              <input data-testid="sess-notes" type="text" placeholder="Energy, soreness, anything notable..." autoComplete="off" value={sess.notes}
                onChange={(e) => updateSession(sk, 'notes', e.target.value)} style={Object.assign({}, inputStyle(!!sess.notes), { fontFamily: 'Georgia, serif' })} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
function StrengthLog({ day, activeWeek, logs, updateLog, customLoads, isMobile }) {
  const items = loggableItems(day);
  return (
    <div data-testid="strength-log" style={{ background: '#fff', border: '1px solid ' + C.line, borderRadius: 8 }}>
      {items.map((x, ii) => {
        const item = x.item;
        const key = logKey(activeWeek, day.id, item.name);
        const log = logs[key] || { weight: '', reps: '', rpe: '', notes: '', mobilityNotes: '' };
        const done = isLoggedEntry(log);
        const load = getLoad(item, activeWeek, customLoads);
        const slug = key;
        const grid = { display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr 56px 1fr' : '1fr 1fr 64px 1.5fr', gap: 6, marginTop: 7 };
        const fields = [
          { f: 'weight', label: 'Wt (lb)', ph: load.num !== null ? String(load.num) : 'BW' },
          { f: 'reps', label: 'Reps', ph: repsPlaceholder(item, activeWeek) },
          { f: 'rpe', label: 'RPE', ph: '7' },
          { f: 'notes', label: 'Notes', ph: 'Short note...' },
        ];
        return (
          <div key={item.name} data-testid="log-item" style={{ padding: '10px 13px', borderBottom: ii < items.length - 1 ? '1px solid #F0EDE6' : 'none', background: done ? '#F0FDF4' : '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
              <div style={{ fontSize: F(13), fontWeight: 700 }}>{item.name}</div>
              {done && <span style={{ fontSize: F(11), color: '#10B981', fontWeight: 700 }}>logged</span>}
            </div>
            <div style={{ fontSize: F(11), color: C.orange, fontFamily: MONO, fontWeight: 700, marginTop: 1 }}>Target: {rxText(item, activeWeek, customLoads)}</div>
            <div style={grid}>
              {fields.map((fl) => (
                <div key={fl.f}>
                  <Label>{fl.label}</Label>
                  <input data-testid={'in-' + fl.f + '-' + slug} type="text" placeholder={fl.ph} value={log[fl.f] || ''} autoComplete="off"
                    onChange={(e) => updateLog(key, fl.f, e.target.value)} style={inputStyle(!!log[fl.f])} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 6 }}>
              <Label color={C.purple}>Mobility / Form Notes</Label>
              <input data-testid={'in-mobilityNotes-' + slug} type="text" placeholder="Range of motion, tightness, technique cues..." value={log.mobilityNotes || ''} autoComplete="off"
                onChange={(e) => updateLog(key, 'mobilityNotes', e.target.value)} style={Object.assign({}, inputStyle(!!log.mobilityNotes, C.purple), { fontFamily: 'Georgia, serif', background: log.mobilityNotes ? '#F5F0FF' : '#fff' })} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
function WodLog({ day, activeWeek, getWODs, addWOD, updateWOD, removeWOD, setTab }) {
  const [picking, setPicking] = useState(false);
  const wods = getWODs(activeWeek, day.id);
  const suggested = getSuggestedCategory(activeWeek, day.id);

  return (
    <div data-testid="wod-log" style={{ background: '#FFF0F8', border: '1px solid #F0C0DC', borderRadius: 8, padding: '12px 12px' }}>
      <div style={{ fontSize: F(12), fontWeight: 700, color: C.pink, marginBottom: 8 }}>
        WODs for {day.day} (Week {activeWeek + 1})
      </div>

      {wods.length === 0 && (
        <div style={{ fontSize: F(12), color: '#777', marginBottom: 8 }}>
          No WOD picked yet. Suggested: <strong style={{ color: C.pink }}>Category {suggested} ({WOD_CATEGORIES[suggested].subtitle}, {WOD_CATEGORIES[suggested].duration})</strong>.
        </div>
      )}

      {wods.map((w) => (
        <div key={w.uid} data-testid="wod-entry" style={{ background: '#fff', borderRadius: 8, padding: '10px 12px', border: '1px solid #F0C0DC', marginBottom: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 6 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: F(10), fontFamily: MONO, fontWeight: 700, background: C.pink, color: '#fff', padding: '2px 6px', borderRadius: 3 }}>{w.id}</span>
              <span data-testid="wod-name" style={{ fontSize: F(14), fontWeight: 700 }}>{w.name}</span>
              {w.duration ? <span style={{ fontSize: F(11), color: '#888', fontFamily: MONO }}>{w.duration}</span> : null}
            </div>
            <button data-testid="wod-remove" onClick={() => removeWOD(activeWeek, day.id, w.uid)}
              style={{ padding: '3px 9px', background: '#fff', border: '1px solid #D0CCC4', borderRadius: 6, fontFamily: MONO, fontSize: F(10), color: '#888', flex: '0 0 auto' }}>Remove</button>
          </div>
          <WodDetail wod={w} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 6, marginTop: 10 }}>
            <div>
              <Label color={C.pink}>Score / Result</Label>
              <input data-testid="wod-score" type="text" placeholder="Time, rounds + reps, calories..." value={w.score || ''} autoComplete="off"
                onChange={(e) => updateWOD(activeWeek, day.id, w.uid, 'score', e.target.value)} style={inputStyle(!!w.score, C.pink)} />
            </div>
            <div>
              <Label color={C.pink}>Notes (weights used, scaling, how it felt)</Label>
              <input data-testid="wod-notes" type="text" placeholder="e.g. 53 lb swings, kipping pull-ups" value={w.notes || ''} autoComplete="off"
                onChange={(e) => updateWOD(activeWeek, day.id, w.uid, 'notes', e.target.value)} style={Object.assign({}, inputStyle(!!w.notes, C.pink), { fontFamily: 'Georgia, serif' })} />
            </div>
          </div>
        </div>
      ))}

      {!picking && (
        <button data-testid="wod-add-open" onClick={() => setPicking(true)}
          style={{ padding: '9px 16px', background: C.pink, color: '#fff', border: 'none', borderRadius: 8, fontFamily: MONO, fontSize: F(12), fontWeight: 700 }}>
          {wods.length === 0 ? 'Pick a WOD' : 'Add another WOD'}
        </button>
      )}
      {picking && (
        <WodPicker suggestedCat={suggested} addedIds={wods.map((x) => x.id)}
          onAdd={(wod) => addWOD(activeWeek, day.id, wod)} onClose={() => setPicking(false)} />
      )}
      <div style={{ marginTop: 8 }}>
        <button onClick={() => setTab('wods')} style={{ padding: '4px 10px', background: 'transparent', border: 'none', color: '#888', fontFamily: MONO, fontSize: F(11), textDecoration: 'underline' }}>Browse the full WOD library</button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
export function buildSummary(weekIdx, logs, sessions, getWODs, customLoads) {
  const lines = [];
  lines.push('TRAINING LOG -- Phase ' + PHASE_NUM + ', Week ' + (weekIdx + 1) + ' (' + WEEK_NOTES[weekIdx].theme + ')');
  lines.push("Athlete: 52yo, 6'1\", 190lbs, Intermediate");
  lines.push('Goals: Athletic performance + lean muscle');
  lines.push('='.repeat(50));
  DAYS.forEach((d) => {
    const sess = sessions[sessionKey(weekIdx, d.id)] || {};
    const items = loggableItems(d).filter((x) => isLoggedEntry(logs[logKey(weekIdx, d.id, x.item.name)]));
    const wods = d.type === 'CONDITIONING' ? getWODs(weekIdx, d.id) : [];
    if (items.length === 0 && wods.length === 0 && !sess.rpe && !sess.notes) return;
    lines.push('');
    lines.push(d.day + ' -- ' + d.label);
    if (sess.rpe) lines.push('  Session RPE: ' + sess.rpe);
    if (sess.notes) lines.push('  Session Notes: ' + sess.notes);
    wods.forEach((w) => {
      lines.push('  WOD: ' + w.name + ' (' + w.id + ')' + (w.duration ? ' ' + w.duration : ''));
      if (w.score) lines.push('    Score: ' + w.score);
      if (w.notes) lines.push('    Notes: ' + w.notes);
    });
    items.forEach((x) => {
      const l = logs[logKey(weekIdx, d.id, x.item.name)];
      lines.push('  ' + x.item.name + ' [target ' + rxText(x.item, weekIdx, customLoads) + ']');
      if (l.weight) lines.push('    Weight: ' + l.weight + ' lb');
      if (l.reps) lines.push('    Reps: ' + l.reps);
      if (l.rpe) lines.push('    RPE: ' + l.rpe);
      if (l.notes) lines.push('    Notes: ' + l.notes);
      if (l.mobilityNotes) lines.push('    Mobility/Form: ' + l.mobilityNotes);
    });
  });
  lines.push('');
  lines.push('='.repeat(50));
  return lines.join('\n');
}

function WeekSummary({ activeWeek, logs, sessions, getWODs, customLoads, apiKey, setView, setActiveDay, counts }) {
  const [reviewing, setReviewing] = useState(false);
  const [reviewText, setReviewText] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [copied, setCopied] = useState(false);
  const summary = buildSummary(activeWeek, logs, sessions, getWODs, customLoads);

  const review = async () => {
    if (!apiKey) { setReviewError('No API key. Add it in Settings.'); return; }
    setReviewing(true); setReviewText(''); setReviewError('');
    const nextWeek = activeWeek + 1 < 4 ? 'Week ' + (activeWeek + 2) : 'the next phase';
    const prompt = 'You are an experienced strength and conditioning coach. Review this training log for Phase ' + PHASE_NUM + ' Week ' + (activeWeek + 1) + ' and give: 1) overall assessment, 2) lift observations (RPE trends, load progression, concerns), 3) WOD performance, 4) what is going well and what needs attention, 5) specific recommendations for ' + nextWeek + '. Be direct and reference actual numbers in lb.\n\n' + summary;
    try {
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1500, messages: [{ role: 'user', content: prompt }] }),
      });
      const data = await res.json();
      if (data.error) setReviewError('API error: ' + data.error.message);
      else setReviewText((data.content || []).filter((b) => b.type === 'text').map((b) => b.text).join(''));
    } catch (e) {
      setReviewError('Network error: ' + e.message);
    }
    setReviewing(false);
  };

  const copy = () => {
    try {
      navigator.clipboard.writeText(summary).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    } catch (e) { setReviewError('Copy failed: ' + e.message); }
  };

  return (
    <div data-testid="week-summary">
      <h2 style={{ fontSize: F(17), fontWeight: 700, margin: '0 0 2px' }}>Week {activeWeek + 1} Summary</h2>
      <p style={{ fontSize: F(12), color: '#888', fontStyle: 'italic', margin: '0 0 12px' }}>{WEEK_NOTES[activeWeek].theme}</p>
      {DAYS.filter((d) => d.type !== 'REST').map((d) => {
        const tc = TYPE_COLORS[d.type];
        const sess = sessions[sessionKey(activeWeek, d.id)] || {};
        return (
          <div key={d.id} style={{ background: '#fff', borderRadius: 8, border: '1px solid ' + C.line, padding: '10px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: F(9), fontFamily: MONO, fontWeight: 700, background: tc.bg, color: tc.text, padding: '2px 6px', borderRadius: 3 }}>{TYPE_LABEL[d.type]}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: F(13), fontWeight: 700 }}>{d.day} - {d.label}</div>
              <div style={{ fontSize: F(10), color: '#999', fontFamily: MONO }}>
                {counts[d.id]} {d.type === 'CONDITIONING' ? 'WOD(s)' : 'lift(s)'} logged{sess.rpe ? ' - RPE ' + sess.rpe : ''}
              </div>
            </div>
            <button onClick={() => { setActiveDay(d.id); setView('day'); }} style={toggleBtn(false)}>Open</button>
          </div>
        );
      })}
      <div style={{ marginTop: 16, padding: '14px 16px', background: '#F5F5F0', borderRadius: 10, border: '1px solid ' + C.line, borderLeft: '5px solid ' + C.orange }}>
        <div style={{ fontSize: F(14), fontWeight: 700, marginBottom: 4 }}>Weekly Claude Review</div>
        <p style={{ fontSize: F(12), color: '#666', margin: '0 0 10px', lineHeight: 1.6 }}>Sends this week's lifts and WOD scores to Claude for coaching feedback, or copy the log and paste it into a chat.</p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <button data-testid="review-btn" onClick={review} disabled={reviewing} style={{ padding: '10px 18px', background: reviewing ? '#ccc' : C.orange, color: '#fff', border: 'none', borderRadius: 8, fontSize: F(12), fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase' }}>{reviewing ? 'Analysing...' : 'Get Weekly Review'}</button>
          <button data-testid="copy-btn" onClick={copy} style={{ padding: '10px 18px', background: copied ? C.green : C.ink, color: '#fff', border: 'none', borderRadius: 8, fontSize: F(12), fontFamily: MONO, fontWeight: 700, textTransform: 'uppercase' }}>{copied ? 'Copied' : 'Copy Log'}</button>
        </div>
        {reviewError && <div style={{ padding: 10, background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 8, fontSize: F(13), color: '#DC2626', marginTop: 10 }}>{reviewError}</div>}
        {reviewText && <div style={{ padding: 14, background: '#fff', border: '1px solid ' + C.line, borderRadius: 10, marginTop: 12, lineHeight: 1.8, fontSize: F(14), color: '#333', whiteSpace: 'pre-wrap' }}>{reviewText}</div>}
      </div>
    </div>
  );
}
