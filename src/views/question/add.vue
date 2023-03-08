<template>
  <el-form
    label-width="100px"
    ref="ruleFormRef"
    :model="formQuestion"
    :rules="rules"
    style="max-width: 460px"
  >
    <el-form-item label="问题：" prop="question">
      <el-input v-model="formQuestion.question" />
    </el-form-item>
    <el-form-item label="回答：" prop="answer">
      <el-input
        v-model="formQuestion.answer"
        type="textarea"
        :autosize="{ minRows: 3, maxRows: 10 }"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveQuestion(ruleFormRef)"
        >保存</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { addQuestion } from "@/api/question"
import { useRouter } from "vue-router"
import type { FormInstance, FormRules } from "element-plus"

defineOptions({
  name: "add"
})

const router = useRouter()

const ruleFormRef = ref<FormInstance>()

const formQuestion = reactive({
  question: "",
  answer: ""
})

const rules = reactive<FormRules>({
  question: [
    {
      required: true,
      message: "请输入问题",
      trigger: "change"
    }
  ],
  answer: [
    {
      required: true,
      message: "请输入答案",
      trigger: "change"
    }
  ]
})

const saveQuestion = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      addQuestion(formQuestion)
        .then(data => {
          if (data) {
            console.log(data)
          }
          router.push({ path: "/list" })
        })
        .catch(error => {
          console.log(error)
        })
    } else {
      console.log("error submit!", fields)
    }
  })
}
</script>
