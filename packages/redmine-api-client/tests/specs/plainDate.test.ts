import { describe, expect, it } from "vitest";
import { fromPlainDate, toPlainDate } from "../../src/index.js";

describe("toPlainDate", () => {
  it("formats the local calendar date", () => {
    expect(toPlainDate(new Date(2024, 0, 5, 23, 59))).toBe("2024-01-05");
    expect(toPlainDate(new Date(2024, 11, 31, 0, 0))).toBe("2024-12-31");
  });

  it("pads years before 1000", () => {
    const date = new Date(2024, 0, 1);
    date.setFullYear(99);

    expect(toPlainDate(date)).toBe("0099-01-01");
  });
});

describe("fromPlainDate", () => {
  it("parses as local midnight", () => {
    expect(fromPlainDate("2024-01-15")).toEqual(new Date(2024, 0, 15));
  });

  it("round trips with toPlainDate", () => {
    expect(toPlainDate(fromPlainDate("2024-02-29"))).toBe("2024-02-29");
    expect(toPlainDate(fromPlainDate("0099-01-01"))).toBe("0099-01-01");
  });

  it("throws on invalid dates", () => {
    expect(() => fromPlainDate("2024-1-15")).toThrow(RangeError);
    expect(() => fromPlainDate("2024-01-15T00:00:00Z")).toThrow(RangeError);
    expect(() => fromPlainDate("2023-02-29")).toThrow(RangeError);
    expect(() => fromPlainDate("2024-13-01")).toThrow(RangeError);
  });
});
