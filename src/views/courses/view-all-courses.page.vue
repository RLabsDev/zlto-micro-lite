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

.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3)
}

</style>
<template>
    <div class="row">
      <div class="section-heading">Featured Courses</div>
    </div>
<div class="q-pa-xs">
      <q-carousel
      arrows
      animated
      infinite
      v-model="slide"
      height="250px"
      transition-prev="slide-right"
      transition-next="slide-left"
    >
      <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg" @click="slideClicked(slide)">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">First stop</div>
          <div class="card-subtitle1">Mountains</div>
          <div class="card-subtitle2">1000</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg" @click="slideClicked(slide)">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">Second stop</div>
          <div class="card-subtitle1">Test</div>
          <div class="card-subtitle2">100</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg" @click="slideClicked(slide)">
        <div class="absolute-bottom custom-caption">
          <div class="text-h6">Third stop</div>
          <div class="card-subtitle1">Testing</div>
          <div class="card-subtitle2">140</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    </div>
    <div class="row">
      <div class="section-heading">Available Courses</div>
    </div>
    <div class="row">
      <div class="col-12">
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

            <q-card-section>
              <div class="text-h6">Task Name</div>
              <div class="text-subtitle2">Category</div>
              <div class="text-subtitle3">Z 100</div>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

            <q-card-section>
              <div class="text-h6">Task Name</div>
              <div class="text-subtitle2">Category</div>
              <div class="text-subtitle3">Z 100</div>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

            <q-card-section>
              <div class="text-h6">Task Name</div>
              <div class="text-subtitle2">Category</div>
              <div class="text-subtitle3">Z 100</div>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

            <q-card-section>
              <div class="text-h6">Task Name</div>
              <div class="text-subtitle2">Category</div>
              <div class="text-subtitle3">Z 100</div>
            </q-card-section>
          </q-card-section>
        </q-card>
        <q-card class="my-card">
          <q-card-section horizontal>
            <q-img class="col-4" src="https://cdn.quasar.dev/img/parallax1.jpg" />

            <q-card-section>
              <div class="text-h6">Task Name</div>
              <div class="text-subtitle2">Category</div>
              <div class="text-subtitle3">Z 100</div>
            </q-card-section>
          </q-card-section>
        </q-card>
      </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
let slide = ref('first')

function slideClicked(slide: string) {
console.log(slide);
}
</script>
