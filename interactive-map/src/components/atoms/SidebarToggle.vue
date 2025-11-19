<template>
  <div
    class="fixed w-10 top-4 left-4 bg-[#293447] z-30 hover:cursor-pointer rounded-md shadow-lg flex items-center justify-center hover:scale-110"
    @click="handleToggle"
  >
  <img src="../../assets/img/menu.png" alt="menu">
  </div>
</template>

<script setup>
const emit = defineEmits(['toggle']);

function handleToggle() {
  emit('toggle')
}
</script>