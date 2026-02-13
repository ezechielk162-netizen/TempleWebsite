<template>
  <HeroAppointment />

  <PersoDiv>
    <MissionButton :button-title="'Informations de contact'"/>
  </PersoDiv>

  <PersoDiv>
<RdvFirstSection/>
  </PersoDiv>

  <PersoDiv>
    <MissionButton :button-title="'Poser une question ou prendre un rendez vous'"/>
    <MissionSection
      :title="''"
      subtitle="Que ce soit pour une question, une demande de prière ou un rendez-vous avec le Pasteur Frantzou Jean-Baptiste, nous serons heureux de vous répondre et de vous accompagner."
    />
  </PersoDiv>

  <PersoDiv>
<FormPrototype :forms="form" :addOneInput="true" :firstLabel="'Nom complet'"/>
  </PersoDiv>
</template>

<script setup lang="ts">
const {form} = useFunctions();

</script>

<style scoped></style>
