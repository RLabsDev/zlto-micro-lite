<style></style>
<template>
  <bread-crumb @click="goBack()" :backTo="`tasks / ${taskData?.task_name}`" />
  <div class="row">
    <q-card class="my-card" flat bordered>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{ taskData?.task_name }}</div>
          <div class="text-subtitle2">{{ taskData?.task_category.name }}</div>
          <div class="text-subtitle2">{{ taskData?.task_zlto }}</div>
        </div>
      </q-img>

      <q-card-section>
        <div class="text-h7 q-mt-sm q-mb-xs">Why this deed?</div>
        <div class="text-caption text-grey">
          {{ taskData?.task_description }}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="text-h7 q-mt-sm q-mb-xs">Instructions</div>
        <div class="text-caption text-grey">
          {{ taskData?.task_instructions }}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
        <div class="text-h7 q-mt-sm q-mb-xs">Proof examples</div>
        <div class="text-caption text-grey">
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            spinner-color="white"
            style="height: 100px; max-width: 100px; margin: 5px"
          />
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            spinner-color="white"
            style="height: 100px; max-width: 100px; margin: 5px"
          />
          <q-img
            src="https://cdn.quasar.dev/img/parallax2.jpg"
            spinner-color="white"
            style="height: 100px; max-width: 100px; margin: 5px"
          />
        </div>
      </q-card-section>
      <!-- <q-card-section>
  <div class="text-h7 q-mt-sm q-mb-xs">Upload Proof</div>
  <q-uploader
        url="http://localhost:4444/upload"
        multiple
        batch
        auto-upload
        style="width: 100%;"
        color="dark"
      />
</q-card-section> -->
      <q-card-actions>
        <q-btn
          unelevated
          color="primary"
          class="full-width"
          label="Start Task"
          @click="startTask()"
        />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "@/services/models/task.models";
import TaskService from "@/services/task.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { Notify } from "quasar";

const props = defineProps({
  id: {
    type: String,
    default: "",
  },
});

const userStore = useUserStore();
const router = useRouter();
let taskService = new TaskService();
let taskData = ref<Task>();

onMounted(() => {
  taskService
    .getTaskDetails(props.id)
    .then((getTaskResponse: any) => {
      if ((getTaskResponse.status = 200)) {
        console.log(getTaskResponse);
        taskData.value = getTaskResponse.data;
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function goBack() {
  router.push({ name: "ViewAllTasks" });
}

function startTask() {
  const payload = {
    taskID: props.id,
    userID: userStore.currentAccount.member_id,
    ownerID: userStore.currentAccount.member_id,
    taskName: taskData.value?.task_name ? taskData.value?.task_name : "",
    userName: userStore.currentAccount.m_username,
    zltoAmount: taskData.value?.task_zlto ? taskData.value?.task_zlto : 0,
    transactionStatus: 1,
    userOriginID: 1,
  };

  taskService
    .createTaskTransaction(payload)
    .then((getCreateTransactionResponse: any) => {
      if ((getCreateTransactionResponse.status = 200)) {
        console.log(getCreateTransactionResponse);
        createTransactionSuccess();
        router.push({ name: "ViewAllUserTasks" });
      }
    })
    .catch((e: any) => {
      createTransactionFailed(e.message);
      console.log("login error : ", e);
    });
}

function createTransactionSuccess() {
  Notify.create({
    message: "You succefully started this task!",
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

function createTransactionFailed(error_msg?: any) {
  Notify.create({
    message: error_msg ? error_msg : "Something went wrong. Please try again.",
    color: "red",
    icon: "bi-exclamation-circle-fill",
    position: "top",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });
}
</script>
