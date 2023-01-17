<style>
    .form-text {
      padding: 5px;
      font-size: 12px;
      color: 000000;
      font-weight:500;
    }

    .form-text b {
        color: #FDB417;
    }


    .form-element {
        font-size: 12px;
    }
    .form-element a {
        color: #FDB417;
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
      a {
  cursor: pointer;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div class="row">
      <div class="col-12">
        <p class="label">Agreement</p>
      </div>
    </div>
    <div class="row">
      <div class="form-text col-12">
       <p> <b>I understand that:</b><br>
Zlto NPC and/or may store my personal
information for no longer than is necessary to
achieve the purpose for which it was collected,
unless further retention is:</p>

<p>
    <ol>
      <li> required by law or contractual obligation;</li> 
      <li>otherwise reasonably required by Zlto NPC and/or for lawful purposes related to its functions and activities; or</li>
      <li> retained further with my consent;</li>
      <li> after which point my personal information will be de-identified;</li>
      <li>in hard copy and/or electronic copy; and</li>
      <li>subject to security safeguards that are adequate in accordance to Zlto NPC and ' standards to ensure the integrity and confidentiality of my personal information.</li>
    </ol>

</p>
<p><b>I have the right:</b><br>
of access to and the right to rectify my personal information collected; and to object at any time to the processing of my personal information, in which case, the consequences of the objection will be explained to you.
</p>
<p>I have read, understood and expressly agree to be bound by the terms and conditions contained herein. I am aware that no expectation of employment or future employment is created and that I shall not hold Zlto NPC, and/or any employers
responsible for the outcome of my registration with the Zlto Rewards programme.</p>

<p>
    The terms and conditions pertaining to any services appearing within the mobile site or pages shall at all times be solely and exclusively governed and interpreted in accordance with the laws of the Republic of South Africa.
</p>

      </div>
      </div>
      <div class="row">
      <div class="form-element col-12">
        <q-checkbox
        v-model="agreementForm.terms_and_conditions"
        color="primary"
      >Agree to <a>Terms and Conditions</a></q-checkbox>
      </div>
      <div class="form-element col-12">
        <q-checkbox
        v-model="agreementForm.privacy_policy"
        color="primary"
      >Agree to <a>Privacy Policy</a></q-checkbox>
      </div>
      </div>

        <div  class="row">
            <div class="button-wrapper col-12">
          <q-btn :disable="!agreementForm.terms_and_conditions || !agreementForm.privacy_policy" unelevated  :no-caps="true"  class="form-btn" label="Submit" type="submit" color="primary" />
        </div>
        </div>
  </q-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import MemberAccountService from '@/services/account.service'
// import { Notify } from 'quasar'



const router = useRouter();
const userStore = useUserStore();
const userAccountInfo = userStore.getAccountInfo;
const memberAccountService = new MemberAccountService();
const agreementForm = reactive({
  terms_and_conditions: false,
  privacy_policy: false
});

function onSubmit() {
  const programID = ''
  const programName = 'ZltoTest';
  const profileID = 2;
  const walletID = "None";
  const race = "Human";
  const status = "active";
  const bio = ""
  const userName = userAccountInfo.email_address !== "" ? userAccountInfo.email_address : userAccountInfo.cell_number
console.log(userName);
if(userAccountInfo.email_address === "" && userAccountInfo.cell_number === "") {
  RegisterFailed();
  router.push({ name: "Login" });
  return;
}

memberAccountService.createMemberAccount(
  programID,
  programName,
  profileID,
  walletID,
  userName,
  userAccountInfo.password,
  userAccountInfo.dob,
  userAccountInfo.gender,
  race,
  userAccountInfo.postal_code,
  userAccountInfo.country_of_residence,
  status
  )    .then((createMemberAccountResponse: any) => {
      if ((createMemberAccountResponse.status = 200)) {
       userStore.saveAccountDetails(
        createMemberAccountResponse.data.access_token,
        createMemberAccountResponse.data.account_info,
        createMemberAccountResponse.data.refresh_token,
        createMemberAccountResponse.data.profile_info
      );

      const onboardingUserDetails = userStore.onboaringAccountInfo;
      const memberID = createMemberAccountResponse.data.account_info.member_id;
      const payload = {
        memberID: memberID,
        mainProgramID: programID,
        firstName: onboardingUserDetails.name,
        lastName: onboardingUserDetails.surname,
        bio: bio,
        IDNumber: onboardingUserDetails.id_number,
        phoneNumber: onboardingUserDetails.cell_number,
        userName: userName,
        avatar: '',
        status: 'blank'
      }
      memberAccountService.createMemberProfile(
       payload
      ).then((CreateProfileResponse: any)=>{
        if ((CreateProfileResponse.status = 200)) {
          RegisterSuccess();
        router.push({ name: "Login" });
        }
      });

      }
    })
    .catch((e: any) => {
      console.log(e);
      let error = e.message;
      if (e.response.status == 401) {
        RegisterFailed(e.response.data.detail);
        userStore.reset();
        router.push({ name: "Login" });
      } else {
        RegisterFailed(e.response.data.detail);
      }
      console.log("Create Account error : ", error);
    });
  console.log(
    agreementForm.terms_and_conditions,
    agreementForm.privacy_policy,
  );

 function RegisterSuccess() {
  // Notify.create({
  //         message: 'You have successfully registerd!',
  //         color: 'green',
  //         icon: 'bi-check-circle-fill',
  //         position: 'top',
  //         actions: [
  //           { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
  //         ]
  //       })
  }

 function RegisterFailed(error_msg?: any) {
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
 
}
</script>
