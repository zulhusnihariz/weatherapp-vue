import { countries, timezones } from "@/data/country";

export function getCountry(): { country: string, code: string } | null {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone === "" || !timezone || !timezones[timezone].c || timezones[timezone].c.length == 0) {
    return null;
  }

  const _country = timezones[timezone].c[0];
  const country = countries[_country];
  return { country, code: _country };
}

export function getState() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  if (timezone === "" || !timezone) return null;

  const state = timezone.split("/")[1].replace("_", " ")
  return state
}

