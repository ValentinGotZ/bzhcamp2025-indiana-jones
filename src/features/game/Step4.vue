<script setup lang="ts">
import { SerialService } from '@/services/serial.service.ts'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['stepEnded'])

const serialService = SerialService.getInstance()
const router = useRouter()

const score = ref<number>(0)
const video = ref<HTMLVideoElement>()

onMounted(async () => {
  score.value = serialService.balanceWeight.value * 1000
  console.log('step4:score', score.value)

  video.value!.addEventListener('ended', () => {
    console.log('step4:video-ended, go to leaderboard')

    router.push('/')
  })
})
</script>

<template>
  <div class="container">
    <h1>Bravo !</h1>
    <h2>
      Votre score est de <strong>{{ score }}</strong>
    </h2>

    <p>VIDEO</p>
  </div>
</template>

<style scoped>
.container {
}
</style>
