import React, { useState } from 'react';
import { WOD_LIBRARY, WOD_CATEGORIES } from './data.js';
import { F, C, MONO, inputStyle } from './ui.jsx';

// Inline picker used on the Log tab: choose from the library or add a custom WOD.
export default function WodPicker({ suggestedCat, addedIds, onAdd, onClose }) {
  const [cat, setCat] = useState(suggestedCat || 'A');
  const [custom, setCustom] = useState(false);
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const info = WOD_CATEGORIES[cat];

  const submitCustom = () => {
    const n = name.trim();
    if (!n) return;
    const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);
    onAdd({ id: 'CUSTOM', name: n, custom: true, category: 'X', duration: '', description: '', movements: lines, scoring: '' });
    setName(''); setText(''); setCustom(false);
  };

  return (
    <div data-testid="wod-picker" style={{ background: '#fff', border: '1px solid #F0C0DC', borderRadius: 10, padding: 10, marginTop: 8 }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 8, overflowX: 'auto' }}>
        {['A', 'B', 'C'].map((c) => (
          <button key={c} data-testid={'pick-cat-' + c} onClick={() => { setCat(c); setCustom(false); }}
            style={{ flex: '0 0 auto', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontFamily: MONO, fontSize: F(11), fontWeight: !custom && cat === c ? 700 : 400, background: !custom && cat === c ? WOD_CATEGORIES[c].color : '#fff', color: !custom && cat === c ? '#fff' : '#555', border: '1px solid ' + (!custom && cat === c ? WOD_CATEGORIES[c].color : '#D0CCC4') }}>
            {c}: {WOD_CATEGORIES[c].subtitle}
          </button>
        ))}
        <button data-testid="pick-custom" onClick={() => setCustom(true)}
          style={{ flex: '0 0 auto', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', fontFamily: MONO, fontSize: F(11), fontWeight: custom ? 700 : 400, background: custom ? C.ink : '#fff', color: custom ? '#fff' : '#555', border: '1px solid ' + (custom ? C.ink : '#D0CCC4') }}>
          Custom
        </button>
      </div>

      {!custom && (
        <div>
          <div style={{ fontSize: F(11), color: '#777', marginBottom: 6 }}>{info.duration}. {info.description}</div>
          {WOD_LIBRARY[cat].map((w) => {
            const added = addedIds.indexOf(w.id) >= 0;
            return (
              <div key={w.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '7px 0', borderBottom: '1px solid #F0EDE6' }}>
                <div>
                  <span style={{ fontSize: F(10), fontFamily: MONO, fontWeight: 700, background: info.color, color: '#fff', padding: '1px 6px', borderRadius: 3, marginRight: 6 }}>{w.id}</span>
                  <span style={{ fontSize: F(13), fontWeight: 700 }}>{w.name}</span>
                  <span style={{ fontSize: F(11), color: '#888', fontFamily: MONO, marginLeft: 6 }}>{w.duration}</span>
                </div>
                <button data-testid={'add-' + w.id} disabled={added} onClick={() => onAdd(Object.assign({}, w, { category: cat }))}
                  style={{ padding: '6px 12px', background: added ? '#D0CCC4' : info.color, color: '#fff', border: 'none', borderRadius: 6, fontFamily: MONO, fontSize: F(11), fontWeight: 700, cursor: added ? 'default' : 'pointer', flex: '0 0 auto' }}>
                  {added ? 'Added' : 'Add'}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {custom && (
        <div>
          <div style={{ fontSize: F(11), color: '#777', marginBottom: 6 }}>For a workout that is not in the library (for example, Fight Gone Bad).</div>
          <input data-testid="custom-name" type="text" placeholder="WOD name" value={name} autoComplete="off" onChange={(e) => setName(e.target.value)} style={Object.assign({}, inputStyle(false), { marginBottom: 6, fontFamily: 'Georgia, serif' })} />
          <textarea data-testid="custom-desc" placeholder={'What is in it? One movement per line.'} value={text} onChange={(e) => setText(e.target.value)} rows={4}
            style={Object.assign({}, inputStyle(false), { fontFamily: 'Georgia, serif', resize: 'vertical' })} />
          <button data-testid="custom-add" onClick={submitCustom} disabled={!name.trim()}
            style={{ marginTop: 8, padding: '8px 16px', background: name.trim() ? C.pink : '#D0CCC4', color: '#fff', border: 'none', borderRadius: 6, fontFamily: MONO, fontSize: F(12), fontWeight: 700, cursor: name.trim() ? 'pointer' : 'default' }}>
            Add custom WOD
          </button>
        </div>
      )}

      <div style={{ marginTop: 8, textAlign: 'right' }}>
        <button onClick={onClose} style={{ padding: '5px 12px', background: 'transparent', border: '1px solid #D0CCC4', borderRadius: 6, fontFamily: MONO, fontSize: F(11), color: '#666', cursor: 'pointer' }}>Done</button>
      </div>
    </div>
  );
}
