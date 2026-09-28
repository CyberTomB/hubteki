<template>
  <form class="form" @submit.prevent="sendMessage">
    <input class="input" type="text" placeholder="Name" v-model="username" />
    <input class="input" type="text" placeholder="Message" v-model="message" />
    <button class="button">Send Message</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { io } from 'socket.io-client'

const username = ref('')
const message = ref('')
// TODO fetch url from env
const socket = io('http://localhost:3000')

function sendMessage() {
  if (message.value && username.value) {
    console.log('activating socket', socket)
    socket.emit('send message', { username: username.value, content: message.value })
    message.value = ''
  }
}
</script>

<style scoped></style>
