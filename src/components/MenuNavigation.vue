<style lang="scss" scoped>
.zlto-balance {
  font-size: 14px;
  font-weight: 500; //Medium
}

.section-heading {
  font-weight: 500;
  //font-size: 14px;
  line-height: 21px;
}

div.q-item {
  font-weight: 500;
  // font-size: 12px;
  line-height: 18px;
}

i.q-icon {
  font-weight: 500;
  color: #fdb417;
  //  font-size: 12px !important;
  // line-height: 18px;
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
  <q-drawer
    side="right"
    v-model="isDrawerOpen"
    overlay
    behavior="mobile"
    bordered
  >
    <q-img
      class="absolute-top"
      src="https://cdn.quasar.dev/img/material.png"
      style="height: 150px"
    >
      <div class="absolute-bottom bg-transparent">
        <q-avatar
          v-if="!avatar"
          size="56px"
          class="q-mb-sm"
          color="primary"
          text-color="white"
        >
          {{ letter }}
        </q-avatar>
        <q-avatar
          v-if="avatar"
          size="56px"
          class="q-mb-sm"
          color="primary"
          text-color="white"
        >
          <img :src="avatar" />
        </q-avatar>
        <div class="text-weight-bold">{{ name }}</div>
        <a class="profile-link" @click="goToProfile">View your profile</a>
      </div>
    </q-img>
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <div v-for="route in NavigationRoutes" :key="route.Name">
          <router-link :to="route.Route">
            <q-item clickable v-ripple>
              <q-item-section avatar>
                <q-icon :name="route.Icon" />
              </q-item-section>

              <q-item-section> {{ route.Name }} </q-item-section>
            </q-item>
          </router-link>
        </div>
        <a href="">
          <q-item clickable v-ripple @click="LogOut">
              <q-item-section avatar>
                <q-icon name="bi-box-arrow-right" />
              </q-item-section>

              <q-item-section> Logout </q-item-section>
            </q-item></a> 
      </q-list>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
const router = useRouter();
const NavigationRoutes = [
  {
    Name: "Home",
    Icon: "bi-house",
    Route: "/home",
  },
  {
    Name: "Tasks",
    Icon: "bi-list-check",
    Route: "/view-all-tasks",
  },
  {
    Name: "Wallet",
    Icon: "bi-wallet2",
    Route: "/user-wallet",
  },
  {
    Name: "Store",
    Icon: "bi-shop",
    Route: "/view-store-directory",
  }
];
const userStore = useUserStore();
let hasWallet = ref(true);
let isDrawerOpen = ref(false);
let balance = ref(0);
let name = userStore.profile.first_name + " " + userStore.profile.last_name;
let letter = name.charAt(0);
let avatar = userStore.profile.avatar;

onMounted(() => {
  if (userStore.currentAccount.wallet_id === "None") {
    hasWallet.value = false;
  } else {
    hasWallet.value = true;
    balance.value = userStore.wallet.zlto_balance;
  }
});
function goToProfile() {
  router.push({ name: "Profile" });
}

function LogOut() {
  userStore.reset();
  router.push({ name: "Login" });
}
</script>
