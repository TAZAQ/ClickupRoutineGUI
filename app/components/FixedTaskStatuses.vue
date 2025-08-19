<template>
  <USelect 
    v-model="selectedStatus"
    :items="statuses"
    label-key="status"
    value-key="status"
    placeholder="Выберите статус"
  >
    <template #item-leading="{ item }: { item: ITaskStatus }">
      <div class="rounded" :style="`background-color: ${item.color}; width: 12px; height: 12px;`" />
    </template>

    <template #leading>
      <div class="rounded" :style="`background-color: ${currentStatus?.color}; width: 12px; height: 12px;`" />
    </template>
  </USelect>
</template>

<script setup lang="ts">
import type { ITaskStatus } from "~/composables/apiClient/types/Task/ITaskStatus";
import { useTaskStatuses } from "~/composables/useTaskStatuses";

const selectedStatus = defineModel<string>()

const { taskStatuses: statuses } = useTaskStatuses()

const currentStatus = computed(() => statuses.find((status) => status.status === selectedStatus.value))
</script>
