<template>
  <div
    class="justify-between items-center z-10 flex gap-8 p-4 mx-4 bg-[#1e293b] rounded-lg shadow-lg"
  >
    <div class="w-full">
      <p class="text-gray-200 text-sm">Tema do mapa</p>
    </div>
    <div class="flex gap-2 text-gray-200 w-full">
      <BaseButton @click="$emit('setTheme', 'light')">Claro</BaseButton>
    </div>
    <div class="flex gap-2 text-gray-200 w-full">
      <BaseButton @click="$emit('setTheme', 'dark')">Escuro</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../atoms/BaseButton.vue';
defineEmits(['setTheme']);
</script>