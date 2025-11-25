<template>
<div class="w-full flex gap-2 p-4 bg-gray-900 text-white">
    <input
        v-model="address"
        type="text"
        placeholder="Digite um endereço..."
        class="w-full p-2 rounded bg-gray-800 border border-gray-700 outline-none"
    />

    <button
        @click="search"
        class="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded transition"
    >
        Buscar
    </button>
</div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
    map: Object,
});

const emit = defineEmits(["found"]);

const address = ref("");

async function search() {
    if (!address.value.trim()) {
        alert("Digite um endereço.");
        return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        address.value
    )}&format=json&limit=1`;

    try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.length === 0) {
        alert("Endereço não encontrado!");
        return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    emit("found", {
        lat,
        lon,
        address: address.value
    });

    } catch (error) {
        console.error("Erro ao buscar endereço:", error);
    }
}
</script>

<style scoped></style>
