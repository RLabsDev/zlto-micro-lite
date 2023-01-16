export interface getAllTasksResponse {
  limit: number;
  offset: number;
  data: Array<Task>;
}

export interface getAllTaskTransactionsResponse {
  limit: number;
  offset: number;
  data: Array<TaskTransaction>;
}

export interface getTaskTransactionsResponse {
    date_created: string;
    last_updated: string;
    owner_id: string;
    owner_origin: string;
    task_id: string;
    task_info: Task;
    task_name: string;
    transaction_id: number;
    transaction_status: number;
    user_id: string;
    user_name: string;
    user_origin_id: number;
    zlto_amount: number;
}

export interface TaskTransaction {
  date_created: string;
  last_updated: string;
  owner_id: string;
  owner_origin: string;
  task_id: string;
  task_name: string;
  transaction_id: number;
  transaction_status: number;
  user_id: string;
  user_name: string;
  user_origin_id: number;
  zlto_amount: number;
}

export interface Task {
  task_id: string;
  task_type: number;
  task_status: number;
  task_category: {
    id: number;
    name: string;
    status: number;
  };
  task_logo: string;
  task_name: string;
  task_description: string;
  task_instructions: string;
  task_zlto: number;
  last_updated: Date;
  date_created: Date;
}
