import React, { useState } from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, SECTION_ICONS, getWeekSets } from './data.js';

export default function ProgrammeScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, isMobile }) {
  const [expandedSections, setExpandedSections] = useState({ 0: true });

  const day = DAYS.find(d => d.id === activeDay);
  const tc = TYPE_COLORS[day.type];

  const toggleSection = i => setExpandedSections(p => ({ ...p, [i]: !p[i] }));
  const handleDayChange = (id) => {
    setActiveDay(id);
    setExpandedSections({ 0: true });
  };

  const s = {
    page: { maxWidth: 980, margin: '0 auto', padding: isMobile ? '16px 12px 80px' : '20px 16px 60px' },
    header: { background: '#F5F5F0', borderBottom: '2px solid #E0DDD6', padding: isMobile ? '14px 14px 12px' : '20px 20px 16px' },
    h1: { margin: '0 0 4px', fontSize: isMobile ? 18 : 28, fontWeight: 700, color: '#1A1A1A', letterSpacing: '-0.02em' },
    weekScroll: { display: 'flex', gap: 6, overflowX: 'auto', scrollbarWidth: 'none', padding: '12px 14px', background: '#fff', borderBottom: '1px solid #E8E4DC' },
    weekBtn: (active) => ({ flex: '0 0 auto', padding: '6px 14px', background: active ? '#E8500A' : '#fff', border: active ? '1px solid #E8500A' : '1px solid #D0CCC4', borderRadius: 6, color: active ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: active ? 700 : 400 }),
    dayTabs: { display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', background: '#fff', borderBottom: '2px solid #E8E4DC' },
    dayTab: (active, tc) => ({ flex: '1 0 auto', padding: isMobile ? '10px 6px 8px' : '14px 10px 12px', border: 'none', borderBottom: active ? `3px solid ${tc.bg}` : '3px solid transparent', background: active ? '#FAFAF7' : 'transparent', cursor: 'pointer', textAlign: 'center' }),
    sectionHeader: (open, color) => ({ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', background: open ? '#F5F5F0' : '#FAFAF7', border: `1px solid ${color}44`, borderLeft: `4px solid ${color}`, borderRadius: open ? '8px 8px 0 0' : '8px', cursor: 'pointer' }),
  };

  return (
    <div>
      {/* Week strip */}
      <div style={s.weekScroll}>
        {WEEK_NOTES.map((w, i) => (
          <button key={i} onClick={() => setActiveWeek(i)} style={s.weekBtn(activeWeek === i)}>{w.week}</button>
        ))}
      </div>

      {/* Week note */}
      <div style={{ padding: '10px 14px', background: '#FAFAF7', borderBottom: '1px solid #E8E4DC' }}>
        <div style={{ maxWidth: 980, margin: '0 auto' }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E8500A' }}>{WEEK_NOTES[activeWeek].theme} — </span>
          <span style={{ fontSize: 13, color: '#555' }}>{WEEK_NOTES[activeWeek].note}</span>
        </div>
      </div>

      {/* Day tabs */}
      <div style={s.dayTabs}>
        {DAYS.map(d => {
          const dtc = TYPE_COLORS[d.type];
          const isActive = activeDay === d.id;
          return (
            <button key={d.id} onClick={() => handleDayChange(d.id)} style={s.dayTab(isActive, dtc)}>
              <div style={{ fontSize: isMobile ? 9 : 11, letterSpacing: '0.1em', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, color: isActive ? dtc.bg : '#999', marginBottom: 3 }}>{d.day}</div>
              <span style={{ fontSize: 9, padding: '2px 5px', borderRadius: 3, background: isActive ? dtc.bg : '#E8E4DC', color: isActive ? dtc.text : '#888', fontFamily: 'monospace', fontWeight: 700 }}>{d.type}</span>
            </button>
          );
        })}
      </div>

      {/* Day content */}
      <div style={s.page}>
        <div style={{ borderLeft: `5px solid ${tc.bg}`, paddingLeft: 16, marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', marginBottom: 4 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', background: tc.bg, color: tc.text, padding: '3px 10px', borderRadius: 4, fontWeight: 700 }}>{day.type}</span>
            {day.totalTime !== '—' && <span style={{ fontSize: 12, color: '#888', fontFamily: 'monospace' }}>⏱ {day.totalTime}</span>}
          </div>
          <h2 style={{ margin: '0 0 4px', fontSize: isMobile ? 16 : 22, fontWeight: 700, color: '#1A1A1A' }}>{day.label}</h2>
          <div style={{ fontSize: 13, color: '#555', fontFamily: 'monospace', marginBottom: 2 }}>{day.focus}</div>
          <div style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>🔧 {day.equipment}</div>
        </div>

        {day.sections.map((section, si) => {
          const isOpen = expandedSections[si] !== false;
          const icon = SECTION_ICONS[section.name] || '•';
          const hasStab = section.items.some(i => i.stability);
          return (
            <div key={si} style={{ marginBottom: 10 }}>
              <div onClick={() => toggleSection(si)} style={s.sectionHeader(isOpen, section.color)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 16 }}>{icon}</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{section.name}</span>
                  {section.duration && <span style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>{section.duration}</span>}
                </div>
                <span style={{ fontSize: 11, color: section.color, fontFamily: 'monospace', fontWeight: 700, display: 'inline-block', transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>▶</span>
              </div>

              {isOpen && (
                <div style={{ background: '#fff', border: `1px solid ${section.color}22`, borderTop: 'none', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                  {section.note && <div style={{ padding: '10px 14px', background: `${section.color}0d`, borderBottom: `1px solid ${section.color}22`, fontSize: 13, color: '#444', fontStyle: 'italic', lineHeight: 1.6 }}>{section.note}</div>}

                  {/* Header row */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 60px' : hasStab ? '2fr 2.5fr 55px 65px 1.4fr' : '2fr 2.5fr 55px 65px', padding: '8px 14px', borderBottom: '2px solid #F0EDE6', gap: 8, background: '#FAFAF7' }}>
                    {(isMobile
                      ? ['Exercise', 'Sets', 'Reps']
                      : ['Exercise', 'Coaching Cue', 'Sets', 'Reps / Time', ...(hasStab ? ['Active Rest'] : [])]
                    ).map(h => (
                      <div key={h} style={{ fontSize: 10, letterSpacing: '0.12em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700 }}>{h}</div>
                    ))}
                  </div>

                  {section.items.map((item, ii) => {
                    const adjSets = getWeekSets(item, section.name, activeWeek);
                    return (
                      <div key={ii} style={{ padding: '12px 14px', gap: 8, borderBottom: ii < section.items.length - 1 ? '1px solid #F0EDE6' : 'none', background: ii % 2 === 0 ? '#fff' : '#FDFDFB' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 60px' : hasStab ? '2fr 2.5fr 55px 65px 1.4fr' : '2fr 2.5fr 55px 65px', gap: 8, alignItems: 'start' }}>
                          <div>
                            <div style={{ fontSize: isMobile ? 13 : 14, fontWeight: 700, color: '#1A1A1A', lineHeight: 1.3 }}>{item.name}</div>
                            {item.rest && <div style={{ fontSize: 11, color: '#999', fontFamily: 'monospace', marginTop: 2 }}>Rest: {item.rest}</div>}
                          </div>
                          {!isMobile && <div style={{ fontSize: 13, color: '#444', lineHeight: 1.6 }}>{item.detail}</div>}
                          <div style={{ fontSize: 14, color: section.color, fontFamily: 'monospace', fontWeight: 700 }}>{adjSets}</div>
                          <div style={{ fontSize: 13, color: '#333', fontFamily: 'monospace', fontWeight: 600 }}>{item.reps || '—'}</div>
                          {!isMobile && hasStab && <div style={{ fontSize: 12, color: '#1D5FA8', fontFamily: 'monospace', lineHeight: 1.5 }}>{item.stability || '—'}</div>}
                        </div>
                        {/* Always-visible coaching cue on mobile */}
                        {isMobile && (
                          <div style={{ marginTop: 6, paddingTop: 6, borderTop: '1px dashed #E0DDD6' }}>
                            <div style={{ fontSize: 12, color: '#555', lineHeight: 1.6 }}>{item.detail}</div>
                            {item.stability && <div style={{ fontSize: 11, color: '#1D5FA8', fontFamily: 'monospace', lineHeight: 1.5, marginTop: 3 }}>↔ {item.stability}</div>}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Phase principles */}
        <div style={{ marginTop: 28, padding: '18px 20px', background: '#F5F5F0', borderRadius: 10, border: '1px solid #E0DDD6', borderLeft: '5px solid #E8500A' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.2em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>Phase 1 Principles</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            {[
              ['Progressive Overload', 'Add 2.5–5kg when all reps complete with clean form. Never chase load at cost of technique.'],
              ['RPE Targets', 'Strength days: 7–8. Endurance circuits: 6–7. Never redline in Phase 1.'],
              ['Mobility First', 'Every warm-up and cool-down is non-negotiable.'],
              ['Stability as Active Rest', 'Stability drills between sets are programming, not filler.'],
            ].map(([t, d]) => (
              <div key={t}>
                <div style={{ fontSize: 13, color: '#E8500A', fontWeight: 700, marginBottom: 4 }}>{t}</div>
                <div style={{ fontSize: 12, color: '#555', lineHeight: 1.7 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
