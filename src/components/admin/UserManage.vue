<template>
    <div>
    <el-form :inline="true"  class="demo-form-inline search">
        <el-form-item label="查询用户">
            <el-input v-model="search"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  class="add" @click="addDialog = true">添加用户</el-button>
        </el-form-item>
    </el-form> 
        <el-table
    :data="tableData"
    stripe
    :height="tableHeight"
    style="width: 100%">
    <el-table-column
        prop="id"
        label="读者号">
      </el-table-column>
    <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="studentCode"
        label="学号">
      </el-table-column>
      <el-table-column
        prop="department"
        label="学院">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-drawer
  title="修改用户信息"
  :visible.sync="updateDialog"
  direction="rtl"
  size="30%">
  <div>
    <el-form :model="updateForm" class="form">
      <el-form-item label="用户名">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="updateForm.studentCode"></el-input>
      </el-form-item>
      <el-form-item label="学院">
      </el-form-item>
      <el-form-item>
            <el-select v-model="updateForm.department" placeholder="请选择学院" size="medium" class="select">
                <el-option label="机械工程学院" value="机械工程学院"></el-option>
                <el-option label="土木工程与力学学院" value="土木工程与力学学院"></el-option>
                <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
                <el-option label="商学院" value="商学院"></el-option>
                <el-option label="数学与计算科学院" value="数学与计算科学院"></el-option>
                <el-option label="物理与光电工程学院" value="物理与光电工程学院"></el-option>
                <el-option label="公共管理学院" value="公共管理学院"></el-option>
                <el-option label="文学与新闻学院" value="文学与新闻学院"></el-option>
                <el-option label="外国语学院" value="外国语学院"></el-option>
                <el-option label="化学学院" value="化学学院"></el-option>
                <el-option label="化工学院" value="化工学院"></el-option>
                <el-option label="材料科学与工程学院" value="材料科学与工程学院"></el-option>
                <el-option label="环境与资源学院" value="环境与资源学院"></el-option>
                <el-option label="碧泉书院·哲学与历史文化学院" value="碧泉书院·哲学与历史文化学院"></el-option>
                <el-option label="自动化与电子信息学院" value="自动化与电子信息学院"></el-option>
                <el-option label="计算机学院·网络空间安全学院" value="计算机学院·网络空间安全学院"></el-option>
                <el-option label="法学院" value="法学院"></el-option>
            </el-select>
      </el-form-item>
    </el-form>
    <div class="form">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="updateUser">提交</el-button>
    </div>
  </div>
</el-drawer>

<el-drawer
  title="添加用户"
  :visible.sync="addDialog"
  size="30%"
  direction="rtl">
  <div>
    <el-form :model="addForm" class="form">
      <el-form-item label="用户名">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="学号">
        <el-input v-model="addForm.studentCode"></el-input>
      </el-form-item>
      <el-form-item label="学院">
      
      </el-form-item>
      <el-form-item>
            <el-select v-model="addForm.department" placeholder="请选择学院" size="medium" class="select">
                <el-option label="机械工程学院" value="机械工程学院"></el-option>
                <el-option label="土木工程与力学学院" value="土木工程与力学学院"></el-option>
                <el-option label="马克思主义学院" value="马克思主义学院"></el-option>
                <el-option label="商学院" value="商学院"></el-option>
                <el-option label="数学与计算科学院" value="数学与计算科学院"></el-option>
                <el-option label="物理与光电工程学院" value="物理与光电工程学院"></el-option>
                <el-option label="公共管理学院" value="公共管理学院"></el-option>
                <el-option label="文学与新闻学院" value="文学与新闻学院"></el-option>
                <el-option label="外国语学院" value="外国语学院"></el-option>
                <el-option label="化学学院" value="化学学院"></el-option>
                <el-option label="化工学院" value="化工学院"></el-option>
                <el-option label="材料科学与工程学院" value="材料科学与工程学院"></el-option>
                <el-option label="环境与资源学院" value="环境与资源学院"></el-option>
                <el-option label="碧泉书院·哲学与历史文化学院" value="碧泉书院·哲学与历史文化学院"></el-option>
                <el-option label="自动化与电子信息学院" value="自动化与电子信息学院"></el-option>
                <el-option label="计算机学院·网络空间安全学院" value="计算机学院·网络空间安全学院"></el-option>
                <el-option label="法学院" value="法学院"></el-option>
            </el-select>
      </el-form-item>
    </el-form>
    <div class="form">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="addUser">提交</el-button>
    </div>
  </div>
</el-drawer>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
          tableHeight: document.documentElement.clientHeight - 180,
          search: '',
            updateDialog:false,
            addDialog:false,
            updateForm:{
                id:'',
                name:'',
                studentCode:'',
                department:''
            },
            addForm:{
                name:'',
                studentCode:'',
                department:''
            },
          tableData: []
        }
    },
    methods:{
      addUser(){
        axios({
          method:'post',
          url: "http://127.0.0.1:8080/user/addUser",
          data: this.addForm,
          headers:{"token" : localStorage.getItem("token")}
        }).then(res => {
          if (res.data.status == 200){
                    alert('添加成功')
                    this.addDialog = false;                 
                    this.$router.go(0)
                }else{
                    this.$message.error(res.data.message);
                }
        })
      },
      updateUser(){
        axios({
          method:'post',
          url: "http://127.0.0.1:8080/user/updateUser",
          data: this.updateForm,
          headers:{"token" : localStorage.getItem("token")}
        }).then(res => {
          if (res.data.status == 200){
                    alert('修改成功')
                    this.updateDialog = false;
                    this.$router.go(0)
                }else{
                    this.$message.error(res.data.message);
                }
        })
      },
      handleDelete(user){
        axios({
          method: 'get',
          url: "http://127.0.0.1:8080/user/delete",
          params:{
            id: user.id
          },
          headers:{"token" : localStorage.getItem("token")}
        }).then(res => {
          if (res.data.status == 200){
                    alert('删除成功')
                    this.$router.go(0)
                }else{
                    this.$message.error(res.data.message);
                }
        })
      },
      submit(){
        axios({
                method: 'get',
                url: "http://127.0.0.1:8080/user/search",
                params: {
                  text: this.search
                },
                headers:{"token" : localStorage.getItem("token")}
            }).then(res => {
                if (res.data.status == 200){
                    this.tableData = res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            })
      },
      
        handleEdit(user){
            this.updateDialog = true;
            this.updateForm.id = user.id;
            this.updateForm.name = user.name;
            this.updateForm.studentCode = user.studentCode;
            this.updateForm.department = user.department;
        },
        cancelForm(){
            this.addDialog = false;
            this.updateDialog = false;
        }
    },
    created(){
        var _this = this;
            axios({
                method: 'get',
                url: "http://127.0.0.1:8080/user/userList",
                headers:{"token" : localStorage.getItem("token")}
            }).then(res => {
                if (res.data.status == 200){
                    _this.tableData = res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            })
    }
}
</script>

<style scoped>
    .search{
        text-align: center;
    }
    .form{
        padding:30px;
    }
    .select{
      width: 372px;
      margin-left: 0px;
    }
</style>