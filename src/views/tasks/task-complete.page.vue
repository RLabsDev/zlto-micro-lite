<style>
.icon {
  margin: 2rem 0;
}

.body-text {
  margin: 2rem 0;
}

.waiting-time {
  margin: 1rem 0;
}
</style>
<template>
  <q-card class="my-card" flat>
    <q-card-section>
      <div class="row justify-center full-height text-center">
        <div class="col-12">
          <h1 class="icon"><q-icon name="bi-check-circle-fill" color="primary" /></h1>
        </div>
        <div class="col-12">
          <div class="text-h7 q-mt-sm q-mb-xs text-center body-text">Thank you for submitting, you will recieve a notification
            when your deed has been reviewed.</div>
        </div>
        <div class="col-12">
          <div class="text-h7 q-mt-sm q-mb-xs  text-center waiting-time">Estimated waiting time: 48hrs</div>
        </div>
      </div>
    </q-card-section>
    <q-card-actions>
      <q-btn unelevated color="primary" class="full-width" label="Done" @click="taskComplete()" />
    </q-card-actions>

  </q-card>

</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();


function taskComplete() {
  router.push({ name: 'ViewAllUserTasks'});
}

</script>
