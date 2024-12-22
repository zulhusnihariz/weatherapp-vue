<script setup lang="ts">
import useWeather from '@/store/weather'
import RouterLinkButton from '../molecules/RouterLinkButton.vue'
import SavedWeatherCard from '../molecules/SavedWeatherCard.vue'

const { getSavedWeather } = useWeather()
const weathers = getSavedWeather()
</script>

<template>
  <ul>
    <li v-for="weather in weathers" :key="weather.id">
      <p v-if="weather.name">
        <RouterLinkButton :to="`/weather/${weather.id}`">
          <SavedWeatherCard :weather="weather" />
        </RouterLinkButton>
      </p>
    </li>
  </ul>
</template>
