<template>
  <section class="section">
    <button ref="target" class="pill" :class="{ show: isVisible }">
      {{ t(`${props.buttonTitle ?? ""}`) }}
    </button>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const { t } = useI18n();

const isVisible = ref(false);
const target = ref(null);

const props = defineProps({
  buttonTitle: {
    type: String,
    required: true,
  },
});

let observer;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect(); // animation une seule fois
      }
    },
    { threshold: 0.5 }
  );

  if (target.value) observer.observe(target.value);
});

onBeforeUnmount(() => {
  if (observer) observer.disconnect();
});
</script>

<style scoped>
.section {
  display: flex;
  justify-content: center;
  align-items: center;
} /* Bouton */
.pill {
  padding: 14px 28px;
  border-radius: 999px;
  background: #e8efff;
  color: #2563eb;
  font-weight: 600;
  font-size: 1rem;
  border: none;
  cursor: pointer; /* état
  caché */
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
} /* état visible */
.pill.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}
</style>
