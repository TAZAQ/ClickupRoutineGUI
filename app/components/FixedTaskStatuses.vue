<template>
  <USelect 
    v-model="selectedStatus"
    :items="statuses"
    label-key="status"
    value-key="status"
    placeholder="Выберите статус"
  >
    <template #item-leading="{ item }: { item: ITaskStatus }">
      <RoundedSquare :color="item.color" />
    </template>

    <template #leading>
      <RoundedSquare :color="currentStatus?.color"/>
    </template>
  </USelect>
</template>

<script setup lang="ts">
import type { ITaskStatus } from "~/composables/apiClient/types/Task/ITaskStatus";
import { useTaskStatuses } from "~/composables/useTaskStatuses";
import RoundedSquare from "~/components/shared/RoundedSquare.vue";

const selectedStatus = defineModel<string>()

const { taskStatuses: statuses } = useTaskStatuses()

const currentStatus = computed(() => statuses.find((status) => status.status === selectedStatus.value))
</script>
