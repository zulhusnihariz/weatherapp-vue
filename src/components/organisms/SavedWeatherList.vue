<script setup lang="ts">
import useWeather from '@/store/weather'
import type { WeatherResponse } from '@/types/weather'
import { useRouter } from 'vue-router'
import SavedWeatherCard from '../molecules/SavedWeatherCard.vue'

const { setWeather, getSavedWeather } = useWeather()
const weathers = getSavedWeather()
const router = useRouter()

async function viewWeatherDetails(weather: WeatherResponse) {
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
    >
      <SavedWeatherCard :weather="weather" />
    </li>
  </ul>
</template>
