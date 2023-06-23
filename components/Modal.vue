<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="showModal.value = !showModal.value">
        <div class="bg-white rounded-lg p-8">
            <!-- Modal content --> Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique impedit beatae fugiat eum perferendis cum placeat, aut at error quo provident voluptatum excepturi officia veniam, maiores possimus iusto sed voluptate!
            <slot></slot>
        </div>
    </div>
</template>
  
<script setup>
const { showModal } = defineProps(['showModal']);

</script>
  
<style scoped>
/* Add any additional styles for the modal here */
</style>