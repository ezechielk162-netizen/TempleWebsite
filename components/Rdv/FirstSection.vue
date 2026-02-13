<template>
  <div ref="target" class="mx-w pill-fade" :class="{ show: isVisible }">
    <section class="contact-section py-3">
      <div class="container">
        <div class="row align-items-center">
          <!-- LEFT SIDE -->
          <div class="col-lg-6 mb-4 mb-lg-0">
            <p class="contact-description">
              Nous serions heureux de vous accompagner, de prier avec vous ou de répondre
              à vos questions. Communiquez avec nous par téléphone, WhatsApp ou via notre
              formulaire de contact. Notre équipe est là pour vous écouter, vous
              encourager et marcher avec vous dans la foi.
            </p>

            <!-- Contact Items -->
            <div class="contact-item">
              <NuxtLink
                to="https://wa.me/16134999892"
                external
                target="_blank"
                class="contact-link"
              >
                <WhatsAppOutlined class="contact-icon" />
                <span>Téléphone / WhatsApp : +(613) 499-9892</span>
              </NuxtLink>
            </div>

            <div class="contact-item">
              <a href="mailto:info@tabernacleofhallel.com" class="contact-link">
                <MailOutlined class="contact-icon" />
                <span>Courriel : info@tabernacleofhallel.com</span>
              </a>
            </div>

            <div class="contact-item">
              <NuxtLink
                to="https://www.google.com/maps/search/?api=1&query=5359+Canotek+Rd,+Ottawa+ON+K1J+9E5"
                external
                target="_blank"
                class="contact-link"
              >
                <EnvironmentOutlined class="contact-icon" />
                <span>Adresse : 5359 Canotek Rd, Ottawa ON K1J 9E5</span>
              </NuxtLink>
            </div>

            <div class="contact-item">
              <ClockCircleOutlined class="contact-icon" />
              <div>
                <strong>Heures de disponibilité :</strong>
                <p class="mt-3 mb-3">
                  <SendOutlined class="fix-icon-whatsapp mx-2" />Chaque dimanche matin de
                  10:30 – 12:30 pm
                </p>
                <p class="mb-3">
                  <SendOutlined class="fix-icon-whatsapp mx-2" />Chaque 3ème dimanche soir
                  de 6:00 pm – 8:00
                </p>
                <p class="mb-3">
                  <SendOutlined class="fix-icon-whatsapp mx-2" />Chaque vendredi soir de
                  7:00 pm – 9:00 pm
                </p>
              </div>
            </div>
          </div>

          <!-- RIGHT SIDE (MAP) -->
          <div class="col-lg-6">
            <div class="map-container">
              <ClientOnly>
                <MapsLeaflet />
              </ClientOnly>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import {
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons-vue";

const isVisible = ref(false);
const target = ref(null);

let observer;

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
.contact-description {
  font-family: var(--font-display) !important;
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 30px;
  color: #333;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  font-size: 1.05rem;
}

.contact-icon {
  font-size: 22px;
  color: #1890ff;
  margin-top: 1px;
}

.contact-link {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  text-decoration: none;
  color: inherit;
  transition: all 0.3s ease;
}

.contact-link:hover {
  color: #1890ff;
  transform: translateX(5px);
}

.map-container {
  width: 100%;
  height: auto;
  border-radius: 1px !important;
}

@media (max-width: 768px) {
  .contact-description {
    font-size: 16px !important;
  }

  .contact-item {
    font-size: 16px !important;
  }

  .contact-icon {
    font-size: 18px;
    color: #1890ff;
    margin-top: 3px;
  }
}
</style>
