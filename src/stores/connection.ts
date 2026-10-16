import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useAuthStore } from './auth'

export type SocketUser = {
  userId: string
  username: string
  self?: boolean
  sessionId: string
}

export const useConnectionStore = defineStore('connection', () => {
  const isConnected = ref(false)
  const userList: Ref<Map<string, string>> = ref(new Map())
  const authStore = useAuthStore()

  function bindEvents() {
    socket.on('connect', () => {
      console.log('[socket]connected to the socket server')
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

    socket.on('users', (users) => {
      console.log('[socket]: received user list: ', users)
      const sorted = users.sort((a: SocketUser, b: SocketUser) => {
        if (a.self) return -1
        if (b.self) return 1
        if (a.username < b.username) return -1
        return a.username > b.username ? 1 : 0
      })

      sorted.forEach((u: SocketUser) => {
        userList.value.set(u.sessionId, u.username)
      })
    })

    socket.on('userConnected', (user: SocketUser) => {
      userList.value.set(user.sessionId, user.username)
    })

    socket.on('userDisconnected', (user: SocketUser) => {
      userList.value.delete(user.sessionId)
    })

    socket.on('chat', ({ from, content }) => {
      console.log('[socket] received chat event: ', {
        from,
        content,
      })
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
    userList,
  }
})
