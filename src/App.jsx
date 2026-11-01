import React, { useState, useEffect } from 'react';
import './index.css';
import { useIsMobile, useVisualViewport, useLocalStorage, todayStr, getProgrammePosition } from './hooks.js';
import { APP_VERSION, PHASE_NUM, PHASE_NAME, wodSlotKey } from './data.js';
import { F, MONO } from './ui.jsx';
import DashboardScreen from './DashboardScreen.jsx';
import ProgrammeScreen from './ProgrammeScreen.jsx';
import LogScreen from './LogScreen.jsx';
import WODsScreen from './WODsScreen.jsx';
import SettingsScreen from './SettingsScreen.jsx';

// Runs once, before React reads storage. Old data is ARCHIVED, never deleted.
function migrateStorage() {
  try {
    const stored = localStorage.getItem('app-version');
    if (stored === APP_VERSION) return;
    const dataKeys = ['training-logs', 'training-sessions', 'selected-wods', 'custom-loads', 'programme-start-date'];
    const archive = {};
    let any = false;
    dataKeys.forEach((k) => {
      const v = localStorage.getItem(k);
      if (v !== null) { archive[k] = v; any = true; }
    });
    if (any) {
      localStorage.setItem('archive-from-v' + (stored || 'unknown'), JSON.stringify({ archivedAt: new Date().toISOString(), data: archive }));
    }
    dataKeys.concat(['nav-week', 'nav-day', 'active-phase']).forEach((k) => localStorage.removeItem(k));
    localStorage.setItem('app-version', APP_VERSION);
  } catch (e) {
    console.warn('migration failed', e);
  }
}
migrateStorage();

function loadJSON(key, fallback) {
  try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : fallback; } catch (e) { return fallback; }
}

