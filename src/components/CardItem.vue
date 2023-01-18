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

.card-item {
  min-height: 100px;
  height: fit-content;
}
</style>
<template>
  <LvCard
    :shadowStyle="1"
    padding="20px"
    borderRadius="4px"
    class="card-item"
  >
    <div class="row">
      <div class="col">
        <h2 class=""> 🎁 </h2>
      </div>
      <div class="col">
        <div class="content">
          <h4 class="">{{ title }}</h4>
          <h4 class="">{{ description }}</h4>
          <p class="text-caption text-grey">{{ caption }}</p>
        </div>
      </div>
    </div>
  </LvCard>
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
