<script setup lang="ts">
import CloseIcon from '@/components/icons/CloseIcon.vue'
import SearchIcon from '@/components/icons/SearchIcon.vue'
import data from '@/data/city.json'
import router from '@/router'
import useUIState from '@/store/ui-state'
import type { City } from '@/types/city'
import { computed, ref } from 'vue'
import InputAtom from '../atoms/InputAtom.vue'
import CityList from '../molecules/CityList.vue'

const cities = ref<City[]>(data)
const search = ref<string>('')

const { isSearching, setSearching } = useUIState()

const filters = computed<City[]>(() => {
  if (search.value.length == 0) {
    setSearching(false)
    return []
  }

  return cities.value.filter((el) => el.name.toLowerCase().includes(search.value))
})

function stopSearching() {
  search.value = ''
  setSearching(false)
}

async function searchCityWeather(city: City) {
  router.push({ path: `/weather/${city.id}` })
}
</script>

<template>
  <InputAtom
    id="search-input"
    v-model="search"
    v-on:focus="setSearching(true)"
    placeholder="Search for a city or airport"
  >
    <SearchIcon style="translate: 10px 35px; z-index: 2" />
    <template v-if="isSearching">
      <CloseIcon style="translate: 300px 35px; z-index: 2" @click="stopSearching()" />
    </template>
  </InputAtom>
  <template v-if="isSearching">
    <CityList v-bind:click-item="searchCityWeather" :cities="filters" />
  </template>
</template>

<style>
#search-input {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 343px;
  border-style: none;
  background-color: #f7f7f9;
  border-radius: 10px;
  height: 39px;
  padding: 8px 11px 8px 11px;
  padding-left: 40px;
  gap: 8px;
  opacity: 1;
  outline: none;
  z-index: 1;
  margin-bottom: 24px;
}
</style>
