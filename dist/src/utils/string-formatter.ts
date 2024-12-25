export function splitter(dt_txt: string, seperator: string): string[] {
  return dt_txt.split(seperator)
}

export const parseTime = (time: string): Date => {
  const [timePart, meridian] = time.split(" ");
  if (!timePart || !meridian) new Date()

  const [hours, minutes] = timePart.split(":").map(Number);
  if (isNaN(hours) || isNaN(minutes)) new Date();

  let adjustedHours = hours;
  if (meridian.toLowerCase() === "pm" && hours < 12) {
    adjustedHours += 12;
  } else if (meridian.toLowerCase() === "am" && hours === 12) {
    adjustedHours = 0;
  }

  const date = new Date();
  date.setHours(adjustedHours, minutes, 0, 0);
  return date;
};
