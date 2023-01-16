<style scoped>
.text-caption {
  margin-bottom: 0;
}
h4 {
  font-size: 14px;
  line-height: 1.2;
  margin-bottom: 5px;
  color: #18191f;
  font-weight: 500;
}
.image-section {
  padding: 0;
  margin: 0;
}
.content-container {
  display: flex;
  padding: 0 0 0 16px;
  width: 100%;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.seperator {
  margin: 15px 0 0 0;
  background: #707070;
}
</style>
<template>
  <q-card class="Card" flat>
    <q-card-section horizontal>
      <q-card-section class="col-5 image-section flex flex-center">
        <q-img class="rounded-borders" :src="image" />
      </q-card-section>
      <q-card-section class="content-container">
        <div class="content">
          <h4 class="">{{ title }}</h4>
          <h4 class="">{{ description }}</h4>
          <p class="text-caption text-grey">{{ caption }}</p>
        </div>
      </q-card-section>

      <q-card-actions vertical class="justify-around">
        <q-icon name="bi-chevron-right" color="grey-7" size="1.5rem" />
      </q-card-actions>
    </q-card-section>
    <q-separator inset class="seperator" />
  </q-card>
</template>

<script lang="ts">
export default {
  props: {
    image: String,
    title: String,
    description: String,
    caption: String,
    click: Function,
  },
};
</script>
