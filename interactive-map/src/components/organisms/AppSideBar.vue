<template>
  <div class="fixed flex flex-col top-0 left-0 justify-evenly w-[25vw] h-full z-20 transition-all">
    <LocationControls @getUserLocation="$emit('getUserLocation')" @resetView="$emit('resetView')" />
    <MarkerPanel
      :markers="markers"
      @clearMarkers="$emit('clearMarkers')"
      @redirect="$emit('redirect', $event)"
      @remove="$emit('remove', $event)"
    />
    <ThemeSwitcher @setTheme="$emit('setTheme', $event)" />
  </div>
</template>

<script setup>
import LocationControls from '../organisms/LocationControls.vue';
import MarkerPanel from '../organisms/MarkerPanel.vue';
import ThemeSwitcher from '../organisms/ThemeSwitcher.vue';
defineProps({
  markers: Array,
});
defineEmits(['getUserLocation', 'resetView', 'clearMarkers', 'redirect', 'remove', 'setTheme']);
</script>