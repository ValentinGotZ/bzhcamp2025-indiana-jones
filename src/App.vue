<script setup lang="ts">
import { SerialService } from '@/services/serial.service.ts'
import { RouterLink, RouterView } from 'vue-router'

const serialService = SerialService.getInstance()

async function handleConnect() {
  try {
    await serialService.connect()
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="page-background">
    <header>
      <RouterLink to="/player-info" class="button button-sm">Jouer</RouterLink>
      <RouterLink to="/" class="button button-sm">Leaderboard</RouterLink>
      <button @click="handleConnect" class="button-sm">Connect</button>
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

header {
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 1000;

  .button {
    margin-right: 5px;
  }
}
</style>
