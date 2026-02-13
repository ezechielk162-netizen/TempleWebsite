<template>
  <div class="d-flex gap-2 align-items-end">
    <!-- Heure -->
    <a-form-item
      :label="'Heure'"
      :name="name + '_hour'"
      :rules="hourRules"
      style="flex: 1; margin-bottom: 0"
    >
      <a-input-number
        size="large"
        :min="0"
        :max="12"
        style="width: 100%"
        :value="hour"
      />
    </a-form-item>

    <!-- Minutes -->
    <a-form-item
      :label="'Minutes'"
      :name="name + '_minute'"
      :rules="minuteRules"
      style="flex: 1; margin-bottom: 0"
    >
      <a-input-number
        size="large"
        :min="0"
        :max="59"
        style="width: 100%"
        :value="minute"
      />
    </a-form-item>

    <!-- AM/PM -->
    <a-form-item
      :label="'AM/PM'"
      :name="name + '_ampm'"
      :rules="ampmRules"
      style="flex: 1; margin-bottom: 0"
    >
      <a-select size="large" v-model:value="ampm">
        <a-select-option value="AM">AM</a-select-option>
        <a-select-option value="PM">PM</a-select-option>
      </a-select>
    </a-form-item>
  </div>
</template>

<script setup lang="ts">
import type { Rule } from "ant-design-vue/es/form";

const props = defineProps<{
  name: string;
  modelValue: { hour: number | null; minute: number | null; ampm: string };
  rules?: Rule[];
}>();

const emit = defineEmits<{
  (
    e: "update:modelValue",
    value: { hour: number | null; minute: number | null; ampm: string }
  ): void;
}>();

// Valeurs locales
const hour = ref(props.modelValue.hour);
const minute = ref(props.modelValue.minute);
const ampm = ref(props.modelValue.ampm);

// Watch pour synchroniser le v-model
watch([hour, minute, ampm], () => {
  emit("update:modelValue", { hour: hour.value, minute: minute.value, ampm: ampm.value });
});

// Rules par défaut si rien n'est passé
const hourRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: "Heure requise" }];
const minuteRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: "Minutes requises" }];
const ampmRules = props.rules?.length
  ? props.rules
  : [{ required: true, message: "AM/PM requis" }];
</script>

<style scoped>
/* Optionnel : ajustement responsive */
.d-flex {
  display: flex;
}
.gap-2 {
  gap: 8px;
}
.align-items-end {
  align-items: flex-end;
}
</style>
