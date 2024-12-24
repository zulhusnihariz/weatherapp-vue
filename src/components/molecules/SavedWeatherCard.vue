<script setup lang="ts">
import dayBg from '@/assets/day.png'
import nightBg from '@/assets/night.png'
import type { WeatherResponse } from '@/types/weather'
import { formatAMPM } from '@/utils/date-formatter'
import { parseTime } from '@/utils/string-formatter'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  weather: WeatherResponse
  isMyLocation: boolean
}

const { weather } = defineProps<Props>()

function getImageUrl(dt: number, timezone: number): string {
  let formatted = formatAMPM(dt, timezone)

  const start = parseTime('7:00 AM')
  const end = parseTime('7:00 PM')
  const input = parseTime(formatted)
  if (input >= start && input <= end) {
    return dayBg
  } else {
    return nightBg
  }
}
</script>

<template>
  <div
    class="saved-container"
    :style="{
      backgroundImage: `url( ${getImageUrl(weather.dt, weather.timezone)} )`,
    }"
  >
    <div class="top-info">
      <div>
        <template v-if="isMyLocation">
          <p class="my-location">My Location</p>
          <p :class="weather.name.length < 15 ? 'dynamic-text-lg' : 'dynamic-text-md'">
            {{ weather.name }}
          </p>
        </template>
        <template v-else>
          <p :class="weather.name.length < 15 ? 'dynamic-text-lg' : 'dynamic-text-md'">
            {{ weather.name }}
          </p>
          <p>{{ formatAMPM(weather.dt, weather.timezone) }}</p>
        </template>
      </div>
      <TemperatureAtom :temp="weather.main.temp" style="font-size: xx-large" />
    </div>

    <div class="bottom-info">
      <p class="weather-condition">
        {{ weather.weather[0].description }}
      </p>
      <div style="display: flex; gap: 15px">
        <div style="display: flex">
          <p>H:</p>
          <TemperatureAtom :temp="weather.main.temp_max" />
        </div>
        <div style="display: flex; gap: 5px">
          <p>L:</p>
          <TemperatureAtom :temp="weather.main.temp_min" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.my-location {
  font-size: 25px;
  font-weight: 700;
  line-height: 29.83px;
  letter-spacing: -0.01em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.dynamic-text-lg,
.dynamic-text-md {
  font-size: 25px;
  font-weight: 700;
  line-height: 29.83px;
  letter-spacing: -0.01em;
  text-align: left;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.dynamic-text-lg {
  font-size: 30px;
}
.dynamic-text-md {
  font-size: 18px;
}
.saved-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 117px;
  padding: 10px 20px;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  border-radius: 20px;
  font-weight: 400;
  cursor: pointer;
  margin-bottom: 15px;
  width: 100%;
}

.top-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: flex-start;
}

.bottom-info {
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: end;
}

.city-name-time {
}

.weather-condition {
  font-weight: 500;
  text-transform: capitalize;
}
</style>
