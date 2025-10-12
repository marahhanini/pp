<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

// ✅ Props definition
const props = defineProps<{
  labels: string[];
  data: { value: any }[][];
  sticky_column?: boolean;
  sortColumn?: number | null;
  sortDirection?: "asc" | "desc";
}>();

// ✅ Emits definition
const emit = defineEmits<{
  (e: "toggleColumn", colIndex: number): void;
  (e: "rowSelect", rowIndex: number): void;
  (e: "cellClick", payload: { row: number; col: number }): void;
  (e: "sort", colIndex: number): void;
}>();

// ✅ Local state
const hiddenCols = ref<number[]>([]);

const toggleColumn = (colIndex: number) => {
  const idx = hiddenCols.value.indexOf(colIndex);
  if (idx > -1) hiddenCols.value.splice(idx, 1);
  else hiddenCols.value.push(colIndex);
  emit("toggleColumn", colIndex);
};

const handleRowSelect = (rowIndex: number) => emit("rowSelect", rowIndex);
const handleCellClick = (row: number, col: number) => emit("cellClick", { row, col });
</script>

<template>
  <div class="overflow-x-auto overflow-y-auto border rounded-lg bg-white shadow-sm max-h-[600px]">
    <table class="min-w-full text-sm border-collapse">
      <thead class="bg-gray-100 sticky top-0 z-10">
        <tr>
          <th class="px-4 py-3 font-semibold text-[#1f6fb6] text-left border-b border-gray-200">
            #
          </th>

          <th
            v-for="(label, colIndex) in props.labels"
            :key="colIndex"
            v-show="!hiddenCols.includes(colIndex)"
            class="px-4 py-3 font-semibold text-[#1f6fb6] text-left border-b border-gray-200 whitespace-nowrap select-none"
            :class="{
              'sticky left-0 bg-gray-100 z-20 shadow-md': props.sticky_column && colIndex === 0,
            }"
          >
            <div class="flex items-center gap-2 cursor-pointer" @click="emit('sort', colIndex)">
              <span>{{ label }}</span>

              <!-- Sorting icons -->
              <div class="flex flex-col text-gray-400 text-[10px] leading-none">
                <Icon
                  icon="mdi:arrow-up"
                  :class="[
                    'hover:text-[#1f6fb6]',
                    props.sortColumn === colIndex && props.sortDirection === 'asc'
                      ? 'text-[#1f6fb6]'
                      : '',
                  ]"
                />
                <Icon
                  icon="mdi:arrow-down"
                  :class="[
                    'hover:text-[#1f6fb6]',
                    props.sortColumn === colIndex && props.sortDirection === 'desc'
                      ? 'text-[#1f6fb6]'
                      : '',
                  ]"
                />
              </div>

              <!-- 👁️ Column visibility -->
              <button
                class="ml-2 text-gray-400 hover:text-[#1f6fb6]"
                @click.stop="toggleColumn(colIndex)"
                title="Hide column"
              >
                <Icon icon="mdi:eye-outline" class="w-4 h-4" />
              </button>
            </div>
          </th>
        </tr>
      </thead>

      <!-- ✅ Table Body -->
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.data"
          :key="rowIndex"
          :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          class="hover:bg-[#f1f7fd] transition"
        >
          <td class="px-4 py-2 border-b border-gray-100">
            <input
              type="checkbox"
              @click.stop="handleRowSelect(rowIndex)"
              class="accent-[#1f6fb6] cursor-pointer"
            />
          </td>

          <td
            v-for="(cell, colIndex) in row"
            :key="colIndex"
            v-show="!hiddenCols.includes(colIndex)"
            class="whitespace-nowrap px-4 py-2 border-b border-gray-100 text-gray-700"
            @click="handleCellClick(rowIndex, colIndex)"
          >
            {{ cell.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>
