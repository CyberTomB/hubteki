<script setup lang="ts">
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'

onMounted(() => {
  console.log('app mounted')
})
</script>

<template>
  <div id="app">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
