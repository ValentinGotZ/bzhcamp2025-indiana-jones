<script setup lang="ts">
import type { Player } from '@/domains/player.domain.ts'
import Step1 from '@/features/game/Step1.vue'
import Step2 from '@/features/game/Step2.vue'
import Step3 from '@/features/game/Step3.vue'
import Step4 from '@/features/game/Step4.vue'
import Router from '@/router'
import { SerialService } from '@/services/serial.service.ts'
import { usePlayer } from '@/stores/usePlayer.ts'
import { onBeforeMount, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const playerStore = usePlayer()
const route = useRoute()
const router = useRouter()
const serialService = SerialService.getInstance()

const playerId = parseInt(route.params.playerId as string, 10)
const serialConnected = ref<boolean>(!!serialService.serial?.connected)
const player = ref<Player | null>(null)
const error = ref<boolean>(false)
const step = ref<number>(0)

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

    step.value = 1
  } catch (err) {
    console.error(err)

    error.value = true
  }
})

async function handleConnect() {
  try {
    await serialService.connect()
    serialConnected.value = !!serialService.serial?.connected

    // Always read the value and store it in the SerialService
    serialService.read()
  } catch (err) {
    console.error(err)
  }
}

function handleStepEnded() {
  step.value = step.value + 1
}

async function handleScore(weight: number) {
  player.value!.score = Math.round(Math.max(0, 100000 - (weight * 200)))
  await playerStore.updatePlayer({
    ...player.value
  })
  await router.push(`/leaderboard/${player.value!.id}`)
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
      <!--    <section v-if="!error">-->
      <Step1 v-if="step === 1" @step-ended="handleStepEnded" />
      <Step2 v-if="step === 2" @step-ended="handleStepEnded" />
      <Step3 v-if="step === 3" @step-ended="handleStepEnded" />
      <Step4 v-if="step === 4" @step-ended="handleScore" />
    </section>
  </div>
</template>

<style scoped></style>
