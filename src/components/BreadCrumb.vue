<style lang="scss" scoped>
.breadcrumb {
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  align-items: center;
  h5 {
    font-size: 14px;
    margin-left: 10px;
  }
}
</style>
<template>
  <div class="breadcrumb">
    <q-icon size="20px" name="bi-arrow-left" />
    <h5>{{ backTo }}</h5>
  </div>
</template>
<script lang="ts">
export default {
  props: {
    backTo: String,
  },
};
</script>
