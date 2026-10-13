<script setup lang="ts"></script>

<template>
  <nav>
    <RouterLink class="nav-link" to="/">Home</RouterLink>
    <RouterLink class="nav-link" to="/profile">Profile</RouterLink>
    <RouterLink class="nav-link" to="/game">Game</RouterLink>
  </nav>
  <RouterView></RouterView>
</template>

<style>
nav {
  display: flex;
  width: 100%;
  border: 1px solid purple;
}

.nav-link {
  border: 1px solid green;
}

body {
  height: 98vh;
}
</style>
