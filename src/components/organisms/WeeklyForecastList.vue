<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import { getLongDay } from '@/utils/date-formatter'
import OpenWeatherIconAtom from '../atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  forecasts: Forecast[]
  onClick: (day: Forecast) => void
}

const { forecasts } = defineProps<Props>()
</script>

<template>
  <h2>Weekly Forecast</h2>
  <ul style="display: flex; overflow-y: hidden; overflow: hidden; overflow-x: scroll">
    <li v-for="forecast in forecasts" :key="`${forecast.dt_txt}`" @click="() => onClick(forecast)">
      <OpenWeatherIconAtom
        :icon="forecast.weather[0].icon"
        :alt="forecast.weather[0].description"
      />
      <p>{{ getLongDay(new Date(forecast.dt_txt)) }}</p>
      <TemperatureAtom :temp="forecast.main.temp" />
    </li>
  </ul>
</template>
