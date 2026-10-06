<script setup lang="ts">
import api from '@/api/client'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth'
import { onMounted, reactive, ref, type Ref } from 'vue'

const socket: Ref<WebSocket | null> = ref(null)

const auth = useAuthStore()

const register = ref(false)

function toggleRegister() {
  register.value = !register.value
}

async function openRoom() {
  socket.value = new WebSocket(
    `ws://localhost:3000/ws?token=${encodeURIComponent(auth.accessToken!)}`,
  )

  if (socket.value) {
    socket.value.onerror = async (data) => {
      console.log('handling retry', data)
      await auth.tryRestoreSession()
      socket.value?.OPEN
    }

    socket.value.onopen = (data) => {
      console.log('[ws onopen]', data)
    }
  }
}

async function sendMessage() {
  socket.value?.send('test')
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
  <button v-else @click="openRoom">Create Room</button>
</template>
