<template>
    <div class="fixed flex items-center justify-center h-full w-full top-0">
        <div class="h-auto max-h-full bg-white rounded-lg p-8 z-10 w-full">
            <!-- <span @click="emits('resetModal')">close</span> -->
            <h2 class="font-medium text-xl capitalize">{{ modalData.name }}</h2>
            <h3>Do you want to redeem this coupon?</h3>

            <div class="flex justify-between pt-5 gap-1">
                <button class="flex-1 transition-colors duration-1000 bg-cyan-600 hover:bg-sky-700 disabled:bg-gray-300 text-white px-4 py-1 rounded" @click="handleRedeem()">Yes</button>
                <button class="flex-1 transition-colors duration-1000 bg-red-400 hover:bg-red-600 disabled:bg-gray-300 text-white px-4 py-1 rounded" @click="emits('resetModal')">Cancel</button>

            </div>

            <slot></slot>
        </div>
        <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="emits('resetModal')">

        </div>
        
    </div>
</template>
  
<script setup>
const { modalData } = defineProps(["modalData"]);


const emits = defineEmits(['resetModal', 'changeToRedeem']);

const handleRedeem = () => {
    emits('changeToRedeem', modalData.id);
    emits('resetModal');
}


</script>
  
<style scoped>
/* Add any additional styles for the modal here */
</style>