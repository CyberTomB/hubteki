import { io } from 'socket.io-client'

const URL = 'http://localhost:3000/'

export const socket = io(URL, { autoConnect: false, withCredentials: true })

socket.onAny((event, ...args) => {
  console.log('[SOCKET]: ', { event: event, args })
})
