<template>
  <div class="flex flex-col grow gap-1">
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
</template>

<script setup lang="ts">
import FixedTaskStatuses from "~/components/FixedTaskStatuses.vue";
import { type ITaskStatusStep, useTaskStatuses } from "~/composables/useTaskStatuses";

const fromStatus = ref<string>('approved')
const toStatus = ref<string>('stage')
const { defaultSteps, setTaskStatusesSteps } = useTaskStatuses()

function onSetStatuses (step: ITaskStatusStep) {
  setTaskStatusesSteps(fromStatus, toStatus, step)
}
</script>
