<style>

</style>
<template>
     <q-tabs
          v-model="tab"
            no-caps
          class="bg-primary text-white shadow-2"
          indicator-color="white"
          align="justify"

        >
          <q-tab icon="bi-arrow-clockwise" name="mails" label="My In Progress Tasks" />
          <q-tab icon="bi-check-circle" name="alarms" label="My Completed Tasks" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="mails">

    <q-card class="my-card" v-for="(item, index) in items" :key="index">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar style="margin-right: 15px;background-color: #fee9b9; color: #fdb417;"  icon="bi-list-check" ></q-avatar>
          </div>
          <div class="col">
        <div class="text-h6">In Progress Task {{item}}</div>
        <div class="text-subtitle2">Task Description</div> 
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="bi-chevron-right" @click=""></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card>

          </q-tab-panel>

          <q-tab-panel name="alarms">
            <q-card class="my-card" v-for="(item, index) in items" :key="index">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar style="margin-right: 15px;background-color: #fee9b9; color: #fdb417;"  icon="bi-list-check" ></q-avatar>
          </div>
          <div class="col">
        <div class="text-h6">Completed Task {{item}}</div>
        <div class="text-subtitle2">Task Description</div> 
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="bi-chevron-right" @click=""></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card>
          </q-tab-panel>
        </q-tab-panels>
</template>
<script setup lang="ts">import { ref } from 'vue';

 const tab = ref('mails')
 const items = [1,2,3,4,5]
</script>
