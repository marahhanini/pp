<script setup lang="ts">
import type { MenuItem } from "@/types/menu";
import { Icon } from "@iconify/vue";
import { computed, onMounted, ref } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useAuth } from "../stores/auth";

const auth = useAuth();

const props = defineProps<{
  item: MenuItem;
  collapsed?: boolean;
}>();

// Let parent (Navigator) decide whether to close the drawer.
// We only emit a neutral "navigate" on clicks.
const emit = defineEmits<{
  (e: "navigate"): void;
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
  <div class="group relative bg-white" :class="[{ 'text-[#1f6fb6] font-medium': isActive }]">
    <!-- Direct route (no subpages) -->
    <RouterLink
      v-if="item.to && !item.subPage?.length"
      :to="item.to"
      class="flex items-center gap-3 rounded-md px-4 py-3 hover:bg-gray-100 transition-colors"
      :class="[{ 'font-medium text-[#1f6fb6]': isActive }]"
      @click="emit('navigate')"
    >
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        class="w-5 h-5 text-gray-500 group-hover:text-[#1f6fb6]"
      />
      <span v-if="!collapsed" class="flex-1">{{ item.label }}</span>
    </RouterLink>

    <!-- With submenu (has subPage) -->
    <button
      v-else
      type="button"
      class="flex w-full items-center gap-3 rounded-md px-4 py-3 bg-white hover:bg-gray-100 transition-colors appearance-none border-0 shadow-none focus:outline-none focus:ring-0"
      @click="open = !open"
    >
      <Icon
        v-if="item.icon"
        :icon="item.icon"
        class="w-5 h-5 text-gray-500 group-hover:text-[#1f6fb6]"
      />
      <span v-if="!collapsed" class="flex-1 text-left">{{ item.label }}</span>
      <span v-if="!collapsed" class="text-gray-500" :class="{ 'rotate-90': open }">▸</span>
    </button>

    <!-- Inline submenu (expanded sidebar) -->
    <div
      v-if="!collapsed && item.subPage?.length"
      class="overflow-hidden transition-all"
      :style="{ maxHeight: open ? `${item.subPage.length * 48 + 8}px` : '0px' }"
    >
      <ul class="pl-12 pr-3 py-2 space-y-3">
        <li v-for="s in item.subPage" :key="s.name">
          <!-- Logout special-case -->
          <button
            v-if="s.to === '/logout'"
            @click="auth.logout()"
            class="block w-full text-left rounded px-3 py-2 hover:bg-gray-100 text-[#1f6fb6]"
          >
            {{ s.label }}
          </button>

          <!-- Normal submenu links -->
          <RouterLink
            v-else
            :to="s.to"
            class="flex items-center gap-2 rounded px-2 py-2 hover:bg-gray-100 transition-colors"
            :class="[{ 'text-[#1f6fb6] font-medium': route.path === s.to }]"
            @click="emit('navigate')"
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
    </div>

    <!-- Fly-out submenu (collapsed sidebar) -->
    <div
      v-if="collapsed && item.subPage?.length"
      class="absolute left-full top-0 ml-2 hidden min-w-[220px] rounded-lg border bg-white p-2 shadow-lg group-hover:block"
    >
      <div class="px-3 py-2 font-semibold text-gray-700">{{ item.label }}</div>
      <ul class="space-y-1">
        <li v-for="s in item.subPage" :key="s.name">
          <!-- Logout -->
          <button
            v-if="s.to === '/logout'"
            @click="auth.logout()"
            class="block w-full text-left rounded px-3 py-2 hover:bg-gray-100 text-[#1f6fb6]"
          >
            {{ s.label }}
          </button>

          <!-- Links -->
          <RouterLink
            v-else
            :to="s.to"
            class="block rounded px-2 py-2 hover:bg-gray-100"
            :class="[{ 'text-[#1f6fb6] font-medium': route.path === s.to }]"
            @click="emit('navigate')"
          >
            {{ s.label }}
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
/* small rotation for caret when open */
.rotate-90 {
  transform: rotate(90deg);
}
</style>
