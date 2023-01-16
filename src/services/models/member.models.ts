export interface UserDetails {
  name: string;
  surname: string;
  email_address: string;
  cell_number: string;
  dob: string;
  id_number: string;
  gender: string;
  country_of_residence: string;
  postal_code: string;
  profile_picture: string;
  password: string;
}

export interface CurrentAccountDetails {
  date_created: string;
  last_login: string;
  m_country: string;
  m_dob: string;
  m_gender: number;
  m_location: string;
  m_password: string;
  m_race: string;
  m_status:string;
  m_username: string;
  member_id: string;
  profile_id: number;
  program_id:string;
  program_name: string;
  wallet_id: string;
  temp_account_balance: number;
  external_account_id: string;
  owner_id: string;
  owner_name: string;
  owner_origin: string;
}



export interface WalletError {
  detail: [
    {
      loc: [];
      msg: string;
      type: string;
    }
  ];
}

export interface MemberLogin {
  m_username: string;
  m_password: string;
}
export interface LoginResponse {
  access_token: string;
  account_info: CurrentAccountDetails;
  profile_info: Profile;
  refresh_token: string;
}

export interface Profile {
  avatar: string;
  bio: string;
  first_name: string;
  id_number: string;
  last_name: string;
  main_program_id: string;
  member_id: string;
  member_profile_id: number;
  phone_number: string;
  status: string;
  username: string;
}
