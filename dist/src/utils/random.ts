
// export function randomizeHourlyForecast(data: Weather[]): HourlyForecastResponse {
//   const now = new Date()
//   const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
//   let unixTimestamp = Math.floor(midnight.getTime())

//   const h = {} as HourlyForecastResponse
//   h.list = []

//   for (let i = 0; i < 24; i++) {
//     const randomEl = data[Math.floor(Math.random() * data.length)]

//     h.list[i] = {
//       dt: unixTimestamp,
//       weather: randomEl,
//       main: { temp: getRandomNumber(20, 30) },
//     } as Hourly

//     unixTimestamp += 3600000
//   }
//   return h
// }

export const getRandomNumber = (min: number, max: number) => {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}