export default function App() {
  const isMobile = useIsMobile();
  const vv = useVisualViewport();
  const [tab, setTab] = useState('dashboard');

  const [activeWeek, setActiveWeek] = useLocalStorage('nav-week', 0);
  const [activeDay, setActiveDay] = useLocalStorage('nav-day', 'd1');
  const [apiKey, setApiKey] = useLocalStorage('anthropic-api-key', '');
  const [startDate, setStartDate] = useLocalStorage('programme-start-date', null);
  const [customLoads, setCustomLoads] = useLocalStorage('custom-loads', {});
  const [showDateSetup, setShowDateSetup] = useState(false);

  const [logs, setLogs] = useState(() => loadJSON('training-logs', {}));
  const [sessions, setSessions] = useState(() => loadJSON('training-sessions', {}));
  const [wods, setWods] = useState(() => loadJSON('selected-wods', {}));

  useEffect(() => { try { localStorage.setItem('training-logs', JSON.stringify(logs)); } catch (e) { console.warn(e); } }, [logs]);
  useEffect(() => { try { localStorage.setItem('training-sessions', JSON.stringify(sessions)); } catch (e) { console.warn(e); } }, [sessions]);
  useEffect(() => { try { localStorage.setItem('selected-wods', JSON.stringify(wods)); } catch (e) { console.warn(e); } }, [wods]);

  const syncFromDate = (dateStr) => {
    const pos = getProgrammePosition(dateStr);
    setActiveWeek(pos.weekIdx);
    setActiveDay(pos.dayId);
  };

  const updateLog = (key, field, value) => {
    setLogs((prev) => {
      const existing = prev[key] || { weight: '', reps: '', rpe: '', notes: '', mobilityNotes: '' };
      return Object.assign({}, prev, { [key]: Object.assign({}, existing, { [field]: value }) });
    });
  };
  const updateSession = (key, field, value) => {
    setSessions((prev) => {
      const existing = prev[key] || { rpe: '', notes: '' };
      return Object.assign({}, prev, { [key]: Object.assign({}, existing, { [field]: value }) });
    });
  };

  // Several WODs can be stored on one conditioning day.
  const getWODs = (w, d) => wods[wodSlotKey(w, d)] || [];
  const addWOD = (w, d, wod) => {
    setWods((prev) => {
      const k = wodSlotKey(w, d);
      const list = prev[k] || [];
      if (!wod.custom && list.some((x) => x.id === wod.id)) return prev;
      const uid = 'u' + Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
      const entry = Object.assign({}, wod, { uid: uid, score: '', notes: '' });
      return Object.assign({}, prev, { [k]: list.concat([entry]) });
    });
  };
  const updateWOD = (w, d, uid, field, value) => {
    setWods((prev) => {
      const k = wodSlotKey(w, d);
      const list = (prev[k] || []).map((x) => (x.uid === uid ? Object.assign({}, x, { [field]: value }) : x));
      return Object.assign({}, prev, { [k]: list });
    });
  };
  const removeWOD = (w, d, uid) => {
    setWods((prev) => {
      const k = wodSlotKey(w, d);
      return Object.assign({}, prev, { [k]: (prev[k] || []).filter((x) => x.uid !== uid) });
    });
  };

  if (!startDate || showDateSetup) {
    return (
      <DateSetup
        existing={startDate}
        onSave={(d) => { setStartDate(d); syncFromDate(d); setShowDateSetup(false); }}
      />
    );
  }

  const NAV = [
    { id: 'dashboard', label: 'Home', icon: '🏠' },
    { id: 'programme', label: 'Programme', icon: '📋' },
    { id: 'log', label: 'Log', icon: '📝' },
    { id: 'wods', label: 'WODs', icon: '⚡' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  const nav = { activeWeek, setActiveWeek, activeDay, setActiveDay, isMobile, setTab };
  const wodApi = { getWODs, addWOD, updateWOD, removeWOD };

  // Pinned to the visible area so the keyboard cannot push the headers away.
  const rootStyle = {
    position: 'fixed', left: 0, right: 0,
    top: vv.height ? vv.top : 0,
    height: vv.height ? vv.height : undefined,
    bottom: vv.height ? undefined : 0,
    display: 'flex', flexDirection: 'column',
    background: '#FAFAF7', fontFamily: "Georgia, 'Times New Roman', serif",
  };

  return (
    <div data-testid="app-root" style={rootStyle}>
      <div data-testid="app-header" style={{ flex: 'none', background: '#1A1A1A', borderBottom: '2px solid #E8500A', paddingTop: 'env(safe-area-inset-top)' }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px' }}>
          <div style={{ fontSize: F(isMobile ? 12 : 14), color: '#E8500A', fontFamily: MONO, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hybrid Training</div>
          <div style={{ fontSize: F(isMobile ? 11 : 12), color: '#888', fontFamily: MONO }}>Phase {PHASE_NUM} - {PHASE_NAME}</div>
        </div>
      </div>

      <main style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
        {tab === 'dashboard' && <DashboardScreen {...nav} logs={logs} sessions={sessions} startDate={startDate} getWODs={getWODs} />}
        {tab === 'programme' && <ProgrammeScreen {...nav} customLoads={customLoads} getWODs={getWODs} />}
        {tab === 'log' && <LogScreen {...nav} logs={logs} sessions={sessions} updateLog={updateLog} updateSession={updateSession} apiKey={apiKey} customLoads={customLoads} {...wodApi} />}
        {tab === 'wods' && <WODsScreen {...nav} {...wodApi} />}
        {tab === 'settings' && (
          <SettingsScreen apiKey={apiKey} setApiKey={setApiKey} startDate={startDate}
            onChangeDateRequest={() => setShowDateSetup(true)} customLoads={customLoads} setCustomLoads={setCustomLoads} isMobile={isMobile} />
        )}
      </main>

      {!vv.keyboard && (
        <nav data-testid="app-nav" style={{ flex: 'none', background: '#fff', borderTop: '1px solid #E0DDD6', display: 'flex', paddingBottom: 'env(safe-area-inset-bottom)' }}>
          {NAV.map(({ id, label, icon }) => {
            const on = tab === id;
            return (
              <button key={id} data-testid={'nav-' + id} onClick={() => setTab(id)}
                style={{ flex: 1, padding: '8px 4px 6px', border: 'none', background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, borderTop: on ? '2px solid #E8500A' : '2px solid transparent' }}>
                <span style={{ fontSize: F(isMobile ? 18 : 20), lineHeight: 1 }}>{icon}</span>
                <span style={{ fontSize: F(isMobile ? 9 : 10), fontFamily: MONO, fontWeight: on ? 700 : 400, color: on ? '#E8500A' : '#999', letterSpacing: '0.06em', textTransform: 'uppercase' }}>{label}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

function DateSetup({ onSave, existing }) {
  const [selected, setSelected] = useState(existing || todayStr());
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, overflowY: 'auto', background: '#FAFAF7', fontFamily: "Georgia, 'Times New Roman', serif" }}>
      <div style={{ minHeight: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ maxWidth: 400, width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <div style={{ fontSize: F(40), marginBottom: 12 }}>🏋️</div>
            <h1 style={{ fontSize: F(26), fontWeight: 700, margin: '0 0 8px' }}>{existing ? 'Change Start Date' : 'Start Phase ' + PHASE_NUM}</h1>
            <p style={{ fontSize: F(14), color: '#666', margin: 0, lineHeight: 1.6 }}>
              {existing ? 'Update when this phase started.' : 'Pick the Monday you start. The app tracks your week and day from this date.'}
            </p>
          </div>
          <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E0DDD6', padding: 22, marginBottom: 16 }}>
            <div style={{ fontSize: F(11), letterSpacing: '0.15em', color: '#999', fontFamily: MONO, textTransform: 'uppercase', marginBottom: 8 }}>Start Date</div>
            <input data-testid="start-date" type="date" value={selected} onChange={(e) => setSelected(e.target.value)}
              style={{ width: '100%', padding: '12px 14px', fontSize: F(16), fontFamily: MONO, border: '1px solid #D0CCC4', borderRadius: 8, boxSizing: 'border-box', background: '#fff' }} />
          </div>
          <button data-testid="start-save" onClick={() => selected && onSave(selected)} disabled={!selected}
            style={{ width: '100%', padding: 14, background: selected ? '#E8500A' : '#D0CCC4', color: '#fff', border: 'none', borderRadius: 10, fontSize: F(15), fontFamily: MONO, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            {existing ? 'Update Date' : 'Start Programme'}
          </button>
        </div>
      </div>
    </div>
  );
}
