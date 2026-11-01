import React from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, TYPE_LABEL, PHASE_NUM, PHASE_NAME, logKey, loggableItems, isLoggedEntry } from './data.js';
import { formatDate, todayStr, getProgrammePosition } from './hooks.js';
import { F, C, MONO, ScrollArea } from './ui.jsx';

export default function DashboardScreen({ activeWeek, setActiveWeek, setActiveDay, logs, setTab, isMobile, startDate, getWODs }) {
  const pos = startDate ? getProgrammePosition(startDate) : null;
  const todayDayId = pos ? pos.dayId : null;
  const onSchedule = pos && pos.weekIdx === activeWeek;
  const weekNote = WEEK_NOTES[activeWeek];

  const stats = DAYS.map((d) => {
    let total = 0;
    let done = 0;
    const wods = d.type === 'CONDITIONING' ? getWODs(activeWeek, d.id) : [];
    if (d.type === 'FULL') {
      const items = loggableItems(d);
      total = items.length;
      done = items.filter((x) => isLoggedEntry(logs[logKey(activeWeek, d.id, x.item.name)])).length;
    } else if (d.type === 'CONDITIONING') {
      total = Math.max(wods.length, 1);
      done = wods.filter((x) => x.score).length;
    }
    return { day: d, total: total, done: done, pct: total > 0 ? Math.round((done / total) * 100) : 0, wods: wods };
  });
  const logDays = stats.filter((s) => s.total > 0);
  const started = logDays.filter((s) => s.done > 0).length;
  const complete = logDays.filter((s) => s.done === s.total).length;

  return (
    <ScrollArea>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '16px 14px 24px' : '24px 20px 24px' }}>
        <div style={{ fontSize: F(11), letterSpacing: '0.2em', color: C.mute, fontFamily: MONO, textTransform: 'uppercase', marginBottom: 4 }}>
          Phase {PHASE_NUM} - {PHASE_NAME}
        </div>
        <h1 style={{ fontSize: F(isMobile ? 20 : 24), fontWeight: 700, margin: '0 0 8px' }}>Dashboard</h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
          <div style={{ fontSize: F(12), color: '#888', fontFamily: MONO }}>{formatDate(todayStr())}</div>
          {pos && (
            <div style={{ fontSize: F(12), fontFamily: MONO, background: C.orange, color: '#fff', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>
              Week {pos.weekIdx + 1} - Day {pos.dayIdx + 1}
            </div>
          )}
        </div>

        <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
          {WEEK_NOTES.map((w, i) => (
            <button key={w.week} data-testid={'dash-week-' + i} onClick={() => setActiveWeek(i)}
              style={{ padding: '6px 12px', background: activeWeek === i ? C.orange : '#fff', border: '1px solid ' + (activeWeek === i ? C.orange : '#D0CCC4'), borderRadius: 6, color: activeWeek === i ? '#fff' : '#555', fontFamily: MONO, fontSize: F(12), fontWeight: activeWeek === i ? 700 : 400 }}>
              {w.week}
            </button>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
          {[['Started', started, C.orange], ['Complete', complete, C.green], ['Left', logDays.length - complete, C.blue]].map((s) => (
            <div key={s[0]} style={{ background: '#fff', borderRadius: 10, border: '1px solid ' + C.line, padding: '12px 10px', textAlign: 'center' }}>
              <div style={{ fontSize: F(26), fontWeight: 700, color: s[2], fontFamily: MONO, lineHeight: 1 }}>{s[1]}</div>
              <div style={{ fontSize: F(10), color: C.mute, fontFamily: MONO, marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s[0]}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: '12px 14px', background: '#FFF8F5', borderRadius: 10, border: '1px solid #F5D8CC', borderLeft: '4px solid ' + C.orange, marginBottom: 14 }}>
          <div style={{ fontSize: F(13), fontWeight: 700, color: C.orange, marginBottom: 4 }}>{weekNote.theme}</div>
          <p style={{ fontSize: F(12), color: '#555', lineHeight: 1.7, margin: 0 }}>{weekNote.note}</p>
        </div>

        <div style={{ fontSize: F(11), letterSpacing: '0.15em', color: C.mute, fontFamily: MONO, textTransform: 'uppercase', marginBottom: 8 }}>This Week</div>
        {stats.map((s) => {
          const d = s.day;
          const tc = TYPE_COLORS[d.type];
          const isToday = d.id === todayDayId && onSchedule;
          const loggable = s.total > 0;
          return (
            <div key={d.id} data-testid={'dash-day-' + d.id}
              style={{ background: isToday ? '#FFF8F5' : '#fff', borderRadius: 10, border: isToday ? '2px solid ' + C.orange : '1px solid ' + C.line, padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: F(9), fontFamily: MONO, fontWeight: 700, background: tc.bg, color: tc.text, padding: '2px 7px', borderRadius: 3, flex: '0 0 auto' }}>{TYPE_LABEL[d.type]}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: F(13), fontWeight: 700, marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                  {d.day} - {d.label}
                  {isToday && <span style={{ fontSize: F(9), background: C.orange, color: '#fff', padding: '1px 6px', borderRadius: 20, fontWeight: 700 }}>TODAY</span>}
                </div>
                {s.wods.map((w) => (
                  <div key={w.uid} style={{ fontSize: F(11), color: C.pink, fontFamily: MONO, marginBottom: 2 }}>
                    {w.name}{w.duration ? ' (' + w.duration + ')' : ''}{w.score ? ' - ' + w.score : ''}
                  </div>
                ))}
                {loggable && (
                  <div style={{ background: '#F0EDE6', borderRadius: 20, height: 4, overflow: 'hidden' }}>
                    <div style={{ width: s.pct + '%', height: '100%', background: s.pct === 100 ? C.green : s.pct > 0 ? C.orange : '#D0CCC4', borderRadius: 20 }} />
                  </div>
                )}
              </div>
              <div style={{ display: 'flex', gap: 6, flex: '0 0 auto' }}>
                <button onClick={() => { setActiveDay(d.id); setTab('programme'); }}
                  style={{ padding: '5px 9px', background: '#fff', border: '1px solid #D0CCC4', borderRadius: 6, fontFamily: MONO, fontSize: F(10), color: '#555' }}>Plan</button>
                {loggable && (
                  <button data-testid={'dash-log-' + d.id} onClick={() => { setActiveDay(d.id); setTab('log'); }}
                    style={{ padding: '5px 9px', background: C.orange, border: '1px solid ' + C.orange, borderRadius: 6, fontFamily: MONO, fontSize: F(10), color: '#fff', fontWeight: 700 }}>Log</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ScrollArea>
  );
}
