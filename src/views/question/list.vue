<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.question"
        style="width: 200px"
        class="filter-item"
        placeholder="问题"
        @keyup.enter="handleFilter"
      />
      <el-input
        v-model="listQuery.answer"
        style="width: 200px"
        class="filter-item"
        placeholder="答案"
        @keyup.enter="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin-left: 10px"
        @click="handleFilter"
        >查询</el-button
      >
    </div>
    <el-table v-loading="listLoading" :data="list">
      <el-table-column prop="question" label="问题" />
      <el-table-column prop="answer" label="答案" />
      <el-table-column align="center" label="操作" width="200">
        <template v-slot="scope">
          <el-button
            type="primary"
            size="small"
            style="margin-left: 10px"
            @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            type="danger"
            size="small"
            style="margin-left: 10px"
            @click="todelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination
        :current-page="pageData.pageNum"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pageData.pageSize"
        :total="total"
        background
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <el-dialog v-model="updateDetailVisible">
      <el-form
        label-width="100px"
        :model="formQuestion"
        style="max-width: 460px"
      >
        <el-form-item label="问题：">
          <el-input v-model="formQuestion.question" />
        </el-form-item>
        <el-form-item label="回答：">
          <el-input
            v-model="formQuestion.answer"
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 10 }"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="saveQuestion">保存</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
import {
  getQuestionList,
  updateQuestion,
  delQuestion,
  getQuestion
} from "@/api/question"

defineOptions({
  name: "list"
})

onMounted(() => {
  fetchData()
})

const formQuestion = reactive({
  id: null,
  question: "",
  answer: ""
})

const total = ref(0)

const listLoading = ref(true)

const updateDetailVisible = ref(false)

const pageData = reactive({
  pageNum: 1,
  pageSize: 20
})

const listQuery = reactive({
  question: "",
  answer: ""
})

let list = []

function fetchData() {
  listLoading.value = true
  getQuestionList(pageData, listQuery).then(response => {
    list = response.data.list
    total.value = response.data.total
    listLoading.value = false
  })
}

function handleFilter() {
  fetchData()
}

function handleSizeChange(val) {
  pageData.pageSize = val
  fetchData()
}

function handleCurrentChange(val) {
  pageData.pageNum = val
  fetchData()
}

// 删除
function todelete(id) {
  ElMessageBox.confirm("是否删除该数据？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      delQuestion(id).then(response => {
        if (response.code === 200) {
          ElMessage({
            type: "success",
            message: "删除成功"
          })
          fetchData()
        } else {
          ElMessage({
            type: "success",
            message: "删除失败"
          })
        }
      })
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "取消删除"
      })
    })
}

// 编辑
function handleEdit(id) {
  getQuestion(id).then(response => {
    formQuestion.id = response.data.id
    formQuestion.question = response.data.question
    formQuestion.answer = response.data.answer
  })
  updateDetailVisible.value = true
}

// 修改
function saveQuestion() {
  updateQuestion(formQuestion)
    .then(data => {
      if (data) {
        console.log(data)
      }
      fetchData()
      updateDetailVisible.value = false
    })
    .catch(error => {
      console.log(error)
    })
}
</script>

<style scope>
.filter-container {
  margin-bottom: 10px;
}

.el-table {
  margin-bottom: 2%;
}
</style>
