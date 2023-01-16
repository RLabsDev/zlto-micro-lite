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
  <bread-crumb @click="goBack()" :backTo="`Store / ${props?.store_name}`" />
  <div class="row">
    <div class="section-heading">Available Items</div>
  </div>
  <div class="row">
    <SkeletonCardItem v-if="!storeItems"></SkeletonCardItem>
  </div>
  <div class="row">
    <CardItem
      v-for="item in storeItems"
      :key="`Card_item_${item.item_name}`"
      image="https://cdn.quasar.dev/img/parallax2.jpg"
      :title="item.item_name"
      :description="item.item_description"
      :caption="`Z${item.item_zlto}`"
      @click="viewItem(item.item_id, item.store_cat_id)"
    />
  </div>
</template>
<script setup lang="ts">
import StoreService from "@/services/store.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import type { StoreItem } from "@/services/models/store.models";

const props = defineProps({
  store_id: {
    type: String,
    default: "",
  },
  store_name: {
    type: String,
    default: "",
  },
});

const router = useRouter();
let storeService = new StoreService();
let storeItems = ref<Array<StoreItem>>();

onMounted(() => {
  storeService
    .getAllStoreItemsByStore(props.store_id)
    .then((getAllStoreItemsResponse: any) => {
      if ((getAllStoreItemsResponse.status = 200)) {
        storeItems.value = getAllStoreItemsResponse.data.data;
        console.log(storeItems.value);
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function goBack() {
  router.push({ name: "ViewStoreDirectory" });
}

function viewItem(itemID: number, storeCategoryID: string) {
  router.push({
    name: "ViewItem",
    params: {
      item_id: itemID,
      store_id: props.store_id,
      store_name: props.store_name,
      store_cat_id: storeCategoryID,
    },
  });
}
</script>
