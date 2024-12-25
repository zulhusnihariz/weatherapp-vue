<script setup lang="ts">
import useGoCountries from '@/store/rest'
import useUIState from '@/store/ui-state'
import type { City } from '@/types/city'
import type { AutoCompleteOptionSelectEvent } from 'primevue'
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'

const filters = ref<City[]>([])
const search = ref<string>('')

const { isSearching, setSearching } = useUIState()
const { queryCity } = useGoCountries()
const router = useRouter()

function stopSearching() {
  search.value = ''
  setSearching(false)
}

async function searchCityWeather(e: AutoCompleteOptionSelectEvent) {
  if (e.value?.id) {
    router.push({ path: `/weather/${e.value.id}` })
  }
}

watch(search, async (query) => {
  if (query.length > 0) {
    setSearching(true)
    const cities = await queryCity(query)
    filters.value = cities
  } else {
    setSearching(false)
  }
})
</script>

<template>
  <span class="p-input-icon-left" :style="isSearching ? 'margin-top:50px' : ''">
    <i class="pi pi-search" />
    <i
      v-if="isSearching"
      class="pi pi-times-circle"
      @click="stopSearching"
      aria-lable="cancel search"
    />
    <AutoComplete
      v-model="search"
      placeholder="Search for a city"
      @option-select="(e) => searchCityWeather(e)"
      :suggestions="filters"
      variant="filled"
      option-label="name"
      loader="false"
      data-key="id"
      :virtual-scroller-options="{
        itemSize: 10,
        numToleratedItems: 10,
        appendOnly: true,
        autoSize: false,
      }"
      :delay="300"
      :pt="{
        root: {
          id: 'search-input',
        },
        listContainer: {
          id: 'input-list-container',
        },
        overlay: { id: 'overlay' },
      }"
    >
      <template #option="slotProps">
        <p>{{ slotProps.option.name }}</p>
      </template>
    </AutoComplete>
  </span>
</template>

<style>
.p-virtualscroller-content li:first-child {
  margin-top: 10px;
}

.p-virtualscroller-content li {
  border-bottom: 2px solid #dfdfdf;
  padding-bottom: 20px;
  color: black;
  margin-bottom: 10px;
}

#overlay {
  border: none;
  box-shadow: none;
  outline: none;
  background-color: white;
}

#input-list-container {
  width: 100%;
  background-color: white;
  border: none;
  box-shadow: none;
  outline: none;
}

.pi-times-circle {
  position: absolute;
  z-index: 3;
  right: 0;
  padding-top: 0.7em;
  padding-right: 0.7em;
}

.pi-search {
  position: absolute;
  z-index: 3;
  padding: 0.7em;
}

.p-input-icon-left {
  position: relative;
}

#search-input input {
  background-color: #f7f7f9;
  outline: none;
  color: black;
  padding-left: 2.5em;
  height: inherit;
  width: inherit;
  border: none;
}

#search-input {
  display: flex;
  justify-content: space-between;
  width: 100%;
  background-color: #f7f7f9;
  border-radius: 10px;
  opacity: 1;
  outline: none;
  z-index: 1;
  margin-bottom: 24px;
  color: black;
  width: 100vw;
  max-width: 343px;
}
</style>
