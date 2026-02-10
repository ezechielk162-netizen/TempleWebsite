<template>
  <div ref="target" class="mx-w pill-fade" :class="{ show: isVisible }">
    <a-row :gutter="24" class="pt-4">
      <a-col :xs="24" :md="8" class="pt-3" v-for="(item, i) in cards" :key="i">
        <a-card class="info-card image-card" :body-style="{ padding: 0 }">
          <img v-if="item.image"
            :src="item.image ? item.image : randomImage.URL"
            :alt="item.alt || 'image'"
            class="card-image"
          />
          <div class="bg-dark card-div d-flex justify-content-center align-items-center" v-else>
          <p>Tabernacle of Hallel</p>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { cards, randomImage } from "~/core/constant";

const { t } = useI18n();

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
.info-card {
  position: relative;
  border-radius: 16px;
  height: 100%;
  overflow: hidden;
  transition: all 0.4s ease;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.08);
}

/* Barre bleue en haut */
.info-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 4px;
  width: 0%;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  transition: width 0.4s ease;
}

/* Hover */
.info-card:hover {
  transform: translateY(-6px);
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
}

.info-card:hover::before {
  width: 100%;
}

.mx-w {
  max-width: 1200px;
  margin: 0 auto;
}

.icon-box-1 {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--campus-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  margin-bottom: 16px;
}

.icon-box-2 {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--campus-green);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  margin-bottom: 16px;
}

.icon-box-3 {
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--campus-yellow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 26px;
  margin-bottom: 16px;
}

/* Texte */
.image-card {
  width: 100%;
  height: auto; /* ajuste la hauteur ici */
}

.card-image {
  width: 100%;
  background: #facc15;
    height: 218.5px;
  object-fit: cover; /* 🔥 remplit toute la card */
  display: block;
  transition: transform 0.4s ease;
}

.card-div {
  width: 100%;
  height: 218.5px;
  display: block;
  background-color: #26A8DC !important;
  font-size: 1.5rem;
  color: white;
  transition: transform 0.4s ease;
}


/* petit effet sympa au hover */
.info-card:hover .card-image {
  transform: scale(1.04);
}

.title {
  font-family: var(--font-display) !important;
  font-size: 1.5rem !important;
  font-weight: 600 !important;
  margin-bottom: 1rem;
  color: var(--dark-bg);
}

.subtitle {
  font-family: var(--font-body) !important;
  font-size: 1rem !important;
  line-height: 1.7;
  color: var(--text-muted);
}
</style>
