<style lang="scss" scoped>
.default-page-wrapper {
  padding: 2em 0em 3em 0em;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px; /* Footer height */
  line-height: 60px; /* Vertically center the text */
  background-color: grey;
  text-align: center;
}
</style>

<template>
  <q-layout class="store" view="hHh lpR fFf" style="min-height:auto">
    <StoreNav />
    <q-page-container>
      HERE
      <slot />
    </q-page-container>
    <StoreFooter />
  </q-layout>
</template>

<script lang="ts" setup>
import StoreFooter from "./StoreFooter.vue";
import StoreNav from "./StoreNav.vue";
</script>
