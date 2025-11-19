<template>
  <li class="flex justify-between items-center bg-[#293447] p-2 rounded-xl">
    <span class="truncate flex-1">
      <strong>{{ index + 1 }}.</strong>
      {{ marker.name }}
      <p class="text-gray-400 text-sm">
        (Lat {{ marker.lat.toFixed(4) }}, Lng {{ marker.lng.toFixed(4) }})
      </p>
    </span>

    <div class="flex">
      <button @click="$emit('redirect', marker)" class="p-1 text-sm rounded-md">
        <BaseIcon src="/src/assets/img/redirect.png" alt="redirect" />
      </button>
      <button @click="$emit('remove', index)">
        <BaseIcon src="/src/assets/img/delete.png" alt="delete" />
      </button>
    </div>
  </li>
</template>

<script setup>
import BaseIcon from '../atoms/BaseIcon.vue';
defineProps({
  marker: Object,
  index: Number,
});
defineEmits(['redirect', 'remove']);
</script>