<script setup lang="ts">
import Countdown from '@/features/game/Countdown.vue'
import { SerialService } from '@/services/serial.service.ts'
import { onMounted, ref } from 'vue'

const serialService = SerialService.getInstance()

const video = ref<HTMLVideoElement>()
const emit = defineEmits(['stepEnded'])

onMounted(async () => {
  await serialService.tare().catch(() => console.error(`Impossible de tare l'idole`))

  video.value!.addEventListener('ended', () => {
    // emit('stepEnded')
    console.log('step2:video-ended')
  })
})
</script>

<template>
  <div class="text-container">
    <Countdown class="countdown" :value="31" :size="10" />
    <div>
      <h1>Remplissez votre bourse de riz</h1>
      <h3>Le poids de la bourse doit être au plus proche de celui de l'idole</h3>
    </div>
  </div>

  <div class="video-container">
    <video autoplay muted class="video" ref="video">
      <source src="../../assets/step1.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped>
.text-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
  gap: 40px;
  margin-top: 5vh;

  .countdown {
    grid-row: 1;
    grid-column: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 0;
  }

  > div {
    grid-row: 1;
    grid-column: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;

    h1 {
      margin: 0;
      font-size: 60px;
    }

    h2 {
      margin: 0;
      font-size: 30px;
    }
  }
}

.video-container {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  .video {
    flex: 1;
    max-width: 60%;
  }
}
</style>
