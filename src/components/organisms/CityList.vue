<script setup lang="ts">
import { ref } from 'vue'
import CityCard, { type WeatherResponse } from '../molecules/CityCard.vue'
import RouterLinkButton from '../molecules/RouterLinkButton.vue'

const weathers = ref<WeatherResponse[]>([
  {
    coord: {
      lon: 112.5,
      lat: 2.5,
    },
    weather: [
      {
        id: 501,
        main: 'Rain',
        description: 'moderate rain',
        icon: '10n',
      },
    ],
    base: 'stations',
    main: {
      temp: 21.78,
      feels_like: 22.6,
      temp_min: 21.78,
      temp_max: 21.78,
      pressure: 1007,
      humidity: 99,
      sea_level: 1007,
      grnd_level: 992,
    },
    visibility: 10000,
    wind: {
      speed: 0.4,
      deg: 200,
      gust: 0.42,
    },
    rain: {
      '1h': 1.78,
    },
    clouds: {
      all: 100,
    },
    dt: 1734635641,
    sys: {
      country: 'MY',
      sunrise: 1734647298,
      sunset: 1734690412,
    },
    timezone: 28800,
    id: 1733045,
    name: 'Malaysia',
    cod: 200,
  },
])
</script>

<template>
  <ul>
    <li v-for="weather in weathers" :key="weather.id">
      <p v-if="weather.name">
        <RouterLinkButton :to="`/weather/${weather.id}`">
          <CityCard :weather="weather" />
        </RouterLinkButton>
      </p>
    </li>
  </ul>
</template>
