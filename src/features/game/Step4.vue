<script setup lang="ts">
import { SerialService } from '@/services/serial.service.ts'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const emit = defineEmits(['stepEnded'])

const serialService = SerialService.getInstance()

const video = ref<HTMLVideoElement>()

onMounted(async () => {
  let weight: number = 1000;
  setTimeout(() => weight = serialService.balanceWeight.value, 1000);

  video.value!.addEventListener('ended', () => {
    console.log('step4:video-ended, go to leaderboard')
    emit('stepEnded', weight)
  })
})
</script>

<template>
  <div class="video-container">
    <video autoplay muted class="video" ref="video">
      <source src="../../assets/step2.mp4" type="video/mp4" />
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
