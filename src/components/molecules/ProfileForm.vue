<script setup lang="ts">
import useProfile from '@/store/profile'
import type { Profile } from '@/types/profile'
import { onMounted, ref } from 'vue'
import ButtonAtom from '../atoms/ButtonAtom.vue'
import FormAtom from '../atoms/FormAtom.vue'
import InputAtom from '../atoms/InputAtom.vue'
import LabelAtom from '../atoms/LabelAtom.vue'

const { getProfile, setProfile } = useProfile()

const inputDisabled = ref<boolean>(true)

const profile = getProfile()
const input = ref<Profile>(profile)

function toggleEdit() {
  inputDisabled.value = !inputDisabled.value
}

function saveProfile() {
  setProfile(input.value)
  toggleEdit()
}

onMounted(() => {
  getProfile()
})
</script>

<template>
  <FormAtom>
    <LabelAtom title="Full Name" />
    <InputAtom v-model="input.fullName" :disabled="inputDisabled" />

    <LabelAtom title="Email" />
    <InputAtom v-model="input.email" :disabled="inputDisabled" />

    <LabelAtom title="Phone Number" />
    <InputAtom v-model="input.phoneNumber" :disabled="inputDisabled" />

    <ButtonAtom
      v-if="inputDisabled"
      class="profile-action-button"
      title="Edit"
      :on-click="toggleEdit"
    />

    <ButtonAtom
      v-if="!inputDisabled"
      class="profile-action-button"
      title="Submit"
      :on-click="saveProfile"
    />
  </FormAtom>
</template>
