<template>
    <div class="toast-wrapper">
        <div class="toast" :class="status === 'success' ? 'bg-green-400 hover:bg-green-600' : 'bg-red-400 hover:bg-red-600' ">
            {{message}}
        </div>
    </div>
</template>

<script lang="ts" setup>
    const { status, message } = defineProps(["status", "message"]);
</script>

  
<style>
.toast-wrapper {
    position: fixed;
    width: 90%;
    top: 20px;
    right: 10px;
    z-index: 30;
}

.toast {
    padding: 20px;
    color: white;
    
    border-radius: 10px;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
    max-width: 400px;
    margin: 0 10px 0px auto;
}
</style>