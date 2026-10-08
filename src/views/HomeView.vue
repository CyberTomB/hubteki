<script setup lang="ts">
import api from '@/api/client'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { socket } from '@/socket'
import { useAuthStore } from '@/stores/auth'
import { useConnectionStore } from '@/stores/connection'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const auth = useAuthStore()
const register = ref(false)

function toggleRegister() {
  register.value = !register.value
}

function openChat() {
  console.log('open chat')
}

function createRoom() {
  console.log('create room')
}

const { userList } = storeToRefs(useConnectionStore())
</script>

<template>
  <h1>Welcome to Hubteki!</h1>
  <div id="login-section">
    <div v-if="!auth.isAuthenticated">
      <RegisterForm v-if="register"></RegisterForm>
      <LoginForm v-else> </LoginForm>

      <p>
        {{ register ? 'Already have an account?' : 'Need an account?' }}
        <button @click="toggleRegister">{{ register ? 'Sign in' : 'Sign up' }}</button>
      </p>
    </div>

    <button v-else @click="createRoom">Create Room</button>
  </div>
  <div id="user-list" v-if="auth.isAuthenticated">
    <h2>Online Users:</h2>
    <li v-for="[k, v] of userList" :key="k">{{ v }} <button @click="openChat">Chat</button></li>
  </div>
</template>
