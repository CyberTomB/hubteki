<template>
  <form class="form" @submit.prevent="sendMessage">
    <input class="input" type="text" placeholder="Name" v-model="username" />
    <input class="input" type="text" placeholder="Message" v-model="message" />
    <button class="button">Send Message</button>
  </form>
</template>

<script setup lang="ts">
import { io } from 'socket.io-client'

let username = ''
let message = ''
// TODO fetch url from env
const socket = io('http://localhost:3000')

function sendMessage() {
  console.log('button pressed: ', message, username)
  if (message && username) {
    console.log('activating socket', socket)
    socket.emit('send message', { username: username, content: message })
    message = ''
  }
}
</script>

<style scoped></style>
