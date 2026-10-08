import api from '@/api/client'
import type User from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useConnectionStore } from './connection'

export const useAuthStore = defineStore('auth', () => {
  const accessToken: Ref<null | string> = ref(null)
  const user: Ref<null | User> = ref(null)
  const connection = useConnectionStore()

  const isAuthenticated = computed(() => accessToken.value !== null)

  function setSession(access: string, userData: User) {
    console.log('setting session', access, userData)
    accessToken.value = access
    user.value = userData
  }

  function clearSession() {
    accessToken.value = null
    user.value = null
  }

  async function register(payload: { name: string; email: string; password: string }) {
    const { data } = await api.post('/register', payload)
    setSession(data.accessToken, data.user)
  }

  async function login(payload: { email: string; password: string }) {
    const { data } = await api.post('/login', payload)
    setSession(data.accessToken, data.user)
    console.log('[refresh] attempting to reconnect to socket')
    connection.connect()
  }

  async function logout() {
    try {
      const res = await api.post('/logout')
      console.log('Received from logout: ', res)
    } finally {
      clearSession()
    }
  }

  async function tryRestoreSession() {
    try {
      const { data } = await api.post('/refresh')
      setSession(data.accessToken, data.user)
      console.log('[refresh] attempting to reconnect to socket')
      connection.connect()
    } catch {
      clearSession()
    }
  }

  return {
    accessToken,
    user,
    isAuthenticated,
    register,
    login,
    logout,
    tryRestoreSession,
  }
})
