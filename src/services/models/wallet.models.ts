export interface CreateWalletResponse {
  wallet_state: number;
  wallet_name: string;
  owner_id: string;
  wallet_location: number;
  date_created: string;
  wallet_type: number;
  zlto_balance: number;
  wallet_id: string;
  wallet_owner_type: string;
  last_updated: string;
}

export interface WalletsResponse {
  owner_id: string;
  data: Array<Wallet>;
}

export interface Wallet {
  date_created: string;
  last_updated: string;
  owner_id: string;
  wallet_id: string;
  wallet_location: string;
  wallet_name: string;
  wallet_owner_type: string;
  wallet_state: number;
  zlto_balance: number;
  zlto_rewards: number;
}

export interface GetVouchersByWalletResponse {
  wallet_id: string
  limit: number;
  offset: number;
  data: Array<Voucher>;
}

export interface Voucher {
  voucher_id: string,
  wallet_id: string,
  voucher_name: string,
  voucher_type: number,
  voucher_category: number,
  voucher_instructions: string,
  voucher_code: string,
  voucher_state: string,
  last_updated: string,
  date_created: string
}