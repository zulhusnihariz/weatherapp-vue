import type { Coord } from "./weather"

export interface City {
  id: number,
  name: string,
  state: string,
  country: string
  coord: Coord
  population?: number,
  timezone?: number
}
