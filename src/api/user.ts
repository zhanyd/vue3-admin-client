import { http } from "@/utils/http";

export type UserResult = {
  code: number;
  data: {
    /** 头像 */
    avatar: string;
    /** 用户名 */
    username: string;
    /** 昵称 */
    nickname: string;
    /** 当前登录用户的角色 */
    roles: Array<string>;
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
  message: string;
};

export type RefreshTokenResult = {
  success: boolean;
  data: {
    /** `token` */
    accessToken: string;
    /** 用于调用刷新`accessToken`的接口时所需的`token` */
    refreshToken: string;
    /** `accessToken`的过期时间（格式'xxxx/xx/xx xx:xx:xx'） */
    expires: Date;
  };
};

type apiResult = {
  code: number;
  message: string;
  data: any;
};

/** 登录 */
export const getLogin = (data?: object) => {
  return http.request<UserResult>("post", "user/login", { data });
};

/** 刷新`token` */
export const refreshTokenApi = (data?: object) => {
  return http.request<RefreshTokenResult>("post", "/refreshToken", { data });
};

/** 获取用户列表 */
export const getUserList = (pageData, listQuery?: object) => {
  return http.request<apiResult>(
    "get",
    `user/users/${pageData.pageNum}/${pageData.pageSize}`,
    {
      params: listQuery
    }
  );
};

// 获取用户详情
export function getUserInfo(id) {
  return http.request<apiResult>("get", `user/userInfo/${id}`, {});
}

// 新增用户
export const addUser = (data?: object) => {
  return http.request<apiResult>("post", "user/userInfo", {
    data
  });
};

// 更新用户
export const updateUser = (data?: object) => {
  return http.request<apiResult>("put", "user/userInfo", {
    data
  });
};
