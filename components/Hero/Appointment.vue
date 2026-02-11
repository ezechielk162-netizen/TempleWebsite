<template>
  <div class="terrain-marketplace">
    <!-- Hero Section -->
    <section class="hero-section ">
      <div class="hero-overlay"></div>      
    </section>


  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.terrain-marketplace {
  background: #f8f9fa;
}

/* Hero Section */
.hero-section {
  position: relative;
  height: 600px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  background-image: url("/assets/img/pic-13.jpg");
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-section .hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    135deg,
    rgba(102, 126, 234, 0.9) 0%,
    rgba(118, 75, 162, 0.3) 100%
  );
}

.hero-section .hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
}

.hero-section .hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .hero-section .hero-title {
    font-size: 2.5rem;
  }

}

.hero-section .hero-subtitle {
  font-size: 1.4rem;
  margin-bottom: 2.5rem;
  opacity: 0.95;
}

.hero-section .search-bar {
  max-width: 700px;
  margin: 0 auto;
}

/* Ant Design deep selector */
.hero-section .search-bar :deep(.ant-input-search) .ant-input-wrapper {
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
  border-radius: 50px;
  overflow: hidden;
}

.hero-section .search-bar :deep(.ant-input-search) .ant-input-wrapper .ant-input {
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
}

.hero-section .search-bar :deep(.ant-input-search) .ant-input-wrapper .ant-input:focus {
  box-shadow: none;
}

.hero-section
  .search-bar
  :deep(.ant-input-search)
  .ant-input-wrapper
  .ant-input-group-addon
  .ant-btn {
  border: none;
  background: #ff6b6b;
  color: white;
  height: 50px;
  padding: 0 30px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.hero-section
  .search-bar
  :deep(.ant-input-search)
  .ant-input-wrapper
  .ant-input-group-addon
  .ant-btn:hover {
  background: #ee5a52;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 107, 107, 0.4);
}
</style>
