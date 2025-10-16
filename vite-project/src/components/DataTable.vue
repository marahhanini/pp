<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";

//
// ---------- 🗂️ 1. BASE DATA ----------
//
const props = defineProps<{
  rows: { time: string; label: string; value: number | string }[];
}>();

const labels = ref(["Time", "Label", "Value"]);
const formattedData = computed(() =>
  props.rows.map((r) => [
    { value: r.time, type: "date" },
    { value: r.label, type: "string" },
    { value: r.value, type: "number" },
  ])
);
//
// ---------- ⚙️ 2. STATE ----------
//
const searchTerm = ref("");
const sortColumn = ref<number | null>(null);
const sortDirection = ref<"asc" | "desc" | null>(null);
const itemsPerPage = ref(10);
const currentPage = ref(1);

//
// ---------- 🧠 3. FILTERED & SORTED DATA ----------
//
const filteredData = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) return formattedData.value;
  return formattedData.value.filter((row) =>
    row.some((cell) => String(cell.value).toLowerCase().includes(term))
  );
});

const sortedData = computed(() => {
  if (sortColumn.value === null || sortDirection.value === null) {
    return filteredData.value;
  }
  const col = sortColumn.value;
  const dir = sortDirection.value; // 'asc' | 'desc'

  return [...filteredData.value].sort((a, b) => {
    const valA = a[col]?.value ?? "";
    const valB = b[col]?.value ?? "";

    // normalize numbers (if your number column is a string like "8.67")
    const numA = typeof valA === "number" ? valA : Number(valA);
    const numB = typeof valB === "number" ? valB : Number(valB);
    const bothNumbers = !Number.isNaN(numA) && !Number.isNaN(numB);

    if (bothNumbers) return dir === "asc" ? numA - numB : numB - numA;
    return dir === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
});

const isAscActive = (col: number) =>
  sortColumn.value !== col ? true : sortDirection.value !== "desc";

const isDescActive = (col: number) =>
  sortColumn.value !== col ? true : sortDirection.value !== "asc";
// clicking ↑
function clickAsc(col: number) {
  if (sortColumn.value !== col) {
    sortColumn.value = col;
    sortDirection.value = "asc";
    return;
  }
  // toggle asc -> none, none -> asc
  sortDirection.value = sortDirection.value === "asc" ? null : "asc";
}

// clicking ↓
function clickDesc(col: number) {
  if (sortColumn.value !== col) {
    sortColumn.value = col;
    sortDirection.value = "desc";
    return;
  }
  // toggle desc -> none, none -> desc
  sortDirection.value = sortDirection.value === "desc" ? null : "desc";
}

//
// ---------- 📄 4. PAGINATION ----------
//
const totalItems = computed(() => sortedData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));
const hiddenCols = ref<Set<number>>(new Set());

function toggleCol(col: number) {
  const s = new Set(hiddenCols.value);
  s.has(col) ? s.delete(col) : s.add(col);
  hiddenCols.value = s; // reassign so Vue sees the change
}
const isHidden = (col: number) => hiddenCols.value.has(col);
const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return sortedData.value.slice(start, end);
});

