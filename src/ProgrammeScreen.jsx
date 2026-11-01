import React, { useState } from 'react';
import { DAYS, WEEK_NOTES, TYPE_COLORS, TYPE_LABEL, SECTION_ICONS, EST_LIFTS, getLoad, getPlan, rxText, getSuggestedCategory, WOD_CATEGORIES } from './data.js';
import { F, C, MONO, ScrollArea, WeekDayBar, WodDetail } from './ui.jsx';

export default function ProgrammeScreen({ activeWeek, setActiveWeek, activeDay, setActiveDay, isMobile, customLoads, getWODs, setTab }) {
  const [closed, setClosed] = useState({});
  const day = DAYS.find((d) => d.id === activeDay);
  const tc = TYPE_COLORS[day.type];
  const wods = getWODs(activeWeek, day.id);

  const toggle = (name) => setClosed((p) => Object.assign({}, p, { [name]: !p[name] }));

  return (
    <>
      <WeekDayBar testId="programme-header" showDays activeWeek={activeWeek} setActiveWeek={setActiveWeek} activeDay={activeDay} onDay={setActiveDay} />
      <ScrollArea key={activeWeek + '-' + activeDay}>
        <div style={{ maxWidth: 980, margin: '0 auto', padding: isMobile ? '12px 12px 24px' : '18px 16px 24px' }}>
          <div style={{ padding: '10px 14px', background: '#FFF8F5', borderRadius: 8, borderLeft: '4px solid ' + C.orange, marginBottom: 14 }}>
            <span style={{ fontSize: F(13), fontWeight: 700, color: C.orange }}>{WEEK_NOTES[activeWeek].theme} - </span>
            <span style={{ fontSize: F(12), color: '#555' }}>{WEEK_NOTES[activeWeek].note}</span>
          </div>

          <div style={{ borderLeft: '5px solid ' + tc.bg, paddingLeft: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: F(10), fontFamily: MONO, background: tc.bg, color: tc.text, padding: '2px 8px', borderRadius: 3, fontWeight: 700 }}>{TYPE_LABEL[day.type]}</span>
              {day.totalTime !== '--' && <span style={{ fontSize: F(11), color: '#888', fontFamily: MONO }}>{day.totalTime}</span>}
            </div>
            <div style={{ fontSize: F(isMobile ? 15 : 20), fontWeight: 700, marginBottom: 2 }}>{day.day} - {day.label}</div>
            <div style={{ fontSize: F(12), color: '#666', fontFamily: MONO, marginBottom: 2 }}>{day.focus}</div>
            <div style={{ fontSize: F(11), color: '#AAA', fontFamily: MONO }}>{day.equipment}</div>
          </div>

          {day.sections.map((section) => {
            const isClosed = !!closed[day.id + section.name];
            const logged = section.kind === 'strength' || section.kind === 'wod';
            return (
              <div key={section.name} style={{ marginBottom: 10 }}>
                <div data-testid={'section-' + section.kind} onClick={() => toggle(day.id + section.name)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 13px', background: '#F5F5F0', border: '1px solid ' + section.color + '44', borderLeft: '4px solid ' + section.color, borderRadius: isClosed ? 8 : '8px 8px 0 0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: F(15) }}>{SECTION_ICONS[section.name] || ''}</span>
                    <span style={{ fontSize: F(13), fontWeight: 700 }}>{section.name}</span>
                    {section.duration ? <span style={{ fontSize: F(11), color: C.mute, fontFamily: MONO }}>{section.duration}</span> : null}
                    {!logged && section.kind !== 'rest' ? <span style={{ fontSize: F(9), color: '#aaa', fontFamily: MONO, textTransform: 'uppercase' }}>not logged</span> : null}
                  </div>
                  <span style={{ fontSize: F(10), color: section.color, fontWeight: 700, transform: isClosed ? 'none' : 'rotate(90deg)' }}>{'>'}</span>
                </div>

                {!isClosed && (
                  <div style={{ background: '#fff', border: '1px solid ' + section.color + '22', borderTop: 'none', borderRadius: '0 0 8px 8px' }}>
                    {section.kind === 'strength' && section.items.map((item, ii) => {
                      const load = getLoad(item, activeWeek, customLoads);
                      const plan = getPlan(item, activeWeek);
                      const isEst = item.lift && EST_LIFTS.indexOf(item.lift) >= 0;
                      return (
                        <div key={item.name} data-testid={'rx-' + ii} style={{ padding: '11px 13px', borderBottom: ii < section.items.length - 1 ? '1px solid #F0EDE6' : 'none' }}>
                          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
                            <div style={{ fontSize: F(13), fontWeight: 700, flex: 1 }}>{item.name}</div>
                            <div style={{ textAlign: 'right', flex: '0 0 auto' }}>
                              <div data-testid={'rx-text-' + ii} style={{ fontSize: F(14), fontWeight: 700, color: section.color, fontFamily: MONO }}>{rxText(item, activeWeek, customLoads)}</div>
                              {isEst && <div style={{ fontSize: F(9), color: '#B45309', fontFamily: MONO }}>estimate - adjust in Settings</div>}
                            </div>
                          </div>
                          <div style={{ fontSize: F(12), color: '#555', lineHeight: 1.55, marginTop: 4 }}>{item.detail}</div>
                          <div style={{ fontSize: F(10), color: '#999', fontFamily: MONO, marginTop: 3 }}>
                            {plan ? plan.s + ' sets' : ''}{item.rest ? ' - rest ' + item.rest : ''}{load.text && !item.lift ? ' - ' + load.text : ''}
                          </div>
                          {item.active ? <div style={{ fontSize: F(10), color: C.blue, fontFamily: MONO, marginTop: 3 }}>Between sets: {item.active}</div> : null}
                        </div>
                      );
                    })}

                    {(section.kind === 'warmup' || section.kind === 'core' || section.kind === 'rest') && section.items.map((item, ii) => (
                      <div key={item.name} style={{ padding: '9px 13px', borderBottom: ii < section.items.length - 1 ? '1px solid #F0EDE6' : 'none', display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: F(12.5), fontWeight: 700 }}>{item.name}</div>
                          <div style={{ fontSize: F(11.5), color: '#555', lineHeight: 1.5 }}>{item.detail}</div>
                        </div>
                        {(item.sets || item.reps) ? <div style={{ fontSize: F(11), fontFamily: MONO, color: section.color, fontWeight: 700, textAlign: 'right', flex: '0 0 auto' }}>{item.sets ? item.sets + ' x ' : ''}{item.reps}</div> : null}
                      </div>
                    ))}

                    {section.kind === 'wod' && (
                      <div style={{ padding: '10px 13px' }}>
                        {wods.length === 0 && (
                          <div style={{ fontSize: F(12), color: '#777' }}>
                            No WOD picked for Week {activeWeek + 1} yet. Suggested: <strong style={{ color: C.pink }}>Category {getSuggestedCategory(activeWeek, day.id)} ({WOD_CATEGORIES[getSuggestedCategory(activeWeek, day.id)].subtitle})</strong>.
                            <div style={{ marginTop: 8 }}>
                              <button data-testid="prog-pick" onClick={() => setTab('log')} style={{ padding: '7px 14px', background: C.pink, color: '#fff', border: 'none', borderRadius: 6, fontFamily: MONO, fontSize: F(12), fontWeight: 700 }}>Pick WOD in Log</button>
                            </div>
                          </div>
                        )}
                        {wods.map((w) => (
                          <div key={w.uid} data-testid="prog-wod" style={{ marginBottom: 10, paddingBottom: 10, borderBottom: '1px solid #F0EDE6' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                              <span style={{ fontSize: F(10), fontFamily: MONO, fontWeight: 700, background: C.pink, color: '#fff', padding: '2px 6px', borderRadius: 3 }}>{w.id}</span>
                              <span style={{ fontSize: F(14), fontWeight: 700 }}>{w.name}</span>
                              {w.duration ? <span style={{ fontSize: F(11), color: '#888', fontFamily: MONO }}>{w.duration}</span> : null}
                            </div>
                            <WodDetail wod={w} />
                          </div>
                        ))}
                        {wods.length > 0 && (
                          <button onClick={() => setTab('log')} style={{ padding: '6px 12px', background: '#fff', border: '1px solid ' + C.pink, color: C.pink, borderRadius: 6, fontFamily: MONO, fontSize: F(11) }}>Add or change in Log</button>
                        )}
                      </div>
                    )}
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
