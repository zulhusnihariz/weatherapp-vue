<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import HourlyWeatherCard from '../molecules/HourlyWeatherCard.vue'

interface Props {
  forecasts: Forecast[]
}

const { forecasts } = defineProps<Props>()
</script>

<template>
  <section id="hourly-forecast-container">
    <h2>Hourly Forecast</h2>
    <ul>
      <li v-for="forecast in forecasts" :key="`${forecast.dt_txt}`">
        <HourlyWeatherCard :forecast="forecast" />
      </li>
    </ul>
  </section>
</template>

<style scoped>
h2 {
  font-weight: 600;
  margin-top: 20px;
  margin-bottom: 10px;
  /* align-self: start; */
}

ul {
  display: flex;
  gap: 10px;
  list-style: none;
  overflow-y: hidden;
  overflow: hidden;
  overflow-x: scroll;
}

#hourly-forecast-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
}
</style>
