<template>
  <a-form-item :label="label" :name="name" :rules="rules">
    <a-date-picker
      size="large"
      style="width: 100%"
      :value="dayjsValue"
      @update:value="onInput"
    />
  </a-form-item>
</template>

<script setup lang="ts">
import dayjs, { Dayjs } from "dayjs";
import type { Rule } from "ant-design-vue/es/form";

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  modelValue: {
    type: [String, Date] as PropType<string | Date | null>,
    default: null,
  },
  rules: {
    type: Array as PropType<Rule[]>,
    default: () => []
  }
});

const emit = defineEmits<{
  (e: "update:modelValue", value: string | null): void;
}>();

const dayjsValue = computed(() => {
  return props.modelValue ? dayjs(props.modelValue) : null;
});

// Convertit Dayjs → string ISO pour le parent
const onInput = (value: Dayjs | null) => {
  emit("update:modelValue", value ? value.toISOString() : null);
};
</script>
