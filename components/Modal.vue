<template>
  <transition name="toast">
    <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
  </transition>
  <div class="modal-container">
    <div class="modal-content">
      <h2 class="font-medium text-xl capitalize">{{ modalData.name }}</h2>
      <h3>Do you want to redeem this coupon?</h3>

      <div class="flex justify-between pt-5 gap-4">
        <button class="button-primary flex-1 bg-cyan-600 hover:bg-sky-700" @click="handleRedeem()">Yes</button>
                <button class="button-primary flex-1 bg-red-400 hover:bg-red-600 "
                    @click="emits('resetModal')">Cancel</button>
      </div>

      <slot></slot>
    </div>
    <div class="fixed z-19 inset-0 flex items-center justify-center bg-black bg-opacity-50"
            @click="emits('resetModal')">

        </div>
  </div>
</template>

<script setup lang="ts">
import { Api } from "../api/api";

const showToast = ref<boolean>(false);
const toastMessage = ref<string>('');
const toastStatus = ref<string>('success');

const triggerToast = (status: string, message: string) => {
  showToast.value = true;
  toastMessage.value = message;
  toastStatus.value = status;
  setTimeout(() => {
    showToast.value = false;
    toastMessage.value = '';
  }, 3000)
}

const { modalData } = defineProps(["modalData"]);
const emits = defineEmits(['resetModal', 'couponsFetch', 'triggerToast']);

const handleRedeem = async () => {
  const data = await Api.get(`/coupon/updateById/${modalData.id}`);

  emits('triggerToast', 'success', 'Copy redeemed coupon and use it in the above form.!');
  emits("couponsFetch");
  emits("resetModal");
};
</script>