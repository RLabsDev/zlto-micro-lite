<style>
div.section-heading {
  font-size: 14px;
  font-weight: 500;
  margin: 15px 0px;
}

div.section-heading a {
  color: #fdb417;
  font-size: 10px;
}

div.card-text {
  font-size: 12px;
  font-weight: 500;
}

div.card-amount {
  font-size: 10px;
  color: #212427;
}

div.card-subtitle {
  font-size: 10px;
  color: #fdb417;
}

div.card-title {
  font: 14px;
  font-weight: 500;
}

a {
  color: black;
}
</style>
<template>
  <bread-crumb @click="goBack()" backTo="Home" />
  <div class="row">
    <div class="section-heading">Available Stores</div>
  </div>
  <div class="row">
    <SkeletonCardItem v-if="!stores"></SkeletonCardItem>
  </div>
  <div class="row">
    <CardItem
      v-for="store in stores"
      :key="`Card_item_${store.store_name}`"
      image="https://cdn.quasar.dev/img/parallax2.jpg"
      :title="store.store_name"
      :description="store.store_category_info_sf.store_category_name"
      :caption="`${store.store_description}`"
      @click="viewStoreItems(store.store_id, store.store_name)"
    />
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import StoreService from "@/services/store.service";
import type { StoreFront } from "@/services/models/store.models";

const router = useRouter();
let storeService = new StoreService();
let stores = ref<Array<StoreFront>>();

onMounted(() => {
  storeService
    .getAllStoreFronts()
    .then((getAllStoreFrontsResponse: any) => {
      if ((getAllStoreFrontsResponse.status = 200)) {
        stores.value = getAllStoreFrontsResponse.data.data;
        console.log(stores.value);
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function viewStoreItems(storeID: string, storeName: string) {
  router.push({
    name: "ViewStoreItems",
    params: { store_id: storeID, store_name: storeName },
  });
}

function goBack() {
  router.push({ name: "Home" });
}
</script>
