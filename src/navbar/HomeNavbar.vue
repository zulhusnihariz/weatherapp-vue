<script setup lang="ts">
import AccountIcon from '@/components/icons/AccountIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
import useUIState from '@/store/ui-state'

const { isSearching } = useUIState()
</script>

<template>
  <header>
    <template v-if="!isSearching">
      <div class="header poppins-semibold">
        <h1>Weather</h1>

        <RouterLinkButton :to="'/profile'" style="">
          <AccountIcon />
        </RouterLinkButton>
      </div>
    </template>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: 'Poppins';
  font-weight: 600;
  width: 343px;
  margin-top: 20px;
}
</style>
