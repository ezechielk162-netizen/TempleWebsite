<template>
  <div class="page-wrapper">
    <div class="content-flex">
      <NuxtPage />
    </div>

    <footer class="site-footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-column footer-start">
            <h3>{{ t('body.organization_name') }}</h3>
            <p>{{ t('body.solution') }}</p>
          </div>

          <div class="footer-column footer-end">
            <h3>{{ t('body.links') }}</h3>
            <ul class="footer-links">
              <li><a href="#presentation">{{ t('body.first') }}</a></li>
              <li><a href="#advantages">{{ t('body.advantage') }}</a></li>
              <li><a href="#how_coice">{{ t('body.how_choice') }}</a></li>
              <li><a href="#first_step">{{ t('body.first_step') }}</a></li>
              <li><a href="#avis">{{ t('body.avis') }}</a></li>
            </ul>
          </div>

          <div class="footer-column footer-end">
            <h3>{{ t('body.links') }}</h3>
            <ul class="footer-links">
              <li><a href="#presentation">{{ t('body.first') }}</a></li>
              <li><a href="#advantages">{{ t('body.advantage') }}</a></li>
              <li><a href="#how_coice">{{ t('body.how_choice') }}</a></li>
              <li><a href="#first_step">{{ t('body.first_step') }}</a></li>
              <li><a href="#avis">{{ t('body.avis') }}</a></li>
            </ul>
          </div>

          <div class="footer-column footer-end">
            <h3>{{ t('body.links') }}</h3>
            <ul class="footer-links">
              <li><a href="#presentation">{{ t('body.first') }}</a></li>
              <li><a href="#advantages">{{ t('body.advantage') }}</a></li>
              <li><a href="#how_coice">{{ t('body.how_choice') }}</a></li>
              <li><a href="#first_step">{{ t('body.first_step') }}</a></li>
              <li><a href="#avis">{{ t('body.avis') }}</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© {{ t('body.sign') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script lang="ts" setup>
const { t } = useI18n();
</script>

<style scoped>
/* --- PAGE WRAPPER --- */
.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* prend toute la hauteur de l'écran */
}

/* Contenu principal pousse le footer en bas si la page est courte */
.content-flex {
  flex: 1;
}

/* --- FOOTER --- */
.site-footer {
  background-color: #1f2937;
  color: #ecf0f1;
  padding: 4rem 1rem 2rem;
  font-size: 0.95rem;
  font-family: 'Inter', sans-serif;
}

.site-footer .container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2.5rem;
}

.footer-column h3 {
  font-size: 1.2rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  color: #ffffff;
}

.footer-column p {
  line-height: 1.7;
  opacity: 0.85;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #ecf0f1;
  text-decoration: none;
  opacity: 0.85;
  transition: all 0.3s ease;
}

.footer-links a:hover {
  color: #4a6bff;
  opacity: 1;
  transform: translateX(3px);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.15);
  padding-top: 1.5rem;
  text-align: center;
  font-size: 0.85rem;
  opacity: 0.8;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
  
  .footer-links a:hover {
    transform: none;
    padding-left: 0;
  }
}
</style>
