<template>
  <div id="map" class="w-full h-[600px]"></div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted } from "vue";

onMounted(() => {
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = ""; // ✅ Ensure clean container
  // ✅ Use your token here
  mapboxgl.accessToken =
    "pk.eyJ1Ijoib3NhbWFobmluaSIsImEiOiJjbWNndmE3MmkwMDI2MmpwZGZvMTIyczRhIn0.RgZk3DMsQwuLxPX9KosalQ";

  const map = new mapboxgl.Map({
    container: "map", // matches the div id
    style: "mapbox://styles/mapbox/streets-v12", // Mapbox style
    center: [35.22, 31.96], // [lng, lat]
    zoom: 10,
  });

  // Optional: Add zoom & rotation controls
  map.addControl(new mapboxgl.NavigationControl());

  // Optional: Add marker example
  new mapboxgl.Marker({ color: "#1f6fb6" })
    .setLngLat([35.22, 31.96])
    .setPopup(new mapboxgl.Popup().setText("Flowless HQ"))
    .addTo(map);
});
</script>

<style>
#map {
  width: 100%;
  height: 100vh;
}
</style>
