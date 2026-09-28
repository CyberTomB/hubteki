import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Confirming server connection

async function confirmServerConnection() {
  console.log('checking for server...')
  fetch('http://localhost:3000/index')
    .then((res) => res.json())
    .then((data) => {
      console.log('this was received: ', data)
    })
}

confirmServerConnection()

app.mount('#app')
