<script setup lang="ts">
import api from '@/api/client'
import RegisterForm from '@/components/RegisterForm.vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <h1>Welcome to Hubteki!</h1>
  <RegisterForm v-if="!auth.isAuthenticated"></RegisterForm>
  <button v-else>Create Room</button>
</template>
