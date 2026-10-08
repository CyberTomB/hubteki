<script setup lang="ts">
import { onMounted } from 'vue'
import { socket, state } from './socket'

onMounted(() => {})
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
