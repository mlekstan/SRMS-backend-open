import { ValueTransformer } from "typeorm";
import parseInterval from "postgres-interval"

export class IntervalTransformer implements ValueTransformer {

  to(value: string) {
    const parts = value.trim().split(" ");
    if (parts.length === 2)
      return parts[0] + " days " + parts[1];
    return "0 days 00:00:00";
  }

  from(value: any) {
    let interval = value;
    if (typeof value === 'string') {
      interval = parseInterval(value);
    }

    const days = interval.days ?? 0;
    const hours = interval.hours ?? 0;
    const minutes = interval.minutes ?? 0;

    const dd = String(days).padStart(2, '0');
    const hh = String(hours).padStart(2, '0');
    const mm = String(minutes).padStart(2, '0');

    return `${dd} ${hh}:${mm}`;
  }
}