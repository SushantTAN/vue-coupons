<template>
  <div class="modal-container">
    <div class="modal-content max-w-4xl">
      <div class="w-full">
        <h2 class="text-3xl font-bold">Login</h2>
        <form
          @submit.prevent="addStudentClick"
          class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div class="mb-4">
            <label for="username" class="label">Email:</label>
            <input
              type="text"
              id="email"
              v-model="email"
              required
              class="input"
            />
          </div>

          <div class="mb-4">
            <label for="password" class="label">First Name:</label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              required
              class="input"
            />
          </div>

          <div class="mb-4">
            <label for="username" class="label">Last Name:</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              required
              class="input"
            />
          </div>

          <div class="mb-4">
            <label for="username" class="label">City:</label>
            <input
              type="text"
              id="city"
              v-model="city"
              required
              class="input"
            />
          </div>

          <div class="mb-4">
            <label for="username" class="label">State:</label>
            <input
              type="text"
              id="state"
              v-model="state"
              required
              class="input"
            />
          </div>

          <div class="mb-6">
            <label for="username" class="label">Zip:</label>
            <input type="text" id="zip" v-model="zip" required class="input" />
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

    <div
      class="fixed z-19 inset-0 flex items-center justify-center bg-black bg-opacity-50"
      @click="emits('resetModal')"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { Api } from "../api/api";

const email = ref<string>("");
const firstName = ref<string>("");
const lastName = ref<string>("");
const city = ref<string>("");
const state = ref<string>("");
const zip = ref<string>("");

const emits = defineEmits(["resetModal", "findAllStudent"]);

const addStudentClick = async () => {
  let obj = {
    email: email.value,
    firstName: firstName.value,
    lastName: lastName.value,
    city: city.value,
    state: state.value,
    zip: zip.value,
    sent: false,
  };

  await Api.post("/student/add", obj);

  emits("findAllStudent");
  emits("resetModal");
};
</script>
