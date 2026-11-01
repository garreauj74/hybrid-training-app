import React from 'react';
import { TYPE_COLORS, TYPE_LABEL, WEEK_NOTES, DAYS } from './data.js';

// Every font size in the app goes through F() so the whole UI scales 5%.
export const F = (n) => Math.round(n * 1.05 * 10) / 10;

export const C = {
  orange: '#E8500A', ink: '#1A1A1A', paper: '#FAFAF7', line: '#E0DDD6',
  mute: '#999', pink: '#B5197A', green: '#0A7C4E', blue: '#1D5FA8', purple: '#7C3ACA',
};

export const MONO = 'monospace';

// The only part of a screen that scrolls. Headers live outside it.
export function ScrollArea({ children, style }) {
  return (
    <div
      data-scroll="true"
      style={Object.assign({ flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch', overscrollBehavior: 'contain' }, style || {})}
    >
      {children}
    </div>
  );
}

export const inputStyle = (hasVal, accent) => ({
  width: '100%', padding: '7px 8px', fontSize: F(16), fontFamily: MONO,
  border: '1px solid ' + (hasVal ? (accent || '#10B981') : '#D0CCC4'),
  borderRadius: 6, outline: 'none', background: hasVal ? '#F0FDF4' : '#fff', boxSizing: 'border-box',
});

export function Label({ children, color }) {
  return (
    <div style={{ fontSize: F(9), color: color || C.mute, fontFamily: MONO, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>
      {children}
    </div>
  );
}

const pill = (active, color) => ({
  flex: '0 0 auto', padding: '5px 10px', borderRadius: 6, cursor: 'pointer',
  background: active ? color : '#fff', border: '1px solid ' + (active ? color : '#D0CCC4'),
  color: active ? '#fff' : '#555', fontFamily: MONO, fontSize: F(12), fontWeight: active ? 700 : 400,
});

// Week row (+ optional day row). Sits OUTSIDE the scroll area so it stays put
// while you scroll and while the keyboard is open.
export function WeekDayBar({ testId, activeWeek, setActiveWeek, activeDay, onDay, counts, right, showDays }) {
  return (
    <div data-testid={testId} style={{ flex: 'none', background: '#fff', borderBottom: '2px solid #E0DDD6', padding: '8px 12px 6px', zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: showDays ? 6 : 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflowX: 'auto' }}>
          <span style={{ fontSize: F(10), color: C.mute, fontFamily: MONO, textTransform: 'uppercase', flex: '0 0 auto' }}>Week:</span>
          {WEEK_NOTES.map((w, i) => (
            <button key={w.week} data-testid={'week-' + i} onClick={() => setActiveWeek(i)} style={pill(activeWeek === i, C.orange)}>W{i + 1}</button>
          ))}
        </div>
        {right}
      </div>
      {showDays && (
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', paddingBottom: 2 }}>
          {DAYS.map((d) => {
            const tc = TYPE_COLORS[d.type];
            const on = activeDay === d.id;
            const n = counts ? counts[d.id] : 0;
            return (
              <button key={d.id} data-testid={'day-' + d.id} onClick={() => onDay(d.id)}
                style={Object.assign(pill(on, tc.bg), { padding: '5px 9px', textAlign: 'center' })}>
                <span style={{ display: 'block' }}>{d.short}</span>
                <span style={{ display: 'block', fontSize: F(8), opacity: 0.85 }}>{TYPE_LABEL[d.type]}</span>
                {n > 0 && (
                  <span style={{ marginLeft: 3, background: on ? 'rgba(255,255,255,0.35)' : '#10B981', color: '#fff', borderRadius: 8, padding: '0 4px', fontSize: F(8), fontWeight: 700 }}>{n}</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function WodDetail({ wod, color }) {
  const col = color || C.pink;
  return (
    <div>
      {wod.description ? (
        <p style={{ fontSize: F(13), color: '#444', lineHeight: 1.6, margin: '0 0 8px', fontStyle: 'italic' }}>{wod.description}</p>
      ) : null}
      {(wod.movements || []).map((m, i) => (
        <div key={i} style={{ fontSize: F(13), color: '#333', padding: '3px 0', borderBottom: i < wod.movements.length - 1 ? '1px solid #F0EDE6' : 'none' }}>{m}</div>
      ))}
      {wod.scoring ? (
        <div style={{ marginTop: 8, padding: '6px 10px', background: col + '15', borderLeft: '3px solid ' + col, borderRadius: 4 }}>
          <span style={{ fontSize: F(10), fontFamily: MONO, color: col, fontWeight: 700, textTransform: 'uppercase' }}>Score: </span>
          <span style={{ fontSize: F(12), color: '#444' }}>{wod.scoring}</span>
        </div>
      ) : null}
    </div>
  );
}
