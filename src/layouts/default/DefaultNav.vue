<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 1rem;
}
.zlto-balance {
  font-size: 14px;
  font-weight: 500; //Medium
}

.section-heading {
  font-weight: 500;
  line-height: 21px;
}

div.q-item {
  font-weight: 500;
  line-height: 18px;
}

i.q-icon {
  font-weight: 500;
  color: #fdb417;
}

.bell-icon {
  background-color: white;
  color: #fdb417 !important;
  cursor: pointer;
}

.profile-link {
  // font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  color: white;
  cursor: pointer;
}

a {
  color: black;
}
</style>

<template>
  <div class="header">
    <div class="zlto-balance" v-if="hasWallet">Z {{ balance }}</div>
    <div><img src="src/assets/logo.png" /></div>

    <div>
      <LvButton
      size="lg"
        class="bell-icon"
        @click="goToNotifications()"
        icon="bi-bell"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
let hasWallet = ref(true);
let balance = ref();
const drawerLeft = ref(false);
let name = userStore.profile.first_name + " " + userStore.profile.last_name;
let letter = name.charAt(0);
let avatar = userStore.profile.avatar;
onMounted(() => {
  if (userStore.currentAccount.wallet_id === "None") {
    hasWallet.value = false;
  } else {
    hasWallet.value = true;
    console.log(userStore.wallet.zlto_balance);
    balance.value =
      userStore.wallet.zlto_balance === 0
        ? "0.00"
        : userStore.wallet.zlto_balance;
  }
});

function goToNotifications() {
  router.push({ name: "Notifications" });
}
</script>
