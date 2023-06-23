<template>
  <Heading>Coupons</Heading>

  <div v-for="coupon in items" :key="coupon.id"
    class="transition-colors duration-500 hover:bg-gray-100 rounded mb-4 overflow-hidden shadow-lg flex align items-center justify-between px-4">
    <div class="pr-6 py-4">
      <div class="text-xl mb-2">{{ coupon.name }}</div>
    </div>

    <button :disabled="!coupon.canRedeem" @click="handleRedeemButton(coupon)"
      class="transition-colors duration-1000 bg-cyan-500 hover:bg-sky-700 disabled:bg-gray-300 text-white px-2 py-1 rounded">Redeem</button>
    <Modal v-if="showModal" :modalData="coupon" :showModal="showModal">
    </Modal>
  </div>
</template>


<script lang="ts" setup>

interface CouponType {
  id: number;
  name: string;
  canRedeem: boolean;
}

interface ModalDataType {
  id: number | null;
  name: string | null;
  canRedeem: boolean | null;
}
// const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
const coupons = await useFetch("/api/coupon");
// let items = ref(coupons.data)
let items = ref<CouponType[]>([
  { id: 1, name: 'test gdagdag cia u ', canRedeem: true, },
  { id: 2, name: 'test 2', canRedeem: true, },
  
])

const showModal = ref<boolean>(false);

const modalData = ref<ModalDataType>({ id: null, name: null, canRedeem: null, })

const handleRedeemButton = (item: ModalDataType) => {
  showModal.value = !showModal.value;
  modalData.value = item;
}

</script>