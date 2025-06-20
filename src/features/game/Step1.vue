<script setup lang="ts">
import Countdown from '@/features/game/Countdown.vue'

const emit = defineEmits(['stepEnded'])

function handleCountdownEnded() {
  console.log('step1:countdown-ended')

  emit('stepEnded')
}
</script>

<template>
  <div class="container">
    <Countdown :value="3" @ended="handleCountdownEnded()" />
  </div>
</template>

<style scoped>
.container {
  margin-top: 20vh;
}
</style>
