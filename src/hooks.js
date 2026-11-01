import { useState, useEffect, useRef } from 'react';

export function useIsMobile() {
  const [mobile, setMobile] = useState(window.innerWidth < 640);
  useEffect(() => {
    const fn = () => setMobile(window.innerWidth < 640);
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);
  return mobile;
}

// Tracks the visible area on iOS. When the keyboard opens, iOS shrinks the
// visual viewport and can pan the page. The app shell uses these numbers to
// stay pinned to the visible area so the header never scrolls away.
export function useVisualViewport() {
  const [vv, setVv] = useState({ top: 0, height: null, keyboard: false });
  useEffect(() => {
    const v = window.visualViewport;
    if (!v) return undefined;
    const update = () => {
      setVv({
        top: v.offsetTop || 0,
        height: v.height,
        keyboard: window.innerHeight - v.height > 120,
      });
    };
    v.addEventListener('resize', update);
    v.addEventListener('scroll', update);
    update();
    return () => {
      v.removeEventListener('resize', update);
      v.removeEventListener('scroll', update);
    };
  }, []);
  return vv;
}

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch (e) {
      return initialValue;
    }
  });
  const valueRef = useRef(value);
  useEffect(() => { valueRef.current = value; }, [value]);
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) { console.warn(e); }
  }, [key, value]);
  const setStoredValue = (newValue) => {
    if (newValue instanceof Function) {
      const next = newValue(valueRef.current);
      valueRef.current = next;
      setValue(next);
    } else {
      valueRef.current = newValue;
      setValue(newValue);
    }
  };
  return [value, setStoredValue];
}

export const dateToStr = (d) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return y + '-' + m + '-' + day;
};
export const strToDate = (s) => { const p = s.split('-').map(Number); return new Date(p[0], p[1] - 1, p[2]); };
export const todayStr = () => dateToStr(new Date());
export const formatDate = (s) => strToDate(s).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

// Weeks run Monday to Sunday. Week 1 is the week containing the start date, so
// the day shown always matches the real weekday (Monday = Day 1).
export const getProgrammePosition = (startDateStr) => {
  const start = strToDate(startDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const startOffset = (start.getDay() + 6) % 7; // Monday = 0
  const weekStart = new Date(start.getFullYear(), start.getMonth(), start.getDate() - startOffset);
  const daysElapsed = Math.round((today - weekStart) / (1000 * 60 * 60 * 24));
  if (daysElapsed < 0) return { weekIdx: 0, dayIdx: 0, dayId: 'd1', daysElapsed };
  const weekIdx = Math.min(Math.floor(daysElapsed / 7), 3);
  const dayIdx = daysElapsed % 7;
  return { weekIdx, dayIdx, dayId: 'd' + (dayIdx + 1), daysElapsed };
};
