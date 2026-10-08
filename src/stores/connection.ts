import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useAuthStore } from './auth'

export const useConnectionStore = defineStore('connection', () => {
  const URL = 'http://localhost:3000/'
  const isConnected = ref(false)

  function bindEvents() {
    socket.on('connect', () => {
      console.log('[socket]connected to the socket server')
      isConnected.value = true
    })

    socket.on('disconnect', () => {
      console.log('[socket]disconnected from the server')
      isConnected.value = false
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'INVALID USERNAME') {
        console.error('[socket] invalid username')
      }
    })
  }

  function connect() {
    const auth = useAuthStore()
    const user = auth.isAuthenticated ? auth.user : null

    console.log('[socket] connecting...')
    if (!user) {
      console.error('[socket] Unable to open connection: no user')
      return
    }

    socket.auth = user
    socket.connect()
    bindEvents()
  }

  return {
    socket,
    isConnected,
    connect,
    bindEvents,
  }
})
