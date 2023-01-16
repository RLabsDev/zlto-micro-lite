//TODO: Add models
import secure_http from "@/config/apiSecureClientTask";
import secure_http_file from "@/config/apiSecureClientFileTask";
import type { getAllTasksResponse, getAllTaskTransactionsResponse } from "./models/task.models";

export default class TaskService {

    async getAllTasks(
        limit?: number,
        offset?: number
      ): Promise<getAllTasksResponse> {
        return secure_http.get(`/all_task_list`, {
          params: {
            limit: limit ? limit : 10,
            offset: offset ? offset : 0,
          },
        });
      }

      async getAllUserTasks(
        ownerID: string,
        limit?: number,
        offset?: number
      ): Promise<getAllTasksResponse> {
        return secure_http.get(`/all_task_by_owner_list/${ownerID}`, {
          params: {
            limit: limit ? limit : 10,
            offset: offset ? offset : 0,
          },
        });
      }

      async getAllUserTaskTransactions(
        ownerID: string,
        limit?: number,
        offset?: number
      ): Promise<getAllTaskTransactionsResponse> {
        return secure_http.get(`/all_task_transaction_list_by_owner/${ownerID}`, {
          params: {
            limit: limit ? limit : 10,
            offset: offset ? offset : 0,
          },
        });
      }
async getTaskDetails(taskID: string): Promise<any> {
  return secure_http.get(`/task/${taskID}`);
}

  async createTaskTransaction(
    payload: {
      taskID: string,
      ownerID: string,
      userID: string,
      taskName: string,
      userName: string,
      zltoAmount: number,
      transactionStatus: number,
      userOriginID: number
    }

  ): Promise<any> {
    return secure_http
      .post(`/task_transaction`, {
        task_id: payload.taskID,
        user_id: payload.userID,
        owner_id: payload.ownerID,
        task_name: payload.taskName,
        user_name: payload.userName,
        zlto_amount: payload.zltoAmount,
        transaction_status: payload.transactionStatus,
        user_origin_id: payload.userOriginID
      });
  }

  async updateTaskTransaction(
    payload: {
      taskTransactionID: string,
      taskID: string,
      userID: string,
      taskName: string,
      userName: string,
      zltoAmount: number,
      transactionStatus: number,
      userOriginID: number
    }

  ): Promise<any> {
    return secure_http
      .put(`/task_transaction/${payload.taskTransactionID}`, {
        task_id: payload.taskID,
        user_id: payload.userID,
        task_name: payload.taskName,
        user_name: payload.userName,
        zlto_amount: payload.zltoAmount,
        transaction_status: payload.transactionStatus,
        user_origin_id: payload.userOriginID
      });
  }

  async getTaskTransactionDetails(taskTransactionID: string): Promise<any> {
    return secure_http.get(`/task_transaction/${taskTransactionID}`);
  }

  async createTaskResource(
    payload: {
      resourceName: string,
      taskID: string,
      ownerID: string,
      ownerOrigin: string,
      userID: string,
      userOrigin: string,
      resourceLink: string,
      resourceType: number,
      resourceVerified: number
    }
  ): Promise<any> {
    return secure_http
      .post(`/task_resource`, {
        resource_name: payload.resourceName,
        task_id: payload.taskID,
        owner_id: payload.ownerID,
        owner_origin: payload.ownerOrigin,
        user_id: payload.userID,
        user_origin: payload.userOrigin,
        resource_link: payload.resourceLink,
        resource_type: payload.resourceType,
        resource_verified: payload.resourceVerified
      });
  }

    async uploadTaskResourceImage(
            task_id: string,
            member_id: string,
            file: any
    ): Promise<any> {
        return secure_http_file
            .post(`/upload_task_resource/${task_id}/${member_id}`, {
                file: file
            });
    }

    async getAllTaskResourceListByUserTask(
      userID: string,
      taskID: string,
      limit?: number,
      offset?: number
    ): Promise<any> {
      return secure_http.get(`/all_task_resource_list_by_user_task/${userID}/${taskID}`, {
        params: {
          limit: limit ? limit : 10,
          offset: offset ? offset : 0,
        },
      });
    }

}
