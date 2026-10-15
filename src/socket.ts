import { io } from 'socket.io-client'
import { reactive } from 'vue'

const URL = 'http://localhost:3000/'

export const socket = io(URL, { autoConnect: false })

socket.onAny((event, ...args) => {
  console.log('[SOCKET]: ', { event: event, args })
})
