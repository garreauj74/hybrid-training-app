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

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    } catch {
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

export const dateToStr = (d) => d.toISOString().slice(0, 10);
export const strToDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const todayStr = () => dateToStr(new Date());
export const formatDate = (s) => strToDate(s).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

export const getProgrammePosition = (startDateStr) => {
  const start = strToDate(startDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const daysElapsed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  if (daysElapsed < 0) return { weekIdx: 0, dayIdx: 0, dayId: 'd1', daysElapsed };
  const weekIdx = Math.min(Math.floor(daysElapsed / 7), 3);
  const dayIdx = daysElapsed % 7;
  const dayId = 'd' + (dayIdx + 1);
  return { weekIdx, dayIdx, dayId, daysElapsed };
};
