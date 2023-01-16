<style>
.balance-card {
  background-color: #fdb417;
}

.earned-card {
  background-color: green;
}

.spent-card {
  background-color: red;
}
</style>
<template>
  <bread-crumb @click="goBack()" backTo="Wallet" />

  <!-- <div class="row">
        <q-card class="balance-card text-white">
            <q-card-section>

                <div class="row items-center no-wrap">
                    <div class="col-auto">
                        <div class="text-h3" style="margin-right: 15px;">
                            <q-icon name="bi-cash-coin" />
                        </div>
                    </div>
                    <div class="col">
                        <div class="text-h4">{{ balance }}</div>
                        <div class="text-subtitle2">Zlto Wallet Balance</div>
                    </div>
                </div>
            </q-card-section>
        </q-card>
    </div> -->
  <div class="row">
    <q-card class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar
              icon="bi-ticket-perforated"
              style="
                margin-right: 15px;
                background-color: #fee9b9;
                color: #fdb417;
              "
            ></q-avatar>
          </div>
          <div class="col">
            <div class="text-h6">My Vouchers</div>
            <div class="text-subtitle2">View your vouchers</div>
          </div>
          <div class="col-auto">
            <q-btn
              color="grey-7"
              round
              flat
              icon="bi-chevron-right"
              @click="goToMyVouchers()"
            ></q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
let hasWallet = ref(true);
let balance = ref(0);
onMounted(() => {
  if (userStore.currentAccount.wallet_id === "None") {
    console.log(userStore.wallet, "kjgkhb");
    hasWallet.value = false;
  } else {
    balance.value = userStore.wallet.zlto_balance;
  }
});

function goToMyVouchers() {
  router.push({ name: "ViewAllUserVouchers" });
}

function goBack() {
  router.push({ name: "Home" });
}
</script>
