<script setup lang="ts">
import type User from '@/models/user'
import { useChatStore, type MessageData } from '@/stores/chat'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'

const chat = useChatStore()
const { rooms } = storeToRefs(chat)

const history = computed(() => rooms.value.get(props.target))
const currentMessage = ref('');

const props = defineProps<{
  target: string
  user?: User
}>()

function newMessage() {
    console.log('attempting to send message: ', currentMessage.value);
    // FIXME - Make sure this is auth guarded
  chat.sendChat(props.target, props?.user?.email ?? '', currentMessage.value)
  currentMessage.value = '';
}
</script>

<template>
  <div class="chat-box">
    <p>You are chatting with: {{ target }}</p>
    <p v-for="msg in history"><span>{{ msg.user }}: </span>{{ msg.message }}</p>
    <form @submit.prevent="newMessage()">
        <input type="text" v-model=currentMessage></input>
        <button type="submit">Send</button>
    </form>
  </div>
</template>
