<script setup lang="ts">
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
  <div class="video-container" @click="emit('stepEnded')">
    <video autoplay muted class="video" ref="video">
      <source src="../../assets/step1.mp4" type="video/mp4" />
    </video>
  </div>
</template>

<style scoped>
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
    max-width: 80%;
  }
}
</style>
