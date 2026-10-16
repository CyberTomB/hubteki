<script setup lang="ts">
import { onMounted } from 'vue'
import { socket } from './socket'
import { useConnectionStore } from './stores/connection'
import { useAuthStore } from './stores/auth'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useAuthStore())
const connection = useConnectionStore()
</script>

<template>
  <p>{{ `Logged in as ${user?.name} and is connected: ${connection.isConnected}` }}</p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>
