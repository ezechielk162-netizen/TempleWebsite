<template>
  <div ref="target" class="pill-fade" :class="{ show: isVisible }">
    <section class="hero-carousel">
      <div
        class="hero-slides"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div v-for="(img, index) in images" :key="index" class="hero-slide">
          <div class="image-card">
            <a-image :src="img" :preview="true" class="carousel-image" />
          </div>
        </div>
      </div>

      <!-- Flèches -->
      <LeftCircleOutlined class="hero-arrow prev mobile" @click="prevSlide" />
      <RightCircleOutlined class="hero-arrow next mobile" @click="nextSlide" />
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const images = ["/assets/img/pic-1.jpg", "/assets/img/pic-2.jpg"];

const currentSlide = ref(0);
let interval: number;
const isVisible = ref(false);
const target = ref(null);


const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % images.length;
};

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + images.length) % images.length;
};

let observer: IntersectionObserver;

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
  interval = window.setInterval(nextSlide, 5000);
});

onUnmounted(() => {
  if (observer) observer.disconnect();
  clearInterval(interval);
});
</script>

<style scoped>
.hero-carousel {
  position: relative;
  width: 100%;
  height: 700px;
  overflow: hidden;
  background: black;
}

.hero-slides {
  display: flex;
  height: 100%;
  transition: transform 0.8s ease-in-out;
}

.carousel-image {
  max-width: 400px;
  max-height: 300px;
  border-radius: 12px;
}

.hero-slide {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 🧱 Card */
.image-card {
  background: #111; /* ou white */
  padding: 90px;
  border-radius: 20px; /* ✅ arrondi */
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Flèches */
.hero-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  color: white;
  cursor: pointer;
  z-index: 10;
  user-select: none;
}

.hero-arrow.prev {
  left: 20px;
}

.hero-arrow.next {
  right: 20px;
}

@media (max-width: 768px) {
  .hero-carousel {
    position: relative;
    width: 100%;
    height: 430px;
    overflow: hidden;
    background: black;
  }
  .carousel-image {
    max-width: 95vw;
    max-height: 60vh;
  }
  .mobile {
    display: none;
  }

  .image-card {
    background: #111; /* ou white */
    padding: 5px;
    border-radius: 20px; /*  arrondi */
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
