<template>
  <Heading>Coupons</Heading>

  <div v-for="coupon in items" :key="coupon.id"
    class="relative transition-colors duration-500 hover:bg-gray-100 rounded mb-4 overflow-hidden shadow-lg flex align items-center justify-between px-4">
    <div class="pr-6 py-4">
      <div class="text-xl mb-2">{{ coupon.name }}</div>
    </div>

    <button :disabled="!coupon.canRedeem" @click="handleRedeemButton(coupon)"
      class="transition-colors duration-1000 bg-cyan-500 hover:bg-sky-700 disabled:bg-gray-300 text-white px-2 py-1 rounded">Redeem</button>
    
      <div v-if="!coupon.canRedeem" class="transition-all duration-500 opacity-0 hover:opacity-100 absolute left-0 top-0 w-full h-full flex items-center justify-center bg-cyan-600 flex-col" >
        <p>Your promo code is:</p>
        <h3>{{ coupon.promoCode }}</h3>
      </div>
  </div>

  <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @changeToRedeem="changeToRedeem">
    </Modal>
  <!-- Card Flip -->
  <!-- <div class="card-flip">
          <div class="flip">
            <div class="front">
              
              <div style="background-color: green;">
                aaaaaaaaaaaaa
              </div>
            </div>
            <div class="back">
              
              <div style="background-color: red;">
                vbbbbbbbbbbbbb
              </div>
            </div>
          </div>
        </div> -->
  <!-- End Card Flip -->
</template>


<script lang="ts" setup>

interface CouponType {
  id: number;
  name: string;
  canRedeem: boolean;
  promoCode: string;
}

interface ModalDataType {
  id: number | null;
  name: string | null;
  canRedeem: boolean | null;
  promoCode: string | null;
}
// const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
const coupons = await useFetch("/api/coupon");
// let items = ref(coupons.data)
let items = ref<CouponType[]>([
  { id: 1, name: 'test gdagdag cia u ', canRedeem: true, promoCode: "123wwd" },
  { id: 2, name: 'test 2', canRedeem: true, promoCode: "123wwd" },

])
const modalData = ref<ModalDataType>({ id: null, name: null, canRedeem: null, promoCode: null })

const handleRedeemButton = (item: ModalDataType) => {
  modalData.value = item;
}

const resetModal = (item: ModalDataType) => {
  modalData.value = { id: null, name: null, canRedeem: null, promoCode: null };
}

const changeToRedeem = (id:number) => {
  
  let tempState = [...items.value];
  const index = tempState.findIndex(item => item.id === id);

  // If the index is -1, it means the item was not found
  if (index === -1) {
    console.log('Item not found!');
    return;
  }

  // Replace the item at the found index with the new item
  tempState[index] = {...tempState[index], canRedeem: false};
  items.value = tempState;
}

</script>