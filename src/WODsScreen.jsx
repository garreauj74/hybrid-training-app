import React, { useState } from 'react';
import { WOD_LIBRARY, WOD_CATEGORIES, DAYS, WEEK_NOTES, getSuggestedCategory } from './data.js';
import { F, C, MONO, ScrollArea, WodDetail } from './ui.jsx';

export default function WODsScreen({ isMobile, activeWeek, setActiveWeek, setActiveDay, getWODs, addWOD, removeWOD, setTab }) {
  const [cat, setCat] = useState('A');
  const [open, setOpen] = useState(null);
  const [flash, setFlash] = useState(null);
  const condDays = DAYS.filter((d) => d.type === 'CONDITIONING');
  const info = WOD_CATEGORIES[cat];

  const handleAdd = (wod, dayId) => {
    addWOD(activeWeek, dayId, Object.assign({}, wod, { category: cat }));
    setFlash(wod.id + '-' + dayId);
    setTimeout(() => setFlash(null), 1800);
  };

  return (
    <>
      <div data-testid="wods-header" style={{ flex: 'none', background: '#fff', borderBottom: '2px solid #E0DDD6', padding: '8px 12px 8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5, overflowX: 'auto', marginBottom: 6 }}>
          <span style={{ fontSize: F(10), color: C.mute, fontFamily: MONO, textTransform: 'uppercase', flex: '0 0 auto' }}>Assign to week:</span>
          {WEEK_NOTES.map((w, i) => (
            <button key={w.week} data-testid={'wods-week-' + i} onClick={() => setActiveWeek(i)}
              style={{ flex: '0 0 auto', padding: '5px 10px', background: activeWeek === i ? C.orange : '#fff', border: '1px solid ' + (activeWeek === i ? C.orange : '#D0CCC4'), borderRadius: 6, color: activeWeek === i ? '#fff' : '#555', fontFamily: MONO, fontSize: F(12), fontWeight: activeWeek === i ? 700 : 400 }}>W{i + 1}</button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto' }}>
          {['A', 'B', 'C'].map((c) => (
            <button key={c} data-testid={'cat-' + c} onClick={() => { setCat(c); setOpen(null); }}
              style={{ flex: '0 0 auto', padding: '7px 12px', background: cat === c ? WOD_CATEGORIES[c].color : '#fff', border: '1px solid ' + (cat === c ? WOD_CATEGORIES[c].color : '#D0CCC4'), borderRadius: 8, color: cat === c ? '#fff' : '#555', fontFamily: MONO, fontSize: F(11), fontWeight: cat === c ? 700 : 400 }}>
              {c}: {WOD_CATEGORIES[c].subtitle} ({WOD_CATEGORIES[c].duration})
            </button>
          ))}
        </div>
      </div>

      <ScrollArea key={cat}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '12px 12px 24px' : '16px 16px 24px' }}>
          <div style={{ padding: '10px 14px', background: info.color + '15', borderRadius: 8, borderLeft: '4px solid ' + info.color, marginBottom: 12 }}>
            <div style={{ fontSize: F(13), fontWeight: 700, color: info.color }}>{info.label} - {info.subtitle}</div>
            <div style={{ fontSize: F(12), color: '#555' }}>{info.description}</div>
          </div>

          <div style={{ padding: '10px 12px', background: '#F5F5F0', borderRadius: 10, border: '1px solid ' + C.line, marginBottom: 14 }}>
            <div style={{ fontSize: F(12), fontWeight: 700, marginBottom: 6 }}>Planned for Week {activeWeek + 1}</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {condDays.map((d) => {
                const list = getWODs(activeWeek, d.id);
                return (
                  <div key={d.id} data-testid={'planned-' + d.id} style={{ flex: 1, minWidth: 150, padding: '8px 10px', background: '#fff', borderRadius: 8, border: '1px solid ' + C.line }}>
                    <div style={{ fontSize: F(11), fontWeight: 700 }}>{d.day} <span style={{ color: '#999', fontWeight: 400 }}>(suggested: {getSuggestedCategory(activeWeek, d.id)})</span></div>
                    {list.length === 0 && <div style={{ fontSize: F(10), color: '#999', fontFamily: MONO }}>No WOD yet</div>}
                    {list.map((w) => (
                      <div key={w.uid} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 6, marginTop: 3 }}>
                        <span style={{ fontSize: F(11), color: C.pink, fontFamily: MONO }}>{w.name}</span>
                        <button onClick={() => removeWOD(activeWeek, d.id, w.uid)} style={{ padding: '1px 7px', background: 'transparent', border: '1px solid #D0CCC4', borderRadius: 4, fontSize: F(10), color: '#999', fontFamily: MONO }}>x</button>
                      </div>
                    ))}
                    <button onClick={() => { setActiveDay(d.id); setTab('log'); }} style={{ marginTop: 5, padding: '2px 0', background: 'transparent', border: 'none', color: C.blue, fontFamily: MONO, fontSize: F(10), textDecoration: 'underline' }}>Open in Log</button>
                  </div>
                );
              })}
            </div>
          </div>

          {WOD_LIBRARY[cat].map((wod) => {
            const isOpen = open === wod.id;
            return (
              <div key={wod.id} data-testid={'wod-card-' + wod.id} style={{ background: '#fff', borderRadius: 10, border: '1px solid ' + (isOpen ? info.color : C.line), marginBottom: 10, overflow: 'hidden' }}>
                <div onClick={() => setOpen(isOpen ? null : wod.id)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', cursor: 'pointer' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                      <span style={{ fontSize: F(11), fontFamily: MONO, fontWeight: 700, background: info.color, color: '#fff', padding: '2px 7px', borderRadius: 3 }}>{wod.id}</span>
                      <span style={{ fontSize: F(14), fontWeight: 700 }}>{wod.name}</span>
                    </div>
                    <div style={{ fontSize: F(11), color: '#888', fontFamily: MONO }}>{wod.duration}</div>
                  </div>
                  <span style={{ fontSize: F(12), color: info.color, fontWeight: 700, transform: isOpen ? 'rotate(90deg)' : 'none' }}>{'>'}</span>
                </div>
                {isOpen && (
                  <div style={{ borderTop: '1px solid #F0EDE6' }}>
                    <div style={{ padding: '12px 14px', background: '#FAFAF7' }}><WodDetail wod={wod} color={info.color} /></div>
                    <div style={{ padding: '10px 14px', display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
                      <span style={{ fontSize: F(11), color: '#999', fontFamily: MONO }}>Add to Week {activeWeek + 1}:</span>
                      {condDays.map((d) => {
                        const already = getWODs(activeWeek, d.id).some((x) => x.id === wod.id);
                        const justNow = flash === wod.id + '-' + d.id;
                        return (
                          <button key={d.id} data-testid={'assign-' + wod.id + '-' + d.id} disabled={already && !justNow} onClick={() => handleAdd(wod, d.id)}
                            style={{ padding: '7px 12px', background: already ? C.green : info.color, color: '#fff', border: 'none', borderRadius: 6, fontFamily: MONO, fontSize: F(12), fontWeight: 700, opacity: already && !justNow ? 0.7 : 1 }}>
                            {already ? 'Added to ' + d.day : d.day}
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
      </ScrollArea>
    </>
  );
}
