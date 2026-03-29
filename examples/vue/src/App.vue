<script setup lang="ts">
import { onMounted, onUnmounted, useTemplateRef, shallowRef } from "vue";
import { L, mapWithLabels } from "@leaflet-custom/map-with-labels";
import "leaflet/dist/leaflet.css";

// Template to the DOM element where the map will be rendered
const mapContainer = useTemplateRef<HTMLDivElement>("mapContainer");

// shallowRef: Disables reactivity for the Leaflet map instance, since Leaflet manages its own state and we don't want Vue to track it.
const leafletMap = shallowRef<L.Map | null>(null);

onMounted(() => {
  if (!mapContainer.value) return;

  // Init with custom mapWithLabels factory function, which returns a Leaflet map instance with label support
  const map = mapWithLabels(mapContainer.value).setView([47.16, 19.5], 7);
  leafletMap.value = map;

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap",
  }).addTo(map);

  // GeoJSON data load
  fetch("/hu_counties.geojson")
    .then((res) => res.json())
    .then((data) => {
      const options: L.GeoJSONOptions = {
        style: { color: "#27ae60", weight: 1.5, fillOpacity: 0.1 },
        label: (layer: Layer) => layer.feature.properties.name,
        labelPos: "cc",
        labelStyle: {
          color: "#ce1b48",
          fontSize: "13px",
          fontWeight: "600",
        },
      };

      if (leafletMap.value) {
        L.geoJson(data, options).addTo(leafletMap.value);
      }
    });
});

// Cleanup when the component is destroyed: Remove the Leaflet map instance to free up resources and prevent memory leaks.
onUnmounted(() => {
  if (leafletMap.value) {
    leafletMap.value.remove();
    leafletMap.value = null;
  }
});
</script>

<template>
  <div class="map-wrapper">
    <div ref="mapContainer" class="map-instance"></div>
  </div>
</template>

<style scoped>
.map-wrapper {
  width: 100vw;
  height: 100vh;
}
.map-instance {
  width: 100%;
  height: 100%;
}
</style>
