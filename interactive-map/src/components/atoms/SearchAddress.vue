<template>
<div class="flex gap-4 mx-4 p-2 bg-[#1E293B] text-white rounded-md ">
    <input
        v-model="address"
        type="text"
        placeholder="Digite um endereço..."
        class="w-full p-2 rounded bg-gray-800 border border-gray-700 outline-none"
    />

    <div class="flex gap-2 justify-center p-2 items-center">
        <img
            src="../../assets/img/search.png"
            alt="search"
            @click="search"
            class="w-8 hover:cursor-pointer"
        >

        <img
            src="../../assets/img/close.png"
            alt="close"
            @click="close"
            class="w-11 hover:cursor-pointer"
        >
    </div>

    <NotificationToast v-if="showInvalidAddress">
        Digite um endereço válido
    </NotificationToast>

    <NotificationToast v-if="showAddressNotFound">
        Endereço não encontrado
    </NotificationToast>

    <LoadingSpinner v-if="showLoading"/>
</div>
</template>

<script setup>
import { ref } from "vue";
import NotificationToast from "./NotificationToast.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

const props = defineProps({
    map: Object,
});
const emit = defineEmits(["found"]);
const address = ref("");
const showInvalidAddress = ref(false)
const showAddressNotFound = ref(false)
const showLoading = ref(false)

async function search() {
    showLoading.value = true

    if (!address.value.trim()) {
        showInvalidAddress.value = true
        setTimeout(() => (showInvalidAddress.value = false), 3000)
        showLoading.value = false
        return;
    }

    try {
    const response = await fetch(`/api/location?q=${endereco}`);
    const data = await response.json();

    if (data.length === 0) {
        showAddressNotFound.value = true
        setTimeout(() => (showAddressNotFound.value = false), 3000)
        showLoading.value = false
        return;
    }

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);

    emit("found", {
        lat,
        lon,
        address: address.value
    }); 

    showLoading.value = false

    } catch (error) {
        console.error("Erro ao buscar endereço:", error);
    }
}

function close() {
    address.value = ''
}

document.addEventListener('keydown', (e) => {
    if(e.key == 'Enter'){
        return search()
    } 
})

</script>

<style scoped></style>
