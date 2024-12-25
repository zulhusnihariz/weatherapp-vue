<script setup lang="ts">
import useProfile from '@/store/profile'
import { computed } from 'vue'
import ProfilePicture from './ProfilePicture.vue'

const { profile } = useProfile()

const hasEmailAndPhoneNumber = computed(() => {
  return profile.value.email.length > 0 && profile.value.phoneNumber.length > 0
})
</script>

<template>
  <section class="details-container">
    <ProfilePicture />

    <div class="contact">
      <p class="name">{{ profile.fullName }}</p>
      <div class="details">
        <p class="email">{{ profile.email }}</p>
        <template v-if="hasEmailAndPhoneNumber">
          <span class="separator">|</span>
        </template>
        <p class="phone">{{ profile.phoneNumber }}</p>
      </div>
    </div>
  </section>
</template>

<style>
.details-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.contact {
  text-align: center;
}

.name {
  margin: 0;
  font-size: 16px;
  font-weight: bold;
}

.details {
  margin: 0;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
}

.separator {
  display: flex;
  align-items: center;
}
</style>
