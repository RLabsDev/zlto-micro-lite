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
        background-color: #FDB417;
        border-color: #FDB417;
        width: 100%;
        height: 47px;
      }

.request-again {
  text-align: center;
}

.request-again p {
  font-size: 10px;
}

.request-again a {
  color: #fdb417;
}

.request-again a:hover {
  background: none;
}

a {
  cursor: pointer;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col-12">
        <p class="label">Verify email address</p>
      </div>
      <div class="col-12">
        <p class="sub-label">The OTP is sent to your email {{partialEmail}}.You'll receive a 5 digit code to verify.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element offset-1 col-2">
        <q-input outlined v-model="verifyEmailAddressForm.digit_1"   lazy-rules  pattern="[0-9]*"  mask="#" :input-style="{ textAlign: 'center' }" >
      </q-input>
      </div>
      <div class="form-element col-2">
        <q-input outlined v-model="verifyEmailAddressForm.digit_2" lazy-rules pattern="[0-9]*"  mask="#" :input-style="{ textAlign: 'center' }" >
      </q-input>
      </div>
      <div class="form-element col-2">
        <q-input outlined v-model="verifyEmailAddressForm.digit_3" lazy-rules pattern="[0-9]*"  mask="#" :input-style="{ textAlign: 'center' }" >

      </q-input>
      </div>
      <div class="form-element col-2"> 
        <q-input outlined v-model="verifyEmailAddressForm.digit_4"  lazy-rules pattern="[0-9]*"  mask="#" :input-style="{ textAlign: 'center' }" >

      </q-input>
      </div>
      <div class="form-element col-2">
        <q-input outlined v-model="verifyEmailAddressForm.digit_5"  lazy-rules pattern="[0-9]*"  mask="#" :input-style="{ textAlign: 'center' }" >

      </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12 request-again">
        <p>
            <p>Didn't receive code? <a href="">Request again</a></p>
        </p>
      </div>
    </div>
        <div  class="row">
            <div class="button-wrapper col-12">
          <q-btn :no-caps="true" unelevated   class="form-btn" label="Verify" type="submit" color="primary" />
        </div>
        </div>
  </q-form>
</template>
<script setup lang="ts">
 import { onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from "@/stores/user.store";
  import MemberAccountService from '@/services/account.service'
  // import { Notify } from 'quasar'

 let partialEmail = '';
 const router = useRouter()
 const userStore = useUserStore();
 const memberAccountService = new MemberAccountService();
 const verifyEmailAddressForm = reactive({
      digit_1: "",
      digit_2: "",
      digit_3: "",
      digit_4: "",
      digit_5: ""
    });
    let verificationID = '';
const emailAddress = userStore.getEmailAddress;
if(emailAddress) {
    let emailSplit = emailAddress.split('@');
    partialEmail = emailSplit[0].slice(0,-5)+'****'+'@'+emailSplit[1];
}

onMounted(() => {
    const payload = {
      username: emailAddress,
      resetType: 'email'
    }
     memberAccountService.createVerificationRequest(payload).then((createVerificationRequestResponse: any) => {
      if ((createVerificationRequestResponse.status = 200)) {
        verificationID = createVerificationRequestResponse.data.account_verification_record.v_id;
        console.log(createVerificationRequestResponse)
      }
    })
    .catch((e: any) => {
      console.log(e);
    });
});

function onSubmit() {
  const verificationCode = "" + verifyEmailAddressForm.digit_1 + verifyEmailAddressForm.digit_2 + verifyEmailAddressForm.digit_3 + verifyEmailAddressForm.digit_4 + verifyEmailAddressForm.digit_5
    console.log(verificationCode, verificationID);
    if(verificationCode === "" || verificationID === "") {
      verifyEmailAddressFailed();
      return;
    }

    let payload = {
      verificationID: verificationID,
      verificationCode: verificationCode
    }
    memberAccountService.completeVerificationRequest(payload).then((completeVerificationRequestResponse: any) => {
      if ((completeVerificationRequestResponse.status = 200)) {
        verifyEmailAddressSuccess();
        router.push({ name: 'Agreement' })
      }
    })
    .catch((e: any) => {
      console.log(e);
      verifyEmailAddressFailed(e.message);
    });

  }

  function verifyEmailAddressSuccess() {
  // Notify.create({
  //         message: 'Verification SMS sent!',
  //         color: 'green',
  //         icon: 'bi-check-circle-fill',
  //         position: 'top',
  //         actions: [
  //           { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
  //         ]
  //       })
  }

 function verifyEmailAddressFailed(error_msg?: any) {
  // Notify.create({
  //         message: error_msg ? error_msg : 'Something went wrong. Please try again.' ,
  //         color: 'red',
  //         icon: 'bi-exclamation-circle-fill',
  //         position: 'top',
  //         actions: [
  //           { label: 'Dismiss', color: 'white', handler: () => { } }
  //         ]
  //       })
 }


</script>
