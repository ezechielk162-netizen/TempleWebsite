<template>
  <a-form-item :label="label" :name="name" :rules="rules">
    <a-textarea
      size="large"
      :value="modelValue"
      :maxlength="maxlength"
      show-count
      :rows="rows"
      @update:value="onInput"
      allow-clear
    />
  </a-form-item>
</template>

<script setup lang="ts">
import type { Rule } from "ant-design-vue/es/form";

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  modelValue: { type: String, required: true },
  rules: {
    type: Array as PropType<Rule[]>,
    default: () => [],
  },
  maxlength: { type: Number, default: 180 },
  rows: { type: Number, default: 4 },
});

const emit = defineEmits(["update:modelValue"]);

const onInput = (value: string) => {
  emit("update:modelValue", value);
};
</script>
