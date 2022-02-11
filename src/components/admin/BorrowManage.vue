<template>
    <div>
    <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="通过图书号查询">
            <el-input v-model="search"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  class="add" @click="addDialog = true">添加借阅</el-button>
        </el-form-item>
    </el-form> 
        <el-table
    :data="tableData"
    :height="tableHeight"
    stripe
    style="width: 100%">
    <el-table-column
        prop="id"
        label="操作号">
      </el-table-column>
    <el-table-column
        prop="userId"
        label="读者号">
      </el-table-column>
    <el-table-column
        prop="bookId"
        label="图书号">
      </el-table-column>
    <el-table-column
        prop="startTime"
        label="借书时间">
      </el-table-column>
      <el-table-column
        prop="endTime"
        label="应还时间">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.row)">还书</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

      <el-drawer
  title="添加借阅"
  :visible.sync="addDialog"
  size="30%"
  direction="rtl">
  <div>
    <el-form :model="addForm" class="form">
      <el-form-item label="读者号">
        <el-input v-model="addForm.userId"></el-input>
      </el-form-item>
      <el-form-item label="图书号">
        <el-input v-model="addForm.bookId"></el-input>
      </el-form-item>
      <el-form-item label="借书时间">
      </el-form-item>
      <el-form-item>
        <el-date-picker
          v-model="addForm.startTime"
          type="date"
          placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="状态">
      </el-form-item>
      <el-form-item>
            <el-select v-model="addForm.state" size="medium" class="select">
                <el-option label="已还" value="已还"></el-option>
                <el-option label="未还" value="未还"></el-option>
            </el-select>
      </el-form-item>
    </el-form>
    <div class="form">
      <el-button @click="addDialog = false">取消</el-button>
      <el-button type="primary" @click="addBorrow">提交</el-button>
    </div>
  </div>
</el-drawer>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
          tableHeight: document.documentElement.clientHeight - 180,
          search:'',
          addDialog: false,
          addForm: {
            userId:'',
            bookId:'',
            startTime: new Date(),
            state: ''
          },
          tableData: []
        }
      },
      methods:{
        handleEdit(borrow){
            axios({
              method: 'get',
              url: "http://127.0.0.1:8080/borrow/updateState",
              params:{
                id: borrow.id
              },
              headers:{"token" : localStorage.getItem("token")}
            }).then(res => {
              if (res.data.status == 200){
                    alert('还书成功')
                    this.$router.go(0)
              }else{
                  this.$message.error(res.data.message);
              }
            })
        },
        handleDelete(borrow){
            axios({
              method: 'get',
              url: "http://127.0.0.1:8080/borrow/delete",
              params:{
                id: borrow.id
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
          if(this.search == ''){
            this.search = '-1'
          }
            axios({
                method: 'get',
                url: "http://127.0.0.1:8080/borrow/search",
                params: {
                  bookId: this.search
                },
                headers:{"token" : localStorage.getItem("token")}
            }).then(res => {
                if (res.data.status == 200){
                    this.tableData = res.data.data;
                }else{
                    this.$message.error(res.data.message);
                }
            })
            this.search = ''
        },
        addBorrow(){
            axios({
          method:'post',
          url: "http://127.0.0.1:8080/borrow/addBorrow",
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
        }
      },
      created(){
          var _this = this;
            axios({
                method: 'get',
                url: "http://127.0.0.1:8080/borrow/list",
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