<script setup lang="ts">
import { usePlayer } from '@/stores/usePlayer.ts'
import { useRoute } from 'vue-router'

const playerStore = usePlayer()
const route = useRoute()

console.log(route.params.playerId)
</script>

<template>
  <div class="page--content">GAME</div>
</template>

<style scoped></style>
