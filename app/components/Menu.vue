<template>
  <UNavigationMenu :items="items"/>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "#ui/components/NavigationMenu.vue";

const items = ref<NavigationMenuItem[]>([
  {
    label: 'Получалка',
    icon: 'i-lucide-list-check',
    to: '/',
  },
  {
    label: 'Переноска',
    icon: 'i-lucide-arrow-big-right',
    to: '/tasks-move',
  },
  {
    label: 'Пиздаболка',
    icon: 'i-lucide-message-circle-more',
    to: '/tasks-comments',
  },
])
</script>
