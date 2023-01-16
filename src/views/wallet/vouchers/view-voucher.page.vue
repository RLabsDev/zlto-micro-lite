<style>
.voucher-code {
  margin-top: 5px;
  padding: 15px;
  border: 1px solid;
  border-radius: 15px;
  border-style: dashed;
}
</style>
<template>
  <bread-crumb
    @click="goBack()"
    :backTo="`Wallet / My Vouchers / ${voucherData?.voucher_name}`"
  />
  <div class="row">
    <q-card class="my-card" flat bordered>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg"> </q-img>

      <q-card-section>
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
      </q-card-section>
      <q-card-actions>
        <q-btn
        v-if="voucherData?.voucher_state === 'new'"
          unelevated
          color="primary"
          class="full-width"
          label="Redeem"
          @click="redeemVoucher()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "@/services/models/task.models";
import WalletService from "@/services/wallet.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Notify } from "quasar";
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
  Notify.create({
    message: "Voucher Successfully Redeemed!",
    color: "green",
    icon: "bi-check-circle-fill",
    position: "top",
    actions: [
      {
        label: "Dismiss",
        color: "white",
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}

function redeemVoucherFailure(error_msg?: any) {
  Notify.create({
    message: error_msg ? error_msg : "Something went wrong. Please try again.",
    color: "red",
    icon: "bi-exclamation-circle-fill",
    position: "top",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });
}
</script>
