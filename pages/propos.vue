<template>
  <div>
    <HeroImageSection :image_url="randomImage.URL" />

    Hello World

  </div>
</template>

<script lang="ts" setup>
import { randomImage } from '~/core/constant';

</script>
