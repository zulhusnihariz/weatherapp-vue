<script setup lang="ts">
import BackArrowIcon from '@/components/icons/BackArrowIcon.vue'
</script>

<template>
  <header id="profile-navbar">
    <RouterLinkButton :to="'/'" style="float: left; position: absolute; left: 0">
      <BackArrowIcon />
    </RouterLinkButton>
    <h1>Edit Profile</h1>
  </header>
</template>

<style scoped>
#profile-navbar {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: min-content;
  font-family: 'Poppins';
  font-weight: 600;
  text-align: center;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin: 10px 0;
  margin-top: 20px;
  width: 100%;
  max-width: 343px;
}
</style>
