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

const {
  tasksIds,
  tasksLoading,
  fetchTasks,
} = useTasksStore()

const {
  fetchSpace,
  spaceTree,
  spaceTreeSelected,
  selectNode,
  listIds,
} = useSpaceTree()

onMounted(() => {
  fetchSpace()
})

function onFetchTasks () {
  fetchTasks(listIds.value as string[])
}
</script>
