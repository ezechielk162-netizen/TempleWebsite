<template>
  <div>
    <div v-if="isReady">
      <header>
        <nav class="navbar navbar-expand-lg bg-white py-3 shadow-sm">
          <div class="container">
            <!-- LOGO -->
            <NuxtLink class="navbar-brand fs-3 fw-bold logo-blue" to="/">
              {{ t("body.name") }}
            </NuxtLink>

            <!-- TOGGLER MOBILE -->
            <button class="navbar-toggler" type="button" @click="toggleMenu">
              <span class="navbar-toggler-icon"></span>
            </button>

            <!-- MENU -->
            <div :class="['collapse navbar-collapse', { show: isOpen }]" id="navbarNav">
              <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-4 d-flex">
                <li class="nav-item pt-2" v-for="item in menuItem" :key="item.to">
                  <NuxtLink
                    :to="item.to"
                    class="nav-link nav-custom"
                    :class="{ 'active-link': isActive(item) }"
                    @click="closeMenu"
                  >
                    {{ t(item.label) }}
                    <span class="underline"></span>
                    <!-- ligne animée -->
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <div v-if="isReady">
        <ChangerLanguage />
      </div>

      <FooterPage />
    </div>
   <!-- <div v-else class="h-100">
      <template>
        <a-skeleton active />
      </template>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { menuItem } from "~/core/constant";

const { isOpen, handleResize, toggleMenu, closeMenu } = useFunctions();
const route = useRoute();
const { t } = useI18n();

const componentsReady = ref(false);
const isReady = computed(() => componentsReady.value);

onMounted(() => {
  window.addEventListener("resize", handleResize);

  componentsReady.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});

// Fonction pour savoir si le lien est actif
const isActive = (item: { to: string }) => {
  const hash = item.to.split("#")[1];
  return route.hash === `#${hash}` || route.path === item.to;
};
</script>

<style scoped>
/* LOGO */
.logo-blue {
  color: #6366f1; /* bleu */
}

/* LIENS */
.nav-custom {
  position: relative;
  font-weight: 500;
  color: #374151;
  transition: color 0.2s ease;
}

/* HOVER */
.nav-custom:hover {
  color: #6366f1;
}

/* LIGNE SOUS LIEN */
.nav-custom .underline {
  position: absolute;
  bottom: -5px;
  left: 0;
  height: 3px;
  width: 0%;
  background-color: #6366f1;
  border-radius: 2px;
  transition: width 0.3s ease;
}

/* LIEN ACTIF */
.active-link {
  color: #6366f1 !important;
  font-weight: 600;
}

.active-link .underline {
  width: 100%;
}

/* OPTIONNEL : animation au survol */
.nav-custom:hover .underline {
  width: 100%;
  background-color: #6366f1;
}
</style>
