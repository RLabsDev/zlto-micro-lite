<style>
.tabs {
  background-color: #fee9b9;
  color: #fdb417;
}

.task-details {
  font-weight: 500;
  display: contents;
}

.task-details > .lv-badge {
  font-size: 13px;
  padding: 0.5rem 1rem;
  width: 100px;
  height: 27px;
  line-height: 1;
}

</style>
<template>
  <bread-crumb @click="goBack()" backTo="Home" />

  <div class="accordian-wrapper">
    <div class="nav-list__category-wrap">
      <div class="collapsible_catgory" @click="toggleMyTasks">
        <div class="nav-list__category-label">
          <i class="light-icon-adjustments"></i>
          My Tasks ({{ getTasksInProgress(tasks || []).length }})
        </div>
        <i :class="isMyTasksVisible ? 'light-icon-chevron-up' : 'light-icon-chevron-down'"></i>
      </div>
      <LvCollapsible :show="isMyTasksVisible">
        <div class="collapisible--answer">
          <LvCard class="my-card" v-for="(task, index) in getTasksInProgress(tasks || [])" :key="index">
              <div class="row flex items-center no-wrap">
                <div class="col-auto">
                  <div class="col-auto">
                    <div style="margin-right: 15px">
                      <img src="https://cdn.quasar.dev/img/parallax2.jpg" />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="text-h6">
                    {{ task.task_name }}
                    <LvBadge class="status-badge" color="warning">In Progress</LvBadge>
                  </div>
                  <div class="text-caption">{{ task.zlto_amount }}</div>
                </div>
                <div class="col-auto">
                  <LvButton
                    color="white"
                    class="chevron-icon--white"
                    round
                    flat
                    icon="bi-chevron-right" 
                    @click="viewTask(task.task_id, task.transaction_id)"
                  />
                </div>
              </div>
          </LvCard>
        </div>
      </LvCollapsible>
    </div>
    <div class="nav-list__category-wrap">
      <div class="collapsible_catgory" @click="toggleTaskHistory">
        <div class="nav-list__category-label">
          <i class="light-icon-adjustments"></i>
            Task History ({{ getTasksHistory(tasks || []).length }})
        </div>
        <i :class="isTaskHistoryVisible ? 'light-icon-chevron-up' : 'light-icon-chevron-down'"></i>
      </div>
      <LvCollapsible :show="isTaskHistoryVisible">
        <div class="collapisible--answer">
          <LvCard
            v-for="(task, index) in tasks" :key="index"
            @click="viewTask(task.task_id, task.transaction_id)"
            :shadowStyle="1"
            padding="20px"
            borderRadius="4px"
            class="task-card"
          >
            <div class="row flex items-center no-wrap">
              <div class="col-auto">
                <LvButton class="task-icon" icon="bi-list-check"></LvButton>
              </div>
                <div class="col">
                    <div class="task-details">
                      {{ task.task_name }}
                      <LvBadge v-if="task.transaction_status === 2" class="status-badge" color="warning">Pending</LvBadge>
                      <LvBadge v-if="task.transaction_status === 3" class="status-badge" color="danger">Declined</LvBadge>
                      <LvBadge v-if="task.transaction_status === 4" class="status-badge" color="success">Approved</LvBadge>
                    </div>
                    <div class="text-caption">{{ task.zlto_amount }}</div>
                  </div>
              <div class="col-auto">
                <LvButton
                  color="white"
                  class="chevron-icon--white"
                  round
                  flat
                  icon="bi-chevron-right" 
                  @click="viewTask(task.task_id, task.transaction_id)"
                />
              </div>
            </div>
          </LvCard>
        </div>
      </LvCollapsible>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import { useRouter } from "vue-router";
import TaskService from "@/services/task.service";
import type {
  TaskTransaction,
} from "@/services/models/task.models";

const tab = ref("my-tasks");
const items = [1, 2, 3, 4, 5];
const router = useRouter();
const userStore = useUserStore();
let taskService = new TaskService();
let tasks = ref<Array<TaskTransaction>>();

let isMyTasksVisible = ref(false);
let isTaskHistoryVisible = ref(false);

function toggleMyTasks() {
  isMyTasksVisible.value = !isMyTasksVisible.value;
}

function toggleTaskHistory() {
  isTaskHistoryVisible.value = !isTaskHistoryVisible.value;
}

function getTasksInProgress(tasks: Array<TaskTransaction>) {
  return tasks.filter(obj => obj.transaction_status === 1);
}

function getTasksHistory(tasks: Array<TaskTransaction>) {
  return tasks.filter(obj => obj.transaction_status !== 1);
}

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
