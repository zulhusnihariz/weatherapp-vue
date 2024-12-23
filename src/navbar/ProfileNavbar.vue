<script setup lang="ts">
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
import RouterLinkButton from '@/components/molecules/RouterLinkButton.vue'
</script>

<template>
  <header class="header">
    <RouterLinkButton :to="'/'" style="float: left; position: absolute; left: 0">
      <BackArrowIcon />
    </RouterLinkButton>
    <h2>Edit Profile</h2>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: min-content;
  font-family: 'Poppins';
  font-weight: 600;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin: 10px 0;
}
.header-content {
  display: grid;
  grid-template-columns: auto 1fr;
  width: 100%;
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
