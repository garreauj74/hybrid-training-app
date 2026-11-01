import React, { useState } from 'react';
import { LIFTS, DEFAULT_LOADS, PHASE_NUM, PHASE_NAME } from './data.js';
import { formatDate } from './hooks.js';
import { F, C, MONO, ScrollArea } from './ui.jsx';

export default function SettingsScreen({ apiKey, setApiKey, startDate, onChangeDateRequest, customLoads, setCustomLoads, isMobile }) {
  const [inputKey, setInputKey] = useState(apiKey || '');
  const [showKey, setShowKey] = useState(false);
  const [keySaved, setKeySaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({});
  const [saved, setSaved] = useState(false);

  const loads = Object.assign({}, DEFAULT_LOADS, customLoads);

  const startEdit = () => {
    const d = {};
    LIFTS.forEach((l) => { d[l.key] = String(loads[l.key]); });
    setDraft(d);
    setEditing(true);
  };
  const saveLoads = () => {
    const out = {};
    LIFTS.forEach((l) => {
      const n = parseFloat(draft[l.key]);
      out[l.key] = isNaN(n) ? DEFAULT_LOADS[l.key] : n;
    });
    setCustomLoads(out);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const card = { background: '#fff', borderRadius: 12, border: '1px solid ' + C.line, marginBottom: 14, overflow: 'hidden' };
  const head = { padding: '11px 16px', background: '#F5F5F0', borderBottom: '1px solid #F0EDE6', fontSize: F(14), fontWeight: 700 };
  const body = { padding: 16 };
  const btn = (color) => ({ padding: '10px 18px', background: color, color: '#fff', border: 'none', borderRadius: 8, fontSize: F(13), fontFamily: MONO, fontWeight: 700, marginTop: 10 });

  return (
    <ScrollArea>
      <div style={{ maxWidth: 680, margin: '0 auto', padding: isMobile ? '18px 14px 24px' : '26px 22px 24px' }}>
        <h1 style={{ fontSize: F(isMobile ? 20 : 24), fontWeight: 700, margin: '0 0 18px' }}>Settings</h1>

        <div style={card}>
          <div style={head}>Starting Loads (lb)</div>
          <div style={body}>
            <div style={{ fontSize: F(12), color: '#666', marginBottom: 10, lineHeight: 1.6 }}>
              These are your Week 1 loads. Later weeks add to them automatically, and the Programme and Log tabs update as soon as you save. Loads marked estimate were not in your Phase 1 logs, so check them.
            </div>
            {!editing ? (
              <div>
                {LIFTS.map((l) => (
                  <div key={l.key} style={{ display: 'flex', justifyContent: 'space-between', padding: '7px 0', borderBottom: '1px solid #F0EDE6' }}>
                    <div style={{ fontSize: F(13) }}>{l.key}{l.est ? <span style={{ color: '#B45309', fontSize: F(10), fontFamily: MONO }}> estimate</span> : null}</div>
                    <div data-testid={'load-' + l.key} style={{ fontSize: F(13), fontFamily: MONO, fontWeight: 700, color: C.orange }}>{loads[l.key]} lb</div>
                  </div>
                ))}
                <button data-testid="edit-loads" onClick={startEdit} style={btn(C.ink)}>{saved ? 'Saved' : 'Edit Loads'}</button>
              </div>
            ) : (
              <div>
                {LIFTS.map((l) => (
                  <div key={l.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <label style={{ fontSize: F(12), flex: 1 }}>{l.key}</label>
                    <input data-testid={'edit-' + l.key} type="text" inputMode="decimal" value={draft[l.key]} onChange={(e) => setDraft(Object.assign({}, draft, { [l.key]: e.target.value }))}
                      style={{ width: 84, padding: '7px 10px', fontSize: F(16), fontFamily: MONO, border: '1px solid #D0CCC4', borderRadius: 6, textAlign: 'center' }} />
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 8 }}>
                  <button data-testid="save-loads" onClick={saveLoads} style={btn(C.orange)}>Save Loads</button>
                  <button onClick={() => setEditing(false)} style={btn('#777')}>Cancel</button>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={card}>
          <div style={head}>Anthropic API Key</div>
          <div style={body}>
            <div style={{ display: 'flex', gap: 8 }}>
              <input type={showKey ? 'text' : 'password'} placeholder="sk-ant-api03-..." value={inputKey} onChange={(e) => setInputKey(e.target.value)}
                style={{ flex: 1, padding: '10px 12px', fontSize: F(16), fontFamily: MONO, border: '1px solid #D0CCC4', borderRadius: 8 }} />
              <button onClick={() => setShowKey((v) => !v)} style={{ padding: '10px 12px', background: '#F5F5F0', border: '1px solid #D0CCC4', borderRadius: 8, fontSize: F(12), fontFamily: MONO }}>{showKey ? 'Hide' : 'Show'}</button>
            </div>
            <button onClick={() => { setApiKey(inputKey.trim()); setKeySaved(true); setTimeout(() => setKeySaved(false), 2000); }} style={btn(keySaved ? C.green : C.orange)}>{keySaved ? 'Saved' : 'Save Key'}</button>
            <div style={{ marginTop: 10, fontSize: F(12), color: '#666', lineHeight: 1.6 }}>Used only for the Weekly Review button. Stored on this device.</div>
          </div>
        </div>

        <div style={card}>
          <div style={head}>Programme Schedule</div>
          <div style={body}>
            <div style={{ fontSize: F(13), color: '#555', lineHeight: 1.7 }}><strong>Start date:</strong> {startDate ? formatDate(startDate) : 'Not set'}</div>
            <button onClick={onChangeDateRequest} style={btn(C.ink)}>Change Start Date</button>
          </div>
        </div>

        <div style={card}>
          <div style={head}>Build Next Phase</div>
          <div style={body}>
            <div style={{ fontSize: F(13), color: '#555', lineHeight: 1.7, marginBottom: 6 }}>When Phase {PHASE_NUM} is done, copy this request and paste it into Claude along with your Week 4 log.</div>
            <PhaseBuilder />
          </div>
        </div>

        <div style={card}>
          <div style={head}>About</div>
          <div style={body}>
            <div style={{ fontSize: F(13), color: '#666', lineHeight: 1.8 }}>
              <strong>Phase {PHASE_NUM} - {PHASE_NAME}</strong><br />
              Push / Pull / Legs, two WOD days, two rest days. Only the strength block and WODs are logged.<br /><br />
              Phase 1 logs from the earlier version are archived in this device's storage, not deleted.
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}

function PhaseBuilder() {
  const [copied, setCopied] = useState(false);
  const generate = () => {
    const lines = [
      'PHASE ' + PHASE_NUM + ' COMPLETE -- BUILD PHASE ' + (PHASE_NUM + 1),
      "Athlete: 52yo, 6'1\", 190lbs, Intermediate. Goals: athletic performance + lean muscle.",
      'Equipment: barbell, rack, incline bench, DB, KB (35 and 53 lb), pull-up bar, box, wallball, jump rope, assault bike, rower.',
      '',
      'Phase ' + PHASE_NUM + ' structure: Mon Push, Tue WOD, Wed Rest, Thu Pull, Fri Legs, Sat WOD, Sun Rest.',
      'Only the strength block and WODs are logged. No cool-down. Strength sessions about 70 min, WOD days up to 60 min.',
      'Weekly pattern: Wk1 4x5, Wk2 4x4, Wk3 4x3 (heaviest), Wk4 deload 3x5 plus Chipper retest.',
      '',
      'Design Phase ' + (PHASE_NUM + 1) + ' (4 weeks) that builds on the logs I attach, keeps the same weekly structure, and fits a 52-year-old intermediate athlete.',
    ];
    try {
      navigator.clipboard.writeText(lines.join('\n')).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2500); });
    } catch (e) { console.warn(e); }
  };
  return (
    <button onClick={generate} style={{ padding: '10px 18px', background: copied ? C.green : C.orange, color: '#fff', border: 'none', borderRadius: 8, fontSize: F(13), fontFamily: MONO, fontWeight: 700 }}>
      {copied ? 'Copied' : 'Copy Phase ' + (PHASE_NUM + 1) + ' Request'}
    </button>
  );
}
