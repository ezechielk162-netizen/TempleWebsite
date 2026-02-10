<template>
  <div
    class="d-flex align-items-center justify-content-center gap-5 pill-fade"
    ref="target"
    :class="{ show: isVisible }"
  >
    <div>
      <p class="fs-2 title">
        <strong>{{ props.title }}</strong>
      </p>
    </div>

    <div>
      <p class="sub_text">
        <strong>{{ props.churchName }}</strong> {{ props.firstDetail }}
      </p>
      <p>
        {{ props.secondDetail }}
      </p>
      <p>{{ props.thirdDetail }}</p>

      <p>
        {{ props.otherFirstDetail }}
      </p>
      <p>{{ props.otherSecondDetail }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
const isVisible = ref(false);
const target = ref(null);

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  churchName: {
    type: String,
    required: true,
  },
  firstDetail: {
    type: String,
    required: true,
  },
  secondDetail: {
    type: String,
    required: true,
  },
  thirdDetail: {
    type: String,
    required: true,
  },
  otherFirstDetail: {
    type: String,
    required: true,
  },
  otherSecondDetail: {
    type: String,
    required: true,
  },
});

let observer: any;

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
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
@media (max-width: 768px) {
  .title {
    font-size: 15px !important;
  }

  .sub_text {
    font-size: 14px !important;
  }
}
</style>
