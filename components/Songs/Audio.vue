<template>
  <div ref="target" class="mx-w pill-fade" :class="{ show: isVisible }">
    <a-card class="audio-player">
      <div class="d-flex align-items-center gap-3">
        <!-- Play / Pause -->
        <a-button shape="circle" @click="togglePlay">
          <component
            :is="isPlaying ? PauseCircleOutlined : PlayCircleOutlined"
            class="fix-icon"
          />
        </a-button>

        <!-- Current time -->
        <span class="time">{{ formatTime(currentTime) }}</span>

        <!-- Progress slider -->
        <a-slider
          class="flex-grow-1"
          :value="progress"
          :tooltip-open="false"
          @change="seek"
        />

        <!-- Duration -->
        <span class="time">-{{ formatTime(duration - currentTime) }}</span>

        <!-- Volume -->
        <a-button shape="circle" @click="toggleMute">
          <component :is="isMuted ? SoundOutlined : AudioOutlined" class="fix-icon" />
        </a-button>

        <!-- Hidden audio -->
        <audio
          ref="audio"
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          @timeupdate="onTimeUpdate"
          @loadedmetadata="onLoaded"
          @ended="onEnded"
        />
      </div>
    </a-card>

    <perso-div :padding-value="4" class="text-center pt-3">
      <a-button size="large" class="outline-slide-team"
        ><PlaySquareOutlined class="fix-icon-whatsapp" /> Écoutez maintenant</a-button
      >
    </perso-div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  SoundOutlined,
  AudioOutlined,
} from "@ant-design/icons-vue";

const audio = ref<HTMLAudioElement | null>(null);

const isPlaying = ref(false);
const isMuted = ref(false);
const currentTime = ref(0);
const duration = ref(0);
const isVisible = ref(false);
const target = ref(null);

const progress = computed(() =>
  duration.value ? (currentTime.value / duration.value) * 100 : 0
);

const togglePlay = () => {
  if (!audio.value) return;

  if (audio.value.paused) {
    audio.value.play();
    isPlaying.value = true;
  } else {
    audio.value.pause();
    isPlaying.value = false;
  }
};

const toggleMute = () => {
  if (!audio.value) return;
  audio.value.muted = !audio.value.muted;
  isMuted.value = audio.value.muted;
};

const seek = (value: number) => {
  if (!audio.value || !duration.value) return;
  audio.value.currentTime = (value / 100) * duration.value;
};

const onTimeUpdate = () => {
  if (!audio.value) return;
  currentTime.value = audio.value.currentTime;
};

const onLoaded = () => {
  if (!audio.value) return;
  duration.value = audio.value.duration;
};

const onEnded = () => {
  isPlaying.value = false;
  currentTime.value = 0;
};

const formatTime = (time = 0) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

let observer: IntersectionObserver;

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
.mx-w {
  max-width: 1200px;
  margin: 0 auto;
}

.audio-player {
  background: #f6f7f8;
  border-radius: 12px;
  border: none;
}

.time {
  font-size: 14px;
  color: #555;
  min-width: 48px;
  text-align: center;
}

/* Slider */
.ant-slider-rail {
  background-color: #d9d9d9;
}

.ant-slider-track {
  background-color: #555;
}

.ant-slider-handle {
  border-color: #555;
}
</style>
