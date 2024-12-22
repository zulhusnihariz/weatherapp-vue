
export function formatAMPM(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strMinutes = minutes < 10 ? '0' + minutes : minutes;
  const strTime = hours + ':' + strMinutes + ' ' + ampm;
  return strTime;
}

export function formatDate(timestamp: number): string {
  const d = new Date(timestamp * 1000)
  const longDay = getLongDay(d)
  const longMonth = d.toLocaleString('default', { month: 'long' })

  return `${longDay}, ${d.getDate()} ${longMonth} ${d.getFullYear()}`
}

export function getLongDay(date: Date) {
  return date.toLocaleString('default', { weekday: 'long' })
}


