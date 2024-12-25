<script setup lang="ts">
import useWeather from '@/store/weather'
import type { WeatherResponse } from '@/types/weather'
import { useRouter } from 'vue-router'
import SavedWeatherCard from '../molecules/SavedWeatherCard.vue'

const { setWeather, getSavedWeather, isMyLocation } = useWeather()
const weathers = getSavedWeather()
const router = useRouter()

function viewWeatherDetails(weather: WeatherResponse) {
  setWeather({ weather })
  router.push({ path: `/weather/${weather.id}` })
}
</script>

<template>
  <ul>
    <li
      v-for="weather in weathers"
      :key="weather.id"
      @click="() => viewWeatherDetails(weather)"
      style="list-style: none"
      aria-label="view saved weather"
    >
      <SavedWeatherCard
        :weather="weather"
        :is-my-location="isMyLocation(weather.coord.lon, weather.coord.lat)"
      />
    </li>
  </ul>
</template>

<style>
ul {
  width: 100%;
  max-width: 343px;
  max-height: 100vh;
  overflow-x: hidden;
  overflow: hidden;
  overflow-y: scroll;
}
</style>
