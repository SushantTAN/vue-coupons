<template>
    <div class="relative">
      <button @mouseenter="showTooltip = true" @mouseleave="showTooltip = false"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Hover me
      </button>
      <div v-if="showTooltip" class="absolute bg-gray-800 text-white px-2 py-1 text-sm rounded shadow-lg">
        {{ tooltipText }}
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const showTooltip = ref(false);
  const tooltipText = ref("This is a tooltip");
  
  </script>
  
  <style>
  .relative {
    /* Add any custom styles here */
    display: inline-block;
  }
  
  .absolute {
    /* Add any custom styles here */
    top: 120%;
    left: 50%;
    transform: translateX(-50%);
  }
  </style>