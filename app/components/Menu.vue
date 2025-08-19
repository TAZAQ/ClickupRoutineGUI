<template>
  <UNavigationMenu :items="items"/>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/components/NavigationMenu.vue";

const items = ref<NavigationMenuItem[]>([
  {
    label: 'index',
    icon: 'i-lucide-book-open',
    to: '/',
  },
])
</script>
