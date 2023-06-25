<template>
    <div :key="data.id"
        class="card-container">
        <div class="pr-6 py-4">
            <div class="text-xl mb-2 capitalize">{{ data.name }}</div>
        </div>

        <button :disabled="!data.canRedeem" @click="emits('handleRedeemButton', data);"
            class="button-primary">Redeem</button>

        <div v-if="!data.canRedeem"
            class="promo-container">
            <p class="text-white">Your promo code is:</p>
            <h3 class="text-white text-2xl tracking-wider font-medium">{{ data.promoCode }}</h3>
        </div>
    </div>
</template>

<script lang="ts" setup>
const { data } = defineProps(["data"]);
const emits = defineEmits(['handleRedeemButton']);
</script>