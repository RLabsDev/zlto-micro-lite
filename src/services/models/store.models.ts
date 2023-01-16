export interface GetAllStoreFrontsResponse {
    limit: number;
    offset: number;
    data: Array<StoreFront>;
  }

  export interface StoreFront {
    store_id: string,
    owner_id: string,
    owner_origin: string,
    store_name: string,
    store_description: string,
    store_logo: string,
    store_country: number,
    store_country_info_sc: {
      country_name: string,
      country_id: number
    },
    store_category: string,
    store_category_info_sf: {
      store_category_name: string,
      category_id: string
    },
    store_state: number,
    support_email: string,
    last_updated: string,
    date_created: string
  }

  export interface GetAllStoreItems {
    limit: number;
    offset: number;
    data: Array<StoreItem>;
  }

  export interface StoreItem {
    item_id: number,
    store_id: string,
    store_cat_id: string,
    store_info_si: {
      store_id: string,
      owner_id: string,
      owner_origin: string,
      store_name: string,
      store_description: string,
      store_logo: string,
      store_country: number,
      store_country_info_sc: {
        country_name: string,
        country_id: number
      },
      store_category: string,
      store_category_info_sf: {
        store_category_name: string,
        category_id: string
      },
      store_state: number,
      support_email: string,
      last_updated:string,
      date_created:string
    },
    item_cat_id: string,
    item_category_ic: {
      category_id: string,
      category_info_sc: {
        store_category_name: string,
        category_id: string
      },
      item_category_id: number,
      item_cat_name: string,
      item_cat_description: string,
      item_cat_state: number,
      date_created:string
    },
    item_name: string,
    item_description: string,
    item_details: string,
    item_state: number,
    item_logo: string,
    item_zlto: number,
    last_updated:string,
    date_created:string
  }

