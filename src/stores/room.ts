import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { socket } from '@/api/socket'

export interface MessageData {
  username: string
  content: string
  position: number
}

export interface IRoom {
  roomId: string
  creator: string
  messages: Array<MessageData>
}

class Room implements IRoom {
  roomId: string
  creator: string
  messages: Array<MessageData>

  constructor(userId: string) {
    this.roomId = crypto.randomUUID()
    this.creator = userId
    this.messages = new Array()
  }

  private getMessageIncrement(): number {
    return this.messages.length
  }

  public addMessage(content: string, from: string) {
    const message: MessageData = {
      content: content,
      position: this.getMessageIncrement(),
      username: from,
    }
    this.messages.push(message)
  }
}

export const useRoomStore = defineStore('room', () => {
  const rooms: Ref<Map<string, Room>> = ref(new Map())
  const activeRoom: Ref<null | Room> = ref(null)

  // TODO socket connect and subscribe to /rooms

  function createRoom(username: string) {
    // TODO - Api request: POST /room
    const newRoom = new Room(username) //NOTE - get from backend
    rooms.value.set(newRoom.roomId, newRoom)
  }

  function joinRoom(roomId: string) {
    // TODO - Api request: GET /room/id?joinAs=spectator
    // Should receive message history as well
    const room = rooms.value.get(roomId)
    if (!room) {
      console.error('[room] unable to find room with roomId: ', roomId)
      return
    }

    activeRoom.value = room
  }

  function joinGame(gameId: string) {
    // TODO - Rooms should have a 1:1 relationship with game
  }

  function sendMessage(envelope: { roomId: string; content: string; from: string }) {
    const { roomId, content, from } = envelope
    const room = rooms.value.get(roomId)
    if (!room) {
      console.error('[room] could not join that room')
      return
    }
    room.addMessage(content, from)
  }

  return {
    rooms,
    createRoom,
    joinRoom,
    sendMessage,
    activeRoom,
  }
})
