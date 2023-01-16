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

.welcome-card {
  background-color: #fdb417;

}

</style>
<template>
  <div class="row" v-if="!hasWallet">
    <q-card class="welcome-card text-white">
      <q-card-section>
        <div class="text-h6">Welcome</div>
        <div class="text-subtitle2">You are new to Zlto to start earning and spending you have to create a wallet.<br>If you would like to do that now click the "Create Wallet" button below.</div>
      </q-card-section>

      <q-card-actions>
        <q-btn flat  @click="CreateWallet()">Create Wallet</q-btn>
      </q-card-actions>
    </q-card>
  </div>
  <div class="row" v-if="hasWallet">
  <q-card class="welcome-card text-white" @click="viewWallet()">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
        <div class="text-h4">{{balance}}</div>
        <div class="text-subtitle2">Zlto Wallet Balance</div>
          </div>
        <div class="col-auto">
          <q-btn color="white" round flat icon="bi-chevron-right"  @click="goToMyTasks()"></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card>
    </div>
    <div class="row">
      <q-card class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar style="margin-right: 15px;background-color: #fee9b9; color: #fdb417;"  icon="bi-list-check"></q-avatar>
          </div>
          <div class="col">
        <div class="text-h6">My Tasks</div>
        <div class="text-subtitle2">View your tasks</div> 
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="bi-chevron-right"  @click="goToMyTasks()"></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card>

      <!-- <q-card class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar icon="bi-book" style="margin-right: 15px; background-color: #fee9b9; color: #fdb417;"></q-avatar>
          </div>
          <div class="col">
        <div class="text-h6">My Courses</div>
        <div class="text-subtitle2">Coming Soon</div> 
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="bi-chevron-right" @click=""></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="my-card">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col-auto">
            <q-avatar style="margin-right: 15px;background-color: #fee9b9; color: #fdb417;"  icon="bi-pencil" ></q-avatar>
          </div>
          <div class="col">
        <div class="text-h6">My Surveys</div>
        <div class="text-subtitle2">Coming Soon</div> 
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="bi-chevron-right" @click=""></q-btn>
        </div>
        </div>
      </q-card-section>
    </q-card> -->
    </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user.store";
import WalletService from "@/services/wallet.service";
import AccountService from "@/services/account.service";
import { Notify } from 'quasar'
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();
const walletService = new WalletService();
const accountService = new AccountService();
let hasWallet = ref(true);
let balance = ref(0);
onMounted(() => {
  if (userStore.currentAccount.wallet_id === 'None') {
    console.log(userStore.wallet, 'kjgkhb')
    hasWallet.value = false;
  } else {
    balance.value = userStore.wallet.zlto_balance;
  }
});


function CreateWallet() {
  const walletName = "Zlto Wallet";
  const zltoBalance = userStore.currentAccount.temp_account_balance;
  const walletType = 1;
  const walletState = 0;
  const walletOwnerType = "member"; //'wallet', 'member', 'program', 'external'
  const walletLocation = "1";
  const ownerID = userStore.currentAccount.member_id;
  walletService.createWallet(
    walletName,
    zltoBalance,
    walletState,
    walletType,
    ownerID,
    walletOwnerType,
    walletLocation
  ).then((createWalletResponse: any) => {
    if ((createWalletResponse.status = 200)) {
      console.log(createWalletResponse)
      // if(!createWalletResponse.data.zlto_balance)
      // {
       //  CreateWalletFailed('Something went wrong.Please try again!');
     // } else {
        userStore.saveWalletDetails(
        createWalletResponse.data,
      );
      hasWallet.value = true;
      balance.value =  createWalletResponse.data.zlto_balance ? createWalletResponse.data.zlto_balance:  userStore.currentAccount.temp_account_balance;
      accountService.accountWalletUpdate( ownerID, createWalletResponse.data.wallet_id);
      CreateWalletSuccess();
      //}
    }
  }).catch((e: any) => {
    CreateWalletFailed(e.response.data);
      console.log("login error : ", e);
    });
}

function CreateWalletSuccess() {
  Notify.create({
    message: 'You have successfully created a wallet!',
    color: 'green',
    icon: 'bi-check-circle-fill',
    position: 'top',
    actions: [
      { label: 'Dismiss', color: 'white', handler: () => { /* ... */ } }
    ]
  })
}

function CreateWalletFailed(error_msg?: any) {
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

function goToMyTasks() {
  router.push({ name: 'ViewAllUserTasks' });
}

function goToMyCourses() {
  router.push({ name: 'ViewAllUserCourses' });
}

function goToMySurveys() {
  router.push({ name: 'ViewAllUserSurveys' });
}

function viewWallet() {
  router.push({ name: 'UserWallet' });
}


</script>
