<template>
  <transition name="toast">
    <Toast v-if="showToast" :message="toastMessage" :status="toastStatus" />
  </transition>
  <Heading>Coupons</Heading>
  <main class="main-container">
    <h3 class="text-xl font-medium mt-10 mb-4">Use your coupons here</h3>

    <form @submit.prevent="handleUse" class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4">
      <input type="text" id="username" maxlength="6" v-model="promoCode" required class="input">

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

    <div v-if="items.filter(el => el.canRedeem).length === 0" class="flex items-center justify-center">
      <img src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" class="h-48" />
    </div>

    <h3 class="text-xl font-medium mt-10 mb-0.5">Redeemed coupons</h3>
    <p v-if="redemedList.length !== 0" class="mb-1">Hover or click to see the redeem codes</p>

    <div v-for="coupon in redemedList" :key="coupon.id">

      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
    </div>

    <div v-if="redemedList.length === 0" class="flex items-center justify-center">
      <img src="https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg" class="h-48" />
    </div>

  </main>
  <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @changeToRedeem="changeToRedeem"
    @triggerToast="triggerToast">
  </Modal>
</template>
  
  
<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useFetch, useRouter } from 'nuxt/app';
import { CouponType, ModalDataType } from '../utils/types';
import { couponList } from '../utils/data';

const router = useRouter();

onMounted(() => {
  let token = localStorage.getItem("token");
  if (token) {

  } else {
    router.replace({ path: "/" });
  }
});

// const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
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

onMounted(() => {
  let token = localStorage.getItem("token");
  if (token) {
    router.replace({ path: "/list" });
  }
});

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
  let usedCoupons = localStorage.getItem("usedCoupons");
  let promoList = couponList.map((el: CouponType) => el.promoCode);

  let redemedListTemp = redemedList.value.map((el:any) => el.promoCode);
  console.log("val", redemedListTemp)

  if (usedCoupons) {
    let parsedCoupons = JSON.parse(usedCoupons);
    if (parsedCoupons.includes(promoCode.value)) {
      triggerToast("error", "This promo code has already been used");
    } else if (!promoList.includes(promoCode.value) || !redemedListTemp.includes(promoCode.value)) {
      triggerToast("error", "This promo code is not valid");
    } else {
      let newPromoList: string[] = [...parsedCoupons, promoCode.value];
      localStorage.setItem("usedCoupons", JSON.stringify(newPromoList))
      triggerToast("success", "You have successfully used this promo code");
      promoCode.value = '';
    }
  } else {
    if (!promoList.includes(promoCode.value) || !redemedListTemp.includes(promoCode.value)) {
      triggerToast("error", "This promo code is not valid");
    } else {
      let newPromoList: string[] = [promoCode.value];
      localStorage.setItem("usedCoupons", JSON.stringify(newPromoList))
      triggerToast("success", "You have successfully used this promo code");
      promoCode.value = '';
    }
  }

}

</script>