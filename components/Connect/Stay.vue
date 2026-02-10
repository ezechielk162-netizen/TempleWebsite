<template>
  <div ref="target" class="mx-w pill-fade" :class="{ show: isVisible }">
    <a-row :gutter="24" class="pt-4">
      <a-col :xs="24" :md="12" class="pt-3" v-for="(item, i) in cardsDiscuss" :key="i">
        <a-card class="info-card image-card" :body-style="{ padding: 0 }">
          <img
            :src="item.image ? item.image : randomImage.URL"
            :alt="item.alt || 'image'"
            class="card-image"
          />
        </a-card>
      </a-col>
    </a-row>

    <perso-div :padding-value="4" class="text-center pt-3">
      <a-button size="large" class="outline-slide-team"
        ><WhatsAppOutlined class="fix-icon-whatsapp" /> Contactez-nous sur
        WhatsApp</a-button
      >
    </perso-div>
  </div>
</template>

<script setup>
import { cardsDiscuss, randomImage } from "~/core/constant";

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

.outline-slide-team {
  background: linear-gradient(135deg, var(--campus-green), var(--campus-green));
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
/* Texte */
.image-card {
  width: 100%;
  height: auto; /* ajuste la hauteur ici */
}

.card-image {
  width: 100%;
  height: 450px;
  object-fit: cover; /* 🔥 remplit toute la card */
  display: block;
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

@media (max-width: 768px) {
  .card-image {
    width: 100%;
    height: 300px;
    object-fit: cover; /* 🔥 remplit toute la card */
    display: block;
    transition: transform 0.4s ease;
  }
}
</style>
