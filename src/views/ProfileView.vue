<script setup lang="ts">
import api from '@/api/client'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const auth = useAuthStore()

onMounted(async () => {
  const { data } = await api.get('/')
})
</script>

<template>
  <p>You are now logged in: {{ auth.user?.name }}</p>
</template>
