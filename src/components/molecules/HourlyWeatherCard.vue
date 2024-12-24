<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import { formatAMPM } from '@/utils/date-formatter'
import OpenWeatherIconAtom from '../atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'

interface Props {
  forecast: Forecast
}
const { forecast } = defineProps<Props>()
</script>

<template>
  <div class="hweather-card-container">
    <OpenWeatherIconAtom
      :icon="forecast.weather[0].icon"
      :alt="forecast.weather[0].description"
      class="weather-icon"
    />
    <TemperatureAtom :temp="forecast.main.temp" class="temp" />
    {{ formatAMPM(forecast.dt) }}
  </div>
</template>
<style>
.hweather-card-container {
  height: min-content;
  background: #f5f5f5;
  border-radius: 4px;
  text-align: center;
  font-style: normal;
  font-weight: 400;
  line-height: 14px;
  padding-bottom: 10px;
  color: #494343;
}

.weather-icon {
  max-height: 107px;
  transform: scale(0.7);
}
.temp {
  font-size: 14px;
  font-weight: 600;
  line-height: 16.71px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 5px;
}
</style>
