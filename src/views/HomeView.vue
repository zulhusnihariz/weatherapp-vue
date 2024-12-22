<script setup lang="ts">
import SavedWeatherList from '@/components/organisms/SavedWeatherList.vue'
import SearchCityInputField from '@/components/organisms/SearchCityInputField.vue'
import HomeNavbar from '@/navbar/HomeNavbar.vue'
import useUIState from '@/store/ui-state'

const { isSearching } = useUIState()
</script>
<template>
  <div class="layout">
    <HomeNavbar />
    <SearchCityInputField />
    <template v-if="!isSearching">
      <SavedWeatherList />
    </template>
  </div>
</template>

<style>
.layout {
  display: flex;
  flex-direction: column;
  width: 90vw;
  height: 90vh;
  margin: 0 20px;
}
</style>
