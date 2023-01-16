import type { UserDetails, CurrentAccountDetails, Profile } from '@/services/models/member.models';
import type { Wallet } from '@/services/models/wallet.models';
import { defineStore } from 'pinia';

interface AccountState {
  accessToken: string,
  currentAccount: CurrentAccountDetails;
  onboaringAccountInfo: UserDetails;
  wallet: Wallet;
  profile: Profile,
  refreshToken: string,
}

export const useUserStore = defineStore('UserStore', {
  state: (): AccountState => ({
    accessToken: '',
    currentAccount: {
      date_created: '',
      last_login: '',
      m_country: '',
      m_dob: '',
      m_gender: 0,
      m_location: '',
      m_password: '',
      m_race: '',
      m_status:'',
      m_username: '',
      member_id: '',
      profile_id: 0,
      program_id:'',
      program_name: '',
      wallet_id: '',
      temp_account_balance: 0,
      external_account_id: '',
      owner_id: '',
      owner_name: '',
      owner_origin: '',
    },
    onboaringAccountInfo: {
      name: '',
      surname: '',
      email_address: '',
      cell_number: '',
      dob: '',
      id_number: '',
      gender: '',
      country_of_residence: '',
      postal_code: '',
      profile_picture: '',
      password: '',
    },
    wallet: {
      date_created: '',
      last_updated:'',
      owner_id:'',
      wallet_id:'',
      wallet_location:'',
      wallet_name:'',
      wallet_owner_type:'',
      wallet_state:0,
      zlto_balance:0,
      zlto_rewards:0
    },
    profile: {
      avatar: '',
      bio: '',
      first_name: '',
      id_number: '',
      last_name: '',
      main_program_id: '',
      member_id: '',
      member_profile_id: 0,
      phone_number: '',
      status: '',
      username: ''
    },
    refreshToken: '',
  }),
  getters: {
    getCurrentAccount: (state) => state.currentAccount,
    getAccessToken: (state) => state.accessToken,
    getAccountInfo: (state) => state.onboaringAccountInfo,
    getRefreshToken: (state) => state.refreshToken,
    getCellNumber: (state) => state.onboaringAccountInfo.cell_number,
    getEmailAddress: (state) => state.onboaringAccountInfo.email_address,
    getProfile: (state) => {
      return {
        bio: state.profile.bio,
        avatar: state.profile.avatar,
        name: state.profile.first_name,
        surname: state.profile.last_name,
        username: state.profile.username,
        cellNumber: state.profile.phone_number,
        dateOfBirth: state.currentAccount.m_dob,
        IDNumber: state.profile.id_number,
        gender: state.currentAccount.m_gender,
        country: state.currentAccount.m_location

      }
    }
  },
  actions: {
    setCurrentAccount(account_info: any) {
      this.currentAccount = account_info;
    },
    reset() {
      this.accessToken = '';
      this.onboaringAccountInfo = {
        name: '',
        surname: '',
        email_address: '',
        cell_number: '',
        dob: '',
        id_number: '',
        gender: '',
        country_of_residence: '',
        postal_code: '',
        profile_picture: '',
        password: '',
      };
      this.wallet = {
        date_created: '',
        last_updated:'',
        owner_id:'',
        wallet_id:'',
        wallet_location:'',
        wallet_name:'',
        wallet_owner_type:'',
        wallet_state:0,
        zlto_balance:0,
        zlto_rewards:0
      }
      this.profile = {
        avatar: '',
        bio: '',
        first_name: '',
        id_number: '',
        last_name: '',
        main_program_id: '',
        member_id: '',
        member_profile_id: 0,
        phone_number: '',
        status: '',
        username: ''
      }
      this.refreshToken = '';
    },
    saveAccountDetails(
      access_token: string,
      account_info: CurrentAccountDetails,
      refresh_token: string,
      profile: Profile
    ) {
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      this.currentAccount = account_info;
      this.profile = profile;
    },
    saveWalletDetails(
      wallet: Wallet,
    ) {
    this.wallet = wallet;
    this.currentAccount.wallet_id = wallet.wallet_id
    },
    saveProfileDetails(profile: Profile) {
      this.profile = profile
    }
  },
});
