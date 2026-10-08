<script setup lang="ts">
import api from '@/api/client'
import ChatRoom from '@/components/ChatRoom.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { socket } from '@/socket'
import { useAuthStore } from '@/stores/auth'
import { useChatStore, type MessageData } from '@/stores/chat'
import { useConnectionStore } from '@/stores/connection'
import { storeToRefs } from 'pinia'
import { ref, type Ref } from 'vue'

const auth = useAuthStore()
const register = ref(false)

const chat = useChatStore()

const { rooms } = storeToRefs(chat)
const chatOpen = ref(false)
const chatter = ref('')
const history: Ref<MessageData[]> = ref([])

function toggleRegister() {
  register.value = !register.value
}

function openChat(username: string) {
  console.log('open chat')
  chatOpen.value = true
  chatter.value = username
  history.value = rooms.value.get(username) ?? []
  chat.addRoom(username)
  chat.joinRoom(username)
  console.log('updating?')
  chat.update(username, {
    user: auth.user?.email ?? '',
    message: 'Hello werld',
  })
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
    <li v-for="[k, v] of userList" :key="k">{{ v }} <button @click="openChat(v)">Chat</button></li>
  </div>

  <ChatRoom v-if="chatOpen" :target="chatter" :user="auth.user!"> </ChatRoom>

  <br />
  <div id="test">
    <p v-for="n of history">{{ n }}</p>
  </div>
</template>
