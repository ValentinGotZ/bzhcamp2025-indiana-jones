<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = defineProps<{
  value: number,
  size: number
}>()
const emit = defineEmits(['ended'])
const value = ref<number>(props.value)
const size = ref<number>(props.size ?? 40)
const src = computed(() => {
  return `/src/assets/countdown/${value.value}.png`
})

onMounted(() => {
  const interval = setInterval(() => {
    value.value = value.value - 1

    if (value.value === 0) {
      clearInterval(interval)

      emit('ended')
    }
  }, 1000)
})
</script>

<template>
  <div class="countdown">
    <img :src="src" :style="{height: size + 'vh'}" />
  </div>
</template>

<style scoped>
.countdown {
  display: flex;
  justify-content: center;
  padding-top: 5vh;

}
</style>
