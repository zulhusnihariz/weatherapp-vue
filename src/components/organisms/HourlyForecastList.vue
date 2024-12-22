<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import { formatAMPM } from '@/utils/date-formatter'
import OpenWeatherIconAtom from '../atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  forecasts: Forecast[]
}

const { forecasts } = defineProps<Props>()

function getTime(dt_txt: string): string {
  return formatAMPM(new Date(dt_txt))
}
</script>

<template>
  <h2>Hourly Forecast</h2>
  <ul style="display: flex; overflow-y: hidden; overflow: hidden; overflow-x: scroll">
    <li v-for="forecast in forecasts" :key="`${forecast.dt_txt}`">
      <OpenWeatherIconAtom
        :icon="forecast.weather[0].icon"
        :alt="forecast.weather[0].description"
      />
      <TemperatureAtom :temp="forecast.main.temp" />
      {{ getTime(forecast.dt_txt) }}
    </li>
  </ul>
</template>
