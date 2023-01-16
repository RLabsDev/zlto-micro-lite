<script setup lang="ts">
import { computed, onMounted } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { useUserStore } from "./stores/user.store";

const route = useRoute();
const router = useRouter();
const layout = computed(() => `layout-${route.meta.layout || "default"}`);
const userStore = useUserStore();

router.beforeEach((to, from, next) => {
  let myRoute = to.name as string;
  const userAuth = userStore.getAccessToken || false;
  if (
    ["PersonalDetails","Demographics","CreatePassword","VerifyEmailAddress","VerifyCellNumber","PickFavouriteTopics","Agreement","ConfirmUsername","ResetPassword", "VerifyEmailAddress", "VerifyCellNumber"].includes(
      myRoute
    )
  ) {
    next();
  } else if (myRoute !== "Login" && userAuth == false) {
    next({ name: "Login" });
  } else {
    next();
  }
});

onMounted(() => {});
</script>

<template>
  <component :is="layout">
    <RouterView />
  </component>
</template>

<style></style>
