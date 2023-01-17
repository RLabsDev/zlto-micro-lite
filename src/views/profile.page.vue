<style>
.card-heading {
  font-size: 12px;
  font-weight: 500;
  color: #212427;
}

.card-subheading {
  font-size: 10px;
  font-weight: 500;
  color: #7e84a3;
}
</style>
<template>
  <bread-crumb @click="goBack()" backTo="Profile" />

  <form class="q-gutter-xs">
    <div class="row justify-center">
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Bio</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-textarea
          v-model="profileDetailsForm.bio"
          :bottom-bar="true"
          :rows="3"
          placeholder="Bio"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="light-icon-user"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6">
        <p class="label">Name</p>
      </div>
      <div class="col-6">
        <p class="label">Surname</p>
      </div>
    </div>

    <div class="row">
      <div class="form-element col-6">
        <lv-input
          v-model="profileDetailsForm.name"
          :bottom-bar="true"
          placeholder="Name"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="bi-person"
        />
      </div>
      <div class="form-element col-6">
        <lv-input
          v-model="profileDetailsForm.surname"
          :bottom-bar="true"
          placeholder="Name"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="bi-person"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Username</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="profileDetailsForm.username"
          :bottom-bar="true"
          :readonly="true"
          placeholder="Username"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="bi-person"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Cell Number</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="profileDetailsForm.cell_number"
          :bottom-bar="true"
          placeholder="Cell Number"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="bi-phone"
          mask="###########"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Date of birth</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="profileDetailsForm.dob"
          :bottom-bar="true"
          placeholder="Date of birth"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          type="date"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">ID Number</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="profileDetailsForm.id_number"
          :bottom-bar="true"
          placeholder="ID Number"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          mask="#############"
        />
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-12">
        <p class="label">Gender</p>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="form-element col-12">
        <div class="form-element col-12">
        <div class="q-gutter-sm">
          <q-radio v-model="profileDetailsForm.gender" val="Male" label="Male" />
          <q-radio v-model="profileDetailsForm.gender" val="Female" label="Female" />
          <q-radio v-model="profileDetailsForm.gender" val="Prefer not to answer" label="Prefer not to answer" />
        </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <p class="label">Postal Code</p>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="form-element col">
        <div class="form-element col-12">
        <q-input
          outlined
          v-model="profileDetailsForm.country"
          mask="####"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
        </div>
      </div>
      </div> -->
    <div class="row">
      <div class="button-wrapper col-12">
        <lv-button
          class="form-btn"
          label="Update Profile"
          type="button"
          @click="onSubmit"
        />
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { reactive, ref } from "vue";
import AccountService from "@/services/account.service";

const userStore = useUserStore();
const router = useRouter();
const profile = userStore.getProfile;
const accountService = new AccountService();
const letter = profile.name.charAt(0);
let uploadedFile = ref("");
let uploadImage = ref(false);
const profileDetailsForm = reactive({
  bio: profile.bio,
  avatar: profile.avatar,
  name: profile.name,
  surname: profile.surname,
  username: profile.username,
  country_code: "",
  cell_number: profile.cellNumber,
  dob: profile.dateOfBirth,
  id_number: profile.IDNumber,
  gender: profile.gender,
  country: profile.country,
  postal_code: "7945",
});

function goBack() {
  router.push({ name: "Home" });
}

function updateMemberAvatar(files: any) {
  console.log("file : ", files[0]);
  uploadedFile.value = files[0];
  console.log("uploaded file : ", uploadedFile.value);
  console.log("profile id : ", userStore.profile.member_profile_id);
  var uploadData: any;
  const payload = {
    profileID: userStore.profile.member_profile_id,
    avatar: uploadedFile.value,
  };
  accountService
    .uploadMemberProfileAvatar(payload)
    .then((upload_data: any) => {
      console.log("upload_data : ", upload_data);
      uploadData = upload_data;
      userStore.saveProfileDetails(uploadData.data["profile-info"]);
      profileDetailsForm.avatar =
        uploadData.data["file_upload_details"]["public_url"];
      uploadImage.value = false;
    })
    .catch((e: any) => {
      console.log("error : ", e);
    });
  return uploadData;
}

function onSubmit() {
  const payload = {
    profileID: userStore.profile.member_profile_id,
    memberID: userStore.currentAccount.member_id,
    mainProgramID: "",
    firstName: profileDetailsForm.name,
    lastName: profileDetailsForm.surname,
    bio: profileDetailsForm.bio,
    IDNumber: profileDetailsForm.id_number,
    phoneNumber: profileDetailsForm.cell_number,
    userName: userStore.profile.username,
    avatar: userStore.profile.avatar,
    status: userStore.profile.status,
  };

  accountService
    .updateMemberProfile(payload)
    .then((resp: any) => {
      console.log(resp);
      UpdateProfileSuccess();
      userStore.saveProfileDetails(resp.data);
    })
    .catch((e: any) => {
      console.log("login error : ", e);
      UpdateProfileFailed(e.response.data.detail);
    });
}

function UpdateProfileSuccess() {
  window.alert('You have successfully updated your profile!');
}

function UpdateProfileFailed(error_msg?: any) {
  window.alert(error_msg ? error_msg : "Something went wrong. Please try again.");
}
</script>
