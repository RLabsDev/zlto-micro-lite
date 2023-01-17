<style>
.form-element {
  padding: 5px;
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
  font-weight: 500;
  color: #fff;
  background-color: #fdb417;
  border-color: #fdb417;
  width: 100%;
  height: 47px;
}

.terms-and-condtitions {
  text-align: center;
}

.terms-and-condtitions p {
  font-size: 10px;
}

.terms-and-condtitions a {
  color: #fdb417;
}

.terms-and-condtitions a:hover {
  background: none;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row" v-show="showError">
      <div class="col-12">
        <q-banner dense inline-actions class="text-white bg-red">
          <template v-slot:avatar>
            <q-icon name="bi-exclamation-circle" color="white" />
          </template>
          Your passwords do not match!
          <template v-slot:action>
            <q-btn
              flat
              color="white"
              label="Dismiss"
              @click="showError = false"
            />
          </template>
        </q-banner>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Create a password</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Create a password with atleast 6 characters.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          v-model="createPasswordForm.password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          label="Password *"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="bi-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Confirm password</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your password again to confirm.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          v-model="createPasswordForm.confirm_password"
          outlined
          :type="isConfirmPwd ? 'password' : 'text'"
          label="Confirm Password *"
          lazy-rules
        >
          <template v-slot:prepend>
            <q-icon name="bi-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12 terms-and-condtitions">
        <p>
          By selecting Agree and Signup below, you agree to our
          <a href="">Terms and Conditions</a> and <a href="">Privacy Policy</a>.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="button-wrapper col-12">
        <q-btn
        unelevated 
          :no-caps="true"
          class="form-btn"
          label="Agree and Signup"
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

let isPwd = ref(true);
let isConfirmPwd = ref(true);
const router = useRouter();
const userStore = useUserStore();
let showError = ref(false);
const createPasswordForm = reactive({
  password: "",
  confirm_password: "",
});

function onSubmit() {
  console.log(createPasswordForm.password, createPasswordForm.confirm_password);
  if (createPasswordForm.password === createPasswordForm.confirm_password) {
    userStore.onboaringAccountInfo.password = createPasswordForm.password;
    if(userStore.onboaringAccountInfo.email_address !== "") {
      router.push({ name: 'VerifyEmailAddress' })
    } else {
      router.push({ name: 'VerifyCellNumber' })
    }

  } else {
    // Notify.create({
    //       message: "Your passwords do not match!",
    //       color: 'red',
    //       position: 'top',
    //       icon: 'bi-exclamation-circle-fill',
    //       actions: [
    //         { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    //       ]
    //     })
  }
}
</script>
