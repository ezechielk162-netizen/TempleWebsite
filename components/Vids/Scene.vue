<template>
  <a-card class="video-frame">
    <!-- Bootstrap centering -->
    <div class="d-flex justify-content-center align-items-center">
      <div class="video-wrapper">
        <video class="video-content" controls>
          <source src="/assets/videos/culte.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
.video-frame {
  border-color: white;
}

/* Conteneur vidéo */
.video-wrapper {
  position: relative;
  width: auto;
  height: auto;
  overflow: hidden;
  background: black;
  box-shadow: 1px 1px 1px 1px black;

  padding: 6px;
  background: linear-gradient(
    135deg,
    black,
    #d9d9d9,
    black
  );

  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.25),
    inset 0 0 0 1px rgba(255, 255, 255, 0.3);

  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

/* Vidéo */
.video-content {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 12px;
  background: black;
}

@media (max-width: 768px) {
  .video-wrapper {
    position: relative;
    width: auto;
    height: auto;
    border-radius: 0px;
    overflow: hidden;
    background: black;
  }
}
</style>
