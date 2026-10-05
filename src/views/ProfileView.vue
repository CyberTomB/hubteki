<script setup lang="ts">
import api from '@/api/client'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

async function logout(): Promise<void> {
  try {
    await auth.logout()
  } catch (error: any) {
    console.warn('Something went wrong: ', error)
  } finally {
    router.push({ name: 'home' })
  }
}
</script>

<template>
  <p>You are now logged in: {{ auth.user?.name }}</p>
  <button type="button" @click="logout">Logout</button>
</template>
