<template>
  <div class="mx-w gap-5 pill-fade" ref="target" :class="{ show: isVisible }">
    <div>
      <p class="fs-6">{{ props.firstText }}</p>
      <p class="fs-6" v-if="!isPresentation">{{ props.secondText }}</p>
    </div>

    <div v-if="isPresentation">
      <p class="text-section" v-for="(item, index) in props.goals" :key="index">
        <SendOutlined class="fix-icon" /><strong class="mx-2">{{
          item.textStrong
        }}</strong>
        {{ item.endofText }}
      </p>

      <p class="mobile">
        <strong> Le Tabernacle of Hallel </strong>se veut une maison de prière, un lieu de
        refuge et de croissance, où chacun peut expérimenter la
        <strong> puissance transformatrice de Dieu</strong>, restaurer son identité, et
        marcher dans la destinée divine.
      </p>

      <div class="desktop">
        <p>
          <strong>Le Tabernacle of Hallel </strong> se veut une maison de prière, un lieu
          de refuge et de croissance, où chacun peut expérimenter la
          <strong> puissance </strong>
        </p>
        <p>
          <strong>transformatrice de Dieu</strong>, restaurer son identité, et marcher
          dans la destinée divine.
        </p>
      </div>
    </div>

    <div v-else>
      <p class="text-section" v-for="(item, index) in props.coords" :key="index">
        <DoubleRightOutlined class="fix-icon mx-2" />{{
          item.textStrong
        }}
        <strong>{{ item.endofText }}</strong>
      </p>
    </div>

    <perso-div v-if="!isPresentation" :padding-value="4" class="text-center pt-3">
        <a-button size="large" class="outline-slide-team"><CalendarOutlined class="fix-icon-contact"/> Contactez-nous</a-button>
    </perso-div>
  </div>
</template>

<script lang="ts" setup>
const isVisible = ref(false);
const target = ref(null);

const props = defineProps({
  firstText: {
    type: String,
    required: true,
  },
  secondText: {
    type: String,
    required: false,
  },
  goals: {
    type: Array,
    required: false,
  },
  isPresentation: {
    type: Boolean,
    required: true,
  },
  coords: {
    type: Array,
    required: false,
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
.mx-w {
  max-width: 1200px;
  margin: 0 auto;
}

.mobile {
  display: none;
}

.outline-slide-team {
    background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
    color: white;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.3);
    border: none;
    font-weight: 600;
    border-radius: 99px !important;
    height: 100% !important;
    padding: 12px 35px !important;
    font-size: 1rem;
    font-family: var(--font-display) !important;
}

.outline-slide-team:hover {
    color: white !important;
    box-shadow: 0 4px 15px rgba(37, 99, 235, 0.7);
}

@media (max-width: 768px) {
  .text-section {
    font-size: 15px !important;
  }

  .mobile {
    display: block;
    font-size: 15px !important;
  }

  .desktop {
    display: none;
  }


}
</style>
