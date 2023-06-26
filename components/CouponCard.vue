<template>
  <transition name="toast">
      <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
  </transition>
  <div :key="data.id" class="card-container">
      <div class="pr-6 py-4">
          <div class="text-xl mb-2 capitalize">{{ data.name }}</div>
      </div>

      <button :disabled="data.redeemed" @click="emits('handleRedeemButton', data);"
          class="button-primary">Redeem</button>

      <div v-if="data.redeemed" class="promo-container">
          <p class="text-white">Your promo code is:</p>
          <h3 @click="copyToClipboard(data.promoCode)"
              class="text-white cursor-pointer text-2xl tracking-wider font-medium">{{ data.promoCode }}</h3>
      </div>
  </div>
</template>

<script lang="ts" setup>
const { data } = defineProps(["data"]);

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

const emits = defineEmits(['handleRedeemButton']);

const copyToClipboard = (text: string) => {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  triggerToast("success", "Copied to clipboard");
}
</script>