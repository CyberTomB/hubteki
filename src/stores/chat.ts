import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { useConnectionStore } from './connection'
import { socket } from '@/socket'

export interface MessageData {
  user: string
  message: string
  id?: number
}

export const useChatStore = defineStore('chat', () => {
  const rooms: Ref<Map<string, MessageData[]>> = ref(new Map())
  //   const connection = useConnectionStore();

  function addRoom(username: string) {
    rooms.value.set(username, [])
  }

  function joinRoom(id: string) {
    rooms.value.get(id)
  }

  function update(roomId: string, content: MessageData) {
    const history = rooms.value.get(roomId)
    if (!history) {
      console.error('oopsie')
    }
    rooms.value.set(roomId, [...history!, content])
  }

  function sendChat(to: string, from: string, content: string) {
    socket.emit('chat', {
      to,
      from,
      content,
    })
    update(to, {
      user: from,
      message: content,
    })
  }

  return {
    rooms,
    addRoom,
    joinRoom,
    update,
    sendChat,
  }
})
