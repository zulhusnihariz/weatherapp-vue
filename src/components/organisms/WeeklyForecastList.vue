<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import WeeklyWeatherCard from '../molecules/WeeklyWeatherCard.vue'

interface Props {
  forecasts: Forecast[]
  onClick: (day: Forecast) => void
}

const { forecasts } = defineProps<Props>()
</script>

<template>
  <section id="weekly-forecast-container">
    <h2>Weekly Forecast</h2>
    <ul>
      <li
        v-for="forecast in forecasts"
        :key="`${forecast.dt_txt}`"
        @click="() => onClick(forecast)"
        aria-label="update hourly forecast"
      >
        <WeeklyWeatherCard :forecast="forecast" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  align-self: start;
}

ul {
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style: none;
  overflow-x: hidden;
  overflow: hidden;
  overflow-y: scroll;
}

#weekly-forecast-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
</style>
