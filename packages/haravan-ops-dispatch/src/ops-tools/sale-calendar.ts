/**
 * Lịch sale sàn (preset VN): midmonth, payday, doubleday, megasale.
 * Ngày đơn dùng prefix YYYY-MM-DD của created_at (khớp daily_business_snapshot).
 */

export type SaleTier = "megasale" | "doubleday" | "midmonth" | "payday";

export function parseDateKey(key: string): { y: number; m: number; d: number } {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(key);
  if (!m) {
    throw new Error(`Invalid date key: ${key}`);
  }
  return {
    y: Number(m[1]),
    m: Number(m[2]),
    d: Number(m[3]),
  };
}

export function formatDateKey(y: number, month: number, day: number): string {
  const mm = String(month).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${y}-${mm}-${dd}`;
}

/** UTC midnight anchor for calendar arithmetic (month 1–12). */
function utcDate(y: number, month: number, day: number): Date {
  return new Date(Date.UTC(y, month - 1, day));
}

export function addCalendarDays(key: string, delta: number): string {
  const { y, m, d } = parseDateKey(key);
  const t = utcDate(y, m, d).getTime() + delta * 86_400_000;
  const x = new Date(t);
  return formatDateKey(x.getUTCFullYear(), x.getUTCMonth() + 1, x.getUTCDate());
}

/** Cửa sổ 4 ngày: d-1, d, d+1, d+2 với anchor ngày d = tháng (vd 9/9). */
export function fourDayWindowAroundAnchor(y: number, month: number): string[] {
  const anchor = formatDateKey(y, month, month);
  return [-1, 0, 1, 2].map((k) => addCalendarDays(anchor, k));
}

const MEGASALE_MONTHS = [9, 10, 11, 12] as const;
const DOUBLE_DAY_MONTHS_JAN_AUG = [1, 2, 3, 4, 5, 6, 7, 8] as const;

function tierForKeyInWindows(
  key: string,
  years: readonly number[],
  months: readonly number[]
): boolean {
  for (const y of years) {
    for (const month of months) {
      if (fourDayWindowAroundAnchor(y, month).includes(key)) {
        return true;
      }
    }
  }
  return false;
}

function relevantYearsForKey(y: number): [number, number, number] {
  return [y - 1, y, y + 1];
}

/**
 * Xếp hạng ưu tiên: megasale > doubleday (1–8) > midmonth > payday.
 */
export function getSaleTier(dateKey: string): SaleTier | null {
  const { y, d } = parseDateKey(dateKey);
  const years = relevantYearsForKey(y);

  if (tierForKeyInWindows(dateKey, years, MEGASALE_MONTHS)) {
    return "megasale";
  }
  if (tierForKeyInWindows(dateKey, years, DOUBLE_DAY_MONTHS_JAN_AUG)) {
    return "doubleday";
  }
  if (d === 14 || d === 15) {
    return "midmonth";
  }
  if (d === 24 || d === 25) {
    return "payday";
  }
  return null;
}

export type UpcomingSaleWindow = {
  tier: SaleTier;
  label: string;
  dates: string[];
  start: string;
  end: string;
};

function pushWindow(
  out: UpcomingSaleWindow[],
  tier: SaleTier,
  label: string,
  dates: string[],
  asOf: string,
  horizonEnd: string
): void {
  const sorted = [...dates].sort();
  const start = sorted[0]!;
  const end = sorted[sorted.length - 1]!;
  if (end < asOf || start > horizonEnd) {
    return;
  }
  out.push({ tier, label, dates: sorted, start, end });
}

/** Các cửa sổ sale có giao với [asOf, horizonEnd] (inclusive). */
export function listUpcomingSaleWindows(
  asOf: string,
  horizonDays: number
): UpcomingSaleWindow[] {
  const horizon = Math.max(1, Math.min(horizonDays, 120));
  const { y: y0 } = parseDateKey(asOf);
  const horizonEnd = addCalendarDays(asOf, horizon - 1);
  const yEnd = parseDateKey(horizonEnd).y;
  const out: UpcomingSaleWindow[] = [];

  for (let y = y0; y <= yEnd + 1; y++) {
    for (const month of DOUBLE_DAY_MONTHS_JAN_AUG) {
      const dates = fourDayWindowAroundAnchor(y, month);
      pushWindow(
        out,
        "doubleday",
        `doubleday ${month}/${month}`,
        dates,
        asOf,
        horizonEnd
      );
    }
    for (const month of MEGASALE_MONTHS) {
      const dates = fourDayWindowAroundAnchor(y, month);
      pushWindow(out, "megasale", `megasale ${month}/${month}`, dates, asOf, horizonEnd);
    }
    for (let month = 1; month <= 12; month++) {
      pushWindow(
        out,
        "midmonth",
        `midmonth ${y}-${String(month).padStart(2, "0")}`,
        [formatDateKey(y, month, 14), formatDateKey(y, month, 15)],
        asOf,
        horizonEnd
      );
      pushWindow(
        out,
        "payday",
        `payday ${y}-${String(month).padStart(2, "0")}`,
        [formatDateKey(y, month, 24), formatDateKey(y, month, 25)],
        asOf,
        horizonEnd
      );
    }
  }

  out.sort((a, b) => a.start.localeCompare(b.start));
  const seen = new Set<string>();
  const dedup: UpcomingSaleWindow[] = [];
  for (const w of out) {
    const k = `${w.tier}:${w.start}:${w.end}:${w.label}`;
    if (seen.has(k)) {
      continue;
    }
    seen.add(k);
    dedup.push(w);
  }
  return dedup.filter((w) => w.start <= horizonEnd && w.end >= asOf);
}
