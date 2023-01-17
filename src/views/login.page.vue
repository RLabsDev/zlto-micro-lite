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

.button-wrapper {
  display: flex;
  align-items: center;
}

.terms-and-condtitions {
  text-align: center;
}

.terms-and-condtitions p {
  font-size: 10px;
}

a {
  cursor: pointer;
}
</style>
<template>
  <form  class="q-gutter-md">
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="loginForm.m_username"
          :bottom-bar="true"
          placeholder="Username"
          label="Username"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="light-icon-user"
        />
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <lv-input
          v-model="loginForm.m_password"
          :bottom-bar="true"
          placeholder="Password"
          label="Password"
          placeholder-color="rgba(0, 0, 0, 0.3)"
          icon-left="light-icon-user"
          type="password"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 terms-and-condtitions">
        <p>Don't have an account yet? <a  @click="signUp()">Sign Up</a>.</p>
      </div>
    </div>
    <div class="row">
      <div class="col-12 terms-and-condtitions">
        <p>Forgot Password? <a  @click="resetPassword()">Reset Password</a>.</p>
      </div>
    </div>
    <div class="row">
      <div class="button-wrapper col-12">
        <lv-button
          class="form-btn"
          label="Login"
          type="button"
          @click="onSubmit"
        />
      </div>
    </div>
  </form>
</template>
<script setup lang="ts">

import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import AccountService from '@/services/account.service'
import WalletService from "@/services/wallet.service";
import type { LoginResponse } from "@/services/models/member.models";

const userStore = useUserStore();
const accountService = new AccountService();
const walletService = new WalletService();
let isPwd = ref(true);
const router = useRouter();
const loginForm = reactive({
  m_username: "",
  m_password: ""
});

function UpdateAccountStore(loginResponse: LoginResponse) {
  userStore.saveAccountDetails(
    loginResponse.access_token,
    loginResponse.account_info,
    loginResponse.refresh_token,
    loginResponse.profile_info
  );
}

function onSubmit() {
  console.log('@@@@@  ~ file: login.page.vue:146 ~ onSubmit ~ loginForm', loginForm)

  accountService.loginMemberAccount(loginForm)
    .then((loginResponse: any) => {
      LoginSuccess();
      UpdateAccountStore(loginResponse.data);
      const wallet_id = loginResponse.data.account_info.wallet_id;
      if (wallet_id !==  'None') {

        walletService.getWalletDetails(wallet_id).then((getWalletResponse: any) => {
          // eslint-disable-next-line no-constant-condition
          if ((getWalletResponse.status = 200)) {
            userStore.saveWalletDetails(
              getWalletResponse.data,
            );
          }
        })
      } else {
        console.log('User has no walletID')
      }

      router.push({ name: "Home" });
    })
    .catch((e: any) => {
      LoginFailed('Login Error! Please try again.');
      console.log("login error : ", e);
    });
}

function LoginSuccess() {
  window.alert('Login Success');
}

function LoginFailed(error_msg?: any) {
  window.alert(error_msg ? error_msg : 'Something went wrong. Please try again.');
}

function signUp() {
  router.push({ name: 'PersonalDetails' })
}

function resetPassword() {
  router.push({ name: 'ConfirmUsername' })
}
</script>
