import secure_http from "@/config/apiSecureStore";
import type {
  GetAllStoreFrontsResponse,
  GetAllStoreItems,
  StoreItem,
} from "./models/store.models";

export default class StoreService {
  async getAllStoreFronts(
    limit?: number,
    offset?: number
  ): Promise<GetAllStoreFrontsResponse> {
    return secure_http.get(`/get_all_store_fronts`, {
      params: {
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
      },
    });
  }

  async getAllStoreItems(
    limit?: number,
    offset?: number
  ): Promise<GetAllStoreItems> {
    return secure_http.get(`/all_store_items`, {
      params: {
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
      },
    });
  }

  async getAllStoreItemsByStore(
    storeID: string,
    limit?: number,
    offset?: number
  ): Promise<GetAllStoreItems> {
    return secure_http.get(`/all_store_items_by_store`, {
      params: {
        store_id: storeID,
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
      },
    });
  }

  async getStoreItemsById(itemID: string): Promise<StoreItem> {
    return secure_http.get(`/get_item_by_id/${itemID}`);
  }

  async createStoreTransaction(payload: {
    storeID: string;
    storeCategoryID: string;
    itemCategoryID: string;
    itemID: number;
    userID: string;
    userOrigin: string;
    zltoAmount: number;
    itemDescription: string;
    transactionDescription: string;
    transactionType: number;
    transactionState: number;
  }): Promise<any> {
    return secure_http.post(`/create_transaction`, {
      store_id: payload.storeID,
      store_category_id: payload.storeCategoryID,
      item_category_id: payload.itemCategoryID,
      item_id: payload.itemID,
      user_id: payload.userID,
      user_origin: payload.userOrigin,
      zlto_amount: payload.zltoAmount,
      item_description: payload.itemDescription,
      transaction_description: payload.transactionDescription,
      transaction_type: payload.transactionType,
      transaction_state: payload.transactionState,
    });
  }
}
