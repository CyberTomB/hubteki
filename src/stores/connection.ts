import { socket } from '@/api/socket'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useAuthStore } from './auth'

export type SocketUser = {
  userId: string
  username: string
  self?: boolean
  connectionId: string
}

export const useConnectionStore = defineStore('connection', () => {
  const isConnected = ref(false)
  const lobby: Ref<Map<string, string>> = ref(new Map())
  const authStore = useAuthStore()

  function bindEvents() {
    socket.on('connect', () => {
      console.log('[socket] connected to the socket server')
      isConnected.value = true
    })

    socket.on('disconnect', () => {
      console.log('[socket] disconnected from the server')
      isConnected.value = false
      socket.disconnect()
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'INVALID USERNAME') {
        console.error('[socket] invalid username')
      }
      console.error('Something went wrong: ', err.message)
    })

    socket.on('users', (users: SocketUser[]) => {
      console.log('[socket] updating online users: ', users)
      users.forEach((u) => {
        lobby.value.set(u.connectionId, u.username)
      })
    })

    socket.on('userConnected', (user: SocketUser) => {
      console.log('[socket] user connected: ', user)
      lobby.value.set(user.connectionId, user.username)
    })

    socket.on('userDisconnected', (user: SocketUser) => {
      console.log('[socket] user disconnected: ', user)
      lobby.value.delete(user.connectionId)
    })
  }

  async function connect() {
    console.log('[socket] attempting to connect')
    bindEvents()
    await socket.connect()
  }

  return {
    socket,
    isConnected,
    connect,
    bindEvents,
    lobby,
  }
})
