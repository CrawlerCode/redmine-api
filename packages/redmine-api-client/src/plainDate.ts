import type { PlainDate } from "redmine-api-client-generated";

const pad = (value: number, length: number) => String(value).padStart(length, "0");

/**
 * Formats the local calendar date of a `Date` as `YYYY-MM-DD`.
 *
 * @example
 * client.timeEntriesClient.getTimeEntries({ from: toPlainDate(new Date()) });
 */
export function toPlainDate(date: Date): PlainDate {
  return `${pad(date.getFullYear(), 4)}-${pad(date.getMonth() + 1, 2)}-${pad(date.getDate(), 2)}`;
}

/**
 * Parses a `YYYY-MM-DD` date as local midnight.
 *
 * Unlike `new Date("2024-01-15")`, which is UTC midnight and can fall on the previous day in local time.
 */
export function fromPlainDate(value: PlainDate): Date {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) throw new RangeError(`Invalid plain date: ${value}`);

  const [year, month, day] = match.slice(1).map(Number);
  const date = new Date(year, month - 1, day);
  // Two digit years would otherwise map to 19xx
  date.setFullYear(year);
  if (date.getMonth() !== month - 1 || date.getDate() !== day) throw new RangeError(`Invalid plain date: ${value}`);
  return date;
}
