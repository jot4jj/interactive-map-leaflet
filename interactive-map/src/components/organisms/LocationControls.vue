<template>
  <div class="flex mx-4 bg-[#1e293b] text-gray-200 rounded-lg p-4 gap-12 justify-between">
    <div class="w-full">
      <BaseButton @click="$emit('getUserLocation')">Minha Localização</BaseButton>
    </div>
    <div class="w-full">
      <BaseButton @click="$emit('resetView')">Voltar ao centro</BaseButton>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../atoms/BaseButton.vue';
defineEmits(['getUserLocation', 'resetView']);
</script>