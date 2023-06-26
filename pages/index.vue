<template>
  <main class="min-h-screen">
    <div class="flex justify-center items-center h-screen">
      <div class="max-w-md w-full">
        <h2 class="text-3xl font-bold mb-6 text-center">Login</h2>
        <form
          @submit.prevent="handleLoginClick"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label for="username" class="label">Username:</label>
            <input
              type="text"
              id="username"
              v-model="username"
              required
              class="input"
            />
          </div>
          <div class="mb-6">
            <label for="password" class="label">Password:</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="input"
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
// import mockApi from "../api/mock/index";
import { useRouter } from "nuxt/app";
import { Api } from "../api/api";

const router = useRouter();
// mockApi({ delayResponse: 800, onNoMatch: "passthrough" });

const username = ref("");
const password = ref("");

const handleLoginClick = async () => {
  if (username.value && password.value) {
    const data = await Api.post("/login", {
      email: username.value,
      password: password.value,
    });

    if (data) {
      localStorage.setItem("userDetails", JSON.stringify(data.data));
      router.replace({ path: "/list" });
    }
  }
  // Clear the form fields after login
  username.value = "";
  password.value = "";
};
</script>
