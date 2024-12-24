<script setup lang="ts">
import dayBg from '@/assets/day.png'
import nightBg from '@/assets/night.png'
import type { WeatherResponse } from '@/types/weather'
import { formatAMPM } from '@/utils/date-formatter'
import { onMounted } from 'vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  weather: WeatherResponse
}

const { weather } = defineProps<Props>()

onMounted(() => {
  getImageUrl(new Date(weather.dt))
})

function getImageUrl(date: Date): string {
  let formatted = formatAMPM(date)
  if (formatted.endsWith('PM')) {
    return nightBg
  } else {
    return dayBg
  }
}
</script>

<template>
  <div
    class="saved-container"
    :style="{
      backgroundImage: `url( ${getImageUrl(new Date(weather.dt * 1000))} )`,
    }"
  >
    <div class="top-info">
      <div>
        <h1 :class="weather.name.length < 15 ? 'dynamic-text-lg' : 'dynamic-text-md'">
          {{ weather.name }}
        </h1>
        <p>{{ formatAMPM(new Date(weather.dt * 1000)) }}</p>
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
