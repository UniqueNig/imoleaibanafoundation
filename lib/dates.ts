/** Midnight today, local server time — the cutoff for "upcoming" vs "past".
 * Using the exact current timestamp instead would make a same-day event
 * flip to "past" the moment the clock ticks past midnight, even though
 * it's still happening today. */
export function startOfToday() {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
}
