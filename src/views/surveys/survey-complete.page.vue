<style>
.card-heading {
  font-size: 12px;
  font-weight: 500;
  color: #212427;
}
.card-subheading {
  font-size: 10px;
  font-weight: 500;
  color: #7E84A3;
}

.card-button {
  font-size: 8px;
  font-weight: 500;
}

.section-heading {
  font-size: 14px;
  font-weight: 500;
  margin: 15px 0px;
}

div.q-card {
  width: 100%;
  margin-bottom: 15px;
}
</style>
<template>
  <div class="row">
    <div class="section-heading"><q-icon style="cursor: pointer;" @click="goBack()" name="bi-arrow-left"></q-icon> Notifications</div>
  </div>
  <div class="row">
    <div class="section-heading">New</div>
    
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
      <q-separator />

      <q-card-actions>
        <q-btn outline  color="primary"  :no-caps="true" class="card-button">Decline</q-btn>
        <q-btn  color="primary"  :no-caps="true" class="card-button">Accept</q-btn>
      </q-card-actions>
    </q-card>

        
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div class="row">
    <div class="section-heading">Yesterday</div>
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
  <div class="row">
    <div class="section-heading">Previous 7 days</div>
    <q-card flat bordered>
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-2">
            <q-avatar>
              <img style="width:80px" src="src/assets/logo.png">
            </q-avatar>
          </div>
          <div class="">
            <div class="card-heading">Zlto has requested to feature your activity on the Zlto feed.</div>
            <div class="card-subheading">2 hours ago • Volunteering at Lions</div>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goBack() {
    router.push({ name: 'Home' })
  }
</script>
