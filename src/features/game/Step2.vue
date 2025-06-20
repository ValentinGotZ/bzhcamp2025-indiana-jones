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
    emit('stepEnded')
    console.log('step2:video-ended')
  })
})
</script>

<template>
  <Countdown :value="31" :size="10" />
  <div class="video-container" @click="emit('stepEnded')">
    <video autoplay muted class="video" ref="video">
      <source src="../../assets/step1.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
}
.countdown {
  position: absolute;
  z-index: 1000;
  left: 20%;

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
    max-width: 60%;
  }
}
</style>
