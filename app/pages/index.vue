<template>
  <div class="flex flex-col">
    <UTextarea v-model="lists"/>
    <UButton @click="onFetchTasks">Получить задачи</UButton>
    <span>{{ listIds }}</span>
    <span>{{ tasks.length }}</span>
  </div>
</template>

<script setup lang="ts">
import { useClickUp } from "~/composables/apiClient/useClickUp";
import type { ITask } from "~/composables/apiClient/types/Task/ITask";

const lists = ref<string>('')

const tasks = ref<ITask[]>([])
const api = useClickUp()

const listIds = computed(() =>
  lists.value
    .split('\n')
    .map((line) => line.match(/\/(?:li\/|l\/6-)(\d+)/)?.[1])
    .filter(Boolean)
)

function onFetchTasks() {
  listIds.value.forEach(async (listId) => {
    const response = await api.getTasks(listId as string)
    tasks.value.push(...response.data.tasks)
  })
}
</script>
