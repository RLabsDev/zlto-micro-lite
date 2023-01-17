<style>
.tabs {
  background-color: #fee9b9;
  color: #fdb417;
}
</style>
<template>
  <q-tabs
    v-model="tab"
    no-caps
    class="bg-primary text-white shadow-2"
    indicator-color="white"
    align="justify"
  >
    <q-tab icon="bi-ticket-perforated" name="my-vouchers" label="My Vouchers" />
    <q-tab icon="bi-tag" name="vouchers-redeemed" label="Vouchers Redeemed" />
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="my-vouchers">
      <div class="row">
      <SkeletonCardItem v-if="!vouchers"></SkeletonCardItem>
      </div>
      <div class="row">
        <div class="col-12" v-for="voucher in vouchers" :key="voucher.voucher_id">
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
    </q-tab-panel>

    <q-tab-panel name="vouchers-redeemed">
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
    </q-tab-panel>
  </q-tab-panels>
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
