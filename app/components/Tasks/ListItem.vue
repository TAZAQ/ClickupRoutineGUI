<template>
  <div class="flex gap-2 grow" style="align-items: center;">
    <div class="list-col__status min-w-3.5">
      <UTooltip :text="task.status.status" :content="{ side: 'top' }">
        <RoundedSquare :color="task.status.color" />
      </UTooltip>
    </div>
    <div class="list-col__id min-w-24">{{ task.id }}</div>
    <div class="list-col__name grow">{{ task.name }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ITask } from "~/composables/apiClient/types/Task/ITask";
import RoundedSquare from "~/components/shared/RoundedSquare.vue";

const { task } = defineProps<{ task: ITask }>()

</script>
