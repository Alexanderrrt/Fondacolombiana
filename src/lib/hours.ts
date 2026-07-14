import type { Location, WeeklyHours, DayHours } from "@/config/restaurantData";

const DAY_KEYS: (keyof WeeklyHours)[] = [
  "sun", "mon", "tue", "wed", "thu", "fri", "sat",
];

/** Returns today's hours slot for a location, or null if closed today. */
export function getTodayHours(location: Location): DayHours {
  const dayKey = DAY_KEYS[new Date().getDay()];
  return location.hours[dayKey];
}

/**
 * Returns whether the location is currently open.
 * Compares local wall-clock "HH:MM" against today's open/close window.
 */
export function isOpenNow(location: Location): boolean {
  const today = getTodayHours(location);
  if (!today) return false;

  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  const [openH, openM] = today.open.split(":").map(Number);
  const [closeH, closeM] = today.close.split(":").map(Number);

  return (
    currentMinutes >= openH * 60 + openM &&
    currentMinutes < closeH * 60 + closeM
  );
}

/** Formats "21:30" → "9:30 PM" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${hour12} ${period}` : `${hour12}:${String(m).padStart(2, "0")} ${period}`;
}

/** Returns display string for today's hours, e.g. "11 AM – 9:30 PM" */
export function todayHoursDisplay(location: Location): string {
  const today = getTodayHours(location);
  if (!today) return "Closed today";
  return `${formatTime(today.open)} – ${formatTime(today.close)}`;
}
