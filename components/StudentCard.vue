<template>
  <div class="card-container mx-auto max-w-2xl">
    <div class="pr-6 py-4">
      <div class="text-xl font-bold mb-1 capitalize">
        {{ student.firstName + " " + student.lastName }}
      </div>
      <div class="text-l mb-2">{{ student.email }}</div>
      <div class="text-l mb-2">{{ student.city }}, {{ student.state }}</div>
      <div class="text-l mb-2">{{ student.zip }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { student } = defineProps(["student"]);
</script>
