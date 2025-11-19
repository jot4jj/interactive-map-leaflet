<template>
  <div class="relative w-screen h-screen bg-[#0f172a]">
    <slot name="overlays"></slot>

    <div id="map" class="w-screen h-screen z-0"></div>

    <slot name="ui"></slot>
  </div>
</template>