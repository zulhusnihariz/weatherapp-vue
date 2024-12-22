import type { City } from './city'
import type { Clouds, Coord, Main, Rain, Snow, Weather, Wind } from './weather'


export interface Forecast {
  dt: number
  main: Main
  weather: Weather[]
  clouds?: Clouds
  wind?: Wind
  visibility: number
  pop: number
  rain?: Rain
  snow?: Snow
  sys: {
    pod: 'd' | 'n'
  }
  dt_txt: string
  city?: {
    id: number
    name: string
    coord: Coord
    country: string
    sunrise: number
    sunset: number
  }
}

export interface ForecastResponse {
  city: Pick<City, "id" | "name" | "coord">
  country?: string
  population?: number
  timezone?: number
  cod: string
  message: number
  cnt: number
  list: Forecast[]
}
