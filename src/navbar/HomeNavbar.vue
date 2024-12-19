<script setup lang="ts">
import AccountIcon from '@/components/icons/AccountIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
</script>

<template>
  <header>
    <div class="header poppins-semibold">
      <h1>Weather</h1>

      <RouterLinkButton :to="'/profile'">
        <AccountIcon />
      </RouterLinkButton>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  background: #f4f7fc;
  height: 25vh;
  clip-path: ellipse(120% 60% at 50% 40%);
  font-family: 'Poppins';
  font-weight: 600;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
}

.back-button {
  display: flex;
  align-items: center;
  justify-content: center;

  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
}
</style>
