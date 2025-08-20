<template>
  <div class="flex gap-1">
    <UInput
      class="grow"
      :value="taskIdsText"
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
const { taskIds } = defineProps<{ taskIds: string[] }>()
const toast = useToast()

const taskIdsText = computed(() => taskIds.join('|'))

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(taskIdsText.value)
    toast.add({ title: 'Скопировано', duration: 1000 })
  } catch (err) {
    console.error('Ошибка копирования в буфер обмена:', err)
  }
}
</script>
