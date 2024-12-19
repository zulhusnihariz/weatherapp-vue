<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import AddIcon from '@/components/icons/AddIcon.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'

function addWeather() {
  console.log('add weather')
}
</script>

<template>
  <header>
    <div class="header poppins-semibold">
      <RouterLinkButton to="/">
        <BackArrowIcon />
      </RouterLinkButton>

      <h1>Bangsar South, KL</h1>

      <ButtonAtom v-on:click="addWeather">
        <AddIcon />
      </ButtonAtom>
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
