<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    class="bg-[#3b82f6] hover:bg-[#2563eb] text-white p-2 rounded-md hover:cursor-pointer text-sm w-full"
    :class="{ 'disabled:bg-[#2356a8] disabled:cursor-no-drop': disabled }"
  >
    <slot />
  </button>
</template>

<script setup>
defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
});
defineEmits(['click']);
</script>