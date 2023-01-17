<style>
.form-text {
  padding: 5px;
  font-size: 12px;
  color: #000000;
  font-weight: 500;
}

.form-element {
  font-size: 12px;
}
.form-element a {
  color: #fdb417;
}

.label {
  margin-bottom: 0;
  font-weight: bold;
  font-size: 14px;
  color: #212427;
}

.sub-label {
  margin-bottom: 0;
  font-size: 10px;
  color: #212427;
}

.form-btn {
  margin-top: 15px;
  font-weight: 500;
  color: #fff;
  background-color: #fdb417;
  border-color: #fdb417;
  width: 100%;
  height: 47px;
}

.topic {
  height: 90%;
  width: 99%;
  margin: 5px;
}

.q-chip__content {
  justify-content: center;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col-12">
        <p class="label">Pick your favourite topics</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Chooose 3 or more you can still change the topics later.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          color="primary"
          v-model:selected="topics.HealthAndWellness"
          text-color="white"
          icon="bi-check-lg"
        >
          Health and Wellness
        </q-chip>
      </div>
      <div class="col-xl-4 col-l-4 col-md-4 col-sm-4 col-xs-12 justify-center">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.PersonalDevelopment"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          PersonalDevelopment
        </q-chip>
      </div>
      <div class="col-xl-4 col-l-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.IT"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          IT
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Design"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Design
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Finance"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Finance
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Marketing"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Marketing
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.JobReadiness"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          JobReadiness
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Beauty"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Beauty
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Lifestyle"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Lifestyle
        </q-chip>
      </div>
    </div>
    <div class="row">
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.OfficeProductivity"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          OfficeProductivity
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Business"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Business
        </q-chip>
      </div>
      <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-xs-12">
        <q-chip
          class="topic"
          outline
          v-model:selected="topics.Innovation"
          color="primary"
          text-color="white"
          icon="bi-check-lg"
        >
          Innovation
        </q-chip>
      </div>
    </div>

    <div class="row">
      <div class="button-wrapper col-12">
        <q-btn
          unelevated
          :no-caps="true"
          class="form-btn"
          label="Start your journey"
          type="submit"
          color="primary"
        />
      </div>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
// import { Notify } from 'quasar'

const router = useRouter();
const userStore = useUserStore();
const favouritesForm = reactive({
  topics: "",
});
let showError = ref(false);
const topics = reactive({
  HealthAndWellness: true,
  PersonalDevelopment: true,
  IT: true,
  Design: true,
  Finance: true,
  Marketing: true,
  JobReadiness: true,
  Beauty: true,
  Lifestyle: true,
  OfficeProductivity: true,
  Business: true,
  Innovation: true,
});

function onSubmit() {
  
  let numberOfTopics = Object.values(topics).filter((v) => v === false).length;
  console.log(numberOfTopics)
  if(numberOfTopics >= 3) {
    let listOfTopics = "";
    Object.entries(topics).forEach(([k,v])=>{
      if(v === false) {
        listOfTopics+= k + ', '
      }
    })
    favouritesForm.topics = listOfTopics;
  console.log(favouritesForm.topics);

  router.push({ name: "Agreement" });
  } else {
    // Notify.create({
    //       message: 'Choose atleast 3 topics before you can continue.',
    //       color: 'blue',
    //       icon: 'bi-info-circle-fill',
    //       position: 'top',
    //       actions: [
    //         { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    //       ]
    //     })
  }

}
</script>
