<template>
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
import { CouponType } from "~/utils/types";

const { modalData } = defineProps(["modalData"]);
const emits = defineEmits(['resetModal', 'changeToRedeem', 'triggerToast']);

const handleRedeem = () => {
    let redemed = localStorage.getItem("redemed");
    var redemedList = [];
    if (redemed) {
        let parsed = JSON.parse(redemed);
        let findEntry = parsed.find((el: CouponType) => el.id === modalData.id);
        if (findEntry) {
            return
        }
        redemedList = [...parsed, {...modalData, canRedeem: false}];
    } else {
        redemedList = [{...modalData, canRedeem: false}]
    }
    localStorage.setItem("redemed", JSON.stringify(redemedList));
    emits("triggerToast", 'success', 'You have redeemed the coupon. You can now use it in the above form.')
    emits('changeToRedeem', modalData.id);
    emits('resetModal');
}

</script>