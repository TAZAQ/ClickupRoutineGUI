<template>
  <div class="flex gap-1">
    <UInput
      class="grow"
      :value="taskIds"
      readonly
      placeholder="Task IDs будут отображены здесь..."
    />
    <UButton
      variant="ghost"
      size="xs"
      icon="i-heroicons-clipboard-document"
      @click="copyToClipboard"
    >
      Копировать
    </UButton>
  </div>
</template>

<script setup lang="ts">
const { taskIds } = defineProps<{ taskIds: string }>()

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(taskIds)
  } catch (err) {
    console.error('Ошибка копирования в буфер обмена:', err)
  }
}
</script>
