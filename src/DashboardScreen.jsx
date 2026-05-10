import React from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, logKey, sessionKey } from './data.js';
import { formatDate, todayStr, getProgrammePosition } from './hooks.js';

export default function DashboardScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, logs, sessions, setTab, isMobile, startDate }) {
  const weekNote = WEEK_NOTES[activeWeek];

  const today = todayStr();
  const pos = startDate ? getProgrammePosition(startDate) : null;
  const todayDayId = pos ? pos.dayId : null;
  const isOnSchedule = pos && pos.weekIdx === activeWeek;

  const dayStats = DAYS.map(d => {
    const totalItems = d.sections.flatMap(s => s.items).length;
    const loggedItems = d.sections.flatMap((s, si) =>
      s.items.map((_, ii) => logKey(activeWeek, d.id, si, ii))
    ).filter(k => {
      const l = logs[k];
      return l && (l.weight || l.reps || l.rpe || l.notes);
    }).length;
    const sess = sessions[sessionKey(activeWeek, d.id)] || {};
    const hasSession = sess.rpe || sess.notes;
    return { ...d, totalItems, loggedItems, hasSession, pct: totalItems > 0 ? Math.round((loggedItems / totalItems) * 100) : 0 };
  });

  const totalLogged = dayStats.filter(d => d.loggedItems > 0).length;
  const totalComplete = dayStats.filter(d => d.pct === 100).length;

  const s = {
    page: { maxWidth: 680, margin: '0 auto', padding: isMobile ? '16px 14px 80px' : '24px 20px 80px' },
    heading: { fontSize: isMobile ? 18 : 22, fontWeight: 700, color: '#1A1A1A', margin: '0 0 2px' },
    sub: { fontSize: 13, color: '#888', margin: '0 0 20px', fontFamily: 'monospace' },
    weekRow: { display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' },
    weekBtn: (active) => ({ padding: '7px 14px', background: active ? '#E8500A' : '#fff', border: active ? '1px solid #E8500A' : '1px solid #D0CCC4', borderRadius: 6, color: active ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: active ? 700 : 400 }),
    statsRow: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 },
    statCard: { background: '#fff', borderRadius: 10, border: '1px solid #E0DDD6', padding: '14px 12px', textAlign: 'center' },
    statNum: { fontSize: 28, fontWeight: 700, color: '#E8500A', fontFamily: 'monospace', lineHeight: 1 },
    statLabel: { fontSize: 11, color: '#999', fontFamily: 'monospace', marginTop: 4, textTransform: 'uppercase', letterSpacing: '0.08em' },
    weekCard: { background: '#FFF8F5', borderRadius: 10, border: '1px solid #F5D8CC', borderLeft: '4px solid #E8500A', padding: '14px 16px', marginBottom: 20 },
    weekTheme: { fontSize: 15, fontWeight: 700, color: '#E8500A', marginBottom: 4 },
    weekNote: { fontSize: 13, color: '#555', lineHeight: 1.7, margin: 0 },
    sectionTitle: { fontSize: 12, fontFamily: 'monospace', color: '#999', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 10, fontWeight: 700 },
    dayCard: { background: '#fff', borderRadius: 10, border: '1px solid #E0DDD6', padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'border-color 0.15s' },
    dayCardActive: { background: '#fff', borderRadius: 10, border: '1px solid #E8500A', padding: '14px 16px', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' },
  };

  return (
    <div style={s.page}>
      <h1 style={s.heading}>Phase 1 — Foundation</h1>
      <p style={s.sub}>Weeks 1–4 · Hybrid Cross Training</p>

      {/* Today's date and programme position */}
      {startDate && (
        <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:16, flexWrap:'wrap' }}>
          <div style={{ fontSize:12, color:'#888', fontFamily:'monospace' }}>📅 {formatDate(today)}</div>
          {pos && (
            <div style={{ fontSize:12, fontFamily:'monospace', background:'#E8500A', color:'#fff', padding:'2px 10px', borderRadius:20, fontWeight:700 }}>
              Week {pos.weekIdx + 1} · Day {pos.dayIdx + 1}
            </div>
          )}
        </div>
      )}

      {/* Week selector */}
      <div style={s.weekRow}>
        {WEEK_NOTES.map((w, i) => (
          <button key={i} onClick={() => setActiveWeek(i)} style={s.weekBtn(activeWeek === i)}>{w.week}</button>
        ))}
      </div>

      {/* Stats */}
      <div style={s.statsRow}>
        <div style={s.statCard}>
          <div style={s.statNum}>{totalLogged}</div>
          <div style={s.statLabel}>Days Started</div>
        </div>
        <div style={s.statCard}>
          <div style={s.statNum}>{totalComplete}</div>
          <div style={s.statLabel}>Days Complete</div>
        </div>
        <div style={{ ...s.statCard }}>
          <div style={{ ...s.statNum, color: '#0A7C4E' }}>{7 - totalLogged}</div>
          <div style={s.statLabel}>Days Remaining</div>
        </div>
      </div>

      {/* Week note */}
      <div style={s.weekCard}>
        <div style={s.weekTheme}>{weekNote.theme}</div>
        <p style={s.weekNote}>{weekNote.note}</p>
      </div>

      {/* Day list */}
      <div style={s.sectionTitle}>This Week's Sessions</div>
      {dayStats.map(d => {
        const tc = TYPE_COLORS[d.type];
        const isActive = activeDay === d.id;
        return (
          <div
            key={d.id}
            style={isActive ? s.dayCardActive : s.dayCard}
            onClick={() => { setActiveDay(d.id); setTab('programme'); }}
          >
            <span style={{ fontSize: 10, fontFamily: 'monospace', fontWeight: 700, background: tc.bg, color: tc.text, padding: '3px 8px', borderRadius: 3, flexShrink: 0 }}>{d.type}</span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A', marginBottom: 3, display: 'flex', alignItems: 'center', gap: 6 }}>
                {d.day} — {d.label}
                {d.id === todayDayId && isOnSchedule && (
                  <span style={{ fontSize: 9, background: '#E8500A', color: '#fff', padding: '1px 6px', borderRadius: 20, fontWeight: 700, letterSpacing: '0.08em' }}>TODAY</span>
                )}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ flex: 1, background: '#F0EDE6', borderRadius: 20, height: 5, overflow: 'hidden' }}>
                  <div style={{ width: `${d.pct}%`, height: '100%', background: d.pct === 100 ? '#0A7C4E' : d.pct > 0 ? '#E8500A' : '#D0CCC4', borderRadius: 20, transition: 'width 0.4s' }} />
                </div>
                <span style={{ fontSize: 11, color: '#999', fontFamily: 'monospace', flexShrink: 0 }}>{d.pct}%</span>
              </div>
            </div>
            {d.hasSession && <span style={{ fontSize: 12, color: '#0A7C4E', fontFamily: 'monospace', flexShrink: 0 }}>RPE {sessions[sessionKey(activeWeek, d.id)]?.rpe}</span>}
            <span style={{ fontSize: 14, color: '#999', flexShrink: 0 }}>›</span>
          </div>
        );
      })}
    </div>
  );
}
