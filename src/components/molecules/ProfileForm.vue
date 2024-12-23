<script setup lang="ts">
import type { Profile } from '@/types/profile'
import { profileValidationSchema } from '@/validations/profile'
import { Form, type FormSubmitEvent } from '@primevue/forms'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

interface Props {
  input: Profile
  inputDisabled: boolean
  submit: (e: FormSubmitEvent) => void
}

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
  >
    <div class="input-group">
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
    </div>
    <div class="input-group">
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
    </div>

    <div class="input-group">
      <label for="phoneNumber">Phone Number</label>
      <InputText
        id="phoneNumber"
        name="phoneNumber"
        v-model="input.phoneNumber"
        :disabled="inputDisabled"
        class="input"
        type="text"
        unstyled
      />
      <p v-if="$form.phoneNumber?.invalid" class="error-message">
        {{ $form.phoneNumber.error.message }}
      </p>
    </div>
    <slot></slot>
  </Form>
</template>

<style scoped>
label {
  font-size: 12px;
}
.input-group {
  display: flex;
  flex-direction: column;
  gap: 1px;
  margin-bottom: 10px;
}

.input {
  width: 342px;
  height: 50px;
  padding-top: 5px;
  border-radius: 8px;
  outline: none;
  background: #f5f5f5;
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
