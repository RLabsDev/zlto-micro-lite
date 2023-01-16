<style>
.custom-caption {
  text-align: center;
  padding: 12px;
  color: white;
  background-color: rgba(0, 0, 0, .3)
}

</style>
<template>
    <div class="row">
      <div class="section-heading">Featured Surveys</div>
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
      <q-carousel-slide name="first" img-src="https://cdn.quasar.dev/img/mountains.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">First stop</div>
          <div class="text-subtitle1">Mountains</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second" img-src="https://cdn.quasar.dev/img/parallax1.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Second stop</div>
          <div class="text-subtitle1">Famous City</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third" img-src="https://cdn.quasar.dev/img/parallax2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Third stop</div>
          <div class="text-subtitle1">Famous Bridge</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    </div>
    <div class="row">
      <div class="section-heading">Available Surveys</div>
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
</script>
