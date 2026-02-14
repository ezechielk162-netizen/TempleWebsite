<template>
  <a-form-item :label="label" :name="name" :rules="rules" v-if="isNormalText">
    <a-input
      size="large"
      :value="modelValue"
      @update:value="onInput"
      :placeholder="placeholder"
      allow-clear
    />
  </a-form-item>

  <a-form-item :label="label" :name="name" :rules="validationRules" v-if="isNumberInput">
    <a-input
      size="large"
      :value="modelValue"
      @update:value="handleInput"
      @keypress="allowOnlyNumbers"
      placeholder="+1 (514) 123-4567"
      allow-clear
    />
  </a-form-item>
</template>

<script setup lang="ts">
import {
  formatCanadianPhone,
  isValidCanadianPhone,
  allowOnlyNumbers,
} from "@/utils/phone";
import type { Rule } from "ant-design-vue/es/form";

const props = defineProps({
  label: { type: String, required: true },
  name: { type: String, required: true },
  modelValue: { type: String, required: true },
  placeholder: { type: String, required: false, default: "" },
  rules: {
    type: Array as PropType<Rule[]>,
    default: () => [{ required: true, message: "Champ requis" }],
  },
  isNormalText: { type: Boolean, default: true },
  isNumberInput: { type: Boolean, default: false },
});

const validationRules = computed(() => [
  { required: true, message: "Numéro de téléphone requis" },
  {
    validator: (_: any, value: string) => {
      if (!value) return Promise.resolve();
      return isValidCanadianPhone(value)
        ? Promise.resolve()
        : Promise.reject("Numéro de téléphone incorrect");
    },
  },
]);

const emit = defineEmits(["update:modelValue"]);

const handleInput = (value: string) => {
  const formatted = formatCanadianPhone(value);
  emit("update:modelValue", formatted);
};

const onInput = (value: string) => {
  emit("update:modelValue", value);
};
</script>
