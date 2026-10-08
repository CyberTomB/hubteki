import { socket } from '@/socket'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useAuthStore } from './auth'
import type { Socket } from 'socket.io-client'

export type SocketUser = {
  userId: string
  username: string
  self?: boolean
  sessionId: string
}

export const useConnectionStore = defineStore('connection', () => {
  const URL = 'http://localhost:3000/'
  const isConnected = ref(false)
  const userList: Ref<Map<string, string>> = ref(new Map())

  function bindEvents() {
    socket.on('connect', () => {
      console.log('[socket]connected to the socket server')
      isConnected.value = true
    })

    socket.on('session', ({ sessionId, username }) => {
      console.log('received session info: ', sessionId, username)
      socket.auth = { sessionId: sessionId }
      localStorage.setItem('sessionId', sessionId)
      socket.auth.username = username
    })

    socket.on('disconnect', () => {
      console.log('[socket]disconnected from the server')
      isConnected.value = false
      socket.disconnect()
    })

    socket.on('connect_error', (err) => {
      if (err.message === 'INVALID USERNAME') {
        console.error('[socket] invalid username')
      }
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
  }

  function connect() {
    const auth = useAuthStore()
    const user = auth.isAuthenticated ? auth.user : null

    const sessionId = localStorage.getItem('sessionId')
    if (sessionId) {
      console.log('[socket] found session ID: ', sessionId)
      socket.auth = { sessionId }
    }

    console.log('[socket] connecting...')
    if (!user) {
      console.error('[socket] Unable to open connection: no user')
      return
    }

    socket.auth = { ...socket.auth, username: user.email, id: user.feId }
    socket.connect()
    bindEvents()
  }

  return {
    socket,
    isConnected,
    connect,
    bindEvents,
    userList,
  }
})
