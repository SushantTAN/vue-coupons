<template>
    <Heading>Coupons</Heading>
    <main class="main-container">
  
      <div v-for="coupon in items" :key="coupon.id">
        <CouponCard :data="coupon" @handleRedeemButton="handleRedeemButton" />
      </div>
  
    </main>
    <Modal v-if="modalData.id !== null" :modalData="modalData" @resetModal="resetModal" @changeToRedeem="changeToRedeem">
    </Modal>
  </template>
  
  
  <script lang="ts" setup>
  import {ref} from 'vue';
  import { useFetch } from 'nuxt/app';
  import { CouponType, ModalDataType } from '../utils/types';
  import { couponList } from '../utils/data';
  
  
  // const test = await useFetch("/api/coupon", {method: "POST", body: {test: 'test'}});
  const coupons = await useFetch("/api/coupon");
  const { data, pending, error, refresh } = await useFetch("/api/coupon");

  console.log("coupons",toRaw(data))
  // let items = ref(coupons.data)
  
  let items = ref<CouponType[]>(couponList);
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