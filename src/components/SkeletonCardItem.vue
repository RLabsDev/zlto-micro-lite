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
    <q-card class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto" style="margin-right: 15px">
            <q-skeleton width="150px" height="100px" animation="pulse" />
          </div>
          <div class="col">
            <div class="text-h6">
              <q-skeleton type="text" animation="wave" />
            </div>
            <div class="text-subtitle2">
              <q-skeleton type="text" animation="wave" />
            </div>
            <div class="text-subtitle3">
              <q-skeleton type="text" animation="wave" />
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>
<script  lang="ts">
export default {
};
</script>
