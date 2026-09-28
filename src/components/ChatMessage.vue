<script setup lang="ts">
import type { Message } from '@/models/Message'
import { io } from 'socket.io-client'
import { onMounted } from 'vue'

const messages: Message[] = []
// TODO needs to fetch from env
const socket = io('http://localhost:3000')

onMounted(() => {
  console.log('message queue init')
  socket.on('send message', (message) => {
    console.log('received from socket: ', message)
    messages.push(message)
    console.log(messages)
  })
})
</script>

<template>
  <div class="messageArea">
    <p class="message" v-for="m in messages" :key="m.id">
      <span class="username">{{ m.username }}</span>
      <span class="content">{{ m.content }}</span>
    </p>
  </div>
</template>

<style scoped>
#chat-box {
  height: 25vh;
  width: 25vw;
  border: 0.25em solid black;
}
</style>
