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
    const { data, status } = await api.post('/register', payload)
    console.log('[register]: ', data.message)
    if (status === 200) {
      console.log('now login you fool')
      // TODO implement redirect?
    }
  }

  async function login(payload: { email: string; password: string }) {
    const res = await api.post('/login', payload)
    console.log('[login] received this response: ', res)
    setSession(res.data.accessToken, res.data.user)
    console.log('[refresh] attempting to reconnect to socket')
    connection.connect()
  }

  async function logout() {
    try {
      const res = await api.post('/logout')
    } finally {
      clearSession()
    }
  }

  async function tryRestoreSession() {
    console.log('[AUTH] restoring session')
    try {
      const { data } = await api.post('/refresh')
      setSession(data.accessToken, data.user)
      console.log('[AUTH][refresh] attempting to reconnect to socket')
      await connection.connect()
    } catch (e) {
      console.log('Error:', e)
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
