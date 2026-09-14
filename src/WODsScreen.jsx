import React, { useState } from 'react';
import { WOD_LIBRARY, WOD_CATEGORIES, WOD_ROTATION, getSuggestedCategory, DAYS } from './data.js';

export default function WODsScreen({ isMobile, activeWeek, activeDay, getAssignedWOD, assignWOD, setTab, setActiveDay }) {
  const [selectedCat, setSelectedCat] = useState('A');
  const [expandedWOD, setExpandedWOD] = useState(null);
  const [assignTarget, setAssignTarget] = useState(null); // { weekIdx, dayId, dayLabel }
  const [justAssigned, setJustAssigned] = useState(null);

  // Conditioning days for current week
  const condDays = DAYS.filter(d => d.type === 'CONDITIONING');

  const handleAssign = (wod, weekIdx, dayId) => {
    assignWOD(weekIdx, dayId, { ...wod, category: selectedCat });
    setJustAssigned(wod.id + '-' + dayId);
    setTimeout(() => setJustAssigned(null), 2000);
  };

  const suggestedCat = getSuggestedCategory(activeWeek, activeDay);

  const s = {
    page: { maxWidth: 980, margin: '0 auto', padding: isMobile ? '0 0 80px' : '0 0 80px' },
    stickyHeader: { position: 'sticky', top: 48, zIndex: 50, background: '#FAFAF7', borderBottom: '2px solid #E0DDD6', padding: '10px 14px 0' },
    catBtn: (active, color) => ({ padding: '8px 14px', background: active ? color : '#fff', border: '1px solid ' + (active ? color : '#D0CCC4'), borderRadius: 8, color: active ? '#fff' : '#555', cursor: 'pointer', fontFamily: 'monospace', fontSize: 12, fontWeight: active ? 700 : 400, flexShrink: 0 }),
    wodCard: (expanded) => ({ background: '#fff', borderRadius: 10, border: '1px solid ' + (expanded ? WOD_CATEGORIES[selectedCat].color : '#E0DDD6'), marginBottom: 10, overflow: 'hidden', transition: 'border-color 0.2s' }),
    wodHeader: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', cursor: 'pointer' },
    assignBtn: (assigned) => ({ padding: '7px 14px', background: assigned ? '#0A7C4E' : WOD_CATEGORIES[selectedCat].color, color: '#fff', border: 'none', borderRadius: 6, fontSize: 12, fontFamily: 'monospace', fontWeight: 700, cursor: 'pointer', flexShrink: 0 }),
  };

  const cat = WOD_CATEGORIES[selectedCat];

  return (
    <div style={s.page}>
      {/* Sticky header */}
      <div style={s.stickyHeader}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>WOD Library</div>
          <div style={{ fontSize: 11, color: '#999', fontFamily: 'monospace' }}>30 workouts across 3 categories</div>
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: 10 }}>
          {['A', 'B', 'C'].map(c => (
            <button key={c} onClick={() => setSelectedCat(c)} style={s.catBtn(selectedCat === c, WOD_CATEGORIES[c].color)}>
              {WOD_CATEGORIES[c].label} -- {WOD_CATEGORIES[c].subtitle} ({WOD_CATEGORIES[c].duration})
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '14px 14px' }}>
        {/* Category description */}
        <div style={{ padding: '12px 14px', background: cat.color + '15', borderRadius: 8, borderLeft: '4px solid ' + cat.color, marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: cat.color, marginBottom: 2 }}>{cat.label} -- {cat.subtitle}</div>
          <div style={{ fontSize: 12, color: '#555' }}>{cat.description} Duration: {cat.duration}.</div>
        </div>

        {/* Suggested note */}
        {condDays.some(d => getSuggestedCategory(activeWeek, d.id) === selectedCat) && (
          <div style={{ padding: '8px 12px', background: '#F0FDF4', border: '1px solid #10B981', borderRadius: 6, marginBottom: 14, fontSize: 12, color: '#0A7C4E', fontFamily: 'monospace' }}>
            Suggested for Week {activeWeek + 1} conditioning day
          </div>
        )}

        {/* Assign to day section */}
        <div style={{ marginBottom: 16, padding: '12px 14px', background: '#F5F5F0', borderRadius: 10, border: '1px solid #E0DDD6' }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#1A1A1A', marginBottom: 8 }}>Assign WOD to a Day</div>
          <div style={{ fontSize: 11, color: '#666', marginBottom: 10 }}>Expand any WOD below and tap Assign to add it to Tuesday or Saturday.</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {condDays.map(d => {
              const assigned = getAssignedWOD(activeWeek, d.id);
              return (
                <div key={d.id} style={{ flex: 1, minWidth: 140, padding: '8px 10px', background: '#fff', borderRadius: 8, border: '1px solid #E0DDD6' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#1A1A1A', marginBottom: 2 }}>{d.day}</div>
                  <div style={{ fontSize: 10, color: assigned ? '#B5197A' : '#999', fontFamily: 'monospace' }}>
                    {assigned ? assigned.name + ' (' + assigned.category + ')' : 'No WOD assigned'}
                  </div>
                  {assigned && (
                    <button onClick={() => { assignWOD(activeWeek, d.id, null); }} style={{ marginTop: 4, padding: '2px 8px', background: 'transparent', border: '1px solid #D0CCC4', borderRadius: 4, fontSize: 10, color: '#999', cursor: 'pointer', fontFamily: 'monospace' }}>Clear</button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* WOD cards */}
        {WOD_LIBRARY[selectedCat].map(wod => {
          const isExpanded = expandedWOD === wod.id;
          return (
            <div key={wod.id} style={s.wodCard(isExpanded)}>
              <div style={s.wodHeader} onClick={() => setExpandedWOD(isExpanded ? null : wod.id)}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                    <span style={{ fontSize: 11, fontFamily: 'monospace', fontWeight: 700, background: cat.color, color: '#fff', padding: '2px 7px', borderRadius: 3 }}>{wod.id}</span>
                    <span style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>{wod.name}</span>
                  </div>
                  <div style={{ fontSize: 11, color: '#888', fontFamily: 'monospace' }}>{wod.duration}</div>
                </div>
                <span style={{ fontSize: 12, color: cat.color, fontWeight: 700, transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>▶</span>
              </div>

              {isExpanded && (
                <div style={{ borderTop: '1px solid #F0EDE6' }}>
                  <div style={{ padding: '12px 16px', background: '#FAFAF7' }}>
                    <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: '0 0 12px', fontStyle: 'italic' }}>{wod.description}</p>
                    <div style={{ fontSize: 11, fontFamily: 'monospace', color: '#999', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>Movements</div>
                    {wod.movements.map((m, i) => (
                      <div key={i} style={{ fontSize: 13, color: '#333', padding: '4px 0', borderBottom: i < wod.movements.length - 1 ? '1px solid #F0EDE6' : 'none' }}>
                        {m}
                      </div>
                    ))}
                    <div style={{ marginTop: 12, padding: '8px 12px', background: cat.color + '15', borderRadius: 6, borderLeft: '3px solid ' + cat.color }}>
                      <div style={{ fontSize: 10, fontFamily: 'monospace', color: cat.color, fontWeight: 700, textTransform: 'uppercase', marginBottom: 2 }}>Scoring</div>
                      <div style={{ fontSize: 12, color: '#444' }}>{wod.scoring}</div>
                    </div>
                  </div>

                  {/* Assign buttons */}
                  <div style={{ padding: '12px 16px', background: '#fff', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: '#999', fontFamily: 'monospace', flexShrink: 0 }}>Assign to:</div>
                    {condDays.map(d => {
                      const assignKey = wod.id + '-' + d.id;
                      const isAssigned = justAssigned === assignKey;
                      return (
                        <button key={d.id} onClick={() => handleAssign(wod, activeWeek, d.id)} style={s.assignBtn(isAssigned)}>
                          {isAssigned ? '✓ Assigned' : 'W' + (activeWeek + 1) + ' ' + d.day}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
