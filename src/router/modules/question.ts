// 问题列表
export default {
  path: "/question",
  meta: {
    title: "问题列表"
  },
  children: [
    {
      path: "/list",
      name: "list",
      component: () => import("@/views/question/list.vue"),
      meta: {
        title: "问题列表"
      }
    },
    {
      path: "/add",
      name: "add",
      component: () => import("@/views/question/add.vue"),
      meta: {
        title: "新增问题"
      }
    }
  ]
};
