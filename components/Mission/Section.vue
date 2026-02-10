<template>
  <div ref="target" class="text-center pill-fade" :class="{ show: isVisible }">
    <div>
      <p class="title">{{ t(`${props.title}`) }}</p>
    </div>

    <div class="pt-0 subtitle">
      <p>{{ t(`${props.subtitle}`) }}</p>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
});

const isVisible = ref(false);
const target = ref(null);

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
.title {
  font-family: var(--font-display) !important;
  font-size: clamp(2rem, 5vw, 2rem);
  font-weight: 700;
  color: var(--text-dark);
  color: var(--dark-bg);
}

.subtitle {
  font-family: var(--font-body) !important;
  font-size: 1.1rem;
  color: var(--text-muted);
  line-height: 1.7;
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

@media (max-width: 768px) {
  .title {
    font-size: 16px !important;
  }

  .subtitle {
    font-size: 16px !important;
  }
}
</style>
