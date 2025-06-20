<script setup lang="ts">
import Countdown from '@/features/game/Countdown.vue'
import { SerialService } from '@/services/serial.service.ts'
import { onMounted, onUnmounted, ref, watch, type WatchHandle } from 'vue'

const serialService = SerialService.getInstance()

const emit = defineEmits(['stepEnded'])

const balance = ref<number>(0)
let stabilizationCounter = 1
let idoleRemoved = false
let watchRef: WatchHandle

onMounted(async () => {
  waitIdoleRemove()
})

onUnmounted(() => {
  watchRef()
})

async function handleCountdownEnded() {
  console.log('step3:countdown-ended', serialService.balanceWeight.value)

  emit('stepEnded')
}

function waitIdoleRemove() {
  watchRef = watch(serialService.balanceWeight, (newVal) => {
    console.log(idoleRemoved, newVal)
    if (Math.abs(newVal) < 50 && !idoleRemoved) {
      console.log('step3:statuette présente')
    } else if (stabilizationCounter > 0) {
      idoleRemoved = true
      console.log('step3:statuette retirée - stabilisation en cours', stabilizationCounter, '...')
      stabilizationCounter--
    } else if (balance.value === 0) {
      console.log('step3:valeur ', newVal)
      balance.value = newVal
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="step1" v-if="balance === 0">
      <h1>Retirez l'idole</h1>
      <h2>Attendez le décompte pour poser la bourse</h2>
    </div>

    <div class="step2" v-if="balance !== 0">
      <h1>Posez votre bourse</h1>
      <Countdown :value="10" @ended="handleCountdownEnded" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 60px;
  text-align: center;
  margin: 0;
}

h2 {
  font-size: 25px;
  text-align: center;
  margin: 0;
}

.step1 {
  margin-top: 40vh;
}

.step2 {
  margin-top: 20vh;
}
</style>
