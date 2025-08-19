<template>
  <span>{{ tasks }}</span>
</template>

<script setup lang="ts">
import { useClickUp } from "~/composables/apiClient/useClickUp";
import type { ITask } from "~/composables/apiClient/types/Task/ITask";

const tasks = ref<ITask[]>([])
const api = useClickUp()

onMounted(async () => {
  const response = await api.getTasks('901208117348') || {}
  if (!response?.data?.tasks) { return }

  tasks.value = response.data.tasks
})
</script>
