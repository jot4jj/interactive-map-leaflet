<template>
  <div
    class="fixed top-4 left-4 w-10 h-10 bg-amber-50 z-30 hover:cursor-pointer rounded-md shadow-lg flex items-center justify-center"
    @click="handleToggle"
  >
  dasda
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle']);

function handleToggle() {
  emit('toggle')
}
</script>