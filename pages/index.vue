<template>
  <HeroImageSection :image_url="randomImage.URL" />

  <PersoDiv>
    <PresentationSection
      :title="t('body.presentation.who')"
      church-name="Le Tabernacle of Hallel"
      :first-detail="'est une communauté chrétienne vivante et accueillante, appelée à élever le'"
      :second-detail="'nom de Jésus-Christ à travers une adoration sincère, une prédication centrée surla grâce, et un'"
      :third-detail="'engagement actif dans la restauration des vies.'"
      :other-first-detail="'Nous croyons que la louange est une arme, la prière un remède, et la grâce de Dieu une puissance'"
      :other-second-detail="'de transformation pour chaque être humain, chaque famille, chaque nation.'"
    />
  </PersoDiv>

  <PersoDiv>
    <MissionButton :buttonTitle="'Notre mission'" />
  </PersoDiv>

  <PersoDiv>
    <MissionSection
      :title="'Mission du Tabernacle of Hallel'"
      subtitle="La mission du Tabernacle of Hallel est de proclamer l’Évangile de la grâce et de la restauration, en œuvrant pour la transformation spirituelle, sociale, culturelle et économique des individus et des communautés."
    />
    <MissionGoal />
  </PersoDiv>

  <PersoDiv>
    <MissionGoalList
      :marginValue="5"
      :firstText="'Nous sommes appélés à :'"
      :goals="goals"
      :isPresentation="true"
    />
  </PersoDiv>

  <PersoDiv>
    <VidsScene />
  </PersoDiv>

  <PersoDiv>
    <MissionButton :buttonTitle="'Nous rejoindre'" />
  </PersoDiv>

  <PersoDiv>
    <MissionSection
      :title="'Mission du Tabernacle of Hallel'"
      subtitle="Rejoignez-nous pour nos cultes hebdomadaires."
    />
  </PersoDiv>

  <PersoDiv>
    <MissionGoalList
      :isPresentation="false"
      :coords="coords"
      :marginValue="5"
      :firstText="'Venez adorer avec nous, grandir dans la foi, et vivre la présence de Dieu chaque semaine.'"
      secondText="Cultes hebdomadaires :"
    />
  </PersoDiv>

  <PersoDiv class="pad-section">
    <MissionButton :buttonTitle="'Restons connectés'" />
  </PersoDiv>

  <PersoDiv>
    <MissionSection
      :title="''"
      subtitle="Vous avez une question ? Un besoin de prière ? Un témoignage à partager ?"
    />
  </PersoDiv>

  <PersoDiv>
    <ConnectStay />
  </PersoDiv>

  <PersoDiv class="pad-section">
    <MissionButton :buttonTitle="'Le Chant de l\’Assemblée'" />
  </PersoDiv>

  <PersoDiv>
    <MissionSection
      :title="''"
      subtitle="“Kite’m di Bondye mèsi” – Une louange inspirée, porteuse de notre reconnaissance pour la grâce divine."
    />
  </PersoDiv>

  <PersoDiv>
    <SongsAudio />
  </PersoDiv>


    <CarousselSlides />

    <PersoDiv>
    <SongsAudio />
  </PersoDiv>
</template>

<script lan="ts" setup>
import { randomImage, goals, coords } from "~/core/constant";

const { t } = useI18n();
</script>

<style scoped>
.pad-section{
    padding-top: 30px
  }

@media (max-width: 768px) {
  .pad-section{
    padding-top: 10px
  }

  }
</style>
