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
    <h1>Remplissez votre bourse de riz</h1>
    <h3>Le poids de la bourse doit être au plus proche de celui de l'idole</h3>

    <Countdown :value="7" @ended="handleCountdownEnded()" />
  </div>
</template>

<style scoped>
.container {
  h1 {
    font-size: 60px;
  }

  h3 {
    font-size: 30px;
  }

  h1,
  h3 {
    text-align: center;
  }
}
</style>
