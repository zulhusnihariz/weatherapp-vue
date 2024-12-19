<script setup lang="ts">
interface Props {
  weather: WeatherResponse
}

interface Weather {
  id: number
  main: string
  description: string
  icon: string
}

interface Main {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  pressure: number
  humidity: number
  sea_level: number
  grnd_level: number
}

interface Wind {
  speed: number
  deg: number
  gust?: number
}

interface Rain {
  [key: string]: number
}

interface Clouds {
  all: number
}

interface Sys {
  type?: number
  id?: number
  country: string
  sunrise: number
  sunset: number
}

interface Coord {
  lon: number
  lat: number
}

export interface WeatherResponse {
  coord: Coord
  weather: Weather[]
  base: string
  main: Main
  visibility: number
  wind: Wind
  clouds: Clouds
  rain?: Rain
  dt: number
  sys: Sys
  timezone: number
  id: number
  name: string
  cod: number
}

const { weather } = defineProps<Props>()
</script>

<template>
  <div>
    <div style="display: flex; flex-direction: column">
      <p>{{ weather.name }}</p>
      <p>{{ weather.timezone }}</p>
      <p>{{ weather.weather[0].description }}</p>
      <p>{{ weather.main.temp }}°</p>
      <p>{{ weather.main.temp_max }}°</p>
      <p>{{ weather.main.temp_min }}°</p>
    </div>
  </div>
</template>
