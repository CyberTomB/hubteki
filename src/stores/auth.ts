import api from '@/api/client'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken: Ref<null | string> = ref(null)
  const user: Ref<null | string> = ref(null)

  const isAuthenticated = computed(() => accessToken.value !== null)

  function setSession(token: string, userData: string) {
    accessToken.value = token
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
  }

  async function logout() {
    try {
      await api.post('/logout')
    } finally {
      clearSession()
    }
  }

  async function tryRestoreSession() {
    try {
      const { data } = await api.post('/refresh')
      setSession(data.accessToken, data.user)
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
