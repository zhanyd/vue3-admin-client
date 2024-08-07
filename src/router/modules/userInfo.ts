// 问题列表
export default {
  path: "/userInfo",
  meta: {
    title: "用户列表",
    roles: ["admin"]
  },
  children: [
    {
      path: "/userInfo",
      name: "userInfoList",
      component: () => import("@/views/userInfo/list.vue"),
      meta: {
        title: "用户列表"
      }
    }
  ]
};
