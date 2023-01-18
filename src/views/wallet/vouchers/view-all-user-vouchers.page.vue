<style>
.tabs {
  background-color: #fee9b9;
  color: #fdb417;
}
</style>
<template>
  <div class="accordian-wrapper">
    <div class="nav-list__category-wrap">
      <div class="collapsible_catgory" @click="toggleMyVouchers">
        <div class="nav-list__category-label">
          <i class="light-icon-adjustments"></i>
          My Vouchers ({{ getNewVouchers(vouchers || []).length }})
        </div>
        <i :class="isMyVouchersVisible ? 'light-icon-chevron-up' : 'light-icon-chevron-down'"></i>
      </div>
      <LvCollapsible :show="isMyVouchersVisible">
        <div class="collapisible--answer">
          <div class="row">
          <SkeletonCardItem v-if="!vouchers"></SkeletonCardItem>
          </div>
          <div class="row">
            <div class="col-12" v-for="voucher in getNewVouchers(vouchers || [])" :key="voucher.voucher_id">
              <CardItem
                v-if="voucher.voucher_state === 'new'"
                :key="`Card_item_${voucher.voucher_name}`"
                image="https://cdn.quasar.dev/img/parallax2.jpg"
                :title="voucher.voucher_name"
                :description="voucher.voucher_code"
                :caption="`Z${voucher.date_created}`"
                @click="viewVoucher(voucher.voucher_id)"
              />
            </div>
          </div>
          
          <div class="row">
            <div v-if="vouchers?.length === 0">No Available Vouchers</div>
          </div>
        </div>
      </LvCollapsible>
    </div>

    <div class="nav-list__category-wrap">
      <div class="collapsible_catgory" @click="toggleVouchersRedeemed">
        <div class="nav-list__category-label">
          <i class="light-icon-adjustments"></i>
            Vouchers Redeemed ({{ getVouchersRedeemed(vouchers || []).length }})
        </div>
        <i :class="isVouchersRedeemedVisible ? 'light-icon-chevron-up' : 'light-icon-chevron-down'"></i>
      </div>
      <LvCollapsible :show="isVouchersRedeemedVisible">
        <div class="collapisible--answer">
          <div class="row">
          <SkeletonCardItem v-if="!vouchers"></SkeletonCardItem>
          </div>
          <div class="row">
            <div class="col-12" v-for="voucher in vouchers" :key="voucher.voucher_id">
              <CardItem
                v-if="voucher.voucher_state === 'viewed'"
                :key="`Card_item_${voucher.voucher_name}`"
                image="https://cdn.quasar.dev/img/parallax2.jpg"
                :title="voucher.voucher_name"
                :description="voucher.voucher_code"
                :caption="`Z${voucher.date_created}`"
                @click="viewVoucher(voucher.voucher_id)"
              />
            </div>
          </div>
          <div class="row">
            <div v-if="vouchers?.length === 0">No Vouchers Redeemed</div>
          </div>
        </div>
      </LvCollapsible>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import WalletService from "@/services/wallet.service";
import type { Voucher } from "@/services/models/wallet.models";

const tab = ref("my-vouchers");
const router = useRouter();
const userStore = useUserStore();
let walletService = new WalletService();
let vouchers = ref<Array<Voucher>>();
let isMyVouchersVisible = ref(false);
let isVouchersRedeemedVisible = ref(false);

function toggleMyVouchers() {
  isMyVouchersVisible.value = !isMyVouchersVisible.value;
}

function toggleVouchersRedeemed() {
  isVouchersRedeemedVisible.value = !isVouchersRedeemedVisible.value;
}

function getNewVouchers(vouchers: Array<Voucher>) {
  return vouchers.filter(obj => obj.voucher_state === 'new');
}

function getVouchersRedeemed(vouchers: Array<Voucher>) {
  return vouchers.filter(obj => obj.voucher_state === 'viewed');
}

onMounted(() => {
  const walletID = userStore.currentAccount.wallet_id;
  walletService
    .getVouchersByWallet(walletID)
    .then((getVouchersByWalletResponse: any) => {
      if ((getVouchersByWalletResponse.status = 200)) {
        vouchers.value = getVouchersByWalletResponse.data.data;
        console.log(vouchers.value);
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function viewVoucher(voucherID: string) {
  router.push({ name: "ViewVoucher", params: { voucher_id: voucherID } });
}

function goBack() {
  router.push({ name: "UserWallet" });
}
</script>
