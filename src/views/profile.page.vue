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
  <q-dialog v-model="uploadImage">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <h6 style="text-align: center">Upload Profile Avatar</h6>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        <q-uploader
          :factory="updateMemberAvatar"
          batch
          auto-upload
          style="width: 100%"
          color="dark"
          accept=".jpg, image/*"
        />
      </q-card-section>
    </q-card>
  </q-dialog>

  <bread-crumb @click="goBack()" backTo="Profile" />

  <q-form @submit="onSubmit" class="q-gutter-xs">
    <!-- <q-file outlined v-model="fileUpload" label="Outlined" />
    <div class="row">
      <q-avatar>
      <img src="https://cdn.quasar.dev/img/avatar.png">
    </q-avatar>
    </div> -->
    <div class="row justify-center">
      <div class="col-12 text-center self-center q-pa-md q-gutter-sm">
        <q-avatar
          v-if="profileDetailsForm.avatar"
          size="100px"
          class="q-mb-sm"
          color="primary"
          text-color="white"
        >
          <img :src="profileDetailsForm.avatar" />
        </q-avatar>
        <q-avatar
          v-if="!profileDetailsForm.avatar"
          size="100px"
          class="q-mb-sm"
          color="primary"
          text-color="white"
        >
          {{ letter }}
        </q-avatar>
        <q-btn
          push
          color="teal"
          label="Update Avatar"
          @click="uploadImage = true"
        />
      </div>
      <div class="col-12"></div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Bio</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input v-model="profileDetailsForm.bio" outlined type="textarea" />
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label"></p>
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
        <q-input
          outlined
          v-model="profileDetailsForm.name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="bi-person" />
          </template>
        </q-input>
      </div>
      <div class="form-element col-6">
        <q-input
          outlined
          v-model="profileDetailsForm.surname"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="bi-person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Username</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="profileDetailsForm.username"
          lazy-rules
          :readonly="true"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
          <template v-slot:prepend>
            <q-icon name="bi-person" />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">Cell Number</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="profileDetailsForm.cell_number"
          label="Cell Number *"
          lazy-rules
          mask="###########"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
        <q-input
          outlined
          v-model="profileDetailsForm.dob"
          type="date"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
        <q-input
          outlined
          v-model="profileDetailsForm.id_number"
          lazy-rules
          mask="#############"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
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
        <q-btn
          unelevated
          :no-caps="true"
          class="form-btn"
          label="Update Profile"
          type="submit"
          color="primary"
        />
      </div>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { reactive, ref } from "vue";
import AccountService from "@/services/account.service";
import { Notify } from "quasar";

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
  Notify.create({
    message: "You have successfully updated your profile!",
    color: "green",
    icon: "bi-check-circle-fill",
    position: "top",
    actions: [
      {
        label: "Dismiss",
        color: "white",
        handler: () => {
          /* ... */
        },
      },
    ],
  });
}

function UpdateProfileFailed(error_msg?: any) {
  Notify.create({
    message: error_msg ? error_msg : "Something went wrong. Please try again.",
    color: "red",
    icon: "bi-exclamation-circle-fill",
    position: "top",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });
}
</script>
