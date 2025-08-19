<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps<{
  error: NuxtError
}>()
</script>

<template>
  <UApp>
    <UCard class="m-8">
      <template #header>
        <h1>Ошибка {{ error.statusCode }}</h1>
      </template>
      <p>{{ error.statusMessage }}</p>
      <template #footer>
        <UButton to="/">На главную</UButton>
      </template>
    </UCard>
  </UApp>
</template>
