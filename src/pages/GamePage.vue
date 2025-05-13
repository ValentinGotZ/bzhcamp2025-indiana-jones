<script setup lang="ts">
import { SerialService } from '@/services/serial.service.ts'
import { usePlayer } from '@/stores/usePlayer.ts'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const playerStore = usePlayer()
const route = useRoute()

const playerId = parseInt(route.params.playerId as string, 10)
const serialConnected = ref<boolean>(!!SerialService.serial?.connected)
const error = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    const player = await playerStore.getPlayerById(playerId)

    if (!player || !!player.score) {
      error.value = true
      return
    }

    console.log(player)
  } catch (err) {
    console.error(err)

    error.value = true
  }
})

async function handleConnect() {
  try {
    await SerialService.connect()
    serialConnected.value = !!SerialService.serial?.connected
  } catch (err) {
    console.error(err)
  }
}
</script>

<template>
  <div class="page--content">
    <div class="alert alert-danger" v-if="!serialConnected">
      Balance non connectée

      <button @click="handleConnect">Connecter</button>
    </div>
    <div class="alert alert-danger" v-if="error">
      Une erreur est survenue, impossible de démarrer la partie
    </div>

    <section v-if="serialConnected && !error">
      <h1>GAME</h1>
    </section>
  </div>
</template>

<style scoped>
.alert:first-child {
  margin-top: 30px;
}
</style>
