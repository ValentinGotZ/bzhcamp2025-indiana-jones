<script setup lang="ts">
import type { Player } from '@/domains/player.domain.ts'
import { usePlayer } from '@/stores/usePlayer.ts'
import Fireworks, { type FireworksOptions } from '@fireworks-js/vue'
import { nextTick, onBeforeMount, onMounted, onUpdated, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const playerStore = usePlayer()

const options = ref<FireworksOptions>({ opacity: 0.5 })
const showFirework = ref<boolean>(true)

const players = ref<Player[]>([])
const playerId = parseInt(route.params.playerId as string, 10)
let scrolled = false;
onUpdated(async () => {
  if (scrolled) return
  if (isNaN(playerId)) {
    console.error('Invalid playerId:', playerId)
    return
  }
  const scrollContainer = document.getElementById(`leaderboard`)
  const playerElement = document.getElementById(`player-${playerId}`)
  if (scrollContainer && playerElement) {
    scrollContainer.scrollTo({
      top: playerElement.offsetTop - scrollContainer.offsetTop,
      behavior: 'smooth',
    })
  }
  scrolled = true

})

onBeforeMount(async () => {
  players.value = await playerStore.getAllPlayers()
  console.log(players.value)
})
</script>

<template>
  <div class="page--content">
    <img class="title__img" src="../assets/title-leaderboard.png" alt="Leaderboard" />

    <ol class="leaderboard" id="leaderboard">
      <li v-for="(player, index) in players"
          :key="player.id"
          :id="'player-' + player.id"
          :class="{highlight: player.id === playerId}">

        <div class="position">{{ index + 1 }}</div>
        <div class="name-score">
          <span>{{ player.firstname }} {{ player.lastname }}</span>
          <span>{{ player.score }}</span>
        </div>

      </li>
    </ol>
  </div>
  <Fireworks
    v-if="showFirework"
    @click="showFirework = false"
    :autostart="true"
    :options="options"
    :style="{
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      position: 'fixed',
      background: 'transparent'
    }"
  />
</template>

<style scoped>
.leaderboard {
  position: relative;
  align-self: center;
  width: 40vw;
  height: 60vh;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;
  overflow: hidden;
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }

  li {
    display: flex;
    align-items: center;
    margin-bottom: 12px;

    .position {
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 12px;
      border: 4px solid #7f410a;
      background-color: var(--color-text);
      color: var(--color-primary);
      border-radius: 50px;
      font-size: var(--font-size-24);
      font-weight: bold;
    }

    .name-score {
      flex: 1;
      display: flex;
      justify-content: space-between;
      font-weight: 600;
      font-size: var(--font-size-26);
      padding: 8px 0;
      border-bottom: 2px solid var(--color-accent);
    }

    &.highlight {
      color: var(--color-highlight);
    }
  }
}
</style>
