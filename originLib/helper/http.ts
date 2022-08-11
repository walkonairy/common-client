import BaseModel from "../models/BaseModel";

const isDebugHttp = true;

export class http {
  private static tapLog = (json: any) => {
    if (isDebugHttp) {
      if (Array.isArray(json)) {
        console.log("tapLog array=", json.length);
      } else {
        console.log("tapLog object=", typeof json);
      }
    }
    return json;
  };

  // BaseModel是用于对DB进行CRUD的Model，非DB操作请用GET_ANY
  static async GET<T extends BaseModel>(url: string): Promise<T> {
    const requestOption = {
      method: "GET",
    };
    return this.fetchJson(url, requestOption);
  }

  static async GET_ANY<T>(url: string): Promise<T> {
    const requestOption = {
      method: "GET",
    };
    return this.fetchJson(url, requestOption);
  }

  // BaseModel是用于对DB进行CRUD的Model，非DB操作请用GET_ANYS
  static async GET_MANY<T extends BaseModel>(url: string): Promise<T[]> {
    const requestOption = {
      method: "GET",
    };
    return this.fetchJson(url, requestOption);
  }

  static async GET_ANYS<T>(url: string): Promise<T[]> {
    const requestOption = {
      method: "GET",
    };
    return this.fetchJson(url, requestOption);
  }

  static async GET_ByPage<T extends BaseModel>(url: string): Promise<T[]> {
    const requestOption = {
      method: "GET",
    };
    return this.fetchJson(url, requestOption);
  }

  static async DELETE<T extends BaseModel>(url: string): Promise<T> {
    const requestOption = {
      method: "DELETE",
    };
    // MUST NOT return left arrays for performance problem
    return this.fetchJson(url, requestOption);
  }

  static async DELETE_ANY<T>(url: string): Promise<T> {
    const requestOption = {
      method: "DELETE",
    };
    return this.fetchJson(url, requestOption);
  }

  // BaseModel是用于对DB进行CRUD的Model，非DB操作的POST命令(如login功能)请用POST_ANY
  static POST<T extends BaseModel>(url: string, data: T): Promise<T> {
    return http.sendModifyRequest("POST", url, data);
  }

  static POST_ANY<T>(url: string, data: any): Promise<T> {
    return http.sendModifyRequest("POST", url, data);
  }

  static PUT<T extends BaseModel>(url: string, data: T): Promise<T> {
    return http.sendModifyRequest("PUT", url, data);
  }

  static PUT_ANY<T>(url: string, data: any): Promise<T> {
    return http.sendModifyRequest("PUT", url, data);
  }

  static PATCH<T extends BaseModel>(url: string, data: T): Promise<T> {
    return http.sendModifyRequest("PATCH", url, data);
  }

  private static async sendModifyRequest<T extends BaseModel>(
    httpMethod: "POST" | "PUT" | "PATCH",
    url: string,
    data: T
  ): Promise<T> {
    const requestOption = {
      method: httpMethod,
      body: JSON.stringify(data),
    };
    return this.fetchJson(url, requestOption);
  }

  private static async fetchJson(url: string, requestOption: RequestInit) {
    console.log("URL to fetch:" + url, requestOption);
    // FIXME 401/403 .json error
    return (await fetch(url, requestOption)).json().then(http.tapLog);
  }
}
