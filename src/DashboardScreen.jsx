import React from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, logKey, sessionKey, WOD_ROTATION, WOD_CATEGORIES } from './data.js';
import { formatDate, todayStr, getProgrammePosition } from './hooks.js';

export default function DashboardScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, logs, sessions, setTab, isMobile, startDate, getAssignedWOD }) {
  const today = todayStr();
  const pos = startDate ? getProgrammePosition(startDate) : null;
  const todayDayId = pos ? pos.dayId : null;
  const isOnSchedule = pos && pos.weekIdx === activeWeek;
  const weekNote = WEEK_NOTES[activeWeek];

  const dayStats = DAYS.map(d => {
    const total = d.sections.reduce((n, s) => n + s.items.length, 0);
    let logged = 0;
    d.sections.forEach((s, si) => {
      s.items.forEach((_, ii) => {
        const k = logKey(1, activeWeek, d.id, si, ii);
        const l = logs[k];
        if (l && (l.weight || l.reps || l.rpe || l.notes || l.mobilityNotes)) logged++;
      });
    });
    const sess = sessions[sessionKey(1, activeWeek, d.id)] || {};
    const pct = total > 0 ? Math.round((logged / total) * 100) : 0;
    const assignedWOD = (d.type === 'CONDITIONING') ? getAssignedWOD(activeWeek, d.id) : null;
    return { ...d, total, logged, pct, sessRpe: sess.rpe, assignedWOD };
  });

  const started = dayStats.filter(d => d.logged > 0).length;
  const complete = dayStats.filter(d => d.pct === 100).length;

  const s = {
    page: { maxWidth: 680, margin: '0 auto', padding: isMobile ? '16px 14px 80px' : '24px 20px 80px' },
    card: { background: '#fff', borderRadius: 10, border: '1px solid #E0DDD6', padding: '12px 14px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' },
    statCard: { background: '#fff', borderRadius: 10, border: '1px solid #E0DDD6', padding: '12px 10px', textAlign: 'center' },
  };

  return (
    <div style={s.page}>
      <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 4 }}>Phase 1 -- Strength and Conditioning</div>
      <h1 style={{ fontSize: isMobile ? 20 : 24, fontWeight: 700, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>Dashboard</h1>

      {startDate && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
          <div style={{ fontSize: 12, color: '#888', fontFamily: 'monospace' }}>📅 {formatDate(today)}</div>
          {pos && <div style={{ fontSize: 12, fontFamily: 'monospace', background: '#E8500A', color: '#fff', padding: '2px 10px', borderRadius: 20, fontWeight: 700 }}>Week {pos.weekIdx + 1} · Day {pos.dayIdx + 1}</div>}
        </div>
      )}

      {/* Week selector */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
        {WEEK_NOTES.map((w, i) => (
          <button key={i} onClick={() => setActiveWeek(i)} style={{ padding: '6px 12px', background: activeWeek === i ? '#E8500A' : '#fff', border: activeWeek === i ? '1px solid #E8500A' : '1px solid #D0CCC4', borderRadius: 6, color: activeWeek === i ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: activeWeek === i ? 700 : 400 }}>{w.week}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {[['Sessions Started', started, '#E8500A'], ['Complete', complete, '#0A7C4E'], ['Remaining', 7 - started, '#1D5FA8']].map(([label, val, color]) => (
          <div key={label} style={s.statCard}>
            <div style={{ fontSize: 26, fontWeight: 700, color, fontFamily: 'monospace', lineHeight: 1 }}>{val}</div>
            <div style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Week note */}
      <div style={{ padding: '12px 14px', background: '#FFF8F5', borderRadius: 10, border: '1px solid #F5D8CC', borderLeft: '4px solid #E8500A', marginBottom: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#E8500A', marginBottom: 4 }}>{weekNote.theme}</div>
        <p style={{ fontSize: 12, color: '#555', lineHeight: 1.7, margin: 0 }}>{weekNote.note}</p>
      </div>

      {/* Day list */}
      <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 8 }}>This Week</div>
      {dayStats.map(d => {
        const tc = TYPE_COLORS[d.type];
        const isToday = d.id === todayDayId && isOnSchedule;
        return (
          <div key={d.id} onClick={() => { setActiveDay(d.id); setTab(d.type === 'CONDITIONING' ? 'wods' : 'programme'); }} style={{ ...s.card, background: isToday ? '#FFF8F5' : '#fff', border: isToday ? '2px solid #E8500A' : '1px solid #E0DDD6' }}>
            <span style={{ fontSize: 9, fontFamily: 'monospace', fontWeight: 700, background: tc.bg, color: tc.text, padding: '2px 7px', borderRadius: 3, flexShrink: 0 }}>{d.type}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                {d.day} -- {d.label}
                {isToday && <span style={{ fontSize: 9, background: '#E8500A', color: '#fff', padding: '1px 6px', borderRadius: 20, fontWeight: 700 }}>TODAY</span>}
              </div>
              {d.type === 'CONDITIONING' && d.assignedWOD && (
                <div style={{ fontSize: 10, color: '#B5197A', fontFamily: 'monospace', marginBottom: 3 }}>WOD: {d.assignedWOD.name} ({d.assignedWOD.duration})</div>
              )}
              <div style={{ background: '#F0EDE6', borderRadius: 20, height: 4, overflow: 'hidden' }}>
                <div style={{ width: d.pct + '%', height: '100%', background: d.pct === 100 ? '#0A7C4E' : d.pct > 0 ? '#E8500A' : '#D0CCC4', borderRadius: 20, transition: 'width 0.4s' }} />
              </div>
            </div>
            {d.sessRpe && <span style={{ fontSize: 11, color: '#0A7C4E', fontFamily: 'monospace', flexShrink: 0 }}>RPE {d.sessRpe}</span>}
            <span style={{ fontSize: 14, color: '#CCC', flexShrink: 0 }}>›</span>
          </div>
        );
      })}
    </div>
  );
}
