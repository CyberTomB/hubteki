<script setup lang="ts">
import { onMounted } from 'vue'
import { socket } from './socket'
import { useConnectionStore } from './stores/connection'
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
const connection = useConnectionStore()
onMounted(() => {
  console.log('app mounted, attempting to connect: ')
  socket.off()

  connection.connect()
})
</script>

<template>
  <p>{{ `Logged in as ${auth.user?.name} and is connected: ${connection.isConnected}` }}</p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>
