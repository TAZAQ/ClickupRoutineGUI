<template>
  <div class="rounded" :style="`background-color: ${color}; width: 12px; height: 12px;`" />
</template>

<script setup lang="ts">
const { color } = defineProps<{ color: string }>()
</script>
