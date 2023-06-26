<template>
    <h1 class="sticky top-0 z-10 font-medium text-2xl mb-1 p-4 bg-white shadow-lg flex justify-between items-center">
        <slot></slot>
        <span @click="handleLogout()" class="font-small text-sm cursor-pointer">Logout</span>
    </h1>
</template>

<script lang="ts" setup>

const router = useRouter();

const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("redemed");
    localStorage.removeItem("usedCoupons")
    router.replace({ path: "/" });
}
</script>