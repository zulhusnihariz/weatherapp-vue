<script setup lang="ts">
import type { City } from '@/types/city'

interface Props {
  cities: City[]
  clickItem: (city: City) => void
}

const { cities } = defineProps<Props>()
</script>

<template>
  <ul v-for="city in cities" :key="city.id">
    <li v-on:click="() => clickItem(city)">
      {{ city.name }}
    </li>
  </ul>
</template>
