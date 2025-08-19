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

const selectedStatus = defineModel<string>()

const statuses = ref<ITaskStatus[]>([
  { status: 'approved', id: '1', color: '#AF7E2E', type: 'custom', orderindex: 0  },
  { status: 'stage', id: '2', color: '#e16b16', type: 'done', orderindex: 1  },
  { status: 'beforeprod', id: '3', color: '#f8ae00', type: 'done', orderindex: 2  },
  { status: 'production', id: '4', color: '#008844', type: 'closed', orderindex: 3  },
])

const currentStatus = computed(() => statuses.value.find((status) => status.status === selectedStatus.value))
</script>
