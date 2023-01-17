<style>
.voucher-code {
  margin-top: 5px;
  padding: 15px;
  border: 1px solid;
  border-radius: 15px;
  border-style: dashed;
}
.redeem-btn {
  margin-top: 20px;
  font-weight: 500;
  color: #fff;
  background-color: #fdb417;
  border-color: #fdb417;
  width: 100%;
  height: 47px;
}
</style>
<template>
  <bread-crumb
    @click="goBack()"
    :backTo="`Wallet / My Vouchers / ${voucherData?.voucher_name}`"
  />
  <div class="row">
    <LvCard
      :shadowStyle="1"
      padding="20px"
      borderRadius="4px"
      class="card-item"
    >
      <div class="content">
        <div class="text-caption text-grey">
          {{ voucherData?.date_created }}
        </div>
        <br />
        <div class="text-caption text-grey">
          {{ voucherData?.voucher_instructions }}
        </div>
        <br />
        <div class="row">
          <div class="col-12 text-center">
            <div class="text-caption text-black">COUPON CODE</div>
          </div>
          <div class="col-12 text-center">
            <div class="voucher-code text-black">
              <b>{{ voucherData?.voucher_code }}</b>
            </div>
          </div>
        </div>
        <div class="row">
          <lv-button
            class="redeem-btn"
            label="Redeem"
            type="button"
            @click="redeemVoucher()"
          />
        </div>
      </div>
    </LvCard>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "@/services/models/task.models";
import WalletService from "@/services/wallet.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { Voucher } from "@/services/models/wallet.models";

const props = defineProps({
  voucher_id: {
    type: String,
    default: "",
  },
});

const router = useRouter();

let voucherData = ref<Voucher>();
let walletService = new WalletService();

onMounted(() => {
  walletService
    .getVoucher(props.voucher_id)
    .then((getVoucherResponse: any) => {
      if ((getVoucherResponse.status = 200)) {
        console.log(getVoucherResponse);
        voucherData.value = getVoucherResponse.data;
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function goBack() {
  router.push({ name: "ViewAllUserVouchers" });
}

function redeemVoucher() {
  walletService
    .updateVoucherStatus(props.voucher_id, "viewed")
    .then((redeemVoucherResponse: any) => {
      if ((redeemVoucherResponse.status = 200)) {
        console.log(redeemVoucherResponse);
        redeemVoucherSuccess();
        router.push({ name: "ViewAllUserVouchers" });
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
      redeemVoucherFailure(e.message);
    });
}

function redeemVoucherSuccess() {
  window.alert("Voucher Successfully Redeemed!");
}

function redeemVoucherFailure(error_msg?: any) {
  window.alert("Voucher Successfully Redeemed!");
}
</script>
