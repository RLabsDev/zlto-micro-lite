<style lang="scss" scoped>
.section-heading {
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
}

div.q-item {
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
}

i.q-icon {
  font-weight: 500;
  color: #fdb417;
  font-size: 12px !important;
  line-height: 18px;
}

.profile-link {
  font-size: 10px;
  font-weight: 400;
  line-height: 15px;
  color: white;
  cursor: pointer;
}

a {
  color: black;
}

.menu-row {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  background: white;
  border-top: 1px solid lightgray;
}

.menu-btn {
  display: block;
  height: 4.5rem;
  background-color: transparent;
  width: 100%;
  border-radius: 0;
  color: gray;
}

.menu-btn > i {
  font-size: 20px !important;
}

</style>
<template>
  <!-- <q-footer bordered class="bg-white text-primary">
    <q-tabs
      no-caps
      active-color="primary"
      indicator-color="transparent"
      class="text-grey"
    >
      <menu-navigation v-model="isDrawerOpen" menuSide="right" />
      <q-tab name="home" icon="bi-house" label="Home" @click="goHome()" />
      <q-tab
        name="user-wallet"
        icon="bi-wallet2"
        label="Wallet"
        @click="goToWallet()"
      />
      <q-tab name="saved" icon="bi-person" label="Profile"  @click="goToProfile()" />
      <q-tab name="more" icon="bi-list" label="More" @click="toggleDrawer()" />
    </q-tabs>
  </q-footer> -->

  <div class="row menu-row">
    <div class="col">
      <lv-button
        class="menu-btn"
        icon="bi-house"
        label="Home"
        type="button"
        @click="goHome()"
      />
    </div>
    <div class="col">
      <lv-button
        class="menu-btn"
        icon="bi-wallet2"
        label="Wallet"
        type="button"
        @click="goToWallet()"
      />
    </div>
    <div class="col">
      <lv-button
        class="menu-btn"
        icon="bi-person"
        label="Profile"
        type="button"
        @click="goToProfile()"
      />
    </div>
    <div class="col">
      <lv-button
        class="menu-btn"
        icon="bi-list"
        label="More"
        type="button"
        @click="toggleDrawer()"
      />
    </div>
  </div>

</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import MenuNavigation from "../../components/MenuNavigation.vue";

const userStore = useUserStore();
const isDrawerOpen = ref(false);
const router = useRouter();

function toggleDrawer() {
  isDrawerOpen.value = !isDrawerOpen.value;
}

function LogOut() {
  userStore.reset();
  router.push({ name: "Login" });
}

function goToMyVouchers() {
  router.push({ name: "ViewAllUserVouchers" });
}

function goToWallet() {
  router.push({ name: "UserWallet" });
}

function goToProfile() {
  router.push({ name: "Profile" });
}

function goHome() {
  router.push({ name: "Home" });
}
</script>
