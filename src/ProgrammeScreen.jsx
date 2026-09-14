import React, { useState } from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, SECTION_ICONS, getWeekSets, DEFAULT_LOADS } from './data.js';

export default function ProgrammeScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, isMobile, customLoads }) {
  const [expandedSections, setExpandedSections] = useState({ 0: true });

  const day = DAYS.find(d => d.id === activeDay);
  const tc = TYPE_COLORS[day.type];
  const loads = { ...DEFAULT_LOADS, ...customLoads };

  const handleDayChange = (id) => { setActiveDay(id); setExpandedSections({ 0: true }); };
  const toggleSection = (i) => setExpandedSections(p => ({ ...p, [i]: !p[i] }));

  const getDisplayDetail = (detail) => {
    let d = detail;
    Object.entries(loads).forEach(([name, weight]) => {
      d = d.replace('See starting load in Settings.', 'Start: ' + weight + 'lbs.');
      d = d.replace('See Settings for your load.', 'Start: ' + weight + 'lbs.');
    });
    return d;
  };

  const getItemLoad = (itemName) => loads[itemName] ? loads[itemName] + 'lbs' : null;

  return (
    <div>
      {/* Sticky header */}
      <div style={{ position: 'sticky', top: 48, zIndex: 50, background: '#fff', borderBottom: '2px solid #E8E4DC' }}>
        {/* Week row */}
        <div style={{ display: 'flex', gap: 6, padding: '8px 14px 6px', overflowX: 'auto', scrollbarWidth: 'none', alignItems: 'center' }}>
          <span style={{ fontSize: 10, color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', flexShrink: 0 }}>Week:</span>
          {WEEK_NOTES.map((w, i) => (
            <button key={i} onClick={() => setActiveWeek(i)} style={{ flex: '0 0 auto', padding: '5px 12px', background: activeWeek === i ? '#E8500A' : '#fff', border: activeWeek === i ? '1px solid #E8500A' : '1px solid #D0CCC4', borderRadius: 6, color: activeWeek === i ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'monospace', fontSize: 11, fontWeight: activeWeek === i ? 700 : 400 }}>{w.week}</button>
          ))}
        </div>
        {/* Day row */}
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderTop: '1px solid #F0EDE6' }}>
          {DAYS.map(d => {
            const dtc = TYPE_COLORS[d.type];
            const isActive = activeDay === d.id;
            return (
              <button key={d.id} onClick={() => handleDayChange(d.id)} style={{ flex: '1 0 auto', padding: isMobile ? '8px 4px 6px' : '10px 8px 8px', border: 'none', borderBottom: isActive ? '3px solid ' + dtc.bg : '3px solid transparent', background: isActive ? '#FAFAF7' : 'transparent', cursor: 'pointer', textAlign: 'center' }}>
                <div style={{ fontSize: isMobile ? 9 : 10, fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700, color: isActive ? dtc.bg : '#999', marginBottom: 2 }}>{d.day.slice(0, 3)}</div>
                <span style={{ fontSize: 8, padding: '1px 4px', borderRadius: 3, background: isActive ? dtc.bg : '#E8E4DC', color: isActive ? dtc.text : '#888', fontFamily: 'monospace', fontWeight: 700 }}>{d.type.slice(0, 4)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day content */}
      <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '14px 12px 60px' : '20px 16px 60px' }}>
        {/* Week note */}
        <div style={{ padding: '10px 14px', background: '#FFF8F5', borderRadius: 8, borderLeft: '4px solid #E8500A', marginBottom: 16 }}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#E8500A' }}>{WEEK_NOTES[activeWeek].theme} -- </span>
          <span style={{ fontSize: 12, color: '#555' }}>{WEEK_NOTES[activeWeek].note}</span>
        </div>

        {/* Day header */}
        <div style={{ borderLeft: '5px solid ' + tc.bg, paddingLeft: 14, marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 10, fontFamily: 'monospace', background: tc.bg, color: tc.text, padding: '2px 8px', borderRadius: 3, fontWeight: 700 }}>{day.type}</span>
            {day.totalTime !== '--' && <span style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>⏱ {day.totalTime}</span>}
          </div>
          <div style={{ fontSize: isMobile ? 15 : 20, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{day.label}</div>
          <div style={{ fontSize: 12, color: '#666', fontFamily: 'monospace', marginBottom: 2 }}>{day.focus}</div>
          <div style={{ fontSize: 11, color: '#AAA', fontFamily: 'monospace' }}>🔧 {day.equipment}</div>
        </div>

        {/* Sections */}
        {day.sections.map((section, si) => {
          const isOpen = expandedSections[si] !== false;
          const icon = SECTION_ICONS[section.name] || '•';
          const hasStab = section.items.some(i => i.stability);
          return (
            <div key={si} style={{ marginBottom: 10 }}>
              <div onClick={() => toggleSection(si)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 13px', background: isOpen ? '#F5F5F0' : '#FAFAF7', border: '1px solid ' + section.color + '44', borderLeft: '4px solid ' + section.color, borderRadius: isOpen ? '8px 8px 0 0' : '8px', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15 }}>{icon}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#1A1A1A' }}>{section.name}</span>
                  {section.duration && <span style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>{section.duration}</span>}
                </div>
                <span style={{ fontSize: 10, color: section.color, fontWeight: 700, transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>▶</span>
              </div>

              {isOpen && (
                <div style={{ background: '#fff', border: '1px solid ' + section.color + '22', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
                  {section.note && <div style={{ padding: '8px 13px', background: section.color + '0d', borderBottom: '1px solid ' + section.color + '22', fontSize: 12, color: '#555', fontStyle: 'italic', lineHeight: 1.6 }}>{section.note}</div>}

                  {/* Table header */}
                  <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 60px' : hasStab ? '2fr 2.5fr 55px 65px 1.4fr' : '2fr 2.5fr 55px 65px', padding: '7px 13px', borderBottom: '2px solid #F0EDE6', gap: 8, background: '#FAFAF7' }}>
                    {(isMobile ? ['Exercise', 'Sets', 'Reps'] : ['Exercise', 'Coaching Cue', 'Sets', 'Reps', ...(hasStab ? ['Active Rest'] : [])]).map(h => (
                      <div key={h} style={{ fontSize: 9, letterSpacing: '0.12em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', fontWeight: 700 }}>{h}</div>
                    ))}
                  </div>

                  {section.items.map((item, ii) => {
                    const adjSets = getWeekSets(item, section.name, activeWeek);
                    const startLoad = getItemLoad(item.name);
                    return (
                      <div key={si + '-' + ii} style={{ padding: isMobile ? '10px 13px' : '12px 13px', borderBottom: ii < section.items.length - 1 ? '1px solid #F0EDE6' : 'none', background: ii % 2 === 0 ? '#fff' : '#FDFDFB' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 44px 60px' : hasStab ? '2fr 2.5fr 55px 65px 1.4fr' : '2fr 2.5fr 55px 65px', gap: 8, alignItems: 'start' }}>
                          <div>
                            <div style={{ fontSize: isMobile ? 12 : 13, fontWeight: 700, color: '#1A1A1A' }}>{item.name}</div>
                            {startLoad && <div style={{ fontSize: 10, color: '#E8500A', fontFamily: 'monospace', marginTop: 1, fontWeight: 700 }}>Start: {startLoad}</div>}
                            {item.rest && <div style={{ fontSize: 10, color: '#AAA', fontFamily: 'monospace', marginTop: 1 }}>Rest: {item.rest}</div>}
                            {isMobile && <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginTop: 4 }}>{item.detail}</div>}
                            {isMobile && item.stability && <div style={{ fontSize: 10, color: '#1D5FA8', fontFamily: 'monospace', marginTop: 3 }}>↔ {item.stability}</div>}
                          </div>
                          {!isMobile && <div style={{ fontSize: 12, color: '#444', lineHeight: 1.6 }}>{item.detail}</div>}
                          <div style={{ fontSize: 13, color: section.color, fontFamily: 'monospace', fontWeight: 700 }}>{adjSets}</div>
                          <div style={{ fontSize: 12, color: '#333', fontFamily: 'monospace', fontWeight: 600 }}>{item.reps || '--'}</div>
                          {!isMobile && hasStab && <div style={{ fontSize: 11, color: '#1D5FA8', fontFamily: 'monospace', lineHeight: 1.5 }}>{item.stability || '--'}</div>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
