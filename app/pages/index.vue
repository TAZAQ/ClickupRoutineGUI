<template>
  <div class="flex flex-col gap-1">
    <UTextarea v-model="lists" placeholder="Новый list с новой строки">
      <template #trailing>
        <span>{{ listIds }}</span>
        <span>{{ tasks.length }}</span>
      </template>
    </UTextarea>

    <div class="flex gap-1">
      <UButton :loading="tasksLoading" :disabled="tasksLoading" @click="onFetchTasks">Получить задачи</UButton>
    </div>

    <TaskIdsField :task-ids="tasksIds"/>

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
  </div>
</template>

<script setup lang="ts">
import FixedTaskStatuses from "~/components/FixedTaskStatuses.vue";
import TaskIdsField from "~/components/TaskIdsField.vue";
import { type ITaskStatusStep, useTaskStatuses } from "~/composables/useTaskStatuses";
import { useTasksStore } from "~/composables/useTasksStore";
import { useSpace } from "~/composables/useSpace";

const lists = ref<string>('')
const fromStatus = ref<string>('approved')
const toStatus = ref<string>('stage')
const { tasks, tasksIds, tasksLoading, fetchTasks } = useTasksStore()

const { defaultSteps, setTaskStatusesSteps } = useTaskStatuses()

const listIds = computed(() =>
  lists.value
    .split('\n')
    .map((line) => line.match(/\/(?:li\/|l\/6-)(\d+)/)?.[1])
    .filter(Boolean)
)

const { fetchSpace } = useSpace()

onMounted(() => {
  fetchSpace()
})

function onFetchTasks () {
  fetchTasks(listIds.value as string[])
}

function onSetStatuses (step: ITaskStatusStep) {
  setTaskStatusesSteps(fromStatus, toStatus, step)
}
</script>
