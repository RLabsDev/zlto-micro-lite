<style lang="scss" scoped>
.heading {
  font-weight: bold;
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.body {
  font-size: 14px;
  line-height: 1.4;
  color: #adadad;
}
.price {
  color: #fdb417;
}

.my-card {
  border-radius: 14px;
}
</style>
<template>
  <bread-crumb
    @click="goBack()"
    :backTo="`Store / ${itemData?.store_info_si.store_name} / ${itemData?.item_name}`"
  />

  <div class="row">
    <q-card class="my-card" flat>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <h3 class="text-h6">{{ itemData?.item_name }}</h3>
          <h4 class="text-subtitle2">
            {{ itemData?.item_category_ic.item_cat_name }}
          </h4>
          <p class="price">{{ itemData?.item_zlto }}</p>
        </div>
      </q-img>

      <q-card-section>
        <h2 class="heading">Description</h2>
        <p class="body">
          {{ itemData?.item_description }}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </q-card-section>
      <q-card-actions>
        <q-btn
          unelevated
          color="primary"
          class="full-width"
          label="Buy"
          @click="purchaseItem()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import StoreService from "@/services/store.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { Notify } from "quasar";
import type { StoreItem } from "@/services/models/store.models";

const props = defineProps({
  item_id: {
    type: String,
    default: "",
  },
  store_id: {
    type: String,
    default: "",
  },
  store_name: {
    type: String,
    default: "",
  },
  store_cat_id: {
    type: String,
    default: "",
  },
});

const userStore = useUserStore();
const router = useRouter();
let storeService = new StoreService();
let itemData = ref<StoreItem>();

onMounted(() => {
  storeService
    .getStoreItemsById(props.item_id)
    .then((getStoreItemsResponse: any) => {
      if ((getStoreItemsResponse.status = 200)) {
        console.log(getStoreItemsResponse);
        itemData.value = getStoreItemsResponse.data;
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function goBack() {
  router.push({
    name: "ViewStoreItems",
    params: { store_id: props.store_id, store_name: props.store_name },
  });
}

function purchaseItem() {

  if(userStore.wallet.zlto_balance < itemData.value?.item_zlto!) {
    purchaseItemFailed('You have insufficient funds!');
    return;
  }

  const payload = {
    storeID: props.store_id,
    storeCategoryID: props.store_cat_id,
    itemCategoryID: itemData.value?.item_cat_id!,
    itemID: itemData.value?.item_id!,
    userID: userStore.currentAccount.member_id,
    userOrigin: userStore.currentAccount.program_name,
    zltoAmount: itemData.value?.item_zlto!,
    itemDescription: itemData.value?.item_description!,
    transactionDescription: "Item Purchased",
    transactionType: 1,
    transactionState: 1,
  };

  console.log(payload);
  storeService
    .createStoreTransaction(payload)
    .then((createStoreTransactionResponse: any) => {
      if ((createStoreTransactionResponse.status = 200)) {
        console.log(createStoreTransactionResponse);
        purchaseItemSuccess();
        router.push({ name: "ViewAllUserVouchers" });
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
      purchaseItemFailed(e.message);
    });
}

function purchaseItemSuccess() {
  Notify.create({
    message: "Item Successfully Purchased!",
    color: "green",
    icon: "bi-check-circle-fill",
    position: "top",
    actions: [
      {
        label: "Dismiss",
        color: "white",
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}

function purchaseItemFailed(error_msg?: any) {
  Notify.create({
    message: error_msg ? error_msg : "Something went wrong. Please try again.",
    color: "red",
    icon: "bi-exclamation-circle-fill",
    position: "top",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });
}
</script>
