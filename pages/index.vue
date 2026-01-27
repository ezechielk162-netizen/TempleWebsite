<template>
  <HeroImageSection :image_url="randomImage.URL" />

  <PersoDiv >
  <div class="d-flex align-items-center justify-content-center gap-5">
  <div>
    <p class="fs-2"><strong>Qui sommes-nous ?</strong></p>
  </div>

  <div>
 <p><strong>Le Tabernacle of Hallel</strong>  est une communauté chrétienne vivante et accueillante, appelée à élever le </p>
<p>nom de Jésus-Christ à travers une adoration sincère, une prédication centrée sur la grâce, et un </p>
<p>engagement actif dans la restauration des vies.</p>
 
  </div>

  </div>
  </PersoDiv>
</template>

<script lan="ts" setup>
import { randomImage } from "~/core/constant";
</script>
