<template>
  <div class="flex flex-col grow">
    <div v-for="statusKey in statusKeys" :key="statusKey" class="mb-5">
      <div class="text-lg font-bold uppercase">{{ statusKey.slice(2) }}</div>
      <TasksListItem v-for="task in tasksGroupedByStatus[statusKey]" :key="task.id" :task="task"/>
    </div>
  </div>
</template>

<script setup lang="ts">

import { StringHelpers } from "~/utils/StringHelpers";

const { tasks } = useTasksStore()
const tasksGroupedByStatus =
  computed(() => Object.groupBy(
    tasks.value,
    (task) => `${StringHelpers.padLeft(task.status.orderindex.toString(), '0', 2)}${task.status.status}`
  ))

const statusKeys =
  computed(() => Object.keys(tasksGroupedByStatus.value).sort().reverse())

</script>


