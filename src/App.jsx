import React, { useState } from 'react';
import './index.css';
import { useIsMobile, useLocalStorage, todayStr, getProgrammePosition } from './hooks.js';
import DashboardScreen from './DashboardScreen.jsx';
import ProgrammeScreen from './ProgrammeScreen.jsx';
import LogScreen from './LogScreen.jsx';
import SettingsScreen from './SettingsScreen.jsx';

export default function App() {
  const isMobile = useIsMobile();
  const [tab, setTab] = useState('dashboard');

  // Shared navigation state — persisted in localStorage
  const [activeWeek, setActiveWeek] = useLocalStorage('nav-week', 0);
  const [activeDay, setActiveDay] = useLocalStorage('nav-day', 'd1');

  // Training log data — persisted in localStorage
  const [logs, setLogsStored] = useLocalStorage('training-logs', {});
  const [sessions, setSessionsStored] = useLocalStorage('training-sessions', {});

  // API key — persisted in localStorage
  const [apiKey, setApiKey] = useLocalStorage('anthropic-api-key', '');

  // Programme start date — null until user sets it
  const [startDate, setStartDate] = useLocalStorage('programme-start-date', null);
  const [showDateSetup, setShowDateSetup] = useState(false);

  // Auto-sync active week/day from start date when it's set
  const syncFromDate = (dateStr) => {
    const pos = getProgrammePosition(dateStr);
    setActiveWeek(pos.weekIdx);
    setActiveDay(pos.dayId);
  };

  const updateLog = (key, field, value) => {
    setLogsStored(prev => ({
      ...prev,
      [key]: { ...(prev[key] || { weight: '', reps: '', rpe: '', notes: '' }), [field]: value },
    }));
  };

  const updateSession = (key, field, value) => {
    setSessionsStored(prev => ({
      ...prev,
      [key]: { ...(prev[key] || { rpe: '', notes: '' }), [field]: value },
    }));
  };

  const NAV = [
    { id: 'dashboard', label: 'Home',      icon: '🏠' },
    { id: 'programme', label: 'Programme', icon: '📋' },
    { id: 'log',       label: 'Log',       icon: '📝' },
    { id: 'settings',  label: 'Settings',  icon: '⚙️' },
  ];

  const sharedProps = { activeWeek, setActiveWeek, activeDay, setActiveDay, isMobile, startDate, setStartDate, syncFromDate };
  const logProps = { logs, sessions, updateLog, updateSession, apiKey };

  // Show date setup on first launch or when triggered
  if (!startDate || showDateSetup) {
    return <DateSetup onSave={(d) => { setStartDate(d); syncFromDate(d); setShowDateSetup(false); }} existing={startDate} isMobile={isMobile} />;
  }

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: '#FAFAF7', minHeight: '100vh', paddingBottom: 'env(safe-area-inset-bottom)' }}>

      {/* Top header */}
      <div style={{
        background: '#1A1A1A',
        position: 'sticky', top: 0, zIndex: 100,
        borderBottom: '2px solid #E8500A',
        paddingTop: 'env(safe-area-inset-top)',
      }}>
        <div style={{ maxWidth: 980, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px' }}>
          <div style={{ fontSize: isMobile ? 12 : 14, color: '#E8500A', fontFamily: 'monospace', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Hybrid Training
          </div>
          <div style={{ fontSize: isMobile ? 11 : 12, color: '#666', fontFamily: 'monospace' }}>
            Phase 1 · Foundation
          </div>
        </div>
      </div>

      {/* Screen content */}
      <div style={{ paddingBottom: 80 }}>
        {tab === 'dashboard' && (
          <DashboardScreen {...sharedProps} logs={logs} sessions={sessions} setTab={setTab} />
        )}
        {tab === 'programme' && (
          <ProgrammeScreen {...sharedProps} />
        )}
        {tab === 'log' && (
          <LogScreen {...sharedProps} {...logProps} />
        )}
        {tab === 'settings' && (
          <SettingsScreen apiKey={apiKey} setApiKey={setApiKey} startDate={startDate} setStartDate={setStartDate} syncFromDate={syncFromDate} onChangeDateRequest={() => setShowDateSetup(true)} isMobile={isMobile} />
        )}
      </div>

      {/* Bottom navigation bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
        background: '#fff',
        borderTop: '1px solid #E0DDD6',
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
      }}>
        {NAV.map(({ id, label, icon }) => {
          const active = tab === id;
          return (
            <button
              key={id}
              onClick={() => setTab(id)}
              style={{
                flex: 1,
                padding: '10px 4px 8px',
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3,
                borderTop: active ? '2px solid #E8500A' : '2px solid transparent',
              }}
            >
              <span style={{ fontSize: 20, lineHeight: 1 }}>{icon}</span>
              <span style={{
                fontSize: 10,
                fontFamily: 'monospace',
                fontWeight: active ? 700 : 400,
                color: active ? '#E8500A' : '#999',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── DATE SETUP SCREEN ────────────────────────────────────────────────────────
function DateSetup({ onSave, existing, isMobile }) {
  const [selected, setSelected] = useState(existing || todayStr());

  return (
    <div style={{ fontFamily: "Georgia, 'Times New Roman', serif", background: '#FAFAF7', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div style={{ maxWidth: 400, width: '100%' }}>
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🏋️</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#1A1A1A', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
            {existing ? 'Change Start Date' : 'Welcome to Phase 1'}
          </h1>
          <p style={{ fontSize: 14, color: '#666', margin: 0, lineHeight: 1.6 }}>
            {existing
              ? 'Update when your programme started. This adjusts your current week and day.'
              : 'Set the date you started (or plan to start) Phase 1 — Foundation. This tracks your week and day automatically.'}
          </p>
        </div>

        <div style={{ background: '#fff', borderRadius: 14, border: '1px solid #E0DDD6', padding: 24, marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: '0.15em', color: '#999', fontFamily: 'monospace', textTransform: 'uppercase', marginBottom: 8 }}>
            Programme Start Date
          </div>
          <input
            type="date"
            value={selected}
            onChange={e => setSelected(e.target.value)}
            style={{ width: '100%', padding: '12px 14px', fontSize: 16, fontFamily: 'monospace', border: '1px solid #D0CCC4', borderRadius: 8, outline: 'none', boxSizing: 'border-box', background: '#fff', color: '#1A1A1A' }}
          />
          <div style={{ marginTop: 10, fontSize: 12, color: '#999', lineHeight: 1.6 }}>
            Day 1 = the first day of your programme. The app will automatically show you which week and day you're on based on this date.
          </div>
        </div>

        <button
          onClick={() => selected && onSave(selected)}
          disabled={!selected}
          style={{ width: '100%', padding: '14px', background: selected ? '#E8500A' : '#D0CCC4', color: '#fff', border: 'none', borderRadius: 10, fontSize: 15, fontFamily: 'monospace', fontWeight: 700, cursor: selected ? 'pointer' : 'default', letterSpacing: '0.06em', textTransform: 'uppercase' }}
        >
          {existing ? 'Update Date' : 'Start Programme'}
        </button>
      </div>
    </div>
  );
}
