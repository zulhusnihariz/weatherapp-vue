<script setup lang="ts">
import useProfile from '@/store/profile'
import useGoCountries from '@/store/rest'
import type { Profile } from '@/types/profile'
import { profileValidationSchema } from '@/validations/profile'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { IftaLabel } from 'primevue'
import InputText from 'primevue/inputtext'
import { onMounted, ref } from 'vue'

interface Props {
  input: Profile
  inputDisabled: boolean
  submit: (e: FormSubmitEvent) => void
}

const { country, getCountryDetails } = useProfile()
const { queryCountryCode } = useGoCountries()

onMounted(async () => {
  const c = await queryCountryCode()

  if (c?.code) {
    await getCountryDetails(c.code)
  }
})

const { input, submit, inputDisabled } = defineProps<Props>()

const resolver = ref(zodResolver(profileValidationSchema))
</script>

<template>
  <Form
    v-slot="$form"
    :resolver="resolver"
    :initial-values="input"
    @submit="submit"
    unstyled
    autocomplete="off"
  >
    <fieldset class="input-group">
      <IftaLabel>
        <label for="fullName">Full Name</label>
        <InputText
          id="fullName"
          name="fullName"
          v-model="input.fullName"
          :disabled="inputDisabled"
          class="input"
          type="text"
          unstyled
        />
      </IftaLabel>
      <p v-if="$form.fullName?.invalid" class="error-message">
        {{ $form.fullName.error.message }}
      </p>
    </fieldset>
    <fieldset class="input-group">
      <IftaLabel>
        <label for="email">Email</label>
        <InputText
          id="email"
          name="email"
          v-model="input.email"
          :disabled="inputDisabled"
          class="input"
          type="text"
          unstyled
        />
      </IftaLabel>
      <p v-if="$form.email?.invalid" class="error-message">
        {{ $form.email.error.message }}
      </p>
    </fieldset>

    <fieldset class="input-group">
      <IftaLabel>
        <label for="phoneNumber">Phone Number</label>
        <InputGroup
          :style="{
            backgroundColor: inputDisabled ? '#f5f5f5' : '#fff',
            border: inputDisabled ? 'none' : '3px solid #f5f5f5',
            maxHeight: '50px',
          }"
        >
          <InputGroupAddon
            :style="{
              backgroundColor: inputDisabled ? '#f5f5f5' : '#fff',
              border: 'none',
              boxSizing: 'border-box',
            }"
          >
            <template v-if="country?.flags?.png">
              <img :src="country.flags.png" :alt="country.flags.alt" id="country-flag" />
            </template>
          </InputGroupAddon>
          <InputText
            id="phoneNumber"
            name="phoneNumber"
            v-model="input.phoneNumber"
            :disabled="inputDisabled"
            class="input"
            type="text"
            unstyled
            :style="{ paddingTop: inputDisabled ? '25px' : '20px' }"
          />
        </InputGroup>
      </IftaLabel>
      <p v-if="$form.phoneNumber?.invalid" class="error-message">
        {{ $form.phoneNumber.error.message }}
      </p>
    </fieldset>
    <slot></slot>
  </Form>
</template>

<style scoped>
label {
  font-size: 12px;
}

fieldset {
  border: none;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin: 0px;
  padding: 0px;
  margin-bottom: 15px;
}

.p-iftalabel {
  left: 0px;
  bottom: 0px;
  top: 10px;
  background-color: #f5f5f5;
}

.p-iftalabel:has(input:focus) label {
  color: #a1a1aa;
}

.p-inputgroup,
.p-inputgroupaddon,
.p-inputgroupaddon div {
  background-color: #fff;
  border: none;
  outline: none;
  box-shadow: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  border-right: 1px solid #d5d5d5;
}

#country-flag {
  transform: scale(0.7);
  max-width: 40px;
  object-fit: cover;
  padding-top: 25px;
  margin-left: 5px;
}

#phoneNumber {
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border: none;
  max-height: 42px;
}

.input {
  width: 100%;
  height: 50px;
  padding-top: 5px;
  border-radius: 8px;
  outline: none;
  background: #f5f5f5;
  padding-left: 10px;
  padding-top: 20px;
}

.input:disabled {
  background: #f5f5f5;
  color: #757575;
  border: none;
}

.input:not(disabled) {
  background-color: #fff;
  color: black;
  border: 3px solid #f5f5f5;
  outline: #f5f5f5;
}
.error-message {
  color: #cc0033;
  font-size: 12px;
  padding-left: 10px;
  padding-top: 10px;
}
</style>
