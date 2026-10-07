import { io } from 'socket.io-client'
import { reactive } from 'vue'

export const state = reactive({
  connected: false,
})

const URL = 'http://localhost:5173'

export const socket = io(URL)

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})
