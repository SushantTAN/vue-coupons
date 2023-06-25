<template>
    
    <main class="min-h-screen">
        <div class="flex justify-center items-center h-screen">
            <div class="max-w-md w-full">
                <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
                <form @submit.prevent="handleLoginClick" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Username:</label>
                        <input type="text" id="username" v-model="username" required
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password:</label>
                        <input type="password" id="password" v-model="password" required
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                    </div>
                    <div class="flex items-center justify-between">
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>
  
  
<script lang="ts" setup>
import { useRouter } from 'nuxt/app';

const router = useRouter();

const username = ref('');
const password = ref('');

const handleLoginClick = () => {

    if (username.value === 'admin' && password.value === 'admin') {
        // localStorage.setItem("token", "1234567890")
        router.push({ path: "/list" });
    }
    // Clear the form fields after login
    username.value = '';
    password.value = '';
}

</script>