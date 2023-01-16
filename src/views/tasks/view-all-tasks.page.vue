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
  <bread-crumb @click="goBack()" backTo="Tasks" />
  <div class="row">
    <div class="section-heading">Available Tasks</div>
  </div>
  <div class="row">
    <SkeletonCardItem v-if="!tasks"></SkeletonCardItem>
  </div>
  <div class="row">
    <div class="row">
      <CardItem
        v-for="task in tasks"
        :key="`Card_item_${task.task_name}`"
        image="https://cdn.quasar.dev/img/parallax2.jpg"
        :title="task.task_name"
        :description="task.task_description"
        :caption="`${task.task_category.name}`"
        @click="viewTask(task.task_id)"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import TaskService from "@/services/task.service";
import type { getAllTasksResponse, Task } from "@/services/models/task.models";

const router = useRouter();
let taskService = new TaskService();
let tasks = ref<Array<Task>>();

onMounted(() => {
  taskService
    .getAllTasks()
    .then((getAllTasksResponse: any) => {
      if ((getAllTasksResponse.status = 200)) {
        tasks.value = getAllTasksResponse.data.data;
        console.log(tasks);
      }
    })
    .catch((e: any) => {
      console.log("login error : ", e);
    });
});

function viewTask(taskID: string) {
  router.push({ name: "ViewTask", params: { id: taskID } });
}

function goBack() {
  router.push({ name: "Home" });
}
</script>
