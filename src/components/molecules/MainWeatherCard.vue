<script setup lang="ts">
import useWeather from '@/store/weather'
import { formatAMPM, formatDate } from '@/utils/date-formatter'
import { computed } from 'vue'
import OpenWeatherIconAtom from '../atoms/OpenWeatherIconAtom.vue'
import TemperatureAtom from '../atoms/TemperatureAtom.vue'
import RefreshIcon from '../icons/RefreshIcon.vue'

const { weather, refreshWeather } = useWeather()

const hasWeatherData = computed(() => {
  return weather.value && weather.value?.weather?.length > 0
})

async function refresh() {
  await refreshWeather(weather.value.id)
}
</script>

<template>
  <div class="main-weather-container">
    <p>{{ formatDate(weather.dt) }}</p>

    <template v-if="hasWeatherData">
      <OpenWeatherIconAtom :icon="weather.weather[0].icon" :alt="weather.weather[0].description" />
      <TemperatureAtom :temp="weather.main.temp" class="weather-temp" />
      <p class="weather-description">{{ weather.weather[0].description }}</p>

      <div class="last-update">
        <p>Last Update: {{ formatAMPM(new Date(weather.dt * 1000)) }}</p>
        <RefreshIcon @click="refresh" />
      </div>
    </template>
  </div>
</template>
<style>
.last-update {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  gap: 5px;
  margin-top: 20px;
}
.main-weather-container {
  flex: display;
  flex-direction: column;
  text-align: center;
  color: white;
  padding-top: 10px;
  padding-bottom: 20px;
}
.weather-temp {
  font-size: 20px;
  font-weight: 400;
  line-height: 23.87px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}
.weather-description {
  font-size: 20px;
  font-weight: 600;
  line-height: 23.87px;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  text-transform: capitalize;
  margin-top: 10px;
}
</style>
