import { http } from "@/utils/http"

type questionResult = {
  code: number
  message: string
  data: any
}

/** 列表问题 */
export const getQuestionList = (pageData, listQuery?: object) => {
  return http.request<questionResult>(
    "get",
    `question/questions/${pageData.pageNum}/${pageData.pageSize}`,
    {
      params: listQuery
    }
  )
}

/** 新增问题 */
export const addQuestion = (data?: object) => {
  return http.request<questionResult>("post", "question/question", {
    data
  })
}

/** 更新问题 */
export const updateQuestion = (data?: object) => {
  return http.request<questionResult>("put", "question/question", {
    data
  })
}

/** 删除问题 */
export function delQuestion(id) {
  return http.request<questionResult>("delete", `question/question/${id}`, {})
}

// 获取问题详情
export function getQuestion(id) {
  return http.request<questionResult>("get", `question/question/${id}`, {})
}
