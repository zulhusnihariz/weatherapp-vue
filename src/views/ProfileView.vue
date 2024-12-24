<script setup lang="ts">
import ProfileDetails from '@/components/molecules/ProfileDetails.vue'
import ProfileForm from '@/components/molecules/ProfileForm.vue'
import ProfileNavbar from '@/navbar/ProfileNavbar.vue'
import useProfile from '@/store/profile'
import type { Profile } from '@/types/profile'
import type { FormSubmitEvent } from '@primevue/forms'
import { ref } from 'vue'

const { profile, setProfile } = useProfile()

const inputDisabled = ref<boolean>(true)
const input = ref<Profile>({ ...profile.value })

function toggleEdit() {
  inputDisabled.value = !inputDisabled.value
}

function saveProfile() {
  setProfile(input.value)
  toggleEdit()
}

const submitForm = ({ valid }: FormSubmitEvent) => {
  if (valid) {
    saveProfile()
  }
}
</script>

<template>
  <div class="layout">
    <ProfileNavbar />
    <ProfileDetails :profile="profile" />
    <ProfileForm :input="input" :input-disabled="inputDisabled" :submit="submitForm">
      <div class="button-group">
        <Button v-if="!inputDisabled" class="action-button" label="Submit" type="submit" unstyled />
        <Button
          v-if="inputDisabled"
          class="action-button"
          label="Edit"
          @click="toggleEdit"
          unstyled
        />
      </div>
    </ProfileForm>
  </div>
</template>

<style scoped>
.layout {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 90vh;
}
.button-group {
  position: absolute;
  bottom: 0;
}

.action-button {
  padding: 12.5px 16px;
  width: 343px;
  height: 53px;

  background: #2e3a5a;
  border-radius: 8px;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
}
</style>
