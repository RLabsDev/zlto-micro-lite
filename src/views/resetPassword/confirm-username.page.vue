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
</style>
<template>
    <bread-crumb @click="goBack()" backTo="Login" />
<br>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col-12">
        <p class="label">What's your username?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your username linked to your account.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
         <q-input outlined v-model="confirmEmailAddressForm.username" lazy-rules   label="Username *"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']">
          <template v-slot:prepend>
            <q-icon name="bi-person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12 terms-and-condtitions">
        <p>We will email or sms you instructions for reseting your password.</p>
      </div>
    </div>
    <div class="row">
      <div class="button-wrapper col-12">
        <q-btn
          unelevated
          :no-caps="true"
          class="form-btn"
          label="Submit"
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
import MemberAccountService from '@/services/account.service'
import { Notify } from 'quasar'

const router = useRouter();
const memberAccountService = new MemberAccountService();
const confirmEmailAddressForm = reactive({
  username: "",
});

function onSubmit() {
  let payload = {
    username: confirmEmailAddressForm.username,
    resetType: checkUsernameType(confirmEmailAddressForm.username)
  }

  console.log(payload)

  if(payload.resetType === 'invalid') {
    ResetPasswordFailed('Invalid username! Please try again.');
    return;
  }
  memberAccountService.createPasswordResetRequest(payload).then((createPasswordResetRequestResponse: any) => {
      if ((createPasswordResetRequestResponse.status = 200)) {
        ResetPasswordSuccess();
        router.push({ name: "Login" });
      }
    })
    .catch((e: any) => {
      console.log(e);
      ResetPasswordFailed(e.message);
    });
}

function ResetPasswordSuccess() {
  Notify.create({
          message: 'Reset Password Success!',
          color: 'green',
          icon: 'bi-check-circle-fill',
          position: 'top',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
          ]
        })
  }

 function ResetPasswordFailed(error_msg?: any) {
  Notify.create({
          message: error_msg ? error_msg : 'Something went wrong. Please try again.' ,
          color: 'red',
          icon: 'bi-exclamation-circle-fill',
          position: 'top',
          actions: [
            { label: 'Dismiss', color: 'white', handler: () => { } }
          ]
        })
 }

function checkUsernameType(username: string) 
{
 const email_regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const phone_regex = /^[0-9]{1,11}$/;
 if (email_regex.test(username)) {
    return 'email'
  } else if(phone_regex.test(username)) {
    return 'sms';
  } else {
    return 'invalid'
  }

}

function goBack() {
  router.push({ name: "Login" });
}
</script>
