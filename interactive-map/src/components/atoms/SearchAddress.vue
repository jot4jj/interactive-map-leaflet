<template>
<div class="w-full flex mx-4 p-2 bg-[#1E293B] text-white rounded-md">
    <input
        v-model="address"
        type="text"
        placeholder="Digite um endereço..."
        class="w-full p-2 rounded bg-gray-800 border border-gray-700 outline-none"
    />
    <BaseButton
        @click="search"    
    >
        Buscar
    </BaseButton>
</div>
</template>

<script setup>
import { ref } from "vue";
import BaseButton from "./BaseButton.vue";

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

    const url = `http://localhost:3001/geocode?q=${encodeURIComponent(
        address.value
    )}`;

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

    console.log(address.value)

    } catch (error) {
        console.error("Erro ao buscar endereço:", error);
    }
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        return search()
    } 
})

</script>

<style scoped></style>
