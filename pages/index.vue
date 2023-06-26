<template>
  <main class="min-h-screen p-6">
    <div class="flex">
      <div class="w-full">
        <h2 class="text-3xl font-bold">Login</h2>
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
    <div class="flex mt-10 mb-10 items-center">
      <h2 class="text-3xl font-bold mr-10">Student List</h2>

      <h3
        class="text-xl font-medium mr-10 px-8 py-1 rounded-lg bg-red-100 cursor-pointer"
        @click="handleAddStudentModal()"
      >
        ADD
      </h3>
    </div>

    <div v-for="student in studentListData?.data" :key="student.id">
      <StudentCard :student="student" />
    </div>
  </main>
  <AddStudentModal
    v-if="openAddStudentModal"
    @resetModal="resetModal"
    @findAllStudent="findAllStudent"
  />
</template>

<script lang="ts" setup>
// import mockApi from "../api/mock/index";
import { useRouter } from "nuxt/app";
import { Api } from "../api/api";

const openAddStudentModal = ref<boolean>(false);
const router = useRouter();
const studentListData = ref();
// mockApi({ delayResponse: 800, onNoMatch: "passthrough" });

const findAllStudent = async () => {
  const tempData = await Api.get("/student/findAll");
  studentListData.value = tempData.data;
};

onMounted(() => {
  findAllStudent();
});

const handleAddStudentModal = () => {
  openAddStudentModal.value = true;
};

const resetModal = () => {
  openAddStudentModal.value = false;
};

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
