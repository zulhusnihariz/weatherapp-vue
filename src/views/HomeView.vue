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

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
}
</style>
