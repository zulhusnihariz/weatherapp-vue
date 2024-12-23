<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import HourlyWeatherCard from '../molecules/HourlyWeatherCard.vue'

interface Props {
  forecasts: Forecast[]
}

const { forecasts } = defineProps<Props>()
</script>

<template>
  <h2>Hourly Forecast</h2>
  <ul style="display: flex; overflow-y: hidden; overflow: hidden; overflow-x: scroll">
    <li v-for="forecast in forecasts" :key="`${forecast.dt_txt}`">
      <HourlyWeatherCard :forecast="forecast" />
    </li>
  </ul>
</template>

<style scoped>
h2 {
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
}
ul {
  display: flex;
  gap: 10px;
  list-style: none;
}
</style>
