<template>
  <div class="relative">
    <div id="map" class="w-full h-[600px] rounded-lg overflow-hidden border border-gray-200"></div>

    <!-- 🧩 Asset Info Panel -->
    <AssetDetailsPanel
      :visible="panelVisible"
      :asset="selectedAsset"
      @close="panelVisible = false"
    />
  </div>
</template>

<script setup>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { onMounted, ref } from "vue";
import AssetDetailsPanel from "./AssetDetailsPanel.vue";

const selectedAsset = ref(null);
const panelVisible = ref(false);

onMounted(() => {
  // Clean the container
  const mapContainer = document.getElementById("map");
  mapContainer.innerHTML = "";

  // Mapbox token
  mapboxgl.accessToken =
    "pk.eyJ1Ijoib3NhbWFobmluaSIsImEiOiJjbWNndmE3MmkwMDI2MmpwZGZvMTIyczRhIn0.RgZk3DMsQwuLxPX9KosalQ";

  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: [35.22, 31.96],
    zoom: 10,
  });

  map.addControl(new mapboxgl.NavigationControl());
  // coordinate display container
  const coordDiv = document.createElement("div");
  coordDiv.style.position = "absolute";
  coordDiv.style.bottom = "0 px";
  coordDiv.style.left = "10px";
  coordDiv.style.top = "10px";

  coordDiv.style.background = "white";
  coordDiv.style.padding = "4px 8px";
  coordDiv.style.borderRadius = "4px";
  coordDiv.style.fontSize = "12px";
  coordDiv.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
  coordDiv.style.pointerEvents = "none";
  coordDiv.innerText = "Lon: -- Lat: --";
  map.getContainer().appendChild(coordDiv);

  // Update coordinates when mouse moves
  map.on("mousemove", (e) => {
    coordDiv.innerText = `Lon: ${e.lngLat.lng.toFixed(4)} Lat: ${e.lngLat.lat.toFixed(4)}`;
  });
  // Example GeoJSON
  const geojsonData = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {
          id: "p-23c784d71069",
          label: "Destination Flowmeter",
          category: "flow_meter",
          manufacturer: "FlowTech Industries",
          model: "WF-7500",
          serial: "123456789",
          is_active: true,
          notes: "Installed 2024, calibrated quarterly.",
        },
        geometry: {
          type: "Point",
          coordinates: [35.22, 31.96],
        },
      },
    ],
  };

  // Load the source and layer
  map.on("load", () => {
    map.addSource("flowmeters", { type: "geojson", data: geojsonData });

    map.addLayer({
      id: "flowmeter-points",
      type: "circle",
      source: "flowmeters",
      paint: {
        "circle-radius": 8,
        "circle-color": ["case", ["==", ["get", "is_active"], true], "#1f6fb6", "#9ca3af"],
        "circle-stroke-width": 2,
        "circle-stroke-color": "#fff",
      },
    });

    // ✅ Fix: use DOMContentLoaded event binding
    map.on("click", "flowmeter-points", (e) => {
      const feature = e.features[0];
      const props = feature.properties;
      const coords = feature.geometry.coordinates;

      const popup = new mapboxgl.Popup({ offset: 15 })
        .setLngLat(coords)
        .setHTML(
          `
    <div style="font-size:13px; line-height:1.4; max-width:220px;">
      <b>${props.label}</b><br/>
      <b>ID:</b> ${props.id}<br/>
      <b>Category:</b> ${props.category}<br/>
      <b>Status:</b> ${
        props.is_active
          ? "<span style='color:green;'>Active</span>"
          : "<span style='color:red;'>Inactive</span>"
      }<br/>
      <hr style="margin:6px 0;"/>
    
      <button id="details-btn" style="
        background:#6b7280;color:white;border:none;border-radius:4px;
        padding:4px 8px;cursor:pointer;">Details</button>
    </div>
  `
        )
        .addTo(map);

      // 🧠 Wait for the popup DOM to render before binding events
      setTimeout(() => {
        const detailsBtn = document.getElementById("details-btn");

        if (detailsBtn) {
          detailsBtn.onclick = () => {
            selectedAsset.value = props;
            panelVisible.value = true;
          };
        }
      }, 50); // small delay ensures buttons exist in DOM
    });

    map.on("mouseenter", "flowmeter-points", () => {
      map.getCanvas().style.cursor = "pointer";
    });
    map.on("mouseleave", "flowmeter-points", () => {
      map.getCanvas().style.cursor = "";
    });
  });
});
</script>

<style>
#map {
  width: 100%;
  height: 600px;
}
</style>
