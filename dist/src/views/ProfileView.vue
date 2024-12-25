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
    <main id="main-profile">
      <ProfileDetails :profile="profile" />

      <section style="margin-top: 30px; width: 100%">
        <ProfileForm :input="input" :input-disabled="inputDisabled" :submit="submitForm">
          <div class="button-group">
            <Button
              v-if="!inputDisabled"
              class="action-button"
              label="Submit"
              type="submit"
              unstyled
            />
            <Button
              v-if="inputDisabled"
              class="action-button"
              label="Edit"
              @click="toggleEdit"
              unstyled
            />
          </div>
        </ProfileForm>
      </section>
    </main>
  </div>
</template>

<style>
#main-profile {
  width: 100vw;
  max-width: 343px;
}
.button-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
}

.action-button {
  padding: 12.5px 16px;
  width: 100%;
  height: 53px;
  background: #2e3a5a;
  border-radius: 8px;
  text-transform: uppercase;
  color: #fff;
  font-weight: bold;
}
</style>
