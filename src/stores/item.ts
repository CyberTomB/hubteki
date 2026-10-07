import { socket } from '@/socket'
import { defineStore } from 'pinia'

// TODO - Format with correct types

export const useItemStore = defineStore('item', {
  state: () => ({
    items: [] as { id: number; label: string }[],
  }),

  actions: {
    bindEvents() {
      socket.on('connect', () => {
        socket.emit('item:list', (res: { data: any }) => {
          this.items = res.data
        })
      })

      socket.on('item:created', (item) => {
        this.items.push(item)
      })
    },
    createItem(label: string) {
      const item = {
        id: Date.now(),
        label,
      }
      this.items.push(item)

      socket.emit('item:create', { label }, (res: { data: any }) => {
        item.id = res.data
      })
    },
  },
})
