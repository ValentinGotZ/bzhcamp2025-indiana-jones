<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <RouterLink to="/">Game</RouterLink>
    <RouterLink to="/leaderboard">Leaderboard</RouterLink>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
