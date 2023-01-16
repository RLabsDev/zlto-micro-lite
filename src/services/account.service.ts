import type { LoginResponse, MemberLogin } from "./models/member.models";
import http from "../config/apiClient";
import secure_http from "@/config/apiSecureClient";
import secure_http_file from "@/config/apiSecureClientFileProfile";

export default class MemberAccountService {

async createMemberAccount(
    programID: string,
    programName: string,
    profileID: number,
    walletID: string,
    username: string,
    password: string,
    dob: string,
    gender: string,
    race: string,
    location: string,
    country: string,
    status: string
): Promise<any> {
  // Using axios directly because this call does not require the access token in the request header
  return http.post(`/create_account`, {
    program_id: programID,
    program_name: programName,
    profile_id: profileID,
    wallet_id: walletID,
    m_username: username,
    m_password: password,
    m_dob: dob,
    m_gender: gender,
    m_race: race,
    m_location: location,
    m_country: country,
    m_status: status
  });
}

async loginMemberAccount(loginParams: MemberLogin): Promise<LoginResponse> {
  return http.post("/account_login", loginParams);
}

async accountWalletUpdate(account_id: string, wallet_id: string): Promise<any> {
  return secure_http.put(`/account_wallet_update/${account_id}`, {'wallet_id': wallet_id});
}

async createMemberProfile(
  payload: {
  memberID: string,
  mainProgramID: string,
  firstName: string,
  lastName: string,
  bio: string,
  IDNumber: string,
  phoneNumber: string,
  userName: string,
  avatar: string,
  status: string}
): Promise<any> {
return secure_http.post(`/create_profiles`, {
  member_id: payload.memberID,
  main_program_id: payload.mainProgramID,
  first_name: payload.firstName,
  last_name:payload.lastName,
  bio: payload.bio,
  id_number: payload.IDNumber,
  phone_number: payload.phoneNumber,
  username: payload.userName,
  avatar: payload.avatar,
  status: payload.status
});
}

async updateMemberProfile(
  payload: {
  profileID: number
  memberID: string,
  mainProgramID: string,
  firstName: string,
  lastName: string,
  bio: string,
  IDNumber: string,
  phoneNumber: string,
  userName: string,
  avatar: string,
  status: string
}
): Promise<any> {
return secure_http.put(`/update_profile/${payload.profileID}`, {
  member_id: payload.memberID,
  main_program_id: payload.mainProgramID,
  first_name: payload.firstName,
  last_name:payload.lastName,
  bio: payload.bio,
  id_number: payload.IDNumber,
  phone_number: payload.phoneNumber,
  username: payload.userName,
  avatar: payload.avatar,
  status: payload.status
});
}

async getAllMemberLogs(
  memberID: string,
  limit?: number,
  offset?: number): Promise<any> {
  return secure_http.get(`/get_all_logs_by_user/${memberID}`, {
    params: {
      limit: limit ? limit : 10,
      offset: offset ? offset : 0,
    },
  });
}

async uploadMemberProfileAvatar(
  payload: {
  profileID: number,
  avatar: any
}
): Promise<any> {
return secure_http_file.post(`/upload_profile_avatar/${payload.profileID}`, {
  file : payload.avatar,
});
}

async uploadMemberDocs(
  payload: {
  profileID: string,
  document: any,
  doc_type: string
}
): Promise<any> {
return secure_http_file.post(`/upload_zlto_docs/${payload.profileID}?doc_type=${payload.doc_type}`, {
  file : payload.document,
});
}


  async createPasswordResetRequest(
    payload: {
    username: string,
    resetType: string,}
  ): Promise<any> {
  return http.post(`/create_password_reset`, {
    account_username: payload.username,
    reset_type: payload.resetType
  });
  }

  async createVerificationRequest(
    payload: {
    username: string,
    resetType: string}
  ): Promise<any> {
  return http.post(`/create_verification`, {
    v_contact: payload.username,
    v_contact_type: payload.resetType
  });
  }

  async getVerificationRequest(
    verificationID: string
  ): Promise<any> {
  return http.get(`/get_verification/${verificationID}`);
  }

  async completeVerificationRequest(
    payload: {
      verificationID: string,
      verificationCode: string
    }
  ): Promise<any> {
  return http.put(`/complete_update_verification/${payload.verificationID}`,{
      v_code: payload.verificationCode
  });
  }

}
