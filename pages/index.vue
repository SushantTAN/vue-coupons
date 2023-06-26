<template>
    <transition name="toast">
        <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
    </transition>
    <main class="min-h-screen">
        <div class="flex justify-center items-center h-screen">
            <div class="max-w-md w-full">
                <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
                <form @submit.prevent="handleLoginClick" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div class="mb-4">
                        <label for="username" class="label">Username:</label>
                        <input type="text" id="username" v-model="username" required class="input">
                    </div>
                    <div class="mb-6">
                        <label for="password" class="label">Password:</label>
                        <input type="password" id="password" v-model="password" required class="input">
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
import { LoginResponse } from '~/utils/types';

const router = useRouter();

const username = ref('');
const password = ref('');

const showToast = ref<boolean>(false);
const toastMessage = ref<string>('');
const toastStatus = ref<string>('success');

onMounted(()=> {
    let token = localStorage.getItem("token");
    if(token) {
        router.replace({ path: "/list" });
    }
});

const triggerToast = (status: string, message: string) => {
    showToast.value = true;
    toastMessage.value = message;
    toastStatus.value = status;
    setTimeout(() => {
        showToast.value = false;
        toastMessage.value = '';
    }, 3000)
}

const handleLoginClick = async () => {

    const { data, pending, error, refresh } = await useFetch("/api/login", { method: "POST", body: { username, password } });

    let response = toRaw(data.value) as LoginResponse;

    if (response?.status === 200) {
        localStorage.setItem("token", response.token || '')
        router.replace({ path: "/list" });
    }
    if (response?.status === 400) {
        triggerToast("error", response?.message);
    }

    // Clear the form fields after login
    username.value = '';
    password.value = '';
}

</script>