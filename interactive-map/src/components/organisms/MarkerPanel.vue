<template>
  <div
    class="h-[30vw] mx-4 p-4 rounded-xl bg-[#1e293b] text-gray-200 shadow-xl overflow-y-auto flex justify-between"
  >
    <div class="flex-col w-full">
      <div class="flex justify-between items-center w-full gap-8">
        <p class="text-sm">Marcadores ({{ markers.length }})</p>
        <div>
          <BaseButton @click="$emit('clearMarkers')" :disabled="markers.length === 0">
            Limpar marcadores
          </BaseButton>
        </div>
      </div>

      <div class="flex flex-col w-full justify-between mt-2">
        <div class="flex justify-center text-center w-full">
          <p v-if="markers.length === 0" class="text-sm text-gray-200">
            Nenhum marcador adicionado.
          </p>
        </div>
        <ul class="space-y-4 w-full">
          <MarkerListItem
            v-for="(marker, i) in markers"
            :key="i"
            :marker="marker"
            :index="i"
            @redirect="$emit('redirect', $event)"
            @remove="$emit('remove', $event)"
          />
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseButton from '../atoms/BaseButton.vue';
import MarkerListItem from '../molecules/MarkerListItem.vue';
defineProps({
  markers: Array
})
defineEmits(['clearMarkers', 'redirect', 'remove' ]);
</script>