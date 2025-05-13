<script setup lang="ts">
import type { Player } from '@/domains/player.domain.ts'
import { SerialService } from '@/services/serial.service.ts'
import { usePlayer } from '@/stores/usePlayer.ts'
import { onBeforeMount, ref } from 'vue'
import { useRoute } from 'vue-router'

const playerStore = usePlayer()
const route = useRoute()
const serialService = SerialService.getInstance()

const playerId = parseInt(route.params.playerId as string, 10)
const serialConnected = ref<boolean>(!!serialService.serial?.connected)
const player = ref<Player | null>(null)
const weight = ref<number>(0)
const error = ref<boolean>(false)

onBeforeMount(async () => {
  try {
    player.value = await playerStore.getPlayerById(playerId)

    if (!player.value) {
      error.value = true
      console.error('Player not found', player)
      return
    }
    if (!!player.value.score) {
      error.value = true
      console.error('Player already has a score', player.value.score)
      return
    }

    await readWeight()
  } catch (err) {
    console.error(err)

    error.value = true
  }
})

async function handleConnect() {
  try {
    await serialService.connect()
    serialConnected.value = !!serialService.serial?.connected

    await readWeight()
  } catch (err) {
    console.error(err)
  }
}

async function readWeight() {
  if (serialService.serial?.connected) {
    console.log(player.value)

    await serialService.read((val) => {
      weight.value = val
    })
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

      <p>{{ weight }}g</p>
    </section>
  </div>
</template>

<style scoped></style>
