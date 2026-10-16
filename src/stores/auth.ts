import api from '@/api/client'
import type User from '@/models/user'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { useConnectionStore } from './connection'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<null | User> = ref(null)
  const connection = useConnectionStore()

  const isAuthenticated = computed(() => user.value !== null)

  function setSession(userData: User) {
    console.log('setting session', userData)
    user.value = userData
  }

  function clearSession() {
    user.value = null
  }

  async function register(payload: { name: string; email: string; password: string }) {
    const { data, status } = await api.post('/register', payload)
    console.log('[register]: ', data)
    if (status === 200) {
      console.log('now login you fool')
      // TODO implement prompt to login
    }
  }

  async function login(payload: { email: string; password: string }) {
    const { data } = await api.post('/login', payload)
    console.log('[login] received this response: ', data)
    setSession(data)
    connection.connect()
  }

  async function logout() {
    try {
      const res = await api.post('/logout')
      console.log('logged out', res)
    } finally {
      clearSession()
    }
  }

  async function tryRestoreSession() {
    console.log('[AUTH] restoring session')
    try {
      const { data } = await api.post('/refresh')
      setSession(data)
      await connection.connect()
    } catch (e) {
      console.log('Error:', e)
      clearSession()
    }
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    tryRestoreSession,
  }
})
