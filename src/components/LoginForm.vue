<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isSubmitting = ref(false)

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleSubmit() {
  errorMessage.value = ''
  isSubmitting.value = true
  try {
    const res = await auth.login({ email: email.value, password: password.value })
    router.push((route.query.redirect as string) || { name: 'home' })
  } catch (error: any) {
    errorMessage.value = error.response?.data?.message || 'Something went wrong, try again.'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
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

    <p v-if="errorMessage" role="alert">{{ errorMessage }}</p>

    <button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
    </button>
  </form>
</template>

<style scoped></style>
