<template>
  <div class="flex grow gap-4">
    <UTree
      :model-value="spaceTreeSelected"
      class="max-w-3/12 w-3/12"
      :items="spaceTree"
      label-key="name"
      value-key="id"
      multiple
      @update:model-value="onTreeSelect"
    />

    <div class="flex flex-col grow gap-1">
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

      <div class="flex gap-1">
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
  </div>
</template>

<script setup lang="ts">
import FixedTaskStatuses from "~/components/FixedTaskStatuses.vue";
import TaskIdsField from "~/components/TaskIdsField.vue";
import { type ITaskStatusStep, useTaskStatuses } from "~/composables/useTaskStatuses";
import { useTasksStore } from "~/composables/useTasksStore";
import { useSpaceTree } from "~/composables/spaceTree/useSpaceTree";
import type { ISpaceTreeNode } from "~/composables/spaceTree/types/ISpaceTreeNode";

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


const { fetchSpace, spaceTree } = useSpaceTree()
const spaceTreeSelected = ref<ISpaceTreeNode[]>([])

onMounted(() => {
  fetchSpace()
})

function onTreeSelect (selected: ISpaceTreeNode[]) {
  spaceTreeSelected.value = selected.filter((item) => !item.children)
}

function onFetchTasks () {
  fetchTasks(listIds.value as string[])
}

function onSetStatuses (step: ITaskStatusStep) {
  setTaskStatusesSteps(fromStatus, toStatus, step)
}
</script>
