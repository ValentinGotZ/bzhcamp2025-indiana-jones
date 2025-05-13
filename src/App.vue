<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="page-background">
    <header>
      <RouterLink to="/player-info">Jouer</RouterLink>
      <RouterLink to="/">Leaderboard</RouterLink>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.page-background {
  background-image: url('./assets/background.png');
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

main {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
