<script setup lang="ts">
import type { Forecast } from '@/types/forecast'
import { getLongDay } from '@/utils/date-formatter'
import OpenWeatherIconAtom from '../atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'
import ArrowRightIcon from '../icons/ArrowRightIcon.vue'

interface Props {
  forecast: Forecast
}

const { forecast } = defineProps<Props>()
</script>
<template>
  <div class="wweather-card-container">
    <div class="icon-container">
      <OpenWeatherIconAtom
        :icon="forecast.weather[0].icon"
        :alt="forecast.weather[0].description"
        class="weather-icon"
      />
    </div>

    <div class="day-condition-container">
      <p class="day">{{ getLongDay(new Date(forecast.dt_txt)) }}</p>
      <p class="weather-condition">{{ forecast.weather[0].description }}</p>
    </div>

    <div class="temp-arrow-container" style="background: url()">
      <TemperatureAtom :temp="forecast.main.temp" class="" />
      <ArrowRightIcon />
    </div>
  </div>
</template>

<style scoped>
.wweather-card-container {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: center;
  border-radius: 12px;
  background: #d2dfff;
}

.day-condition-container {
  justify-self: start;
  margin-left: 10px;
}

.day {
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  color: #201c1c;
}

.icon-container {
  position: relative;
  border-radius: 50%;
  background-color: #9ab6ff;
  transform: scale(0.7);
}

.weather-icon {
  max-width: 80px;
  transform: scale(0.8);
  border-radius: 50%;
}

.weather-condition {
  font-size: 13px;
  font-weight: 400;
  line-height: 15.51px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;

  text-transform: capitalize;
}

.temp-arrow-container {
  display: flex;
  justify-self: flex-end;
  margin-right: 20px;
  gap: 5px;
}

.temp {
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;

  color: #494343;
}
</style>
