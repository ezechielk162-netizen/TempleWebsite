<template>
  <div>
    <nav
      :class="
        !isOpen
          ? 'main-header navbar navbar-expand-lg bg-white shadow-sm'
          : 'navbar navbar-expand-lg bg-white shadow-sm'
      "
    >
      <div class="container-fluid">
        <!-- Logo -->
        <NuxtLink class="logo-section d-flex align-items-center gap-2" :to="'/'">
          <div class="logo-icon">
          <img src="/assets/img/logo.png" style="width: 70px"/>
          </div>
          <strong>Tabernacle of Hallel</strong>
        </NuxtLink>

        <!-- TOGGLER MOBILE -->
        <a-button class="navbar-toggler" @click="toggleMenu">
          <MenuOutlined />
        </a-button>

        <!-- Menu -->
        <div
          :class="[
            isOpen
              ? 'collapse navbar-collapse pt-3'
              : 'collapse navbar-collapse justify-content-center',
            { show: isOpen },
          ]"
          id="navbarNav"
        >
          <ul :class="isOpen ? 'navbar-nav gap-2' : 'navbar-nav gap-4'">
            <li
              v-for="item in menuItems"
              :key="item.name"
              class="nav-item"
              :class="{ 'dropdown dropdown-hover': item.dropdown && !isOpen }"
            >
              <!-- Lien simple ou dropdown -->
              <template v-if="!item.dropdown">
                <NuxtLink
                  :to="item.to"
                  :class="
                    isOpen
                      ? 'nav-link dark-color gap-3 fs-5 d-flex align-items-center gap-1'
                      : 'nav-link dark-color d-flex align-items-center gap-1'
                  "
                >
                  <component
                    v-if="item.icon && isOpen"
                    :is="item.icon"
                    class="fix-icon"
                  />
                  {{ t(item.name) }}
                </NuxtLink>
              </template>

              <!-- Dropdown desktop -->
              <template v-else>
                <NuxtLink class="nav-link dropdown-toggle dark-color" v-if="!isOpen">
                  {{ t(item.name) }}
                </NuxtLink>
                <ul class="dropdown-menu dropdown-card" v-if="!isOpen">
                  <li v-for="sub in item.dropdown" :key="sub.name">
                    <NuxtLink
                      class="dropdown-item d-flex align-items-center gap-3"
                      :to="sub.to"
                    >
                      <component v-if="sub.icon" :is="sub.icon" class="fix-icon-real" />
                      {{ t(sub.name) }}
                    </NuxtLink>
                  </li>
                </ul>

                <!-- Dropdown mobile -->
                <li
                  v-for="sub in item.dropdown"
                  v-if="isOpen"
                  :key="sub.name"
                  class="nav-item"
                >
                  <NuxtLink
                    class="nav-link mx-5 gap-3 fs-5 d-flex align-items-center gap-1"
                    :to="sub.to"
                  >
                    <component v-if="sub.icon" :is="sub.icon" class="fix-icon" />
                    {{ t(sub.name) }}
                  </NuxtLink>
                </li>
              </template>
            </li>
          </ul>
        </div>

        <!-- Actions -->

        <div
          :class="[
            isOpen
              ? 'collapse navbar-collapse pt-3'
              : 'collapse navbar-collapse justify-content-end gap-3',
            { show: isOpen },
          ]"
        >
          <a-button
            v-for="(btn, index) in actionButtons"
            :key="index"
            size="large"
            :class="[
              btn.type === 'primary'
                ? 'btn btn-main'
                : btn.type === 'outline'
                ? 'btn btn-outline-main'
                : 'outline-vote',
              isOpen && btn.showOnMobile ? 'w-100 mt-2' : '',
              isOpen && !btn.showOnMobile ? 'd-none' : '',
              !isOpen && !btn.isTablette && isDesktop === 1024 ? 'd-none' : '',
            ]"
            :style="isOpen && btn.showOnMobile ? { height: '50px' } : {}"
            @click="route.push(btn.redirectButton)"
          >
            <component :is="btn.icon" class="fix-icon-whatsapp" />
            {{ btn.label }}
          </a-button>
        </div>
      </div>
    </nav>
    <div v-if="isReady">
      <ChangerLanguage />
    </div>

    <FooterPage />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { actionButtons, menuItems } from "~/core/constant";

const { isOpen, handleResize, toggleMenu, closeMenu } = useFunctions();
const route = useRouter();
const { t } = useI18n();

const componentsReady = ref(false);
const isReady = computed(() => componentsReady.value);

const isDesktop = ref(0);

const checkScreen = () => {
  isDesktop.value = window.innerWidth;
};

onMounted(() => {
  checkScreen();
  window.addEventListener("resize", checkScreen);
  window.addEventListener("resize", handleResize);
  componentsReady.value = true;
});

onUnmounted(() => {
  window.removeEventListener("resize", checkScreen);
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.navbar {
  padding: 16px 32px;
}
.btn-main {
  background-color: #3b82f6;
  color: #fff;
  border-radius: 999px;
  font-weight: 500;
}
.btn-main:hover {
  background-color: #2563eb;
  color: #fff;
}
.btn-outline-main {
  border: 2px solid #3b82f6;
  color: #3b82f6;
  border-radius: 999px;
  font-weight: 500;
}

/* Ouverture au hover */
.dropdown-hover:hover .dropdown-menu {
  display: block;
}

/* Carte dropdown */
.dropdown-card {
  border: none;
  border-radius: 16px;
  padding: 15px;
  min-width: 260px;
}

/* Items */
.dropdown-card .dropdown-item {
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 500;
  color: #1f2937;
  transition: all 0.2s ease;
}

/* Icônes */
.dropdown-card i {
  font-size: 18px;
  color: #111827;
}

/* Hover item */
.dropdown-card .dropdown-item:hover {
  background-color: #f1f5f9;
}

.nav-link {
  font-family: var(--font-body);
  font-weight: 500;
  font-size: 0.95rem;
  color: var(--text-dark);
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

body.dark-mode .nav-link {
  color: var(--text-light);
}

.nav-link:hover {
  background: rgba(37, 99, 235, 0.1);
  color: var(--primary-color);
}

/* Désactiver flèche Bootstrap par défaut si besoin */
.dropdown-toggle::after {
  margin-left: 8px;
}

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
</style>
