<script setup lang="ts">
import { onMounted } from 'vue'
import { socket, state } from './socket'

// socket.off()
// socket.connect()

onMounted(() => {
  console.log('mounted, trying to connect: ')
  socket.connect()
})
</script>

<template>
  <p>{{ `Socket active: ${socket.active} and is connected: ${state.connected}` }}</p>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>
