<template>
  <img :src="src" :alt="alt" class="w-5 hover:cursor-pointer" />
</template>

<script setup>
defineProps({
  src: String,
  alt: String,
});
</script>