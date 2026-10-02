import { useAuthStore } from '@/stores/auth'
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
})

const SKIP_REFERESH = ['/login', '/register', '/refresh']

api.interceptors.request.use((config) => {
  const auth = useAuthStore()
  if (auth.accessToken) {
    config.headers.Authorization = `Bearer ${auth.accessToken}`
  }
  return config
})

let refreshPromise = null

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config, response } = error
    const shouldRetry =
      response?.status === 401 &&
      !config._retry &&
      !SKIP_REFERESH.some((path) => config.url?.endsWith(path))

    if (!shouldRetry) return Promise.reject(error)

    config._retry = true
    const auth = useAuthStore()
    refreshPromise ??= auth.tryRestoreSession().finally(() => {
      refreshPromise = null
    })
    await refreshPromise

    if (!auth.accessToken) return Promise.reject(error)
    config.headers.Authorzation = `Bearer ${auth.accessToken}`
    return api(config)
  },
)

export default api
