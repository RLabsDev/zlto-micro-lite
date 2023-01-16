<style>

</style>
<template>
 {{taskData}}
</template>
<script setup lang="ts">
import type { Task } from "@/services/models/task.models";
import TaskService from "@/services/task.service";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});
const router = useRouter();
let taskService = new TaskService();
let taskData = ref<Task>();

onMounted(() => {
  taskService.getTaskDetails(props.id).then((getTaskResponse: any)=>{
      if(getTaskResponse.status = 200) {
       taskData.value = getTaskResponse.data.data;
       console.log(taskData)
      }
  }).catch((e: any) => {
      console.log("login error : ", e);
    });
});

function goBack() {
    router.push({ name: 'Home' })
  }
</script>
