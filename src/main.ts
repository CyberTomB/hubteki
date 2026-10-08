import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/auth.ts'
import { socket } from './socket.ts'

socket.off()
const app = createApp(App)

app.use(createPinia())
const auth = useAuthStore()

app.onUnmount(() => {
  console.log(`User ${auth.user?.email} is disconnecting`)
  socket.emit('disconnect')
})

auth.tryRestoreSession().finally(() => {
  console.log('[main] restore session attempt done')
  // NOTE - Afaik, router needs to be called after the session restoration in order to route properly
  app.use(router)
  app.mount('#app')
})
