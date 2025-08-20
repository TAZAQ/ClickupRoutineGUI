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
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskIdsField from "~/components/TaskIdsField.vue";
import { useTasksStore } from "~/composables/useTasksStore";
import { useSpaceTree } from "~/composables/spaceTree/useSpaceTree";
import type { ISpaceTreeNode } from "~/composables/spaceTree/types/ISpaceTreeNode";

const lists = ref<string>('')
const { tasks, tasksIds, tasksLoading, fetchTasks } = useTasksStore()

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


</script>
