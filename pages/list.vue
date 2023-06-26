<template>
  <Heading>Coupons</Heading>
  <main class="main-container">
    <h3 class="text-xl font-medium mt-10 mb-4">Use your coupons here</h3>

    <form @submit.prevent="handleUse" class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <input type="text" id="username" maxlength="6" v-model="promoCode" required
        class="input">

      <div class="flex items-center justify-between">
        <button type="submit" class="button-primary bg-blue-500 hover:bg-blue-700 mt-4">
          Use
        </button>
      </div>
    </form>

    <h3 class="text-xl font-medium mt-10 mb-4">Available coupons</h3>

    <div v-for="coupon in items.filter(el => el.canRedeem)" :key="coupon.id">
      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
    </div>

    <h3 class="text-xl font-medium mt-10 mb-0.5">Redeemed coupons</h3>
    <p class="mb-1">Hover or click to see the redeem codes</p>

    <div v-for="coupon in redemedList" :key="coupon.id">

      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
    </div>

  </main>
  <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @changeToRedeem="changeToRedeem">
  </Modal>
</template>
  
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useFetch } from 'nuxt/app';
import { CouponType, ModalDataType } from '../utils/types';
import { couponList } from '../utils/data';


// const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
const coupons = await useFetch("/api/coupon");
const { data, pending, error, refresh } = await useFetch("/api/coupon");

// let items = ref(coupons.data)

const promoCode = ref('');

let redemed = ref<any>(null);
let redemedList = ref<any>([]);
let redemedListId = ref<any>([]);
let items = ref<CouponType[]>([]);

onMounted(() => {
  redemed.value = localStorage.getItem("redemed");
  if (redemed.value) {
    redemedList.value = JSON.parse(redemed.value);
  }
  redemedListId = redemedList.value.map((el: CouponType) => el.id);
  items.value = couponList.filter((el: CouponType) => !redemedListId.includes(el.id))
});

watch(items, (newValue) => {
  redemed.value = localStorage.getItem("redemed");
  if (redemed.value) {
    redemedList.value = JSON.parse(redemed.value);
  }
});

const modalData = ref<ModalDataType>({ id: null, name: null, canRedeem: null, promoCode: null })

const handleRedeemButton = (item: ModalDataType) => {
  modalData.value = item;
}

const resetModal = () => {
  modalData.value = { id: null, name: null, canRedeem: null, promoCode: null };
}

const changeToRedeem = (id: number) => {

  let tempState = [...items.value];
  const index = tempState.findIndex(item => item.id === id);

  // If the index is -1, it means the item was not found
  if (index === -1) {
    console.log('Item not found!');
    return;
  }

  // Replace the item at the found index with the new item
  tempState[index] = { ...tempState[index], canRedeem: false };
  items.value = tempState;
}

const handleUse = () => {
  console.log("here")
}

</script>