<template>
  <div class="flex flex-col">
    <UTextarea v-model="lists"/>
    <UButton :loading="loading" :disabled="loading" @click="onFetchTasks">Получить задачи</UButton>

    <TaskIdsField :task-ids="taskIds"/>

    <div class="flex gap-1 grow">
      <FixedTaskStatuses v-model="fromStatus" class="grow"/>
      <FixedTaskStatuses v-model="toStatus" class="grow"/>
      <UButton
        v-for="step in defaultSteps"
        :key="step.name"
        class="hover:opacity-85 cursor-pointer"
        :style="`background-color: ${step.color};`"
        @click="onSetStatuses(step)"
      >{{ step.name }}</UButton>
    </div>

    <span>{{ listIds }}</span>
    <span>{{ tasks.length }}</span>
  </div>
</template>

<script setup lang="ts">
import { useClickUp } from "~/composables/apiClient/useClickUp";
import type { ITask } from "~/composables/apiClient/types/Task/ITask";
import FixedTaskStatuses from "~/components/FixedTaskStatuses.vue";
import TaskIdsField from "~/components/TaskIdsField.vue";
import { type ITaskStatusStep, useTaskStatuses } from "~/composables/useTaskStatuses";

const lists = ref<string>('')

const tasks = ref<ITask[]>([])
const fromStatus = ref<string>('approved')
const toStatus = ref<string>('stage')
const { loading, getTasks } = useClickUp()

const { defaultSteps, setTaskStatusesSteps } = useTaskStatuses()

const listIds = computed(() =>
  lists.value
    .split('\n')
    .map((line) => line.match(/\/(?:li\/|l\/6-)(\d+)/)?.[1])
    .filter(Boolean)
)

const taskIds = computed(() =>
  tasks.value.map((task) => task.id).join('|')
)

function onFetchTasks() {
  listIds.value.forEach(async (listId) => {
    const response = await getTasks(listId as string)
    tasks.value.push(...response.data.tasks)
  })
}

function onSetStatuses (step: ITaskStatusStep) {
  setTaskStatusesSteps(fromStatus, toStatus, step)
}
</script>
