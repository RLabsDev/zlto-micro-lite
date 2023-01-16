import type { GetVouchersByWalletResponse, Voucher, Wallet, WalletsResponse } from "./models/wallet.models";
import secure_http from "../config/apiSecureClient";
import secure_http_wallet from "../config/apiSecureClientWallet";


export default class WalletService {

async createWallet(
  walletName: string,
  zltoBalance: number,
  walletState: number,
  walletType: number,
  ownerID: string,
  walletOwnerType: string,
  walletLocation: string
): Promise<WalletsResponse> {
  return secure_http
    .post(`/create_member_wallet`, {
      wallet_name: walletName,
      zlto_balance: zltoBalance,
      wallet_state: walletState,
      wallet_type: walletType,
      owner_id: ownerID,
      wallet_owner_type: walletOwnerType,
      wallet_location: walletLocation,
    });
}


async getWalletDetails(walletID: string): Promise<Wallet> {
  return secure_http_wallet.get(`/get_wallet/${walletID}`);
}

async getVouchersByWallet(walletID: string): Promise<GetVouchersByWalletResponse> {
  return secure_http_wallet.get(`/get_vouchers_by_wallet/${walletID}`);
}

async getVoucher(voucherID: string): Promise<Voucher> {
  return secure_http_wallet.get(`/get_voucher/${voucherID}`);
}

async updateVoucherStatus(voucherID: string, voucherState: string): Promise<any> {
  return secure_http_wallet.put(`/update_voucher_status/${voucherID}`, {'voucher_state': voucherState});
}


}
