<script setup lang="ts">
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

import type { dataType } from "../types/data";

const props = defineProps<{
  value: any;
  dataType: dataType;
  rowIndex: number;
  colIndex: number;
}>();

// ✅ Helper: format the displayed value based on its type
const formatValue = (val: any) => {
  if (props.dataType.type === "date") {
    // Try to parse the date
    const parsed = dayjs(val, ["DD MMM YYYY - h:mm A", "YYYY-MM-DDTHH:mm:ssZ", "YYYY/MM/DD HH:mm"]);
    return parsed.isValid() ? parsed.format("DD MMM YYYY - h:mm A") : "—";
  }

  // ✅ Add units for numeric values (example)
  if (props.dataType.type === "number") {
    return `${val} m³/hr`;
  }

  return val;
};
</script>

<template>
  <td
    class="px-4 py-2 border-b border-gray-100 whitespace-nowrap cursor-pointer"
    @click="$emit('cellClick', { row: props.rowIndex, col: props.colIndex })"
  >
    {{ formatValue(props.value) }}
  </td>
</template>
