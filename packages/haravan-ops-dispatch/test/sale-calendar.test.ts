import { describe, expect, test } from "vitest";
import {
  addCalendarDays,
  fourDayWindowAroundAnchor,
  getSaleTier,
  listUpcomingSaleWindows,
  parseDateKey,
} from "../src/ops-tools/sale-calendar";

describe("sale-calendar", () => {
  test("fourDayWindowAroundAnchor for 9/9", () => {
    expect(fourDayWindowAroundAnchor(2026, 9)).toEqual([
      "2026-09-08",
      "2026-09-09",
      "2026-09-10",
      "2026-09-11",
    ]);
  });

  test("fourDayWindowAroundAnchor for 3/3 crosses month", () => {
    expect(fourDayWindowAroundAnchor(2026, 3)).toEqual([
      "2026-03-02",
      "2026-03-03",
      "2026-03-04",
      "2026-03-05",
    ]);
  });

  test("Jan 1 doubleday includes prior Dec 31", () => {
    expect(fourDayWindowAroundAnchor(2026, 1)).toContain("2025-12-31");
  });

  test("getSaleTier: megasale 9/9 window", () => {
    expect(getSaleTier("2026-09-09")).toBe("megasale");
    expect(getSaleTier("2026-09-10")).toBe("megasale");
    expect(getSaleTier("2026-09-07")).toBe(null);
  });

  test("getSaleTier: doubleday 3/3 not megasale", () => {
    expect(getSaleTier("2026-03-03")).toBe("doubleday");
    expect(getSaleTier("2026-03-02")).toBe("doubleday");
  });

  test("getSaleTier: no doubleday for 9/9–12/12 except megasale", () => {
    expect(getSaleTier("2026-10-10")).toBe("megasale");
  });

  test("getSaleTier: midmonth and payday", () => {
    expect(getSaleTier("2026-04-14")).toBe("midmonth");
    expect(getSaleTier("2026-04-24")).toBe("payday");
  });

  test("megasale wins over midmonth when both rules could apply — 9/9 is megasale not payday", () => {
    expect(getSaleTier("2026-09-09")).toBe("megasale");
  });

  test("parseDateKey throws on bad input", () => {
    expect(() => parseDateKey("bad")).toThrow(/Invalid/);
  });

  test("addCalendarDays", () => {
    expect(addCalendarDays("2026-01-01", -1)).toBe("2025-12-31");
  });

  test("listUpcomingSaleWindows returns windows intersecting horizon", () => {
    const w = listUpcomingSaleWindows("2026-09-07", 10);
    const mega = w.find((x) => x.tier === "megasale" && x.label.includes("9/9"));
    expect(mega).toBeDefined();
    expect(mega!.dates).toContain("2026-09-09");
  });
});
