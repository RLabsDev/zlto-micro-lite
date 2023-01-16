<style>

</style>
<template>
  <div class="row">
    <q-banner inline-actions rounded style="width: 100%;" class="bg-grey-3">
      <template v-slot:avatar>
        <q-icon @click="goBack()" name="bi-chevron-left" />
      </template>
      <h6 style=" text-align: center;">{{ taskTransactionData?.task_info?.task_name }}</h6>
    </q-banner>
  </div>
  <br>
  <div class="row">
    <q-card class="my-card" flat bordered>
      <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom">
          <div class="text-h6">{{ taskTransactionData?.task_name }}</div>
          <div class="text-subtitle2">{{ taskTransactionData?.task_info?.task_category.name }}</div>
          <div class="text-subtitle2">{{ taskTransactionData?.task_info?.task_zlto }}</div>
        </div>
      </q-img>

      <q-card-section>
        <div class="text-h7 q-mt-sm q-mb-xs">Why this task?</div>
        <div class="text-caption text-grey">
          {{ taskTransactionData?.task_info?.task_description }}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </div>
        <div class="text-h7 q-mt-sm q-mb-xs">Instructions</div>
        <div class="text-caption text-grey">
          {{ taskTransactionData?.task_info?.task_instructions }}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua.
        </div>
      </q-card-section>
      <q-card-section v-if="(taskTransactionResourceData?.data.length > 0)">
        <!-- <q-chip v-for="(resource, index) in taskTransactionResourceData.data" :key="index"  clickable @click="" color="orange" text-color="white" icon="directions">
          {{resource.resource_name}}
          </q-chip> -->
        <div v-if="taskTransactionResourceData?.data" class="row text-h7 q-mt-sm q-mb-xs">Photos of the task you
          completed:</div>
        <div class="row">
          <div class="col" v-for="(resource, index) in taskTransactionResourceData.data" :key="index">
            <q-img v-if="resource.resource_link !== 'None'" :src="resource.resource_link" spinner-color="white"
              style="height: 100px; max-width: 100px; margin:5px" />
          </div>
        </div>
      </q-card-section>
      <q-card-section v-if="taskTransactionData?.transaction_status !== 2">
        <div class="text-h7 q-mt-sm q-mb-xs">Upload Proof</div>
        <q-uploader :factory="TaskUploadFile" batch auto-upload style="width: 100%;" color="dark" />
      </q-card-section>
      <q-card-actions v-if="taskTransactionData?.transaction_status !== 2">
        <q-btn unelevated color="primary" class="full-width" label="Complete Task" @click="completeTask()" />
      </q-card-actions>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import type { getTaskTransactionsResponse, Task } from "@/services/models/task.models";
import TaskService from "@/services/task.service";
import { useUserStore } from "@/stores/user.store";
import { Notify } from "quasar";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  taskID: {
    type: String,
    default: '',
  },
  transactionID: {
    type: String,
    default: ''
  }
});
const router = useRouter();
let taskService = new TaskService();
let taskTransactionData = ref<getTaskTransactionsResponse>();
let taskTransactionResourceData = ref();
let uploadedFile = ref('');
const userStore = useUserStore();

onMounted(() => {
  taskService.getTaskTransactionDetails(props.transactionID).then((taskTransactionResponse: any) => {
    if (taskTransactionResponse.status = 200) {
      console.log(taskTransactionResponse)
      taskTransactionData.value = taskTransactionResponse.data;
      taskService.getAllTaskResourceListByUserTask(taskTransactionResponse.data.user_id, taskTransactionResponse.data.task_id).then((getAllTaskResourceListByUserTaskResponse: any) => {
        if (getAllTaskResourceListByUserTaskResponse.status = 200) {
          console.log(getAllTaskResourceListByUserTaskResponse.data)
          taskTransactionResourceData.value = getAllTaskResourceListByUserTaskResponse.data;
        }
      }).catch((e: any) => {
        console.log("login error : ", e);
      });
    }
  }).catch((e: any) => {
    console.log("Get Task Transaction Error : ", e);
  });


});

function TaskUploadFile(files: any) {
  console.log('file : ', files[0])
  uploadedFile.value = files[0]
  console.log('uploaded file : ', uploadedFile.value)
  console.log('task id : ', props.taskID)
  console.log('member id  : ', userStore.currentAccount.member_id)
  var uploadData: any;
  taskService.uploadTaskResourceImage(props.taskID, userStore.currentAccount.member_id, uploadedFile.value)
    .then((upload_data: any) => {
      console.log('upload_data : ', upload_data)
      uploadData = upload_data;
      uploadTaskResource(uploadData);

    }).catch((e: any) => {
      console.log('error : ', e)
    })
  return uploadData;
}

function goBack() {
  router.push({ name: 'ViewAllUserTasks' })
}

function uploadTaskResource(uploadData: any) {
  const date = new Date().toJSON();
  const payload = {
    resourceName: `${uploadData.data['file_upload_details']['file-name']}_${date}`,
    taskID: props.taskID,
    ownerID: userStore.currentAccount.member_id,
    ownerOrigin: 'Partner',
    userID: userStore.currentAccount.member_id,
    userOrigin: 'Member',
    resourceLink: uploadData.data.file_upload_details.public_url,
    resourceType: 1,
    resourceVerified: 0
  }

  taskService.createTaskResource(payload).then((uploadTaskResourceResponse: any) => {
    if (uploadTaskResourceResponse.status = 200) {
      console.log(uploadTaskResourceResponse)
    }
  }).catch((e: any) => {
    console.log("login error : ", e);
  });
}

function completeTask() {
  const payload = {
    taskTransactionID: props.transactionID,
    taskID: props.taskID,
    userID: userStore.currentAccount.member_id,
    taskName: taskTransactionData.value?.task_name ? taskTransactionData.value?.task_name : '',
    userName: userStore.currentAccount.m_username,
    zltoAmount: taskTransactionData.value?.task_info.task_zlto ? taskTransactionData.value?.task_info.task_zlto : 0,
    transactionStatus: 2,
    userOriginID: 1,
  }

  taskService.updateTaskTransaction(payload).then((getCreateTransactionResponse: any) => {
    if (getCreateTransactionResponse.status = 200) {
      console.log(getCreateTransactionResponse);
      router.push({ name: 'TaskComplete' });
    }
  }).catch((e: any) => {
    completeTransactionFailed(e.message)
    console.log("login error : ", e);
  });
}

function completeTransactionFailed(error_msg?: any) {

  Notify.create({
    message: error_msg ? error_msg : 'Something went wrong. Please try again.',
    color: 'red',
    icon: 'bi-exclamation-circle-fill',
    position: 'top',
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { } }
    ]
  })
}

</script>
