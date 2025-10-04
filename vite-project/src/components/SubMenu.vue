<script setup lang="ts">
import type { MenuItem } from "@/types/menu";
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";

const props = defineProps<{
  item: MenuItem;
  collapsed?: boolean;
}>();

const route = useRoute();
const open = ref(false);

const isActive = computed(() => {
  const p = props.item;
  if (p.to) return route.path === p.to;
  if (p.subPage?.length) return p.subPage.some((s) => route.path.startsWith(s.to));
  return false;
});

onMounted(() => {
  if (isActive.value) open.value = true;
});
</script>

<template>
  <div class="group relative" :class="[{ 'bg-gray-50': isActive }]">
    <!-- Direct route (no subpages) -->
    <RouterLink
      v-if="item.to && !item.subPage?.length"
      :to="item.to"
      class="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-gray-50 transition-colors"
      :class="[{ 'font-medium text-[#1f6fb6]': isActive }]"
    >
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        class="w-5 h-5 text-gray-500 group-hover:text-[#1f6fb6]"
      />
      <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
    </RouterLink>

    <!-- With submenu -->
    <button
      v-else
      type="button"
      class="flex w-full items-center gap-3 rounded-md px-4 py-3 hover:bg-gray-50 transition-colors"
      @click="open = !open"
    >
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        class="w-5 h-5 text-gray-500 group-hover:text-[#1f6fb6]"
      />
      <span v-if="!collapsed" class="flex-1 text-left">{{ item.label }}</span>
      <span v-if="!collapsed" class="text-gray-500">▸</span>
    </button>

    <!-- Inline submenu (expanded) -->
    <div
      v-if="!collapsed && item.subPage?.length"
      class="overflow-hidden transition-all"
      :style="{ maxHeight: open ? `${item.subPage.length * 48 + 8}px` : '0px' }"
    >
      <ul class="pl-12 pr-3 py-2 space-y-3">
        <li v-for="s in item.subPage" :key="s.name">
          <RouterLink
            :to="s.to"
            class="flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-50 transition-colors"
            :class="[{ 'text-[#1f6fb6] font-medium': route.path === s.to }]"
          >
            <Icon
              v-if="s.icon"
              :icon="s.icon"
              class="w-4 h-4 text-gray-500 group-hover:text-[#1f6fb6]"
            />
            {{ s.label }}
          </RouterLink>
        </li>
      </ul>
      <div class="mx-5 border-b" />
    </div>

    <!-- Fly-out submenu (collapsed) -->
    <div
      v-if="collapsed && item.subPage?.length"
      class="absolute left-full top-0 ml-2 hidden min-w-[220px] rounded-lg border bg-white p-2 shadow-lg group-hover:block"
    >
      <div class="px-3 py-2 font-semibold text-gray-700">{{ item.label }}</div>
      <ul class="space-y-1">
        <li v-for="s in item.subPage" :key="s.name">
          <RouterLink
            :to="s.to"
            class="block rounded px-2 py-2 hover:bg-gray-50"
            :class="[{ 'text-[#1f6fb6] font-medium': route.path === s.to }]"
          >
            {{ s.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>
