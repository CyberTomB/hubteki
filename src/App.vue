<script setup lang="ts">
import { socket } from './socket'
import { useConnectionStore } from './stores/connection'
import { useItemStore } from './stores/item'

const itemStore = useItemStore()
const connectionStore = useConnectionStore()

socket.off()
itemStore.bindEvents()
connectionStore.bindEvents()
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/profile">Profile</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style scoped></style>
