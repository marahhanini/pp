<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { computed, ref } from "vue";
import type { dataType } from "../types/data";

//
// ---------- 🗂️ 1. BASE DATA ----------
//
const labels = ref(["Time", "Label", "Value"]);
const rawData = ref<dataType[][]>(
  Array.from({ length: 50 }, (_, i) => {
    const hour = 14 - Math.floor(i / 4); // start from 2 PM backward
    const minute = (45 - (i % 4) * 15 + 60) % 60; // 45, 30, 15, 0
    const zone = (i % 5) + 1;

    const formattedTime = `23 Oct 2022 - ${hour}:${minute.toString().padStart(2, "0")} PM`;

    return [
      { value: formattedTime, type: "date" },
      { value: `Zone ${zone} Flow`, type: "string" },
      { value: (Math.random() * 10 + 5).toFixed(2), type: "number" },
    ];
  })
);

//
// ---------- ⚙️ 2. STATE ----------
//
const searchTerm = ref("");
const sortColumn = ref<number | null>(null);
const sortDirection = ref<"asc" | "desc">("asc");
const itemsPerPage = ref(10);
const currentPage = ref(1);

//
// ---------- 🧠 3. FILTERED & SORTED DATA ----------
//
const filteredData = computed(() => {
  const term = searchTerm.value.toLowerCase().trim();
  if (!term) return rawData.value;
  return rawData.value.filter((row) =>
    row.some((cell) => String(cell.value).toLowerCase().includes(term))
  );
});

const sortedData = computed(() => {
  if (sortColumn.value === null) return filteredData.value;
  const col = sortColumn.value ?? 0;
  const dir = sortDirection.value;

  return [...filteredData.value].sort((a, b) => {
    const valA = a[col]?.value ?? "";
    const valB = b[col]?.value ?? "";
    if (typeof valA === "number" && typeof valB === "number") {
      return dir === "asc" ? valA - valB : valB - valA;
    }
    return dir === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });
});

//
// ---------- 📄 4. PAGINATION ----------
//
const totalItems = computed(() => sortedData.value.length);
const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage.value));

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
      <table class="min-w-full text-sm border-collapse">
        <thead class="bg-gray-50 text-gray-600 font-medium">
          <tr>
            <th class="px-4 py-2 border-b border-gray-200 text-left">#</th>
            <th
              v-for="(label, colIndex) in labels"
              :key="colIndex"
              @click="handleSort(colIndex)"
              class="px-4 py-2 border-b border-gray-200 text-left cursor-pointer select-none"
            >
              <div class="flex items-center gap-1">
                <span class="text-[#1f6fb6] font-semibold">{{ label }}</span>
                <div class="flex flex-col text-gray-400 text-[10px] leading-none">
                  <Icon icon="mdi:arrow-up" class="hover:text-[#1f6fb6]" />
                  <Icon icon="mdi:arrow-down" class="hover:text-[#1f6fb6]" />
                </div>
              </div>
            </th>
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
            <td v-for="(cell, colIndex) in row" :key="colIndex" class="px-4 py-2 whitespace-nowrap">
              {{ cell.value }}
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
          ← Prev
        </button>
        <span class="font-medium text-[#1f6fb6]">{{ currentPage }}</span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-100 transition"
        >
          Next →
        </button>
      </div>
    </div>
  </div>
</template>
