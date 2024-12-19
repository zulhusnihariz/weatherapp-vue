<script setup lang="ts">
import { ref } from 'vue'
import ButtonAtom from '../atoms/ButtonAtom.vue'
import FormAtom from '../atoms/FormAtom.vue'
import InputAtom from '../atoms/InputAtom.vue'
import LabelAtom from '../atoms/LabelAtom.vue'

interface Profile {
  fullName: string
  email: string
  phoneNumber: string
}

const profile = ref<Profile>({
  fullName: '',
  email: '',
  phoneNumber: '',
})

const inputDisabled = ref<boolean>(true)

function toggleEdit() {
  inputDisabled.value = !inputDisabled.value
}

function submitProfile() {
  console.log(profile.value)
}
</script>

<template>
  <FormAtom>
    <LabelAtom title="Full Name" />
    <InputAtom v-model="profile.fullName" :disabled="inputDisabled" />

    <LabelAtom title="Email" />
    <InputAtom v-model="profile.email" :disabled="inputDisabled" />

    <LabelAtom title="Phone Number" />
    <InputAtom v-model="profile.phoneNumber" :disabled="inputDisabled" />

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
      :on-click="submitProfile"
    />
  </FormAtom>
</template>
