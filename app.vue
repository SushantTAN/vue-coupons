<template>
  <Heading>Coupons</Heading>
  <main class="main-container">

    <div v-for="coupon in items" :key="coupon.id">
      <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
    </div>

    <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @changeToRedeem="changeToRedeem">
    </Modal>
   
  </main>
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
  { id: 2, name: 'test 2', canRedeem: true, promoCode: "900fwf" },
  { id: 3, name: 'test 3', canRedeem: true, promoCode: "900fwf" },
  { id: 4, name: 'test 4', canRedeem: true, promoCode: "900fwf" },
  { id: 5, name: 'test 5', canRedeem: true, promoCode: "900fwf" },
  { id: 6, name: 'test 6', canRedeem: true, promoCode: "900fwf" },
  { id: 7, name: 'test 7', canRedeem: true, promoCode: "900fwf" },
  { id: 8, name: 'test 8', canRedeem: true, promoCode: "900fwf" },
])
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

</script>