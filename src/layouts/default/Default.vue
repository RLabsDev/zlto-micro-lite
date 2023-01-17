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
  <DefaultNav />
    <slot />
    <br/>
    <br/>
    <br/>
  <DefaultFooter />
</template>

<script lang="ts" setup>
import DefaultFooter from "./DefaultFooter.vue";
import DefaultNav from "./DefaultNav.vue";
</script>
