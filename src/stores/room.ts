import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { socket } from '@/api/socket'
import { randomUUID } from 'crypto'

export interface MessageData {
  user: string
  message: string
  id?: number
}

export const useRoomStore = defineStore('room', () => {
  const rooms: Ref<Map<string, MessageData[]>> = ref(new Map())

  // TODO socket connect and subscribe to /rooms

  function createRoom() {
    // TODO - Api request: POST /room
    const roomId = randomUUID //NOTE - get from backend
    rooms.value.set(roomId, [])
  }

  function watchRoom(roomId: string) {
    // TODO - Api request: GET /room/id?joinAs=spectator
    // Should receive message history as well
    rooms.value.get(roomId)
  }

  function joinGame(gameId: string) {
    // TODO - Rooms should have a 1:1 relationship with game
  }

  function update(roomId: string, content: MessageData) {
    const history = rooms.value.get(roomId)
    if (!history) {
      console.error('oopsie')
    }
    rooms.value.set(roomId, [...history!, content])
  }

  function sendChat(to: string, from: string, content: string) {
    console.log('[chat store] message: ', {
      to,
      from,
      content,
    })
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
    addRoom: createRoom,
    joinRoom: watchRoom,
    update,
    sendChat,
  }
})
