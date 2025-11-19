<template>
  <Transition name="slide-fade" appear>
    <div
      class="fixed flex flex-col top-0 left-0 justify-evenly w-[25vw] h-full z-10 bg-[rgba(0,0,0,0.6)]"
    >
      <LocationControls
        @getUserLocation="$emit('getUserLocation')"
        @resetView="$emit('resetView')"
      />
      <MarkerPanel
        :markers="markers"
        @clearMarkers="$emit('clearMarkers')"
        @redirect="$emit('redirect', $event)"
        @remove="$emit('remove', $event)"
      />
      <ThemeSwitcher @setTheme="$emit('setTheme', $event)" />
    </div>
  </Transition>
</template>

<script setup>
import { Transition } from "vue";
import LocationControls from "../organisms/LocationControls.vue";
import MarkerPanel from "../organisms/MarkerPanel.vue";
import ThemeSwitcher from "../organisms/ThemeSwitcher.vue";
defineProps({
  markers: Array,
});
defineEmits([
  "getUserLocation",
  "resetView",
  "clearMarkers",
  "redirect",
  "remove",
  "setTheme",
]);
</script>

<style scoped>
.slide-fade-enter-active {
  transition: transform 0.2s ease-out, opacity 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: transform 0.2s ease-in, opacity 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>