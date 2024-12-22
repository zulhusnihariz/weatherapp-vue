<script setup lang="ts">
import data from '@/data/city.json'
import router from '@/router'
import type { City } from '@/types/city'
import { computed, ref } from 'vue'
import InputAtom from '../atoms/InputAtom.vue'
import CityList from '../molecules/CityList.vue'

const cities = ref<City[]>(data)
const search = ref<string>('')

const filters = computed<City[]>(() => {
  if (search.value.length == 0) {
    return []
  }

  return cities.value.filter((el) => el.name.toLowerCase().includes(search.value))
})

async function searchCityWeather(city: City) {
  router.push({ path: `/weather/${city.id}` })
}
</script>

<template>
  <InputAtom v-model="search" :disabled="false"></InputAtom>
  <CityList v-bind:click-item="searchCityWeather" :cities="filters" />
</template>
