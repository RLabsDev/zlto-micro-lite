<style>
.tabs {
  background-color: #fee9b9;
  color: #fdb417;
}
</style>
<template>
  <bread-crumb @click="goBack()" backTo="Home" />

  <q-tabs
    v-model="tab"
    no-caps
    class="bg-primary text-white shadow-2"
    indicator-color="white"
    align="justify"
  >
    <q-tab icon="bi-arrow-clockwise" name="my-tasks" label="My Tasks" />
    <q-tab icon="bi-check-circle" name="tasks-history" label="Tasks History" />
  </q-tabs>

  <q-separator />

  <q-tab-panels v-model="tab" animated>
    <q-tab-panel name="my-tasks">
      <div class="row">
      <SkeletonCardItem v-if="!tasks"></SkeletonCardItem>
      </div>
      <div class="row">
      <q-card class="my-card" v-for="(task, index) in tasks" :key="index">
        <q-card-section v-if="task.transaction_status === 1">
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <div class="col-auto">
                <q-avatar style="margin-right: 15px">
                  <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                </q-avatar>
              </div>
            </div>
            <div class="col">
              <div class="text-h6">
                {{ task.task_name }}
                <q-badge align="top">In Progress</q-badge>
              </div>
              <div class="text-caption">{{ task.zlto_amount }}</div>
            </div>
            <div class="col-auto">
              <q-btn
                color="grey-7"
                round
                flat
                icon="bi-chevron-right"
                @click="viewTask(task.task_id, task.transaction_id)"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      </div>
      <div class="row">
      <div v-if="tasks?.length === 0">No Tasks In Progress</div>
      </div>
    </q-tab-panel>

    <q-tab-panel name="tasks-history">
      <SkeletonCardItem v-if="!tasks"></SkeletonCardItem>
      <q-card class="my-card" v-for="(task, index) in tasks" :key="index">
        <q-card-section
          v-if="task.transaction_status === 2 || task.transaction_status === 3"
        >
          <div class="row items-center no-wrap">
            <div class="col-auto">
              <q-avatar
                style="margin-right: 15px;background-color: #fee9b9;color: #fdb417;"
                icon="bi-list-check"
              ></q-avatar>
            </div>
            <div class="col">
              <div class="text-h6">
                {{ task.task_name }}
                <q-badge
                  v-if="task.transaction_status === 2"
                  color="orange"
                  align="top"
                  >Pending</q-badge
                >
                <q-badge
                  v-if="task.transaction_status === 3"
                  color="red"
                  align="top"
                  >Declined</q-badge
                >
                <!-- <q-badge v-if="task.transaction_status === 4" color="green" align="top">Approved</q-badge> -->
              </div>
              <div class="text-caption">{{ task.zlto_amount }}</div>
            </div>
            <div class="col-auto">
              <q-btn
                color="grey-7"
                round
                flat
                icon="bi-chevron-right"
                @click="viewTask(task.task_id, task.transaction_id)"
              ></q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card>
      <div v-if="tasks?.length === 0">No Tasks History</div>
    </q-tab-panel>
  </q-tab-panels>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import TaskService from "@/services/task.service";
import type {
  getAllTasksResponse,
  TaskTransaction,
} from "@/services/models/task.models";

const tab = ref("my-tasks");
const items = [1, 2, 3, 4, 5];
const router = useRouter();
const userStore = useUserStore();
let taskService = new TaskService();
let tasks = ref<Array<TaskTransaction>>();

onMounted(() => {
  const ownerID = userStore.currentAccount.member_id;
  taskService
    .getAllUserTaskTransactions(ownerID)
    .then((getAllUserTasksResponse: any) => {
      if ((getAllUserTasksResponse.status = 200)) {
        tasks.value = getAllUserTasksResponse.data.data;
        console.log(tasks.value);
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function viewTask(taskID: string, transactionID: number) {
  router.push({
    name: "ViewUserTask",
    params: { taskID: taskID, transactionID: transactionID },
  });
}

function goBack() {
  router.push({ name: "Home" });
}
</script>