//
// ---------- 📤 5. EXPORT ----------
//
const exportCSV = () => {
  const header = labels.value.join(",");
  const rows = sortedData.value.map((row) => row.map((cell) => `"${cell.value}"`).join(","));
  const csvContent = [header, ...rows].join("\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "data_export.csv";
  a.click();
  URL.revokeObjectURL(url);
};

//
// ---------- 🧭 6. ACTION HANDLERS ----------
//
const handleSort = (colIndex: number) => {
  if (sortColumn.value === colIndex) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortColumn.value = colIndex;
    sortDirection.value = "asc";
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) currentPage.value++;
};
const prevPage = () => {
  if (currentPage.value > 1) currentPage.value--;
};
</script>
<template>
  <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
    <!-- 🔍 Controls Row -->
    <div class="flex flex-wrap justify-between items-center mb-4 gap-4">
      <!-- Show entries -->
      <div class="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <select
          v-model="itemsPerPage"
          class="border border-gray-300 rounded-md px-3 py-1.5 text-gray-700 focus:ring-1 focus:ring-[#1f6fb6] focus:outline-none text-sm"
        >
          <option v-for="n in [5, 10, 20, 50]" :key="n" :value="n">{{ n }}</option>
        </select>
        <span>entries</span>
      </div>

      <!-- Search -->
      <div class="relative">
        <Icon
          icon="mdi:magnify"
          class="absolute left-3 top-2.5 text-gray-400 w-5 h-5 pointer-events-none"
        />
        <input
          v-model="searchTerm"
          type="text"
          placeholder="Type to search"
          class="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 w-64 shadow-sm focus:ring-1 focus:ring-[#1f6fb6] focus:outline-none placeholder-gray-400"
        />
      </div>
    </div>

    <!-- 🧾 Table -->
    <div class="overflow-x-auto border border-gray-200 rounded-lg">
      <!-- 🔧 Column Manager -->
      <div class="flex items-center gap-3 mb-3 text-sm text-gray-600">
        <span class="font-semibold text-[#1f6fb6]">Columns:</span>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="(label, colIndex) in labels"
            :key="'toggle-' + colIndex"
            @click="toggleCol(colIndex)"
            class="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded-md hover:bg-gray-100 transition text-xs"
            :class="isHidden(colIndex) ? 'opacity-50 text-gray-500' : 'text-[#1f6fb6]'"
          >
            <Icon
              :icon="isHidden(colIndex) ? 'mdi:eye-off-outline' : 'mdi:eye-outline'"
              class="w-4 h-4"
            />
            <span>{{ label }}</span>
          </button>

          <!-- Optional: Reset all -->
          <button
            @click="hiddenCols.clear()"
            class="flex items-center gap-1 px-2 py-1 border border-[#1f6fb6] text-[#1f6fb6] rounded-md hover:bg-[#1f6fb610] transition text-xs"
            title="Show all columns"
          >
            <Icon icon="mdi:restore" class="w-4 h-4" />
            <span>Show all</span>
          </button>
        </div>
      </div>

      <table class="min-w-full text-sm border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b border-gray-200 text-left">#</th>
            <template v-for="(label, colIndex) in labels" :key="colIndex">
              <th
                v-if="!isHidden(colIndex)"
                class="px-4 py-2 border-b border-gray-200 text-left select-none"
              >
                <div class="flex items-center gap-2">
                  <span class="text-[#1f6fb6] font-semibold">{{ label }}</span>

                  <div class="flex flex-col text-[12px] leading-none">
                    <button
                      class="grid place-items-center"
                      :class="isAscActive(colIndex) ? 'text-[#1f6fb6]' : 'text-gray-300'"
                      title="Sort ascending"
                      @click="clickAsc(colIndex)"
                    >
                      <Icon icon="mdi:arrow-up" class="w-4 h-4" />
                    </button>
                    <button
                      class="grid place-items-center"
                      :class="isDescActive(colIndex) ? 'text-[#1f6fb6]' : 'text-gray-300'"
                      title="Sort descending"
                      @click="clickDesc(colIndex)"
                    >
                      <Icon icon="mdi:arrow-down" class="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </th>
            </template>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-100 text-gray-700">
          <tr
            v-for="(row, rowIndex) in paginatedData"
            :key="rowIndex"
            :class="rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'"
          >
            <td class="px-4 py-2 border-gray-100">
              <input type="checkbox" class="accent-[#1f6fb6] cursor-pointer" />
            </td>

            <template v-for="(cell, cIdx) in row" :key="cIdx">
              <td v-if="!isHidden(cIdx)" class="px-4 py-2 whitespace-nowrap">
                {{ cell.value }}
              </td>
            </template>
          </tr>

          <!-- 🚫 Optional: No Data Row -->
          <tr v-if="!paginatedData.length">
            <td :colspan="labels.length + 1" class="text-center py-4 text-gray-400">
              No data available.
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 📑 Pagination -->
    <div class="flex justify-between items-center mt-4 text-[13px] text-gray-600">
      <span>
        Showing
        <b>{{ (currentPage - 1) * itemsPerPage + 1 }}</b> –
        <b>{{ Math.min(currentPage * itemsPerPage, totalItems) }}</b> of
        <b>{{ totalItems }}</b>
      </span>

      <div class="flex gap-2 items-center">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          ←
        </button>

        <span class="font-medium text-[#1f6fb6]"> {{ currentPage }} / {{ totalPages }} </span>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          →
        </button>
      </div>
    </div>
  </div>
</template>
