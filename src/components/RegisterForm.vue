<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const auth = useAuthStore()
const router = useRouter()

const passwordsMatch = computed(() => password.value === confirmPassword.value)

async function handleSubmit() {
  errorMessage.value = ''
  if (password.value.length < 8) {
    errorMessage.value = 'Passwords must be at least 8 characters long'
    return
  }
  if (!passwordsMatch.value) {
    errorMessage.value = 'Passwords do not match'
    return
  }

  isSubmitting.value = true
  try {
    // register
    console.log('registering')
    await auth.register({ email: email.value, password: password.value, name: name.value })
    router.push({ name: 'home' })
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Registration failed, try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <p>This is the Registration Page</p>
  <form @submit.prevent="handleSubmit">
    <label for="name">Name</label>
    <input id="name" v-model="name" type="text" required autocomplete="name" />

    <label for="email">Email</label>
    <input id="email" v-model="email" type="email" required autocomplete="email" />

    <label for="password">Password</label>
    <input
      id="password"
      v-model="password"
      type="password"
      required
      autocomplete="current-password"
    />

    <label for="confirmPassword">Confirm password</label>
    <input
      id="confirmPassword"
      v-model="confirmPassword"
      type="password"
      required
      autocomplete="new-password"
    />

    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Creating account...' : 'Create Account' }}
    </button>
  </form>
</template>

<style scoped></style>
