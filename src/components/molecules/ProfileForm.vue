<script setup lang="ts">
import useProfile from '@/store/profile'
import useGoCountries from '@/store/rest'
import type { Profile } from '@/types/profile'
import { profileValidationSchema } from '@/validations/profile'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
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
    class="form"
    autocomplete="off"
  >
    <fieldset class="input-group">
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
      <p v-if="$form.fullName?.invalid" class="error-message">
        {{ $form.fullName.error.message }}
      </p>
    </fieldset>
    <fieldset class="input-group">
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
      <p v-if="$form.email?.invalid" class="error-message">
        {{ $form.email.error.message }}
      </p>
    </fieldset>

    <fieldset class="input-group">
      <label for="phoneNumber">Phone Number</label>
      <InputGroup>
        <InputGroupAddon style="border: none">
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
        />
      </InputGroup>
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
  margin-bottom: 10px;
}

.p-inputgroup,
.p-inputgroupaddon,
.p-inputgroupaddon div {
  background-color: #f5f5f5;
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
}

#phoneNumber {
  width: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input {
  width: 342px;
  height: 50px;
  padding-top: 5px;
  border-radius: 8px;
  outline: none;
  background: #f5f5f5;
  padding-left: 10px;
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
}
</style>
