<template>
  <transition name="toast">
    <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
  </transition>
  <Heading>Coupons</Heading>
  <main class="main-container">
    <h3 class="text-xl font-medium mt-10 mb-4">Use your coupons here</h3>

    <form @submit.prevent="handleUse" class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <input type="text" id="username" v-model="promoCode" required class="input">

      <div class="flex items-center justify-between">
        <button type="submit" class="button-primary bg-blue-500 hover:bg-blue-700 mt-4">
          Use
        </button>
      </div>
    </form>

    <h3 class="text-xl font-medium mt-10 mb-4">Available coupons</h3>

    <div v-for="coupon in items.filter((obj) => !obj.redeemed)" :key="coupon.id">
      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" @triggerToast="triggerToast"/>
    </div>

    <h3 class="text-xl font-medium mt-10 mb-0.5">Redeemed coupons</h3>
    <p class="mb-1">Hover or click to see the redeem codes</p>

    <div v-for="coupon in items.filter((obj) => obj.redeemed)" :key="coupon.id">
      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
    </div>

  </main>
  <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @couponsFetch="couponsFetch" @triggerToast="triggerToast">
  </Modal>
</template>


<script lang="ts" setup>
import {
  ref,
  onMounted,
  // watch
} from 'vue';
// import { useFetch } from "nuxt/app";
import { CouponType, ModalDataType } from '../utils/types';
// import { couponList } from "../utils/data";
import { Api } from "../api/api";

// const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
// const coupons = await useFetch("/api/coupon");
// const { data, pending, error, refresh } = await useFetch("/api/coupon");

const couponsFetch = async () => {
  const couponData = await Api.get("/coupon/findAll");
  items.value = couponData.data.data;
};

onMounted(() => {
  couponsFetch();
});

// let items = ref(coupons.data)

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

const promoCode = ref('');

// let redemed = ref<any>(null);
// let redemedList = ref<any>([]);
// let redemedListId = ref<any>([]);
let items = ref<CouponType[]>([]);

// onMounted(() => {
//   redemed.value = localStorage.getItem("redemed");
//   if (redemed.value) {
//     redemedList.value = JSON.parse(redemed.value);
//   }
//   redemedListId = redemedList.value.map((el: CouponType) => el.id);
//   items.value = couponList.filter((el: CouponType) => !redemedListId.includes(el.id))
// });

// watch(items, (newValue) => {
//   redemed.value = localStorage.getItem("redemed");
//   if (redemed.value) {
//     redemedList.value = JSON.parse(redemed.value);
//   }
// });

const modalData = ref<ModalDataType>({ id: null, name: null, redeemed: null, promoCode: null })

const handleRedeemButton = (item: ModalDataType) => {
  modalData.value = item;
}

const resetModal = () => {
  modalData.value = { id: null, name: null, redeemed: null, promoCode: null };
};

const handleUse = () => {
  let usedCoupons = localStorage.getItem("usedCoupons");
  let promoList = toRaw(items.value).map((el: CouponType) => el.promoCode);

  if (usedCoupons) {
    let parsedCoupons = JSON.parse(usedCoupons);
    if (parsedCoupons.includes(promoCode.value)) {
      triggerToast("error", "This promo code has already been used");
    } else if (!promoList.includes(promoCode.value)) {
      triggerToast("error", "This promo code is not valid");
    } else {
      let newPromoList : string[] =  [...parsedCoupons, promoCode.value];
      localStorage.setItem("usedCoupons", JSON.stringify(newPromoList))
      triggerToast("success", "You have successfully used this promo code");
      promoCode.value = '';
    }
  } else {
    if (!promoList.includes(promoCode.value)) {
      triggerToast("error", "This promo code is not valid");
    } else {
      let newPromoList : string[] = [promoCode.value];
      localStorage.setItem("usedCoupons", JSON.stringify(newPromoList))
      triggerToast("success", "You have successfully used this promo code");
      promoCode.value = '';
    }
  }

}

</script>