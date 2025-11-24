<template>
  <MapTemplate>[
    <template #overlays>
      <NotificationToast v-if="showSpan">
        Nome inválido. O marcador não foi adicionado.
      </NotificationToast>
      <LoadingSpinner v-if="showLoading" />
    </template>

    <template #ui>
      <SidebarToggle @toggle="toggleSidebar" />
      <AppSideBar
        v-if="showSideSection"
        :markers="markers"
        @getUserLocation="getUserLocation"
        @resetView="resetView"
        @clearMarkers="clearMarkers"
        @redirect="redirectTo"
        @remove="removeMarker"
        @setTheme="changeTiles"
      />
    </template>
  </MapTemplate>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/leaflet.markercluster'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { addressPoints } from '../markerDemo' 
import icon from '../assets/img/icon.png'
import icon2 from '../assets/img/icon2.png'
import 'leaflet-geometryutil'

import MapTemplate from '../components/templates/MapTemplate.vue'
import AppSideBar from '../components/organisms/AppSideBar.vue'
import SidebarToggle from '../components/atoms/SidebarToggle.vue'
import NotificationToast from '../components/atoms/NotificationToast.vue'
import LoadingSpinner from '../components/atoms/LoadingSpinner.vue'

let markersLayer = null
let leafletMap = null
let tileLayer = null
const markers = ref([])
const showSpan = ref(false)
const showLoading = ref(false)
const showSideSection = ref(true)
const isLocation = ref(false)

const myIcon = L.icon({ iconUrl: icon, iconSize: [30, 30] })
const myIcon2 = L.icon({ iconUrl: icon2, iconSize: [30, 30] })
const initialCenter = [-4.7155117, -37.3545429]
const initialZoom = 12
const darkTiles = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
const lightTiles = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const pontos = [
  [-4.711, -37.340],
  [-4.725, -37.355],
  [-4.730, -37.370],
  [-4.740, -37.385],
];

onMounted(() => {
  leafletMap = L.map('map', {
    maxBounds: [
      [-90, -180],
      [90, 180],
    ],
    maxBoundsViscosity: 1.0,
    zoomControl: false
  }).setView(initialCenter, initialZoom)

  changeTiles('light')

  const markersGroup = L.markerClusterGroup()
  addressPoints.forEach((elemento, index) => {
    const marker = L.marker([elemento.latitude, elemento.longitude], {
      icon: myIcon,
    })
    marker.bindPopup(`${elemento.name}`)
    markersGroup.addLayer(marker)
  })
  leafletMap.addLayer(markersGroup)

  markersLayer = L.layerGroup().addTo(leafletMap)

  const linha = L.polyline(pontos, {
    color: 'blue',
    weight: 4,
    opacity: 0.8,
    smoothFactor: 1
  }).addTo(leafletMap)

  const distancia = L.GeometryUtil.length(linha)
  const distanciaFormatada = (distancia / 1000).toFixed(2) + 'Km'
  linha.bindPopup(distanciaFormatada)
  
  linha.on("mouseover", () => {
    linha.setStyle({color: 'red'})
  })

  linha.on("mouseout", () => {
    linha.setStyle({color: 'blue'})
  })

  leafletMap.on('click', (e) => {
    addMarkerAt(e.latlng)
  })
})

function changeTiles(theme) {
  const url = theme === 'dark' ? darkTiles : lightTiles

  if (tileLayer) {
    leafletMap.removeLayer(tileLayer)
  }
  tileLayer = L.tileLayer(url, {
    maxZoom: 19,
    minZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(leafletMap)
}

function addMarkerAt(latlng) {
  const name = prompt('Nome do marcador:')
  if (!name) {
    showSpan.value = true
    setTimeout(() => (showSpan.value = false), 3000)
  } else {
    const marker = L.marker(latlng, {
      icon: myIcon2,
    }).addTo(markersLayer)
    marker.bindPopup(`${name}`)
    marker.openPopup()
    markers.value.push({ lat: latlng.lat, lng: latlng.lng, name: name })
  }
}

function toggleSidebar() {
  showSideSection.value = !showSideSection.value
}

function getUserLocation() {
  if (isLocation.value) return
  showLoading.value = true
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords
      leafletMap.setView([latitude, longitude], 15)
      L.marker([latitude, longitude], { icon: myIcon2 })
        .addTo(markersLayer)
        .bindPopup('Minha localização')
        .openPopup()
      markers.value.push({
        lat: latitude,
        lng: longitude,
        name: 'Minha localização',
      })
      isLocation.value = true
      showLoading.value = false
    },
    (error) => {
      console.error('Erro ao obter localização:', error)
      showLoading.value = false
      isLocation.value = false
    },
  )
}

function clearMarkers() {
  markersLayer.clearLayers()
  markers.value = []
  isLocation.value = false
}

function resetView() {
  leafletMap.setView(initialCenter, initialZoom)
}

function redirectTo(marker) {
  leafletMap.setView([marker.lat, marker.lng], initialZoom)
}

function removeMarker(index) {
  const removed = markers.value[index]
  markersLayer.removeLayer(markersLayer.getLayers()[index])
  markers.value.splice(index, 1)

  if (removed.name === 'Minha localização') {
    isLocation.value = false
  }
}
</script>
