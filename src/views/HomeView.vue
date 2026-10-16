<script setup lang="ts">
import api from '@/api/client'
import ChatRoom from '@/components/ChatRoom.vue'
import LoginForm from '@/components/LoginForm.vue'
import RegisterForm from '@/components/RegisterForm.vue'
import { socket } from '@/api/socket'
import { useAuthStore } from '@/stores/auth'
import { useRoomStore, type MessageData } from '@/stores/room'
import { useConnectionStore } from '@/stores/connection'
import { storeToRefs } from 'pinia'
import { computed, ref, type Ref } from 'vue'

const auth = useAuthStore()
const { lobby } = storeToRefs(useConnectionStore())

const chat = useRoomStore()
const { rooms, activeRoom } = storeToRefs(chat)
const roomHistory = computed(() => {
  return activeRoom.value?.messages
})

const register = ref(false)

const chatOpen = ref(false)
const chatter = ref('')
const history: Ref<MessageData[]> = ref([])

function toggleRegister() {
  register.value = !register.value
}

async function createRoom() {
  chat.createRoom(auth.user?.name ?? 'Fail')
}


const currentMessage = ref('');
function newMessage() {
  chat.sendMessage({
    roomId: activeRoom.value?.roomId ?? "failID",
    content: currentMessage.value,
    from: auth.user?.name ?? "Fail"
  })
  currentMessage.value = '';
}

function joinRoom(roomId: string) {
  chat.joinRoom(roomId);
}
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

  
  <!-- TODO: Componentalize -->

  <div id="room-list" v-if="auth.isAuthenticated">
    <h2>Available Rooms</h2>
    <li v-for="[k, v] of rooms" :key="k">{{ v.roomId }}
    <button @click="joinRoom(v.roomId)">Join</button></li>
  </div>

  <!-- TODO: Componentalize -->

  <div id="active-room" v-if="activeRoom">
    <p v-for="msg of roomHistory"><span>{{ msg.username }}: </span>{{ msg.content }}</p>
    <br>
    <form @submit.prevent="newMessage()">
    <input type="text" v-model=currentMessage></input>
    <button type="submit">Send</button>
    </form>
  </div>

  <div id="user-list" v-if="auth.isAuthenticated">
    <h2>Online Users:</h2>
    <li v-for="[k, v] of lobby" :key="k">{{ v }}</li>
  </div>
</template>
