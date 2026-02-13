<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map"></div>

    <!-- Bouton Recentrer -->
    <button class="recenter-btn" @click="recenterMap">⤾ Recentrer</button>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const mapContainer = ref(null);
const mapInstance = ref(null);

const lat = 45.4281667;
const lng = -75.5048047;

const recenterMap = () => {
  if (mapInstance.value) {
    mapInstance.value.setView([lat, lng], 17, {
      animate: true,
      duration: 1.2,
    });
  }
};

onMounted(async () => {
  const L = await import("leaflet");

  const map = L.map(mapContainer.value).setView([lat, lng], 17);
  mapInstance.value = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors",
  }).addTo(map);

  const marker = L.marker([lat, lng], {
    draggable: false,
  }).addTo(map);

  marker.bindPopup(`
      <div style="text-align:center">
        <strong>Temple of Hallel</strong><br/>
        3349 Navan Rd, Ottawa<br/><br/>
        <a 
          href="https://www.google.com/maps?q=45.4281667,-75.5048047" 
          target="_blank"
          style="
            background:#2563eb;
            color:white;
            padding:8px 12px;
            border-radius:6px;
            text-decoration:none;
            font-size:14px;
          ">
          📍 Ouvrir dans Google Maps
        </a>
      </div>
    `);

  marker.openPopup();
});
</script>

<style>
.map-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  transition: transform 0.4s ease, box-shadow 0.4s ease;
}

.map-wrapper:hover {
  transform: scale(1.02);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.map {
  height: 450px;
  width: 100%;
}

/* Bouton */
.recenter-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  border: none;
  padding: 10px 14px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 99999;
  font-weight: 600;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
}

.recenter-btn:hover {
  background: #2563eb;
  color: white;
  transform: translateY(-2px);
}
</style>
