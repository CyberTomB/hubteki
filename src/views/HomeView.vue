<script setup lang="ts">
import api from '@/api/client'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { socket } from '@/socket'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const auth = useAuthStore()

const register = ref(false)

function toggleRegister() {
  register.value = !register.value
}

function sendChat() {
  socket.open()
  console.log('emitting chat on socket')
  socket.emit('chat message')
}
</script>

<template>
  <h1>Welcome to Hubteki!</h1>
  <div v-if="!auth.isAuthenticated">
    <RegisterForm v-if="register"></RegisterForm>
    <LoginForm v-else> </LoginForm>

    <p>
      {{ register ? 'Already have an account?' : 'Need an account?' }}
      <button @click="toggleRegister">{{ register ? 'Sign in' : 'Sign up' }}</button>
    </p>
  </div>
  <button v-else @click="sendChat">Create Room</button>
</template>
