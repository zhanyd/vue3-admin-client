<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.realName"
        style="width: 200px"
        class="filter-item"
        placeholder="姓名"
        @keyup.enter="handleFilter"
      />
      <el-button
        class="filter-item"
        type="primary"
        style="margin-left: 10px"
        @click="handleFilter"
        >查询</el-button
      >
      <el-button
        class="filter-item"
        type="success"
        style="margin-left: 10px"
        @click="initAdd"
        >新增</el-button
      >
    </div>

    <el-table v-loading="listLoading" :data="list">
      <el-table-column prop="user_name" label="用户名" />
      <el-table-column prop="real_name" label="姓名" />
      <el-table-column align="center" label="操作">
        <template #default="scope">
          <el-button type="primary" size="small" @click="initEdit(scope.row.id)"
            >编辑</el-button
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

    <el-dialog v-model="updateDetailVisible" width="500px">
      <el-form
        ref="ruleFormRef"
        style="max-width: 400px"
        :model="formUserInfo"
        :rules="rules"
        label-width="auto"
        status-icon
      >
        <el-form-item label="用户名：" prop="userName">
          <el-input v-model="formUserInfo.userName" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input v-model="formUserInfo.password" />
        </el-form-item>
        <el-form-item label="真实姓名：" prop="realName">
          <el-input v-model="formUserInfo.realName" />
        </el-form-item>
        <el-form-item label="手机号：" prop="tel">
          <el-input v-model="formUserInfo.tel" />
        </el-form-item>
        <el-form-item label="工号：" prop="workCode">
          <el-input v-model="formUserInfo.workCode" />
        </el-form-item>
        <el-form-item label="所属部门：">
          <el-input v-model="formUserInfo.deptName" />
        </el-form-item>
        <el-form-item label="二级部门：">
          <el-input v-model="formUserInfo.subDeptName" />
        </el-form-item>
        <el-form-item label="u9用户名：">
          <el-input v-model="formUserInfo.erpUserName" />
        </el-form-item>
        <el-form-item label="u9密码：">
          <el-input v-model="formUserInfo.erpPassword" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio-group v-model="formUserInfo.state">
            <el-radio value="1">可用</el-radio>
            <el-radio value="0">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitUserInfo(ruleFormRef)"
            >保存</el-button
          >
          <el-button @click="resetForm(ruleFormRef)">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { getUserList, getUserInfo, addUser, updateUser } from "@/api/user";

defineOptions({
  name: "QuestionList"
});

onMounted(() => {
  fetchData();
});

const formUserInfo = reactive({
  id: null,
  userName: "",
  password: "",
  realName: "",
  workCode: "",
  deptName: "",
  subDeptName: "",
  tel: "",
  erpUserName: "",
  erpPassword: "",
  userType: null,
  state: "1",
  belongCompanyId: 1,
  belongCompanyName: "浙江迦南科技股份有限公司"
});

/**
 * 表单验证接口
 */
interface RuleForm {
  userName: string;
  password: string;
  realName: string;
  tel: string;
  workCode: string;
  belongCompanyId: int;
  state: int;
}

const ruleFormRef = ref<FormInstance>();
const ruleForm = reactive<RuleForm>({
  userName: "",
  password: "",
  realName: "",
  tel: "",
  workCode: "",
  belongCompanyId: null,
  state: null
});

const rules = reactive<FormRules<RuleForm>>({
  userName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  realName: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  tel: [{ required: true, message: "请输手机号", trigger: "blur" }],
  workCode: [{ required: true, message: "请输入工号", trigger: "blur" }],
  state: [{ required: true, message: "请选择状态", trigger: "change" }]
});

const total = ref(0);

const listLoading = ref(true);

const updateDetailVisible = ref(false);

const pageData = reactive({
  pageNum: 1,
  pageSize: 20
});

const listQuery = reactive({
  realName: ""
});

let list = [];

function fetchData() {
  listLoading.value = true;
  getUserList(pageData, listQuery).then(response => {
    list = response.data.list;
    total.value = response.data.total;
    listLoading.value = false;
  });
}

function handleFilter() {
  fetchData();
}

function handleSizeChange(val) {
  pageData.pageSize = val;
  fetchData();
}

function handleCurrentChange(val) {
  pageData.pageNum = val;
  fetchData();
}

// 新增
function initAdd() {
  formUserInfo.id = null;
  formUserInfo.userName = "";
  formUserInfo.password = "";
  formUserInfo.realName = "";
  formUserInfo.workCode = "";
  formUserInfo.deptName = "";
  formUserInfo.subDeptName = "";
  formUserInfo.tel = "";
  formUserInfo.erpUserName = "";
  formUserInfo.erpPassword = "";
  formUserInfo.state = 1;
  updateDetailVisible.value = true;
}

// 编辑
function initEdit(id) {
  getUserInfo(id).then(response => {
    formUserInfo.id = response.data.id;
    formUserInfo.userName = response.data.userName;
    formUserInfo.password = response.data.password;
    formUserInfo.realName = response.data.realName;
    formUserInfo.workCode = response.data.workCode;
    formUserInfo.deptName = response.data.deptName;
    formUserInfo.subDeptName = response.data.subDeptName;
    formUserInfo.tel = response.data.tel;
    formUserInfo.erpUserName = response.data.erpUserName;
    formUserInfo.erpPassword = response.data.erpPassword;
    formUserInfo.state = String(response.data.state);
  });
  updateDetailVisible.value = true;
}

// 保存用户信息
const submitUserInfo = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // 新增用户信息
      if (formUserInfo.id === null) {
        addUser(formUserInfo)
          .then(data => {
            if (data.code === 200) {
              ElMessage({
                message: data.data,
                type: "success"
              });
              fetchData();
              updateDetailVisible.value = false;
            } else {
              ElMessage.error(data.data);
            }
          })
          .catch(error => {
            ElMessage.error(`保存异常 ${error}`);
            console.log(error);
          });
      }
      // 修改用户信息
      else {
        updateUser(formUserInfo)
          .then(data => {
            if (data.code === 200) {
              ElMessage({
                message: data.data,
                type: "success"
              });
              fetchData();
              updateDetailVisible.value = false;
            } else {
              ElMessage.error(data.data);
            }
          })
          .catch(error => {
            ElMessage.error(`保存异常 ${error}`);
            console.log(error);
          });
      }
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scope>
.filter-container {
  margin-bottom: 10px;
}

.el-table {
  margin-bottom: 2%;
}
</style>
