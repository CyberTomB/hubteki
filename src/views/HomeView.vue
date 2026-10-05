<script setup lang="ts">
import api from '@/api/client'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'

const socket = new WebSocket('ws://localhost:3000')
onMounted(() => {
  socket.onopen = (event) => {
    console.log('socket opened')
  }
})

const auth = useAuthStore()

const register = ref(false)

function toggleRegister() {
  register.value = !register.value
}

async function sendMessage() {
  socket.send('test')
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
  <button v-else @click="sendMessage">Create Room</button>
</template>
