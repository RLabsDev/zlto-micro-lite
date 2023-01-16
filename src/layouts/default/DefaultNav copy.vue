<template>
  <q-header bordered class="bg-white text-primary">
    <q-toolbar>
      <q-btn dense flat round icon="bi-list" @click="toggleLeftDrawer" />

      <q-toolbar-title class="text-center">
        <q-avatar>
          <img style="width: 80px" src="src/assets/logo.png" />
        </q-avatar>
      </q-toolbar-title>
      <!-- <q-icon style="cursor: pointer;" @click="goToNotifications()" name="bi-bell" /> -->
    </q-toolbar>
  </q-header>
  <q-drawer side="left" v-model="drawerLeft" overlay behavior="mobile" bordered>
    <q-scroll-area
      style="
        height: calc(100% - 150px);
        margin-top: 150px;
        border-right: 1px solid #ddd;
      "
    >
      <q-list padding>
        <!-- <q-item>
              <q-item-section>
                <b class="section-heading">Zlto apps</b>
              </q-item-section>
            </q-item> -->
        <router-link to="home">
          <q-item clickable v-ripple @click="goHome()">
            <q-item-section avatar>
              <q-icon name="bi-house" />
            </q-item-section>

            <q-item-section> Home </q-item-section>
          </q-item>
        </router-link>

        <router-link to="view-all-tasks">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="bi-list-check" />
            </q-item-section>

            <q-item-section> Tasks </q-item-section>
          </q-item>
        </router-link>

        <!-- <q-item clickable v-ripple>

          <q-item-section avatar>
            <q-icon name="bi-book" />
          </q-item-section>

          <q-item-section>
            Courses
          </q-item-section>

        </q-item> -->

        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-pencil" />
          </q-item-section>

          <q-item-section>
            Surveys
          </q-item-section>
        </q-item> -->

        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-eyeglasses" />
          </q-item-section>

          <q-item-section>
            Reviews
          </q-item-section>
        </q-item> -->
        <q-item clickable v-ripple @click="goToWallet()">
          <q-item-section avatar>
            <q-icon name="bi-wallet2" />
          </q-item-section>

          <q-item-section> Wallet </q-item-section>
        </q-item>
        <q-item clickable v-ripple @click="goToStore()">
          <q-item-section avatar>
            <q-icon name="bi-shop" />
          </q-item-section>

          <q-item-section> Store </q-item-section>
        </q-item>
        <!---->
        <!-- <q-item>
          <q-item-section>
            <b class="section-heading">Settings and Privacy</b>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-gear" />
          </q-item-section>

          <q-item-section>
            Settings
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-lock" />
          </q-item-section>

          <q-item-section>
            Privacy
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-arrow-repeat" />
          </q-item-section>

          <q-item-section>
            Change Log
          </q-item-section>
        </q-item> -->
        <!---->
        <!-- <q-item>
          <q-item-section>
            <b class="section-heading">Help and Support</b>
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-shield-check" />
          </q-item-section>

          <q-item-section>
            Terms and Conditions
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-question-circle" />
          </q-item-section>

          <q-item-section>
            Help center
          </q-item-section>
        </q-item>
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="bi-shield-exclamation" />
          </q-item-section>

          <q-item-section>
            Report a problem
          </q-item-section>
        </q-item> -->
        <q-item clickable v-ripple @click="LogOut()">
          <q-item-section avatar>
            <q-icon name="bi-box-arrow-right" />
          </q-item-section>

          <q-item-section style="color: #fdb417"> Logout </q-item-section>
        </q-item>
      </q-list>
    </q-scroll-area>

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
        <a class="profile-link" @click="goToProfile()">View your profile</a>
      </div>
    </q-img>
  </q-drawer>
  <!-- <q-header bordered class="bg-white text-primary">
        <q-toolbar>
          <div class="zlto-balance" v-if="hasWallet">Z {{balance}}</div>
          <q-toolbar-title class="text-center">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>

          </q-toolbar-title>
          <q-icon style="cursor: pointer;" @click="goToNotifications()" name="bi-bell"/>
        </q-toolbar>
      </q-header> -->
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
let hasWallet = ref(true);
let balance = ref(0);
const drawerLeft = ref(false);
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

function goToNotifications() {
  router.push({ name: "Notifications" });
}

function toggleLeftDrawer() {
  drawerLeft.value = !drawerLeft.value;
}

function LogOut() {
  userStore.reset();
  router.push({ name: "Login" });
}

function goToProfile() {
  router.push({ name: "Profile" });
}

function goHome() {
  router.push({ name: "Home" });
}

function goToStore() {
  router.push({ name: "ViewStoreDirectory" });
}

function goToWallet() {
  router.push({ name: "UserWallet" });
}
</script>

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
