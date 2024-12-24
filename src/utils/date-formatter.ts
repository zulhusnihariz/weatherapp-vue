import moment from "moment";

export function formatAMPM(dt: number, timezone = 0): string {
  if (timezone === 0) {
    return moment(new Date(dt * 1000)).format("LT");
  }
  return moment
    .utc(new Date((dt + timezone) * 1000).toUTCString())
    .format("LT");
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp * 1000);
  const longDay = getLongDay(d);
  const longMonth = d.toLocaleString("default", { month: "long" });

  return `${longDay}, ${d.getDate()} ${longMonth} ${d.getFullYear()}`;
}

export function getLongDay(date: Date) {
  return date.toLocaleString("default", { weekday: "long" });
}
