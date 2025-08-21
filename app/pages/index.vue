<template>
  <div class="flex grow gap-4">
    <UTree
      :model-value="spaceTreeSelected"
      class="max-w-3/12 w-3/12"
      :items="spaceTree"
      label-key="name"
      value-key="id"
      multiple
      @update:model-value="selectNode"
    />

    <div class="flex flex-col grow gap-1">
      <div class="flex gap-1 items-center">
        <FixedTaskStatuses v-model="filters.status" class="grow"/>
        <UButton :loading="tasksLoading" :disabled="tasksLoading || !listIds.length" @click="onFetchTasks">
          Получить задачи
        </UButton>
      </div>

      <TasksList/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTasksStore } from "~/composables/useTasksStore";
import { useSpaceTree } from "~/composables/spaceTree/useSpaceTree";

const {
  fetchSpace,
  spaceTree,
  spaceTreeSelected,
  selectNode,
  listIds,
} = useSpaceTree()

const {
  tasksLoading,
  fetchTasks,
  filters,
} = useTasksStore()

onMounted(() => {
  fetchSpace()
})

function onFetchTasks () {
  fetchTasks(listIds.value as string[])
}
</script>
