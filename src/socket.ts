import { io } from 'socket.io-client'
import { reactive } from 'vue'

export const state = reactive({
  connected: false,
})

const URL = 'http://localhost:3000/'

export const socket = io(URL)

socket.on('connect_error', (err) => {
  // the reason of the error, for example "xhr poll error"
  console.log(err.message)

  // some additional description, for example the status code of the initial HTTP response
  //   console.log(err.description)

  // some additional context, for example the XMLHttpRequest object
  //   console.log(err.context)
})

socket.on('connect', () => {
  console.log('connected to the socket server')
  state.connected = true
})

socket.on('disconnect', () => {
  console.log('disconnected from the server')
  state.connected = false
})

socket.on('chat message', () => {
  console.log('[socket-client] emitting')
  socket.emit('chat message')
})

socket.on('error', () => {
  console.error('Connection failed?')
})
