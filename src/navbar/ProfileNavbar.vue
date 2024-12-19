<script setup lang="ts">
import ButtonAtom from '@/components/atoms/ButtonAtom.vue'
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
</script>

<template>
  <header>
    <div class="header poppins-semibold">
      <RouterLink v-slot="{ navigate, isActive }" to="/" custom>
        <ButtonAtom :on-click="navigate" :class="{ active: isActive }">
          <BackArrowIcon />
        </ButtonAtom>
      </RouterLink>
      <h1>Edit Profile</h1>
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
