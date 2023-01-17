<style></style>
<template>
  <bread-crumb @click="goBack()" :backTo="`tasks / ${taskData?.task_name}`" />
  <div class="row">
    <LvCard
      :shadowStyle="1"
      padding="20px"
      borderRadius="4px"
      class="card-item"
    >
      <div class="content">
        <div class="absolute-bottom">
          <div class="text-h6">{{ taskData?.task_name }}</div>
          <div class="text-subtitle2">{{ taskData?.task_category.name }}</div>
          <div class="text-subtitle2">{{ taskData?.task_zlto }}</div>
        </div>
        <div class="row">
          <lv-button
            class="full-width"
            label="Start Task"
            type="button"
            @click="startTask()"
          />
        </div>
      </div>
    </LvCard>
  </div>
</template>
<script setup lang="ts">
import type { Task } from "@/services/models/task.models";
import TaskService from "@/services/task.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";

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
  // Notify.create({
  //   message: "You succefully started this task!",
  //   color: "green",
  //   icon: "bi-check-circle-fill",
  //   position: "top",
  //   actions: [
  //     {
  //       label: "Dismiss",
  //       color: "white",
  //       handler: () => {
  //         /* ... */
  //       },
  //     },
  //   ],
  // });
}

function createTransactionFailed(error_msg?: any) {
  // Notify.create({
  //   message: error_msg ? error_msg : "Something went wrong. Please try again.",
  //   color: "red",
  //   icon: "bi-exclamation-circle-fill",
  //   position: "top",
  //   actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  // });
}
</script>
