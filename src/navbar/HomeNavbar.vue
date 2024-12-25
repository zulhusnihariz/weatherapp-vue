<script setup lang="ts">
import AccountIcon from '@/components/icons/AccountIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
import useUIState from '@/store/ui-state'

const { isSearching } = useUIState()
</script>

<template>
  <header id="home-navbar">
    <template v-if="!isSearching">
      <h1>Weather</h1>

      <RouterLinkButton :to="'/profile'" style="">
        <AccountIcon />
      </RouterLinkButton>
    </template>
  </header>
</template>

<style>
#home-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins';
  font-weight: 600;
  width: 100vw;
  max-width: 343px;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
