<script setup lang="ts">
import { usePlayer } from '@/stores/usePlayer.ts'
import { onBeforeMount } from 'vue'

const playerStore = usePlayer()

onBeforeMount(async () => {
  console.log(await playerStore.getAllPlayers())
})
</script>

<template>
  <div class="page--content">
    <img class="title__img" src="../assets/title-leaderboard.png" />

    <ol class="leaderboard">
      <li>
        <div class="position">1</div>
        <div class="name-score">
          <span>Valentin GOT</span>
          <span>54 000</span>
        </div>
      </li>
      <li>
        <div class="position">2</div>
        <div class="name-score">
          <span>Valentin GOT</span>
          <span>54 000</span>
        </div>
      </li>
      <li>
        <div class="position">3</div>
        <div class="name-score">
          <span>Valentin GOT</span>
          <span>54 000</span>
        </div>
      </li>
      <li>
        <div class="position">4</div>
        <div class="name-score">
          <span>Valentin GOT</span>
          <span>54 000</span>
        </div>
      </li>
      <li>
        <div class="position">5</div>
        <div class="name-score">
          <span>Valentin GOT</span>
          <span>54 000</span>
        </div>
      </li>
    </ol>
  </div>
</template>

<style scoped>
.leaderboard {
  align-self: center;
  width: 40vw;
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    flex: 1;
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
  }
}
</style>
