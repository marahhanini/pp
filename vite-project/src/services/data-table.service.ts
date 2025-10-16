// src/services/data-table.service.ts
import { defineStore } from "pinia";
import { ref } from "vue";
import { fetchData } from "../api/data-table.api";

export const useDataTableStore = defineStore("dataTable", () => {
  const data = ref<any[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function loadData() {
    loading.value = true;
    error.value = null;
    try {
      const response = await fetchData();
      data.value = response;
    } catch (err: any) {
      error.value = err.message || "Failed to load data";
    } finally {
      loading.value = false;
    }
  }

  return { data, loading, error, loadData };
});
