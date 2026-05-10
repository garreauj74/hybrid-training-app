import { useState, useEffect } from 'react';

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

  const setStoredValue = (newValue) => {
    try {
      const valueToStore = newValue instanceof Function ? newValue(value) : newValue;
      setValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (e) {
      console.warn('localStorage write failed:', e);
      setValue(newValue instanceof Function ? newValue(value) : newValue);
    }
  };

  return [value, setStoredValue];
}

// Format a Date object as YYYY-MM-DD string
export const dateToStr = (d) => d.toISOString().slice(0, 10);

// Parse a YYYY-MM-DD string to a Date object
export const strToDate = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

// Get today as YYYY-MM-DD
export const todayStr = () => dateToStr(new Date());

// Format a date string nicely: "Monday, 9 June 2025"
export const formatDate = (s) => {
  const d = strToDate(s);
  return d.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
};

// Given a programme start date string and today, return { weekIdx, dayIdx, dayId, isToday, daysElapsed }
export const getProgrammePosition = (startDateStr) => {
  const start = strToDate(startDateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  const daysElapsed = Math.floor((today - start) / (1000 * 60 * 60 * 24));
  if (daysElapsed < 0) return { weekIdx: 0, dayIdx: 0, dayId: 'd1', daysElapsed };
  const weekIdx = Math.min(Math.floor(daysElapsed / 7), 3); // cap at week 4
  const dayIdx = daysElapsed % 7;                            // 0–6
  const dayId = `d${dayIdx + 1}`;
  return { weekIdx, dayIdx, dayId, daysElapsed };
};
