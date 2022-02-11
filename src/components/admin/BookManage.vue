<template>
    <div>
    <el-form :inline="true" class="demo-form-inline search">
        <el-form-item label="查询图书">
            <el-input v-model="search"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">搜索</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary"  class="add" @click="addDialog = true">添加图书</el-button>
        </el-form-item>
    </el-form> 
        <el-table
    :data="tableData"
    :height="tableHeight"
    stripe
    style="width: 100%">
    <el-table-column
        prop="id"
        label="图书号">
      </el-table-column>
    <el-table-column
        prop="name"
        label="书名">
      </el-table-column>
    <el-table-column
        prop="author"
        label="作者">
      </el-table-column>
      <el-table-column
        prop="publisher"
        label="出版社">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="state"
        label="状态">
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
  title="修改图书信息"
  :visible.sync="updateDialog"
  direction="rtl"
  size="30%">
  <div>
    <el-form :model="updateForm" class="form">
      <el-form-item label="书名">
        <el-input v-model="updateForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="updateForm.author"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="updateForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-input v-model="updateForm.type"></el-input>
      </el-form-item>
      <el-form-item label="状态">
          <el-input v-model="updateForm.state"></el-input>
        </el-form-item>
       
    </el-form>
    <div class="form">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="updateBook">提交</el-button>
    </div>
  </div>
</el-drawer>

<el-drawer
  title="添加图书"
  :visible.sync="addDialog"
  size="30%"
  direction="rtl">
  <div>
    <el-form :model="addForm" class="form">
      <el-form-item label="书名">
        <el-input v-model="addForm.name"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="addForm.author"></el-input>
      </el-form-item>
      <el-form-item label="出版社">
        <el-input v-model="addForm.publisher"></el-input>
      </el-form-item>
      <el-form-item label="类型">
      </el-form-item>
      <el-form-item>
            <el-select v-model="addForm.type" placeholder="请选择类型" size="medium" class="select">
                <el-option label="机械" value="机械"></el-option>
                <el-option label="土木" value="土木"></el-option>
                <el-option label="政治" value="政治"></el-option>
                <el-option label="商务" value="商务"></el-option>
                <el-option label="数学" value="数学"></el-option>
                <el-option label="物理" value="物理"></el-option>
                <el-option label="管理" value="管理"></el-option>
                <el-option label="文学" value="文学"></el-option>
                <el-option label="外语" value="外语"></el-option>
                <el-option label="化学" value="化学"></el-option>
                <el-option label="材料" value="材料"></el-option>
                <el-option label="环境" value="环境"></el-option>
                <el-option label="电子" value="电子"></el-option>
                <el-option label="计算机" value="计算机"></el-option>
                <el-option label="法律" value="法律"></el-option>
                <el-option label="其他" value="其他"></el-option>

            </el-select>
      </el-form-item>
    </el-form>
    <div class="form">
      <el-button @click="cancelForm">取 消</el-button>
      <el-button type="primary" @click="addBook">提交</el-button>
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
            name: '',
            author: '',
            publisher: '',
            type:'',
            state:''
          },
          addForm:{
            id:'',
            name: '',
            author: '',
            publisher: '',
            type:'',
            state:''
          },
          tableData: []
        }
    },
    methods:{
      addBook(){
        axios({
          method:'post',
          url: "http://127.0.0.1:8080/book/addBook",
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
      updateBook(){
        axios({
          method:'post',
          url: "http://127.0.0.1:8080/book/updateBook",
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
      handleDelete(book){
        axios({
          method: 'get',
          url: "http://127.0.0.1:8080/book/delete",
          params:{
            id: book.id
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
                url: "http://127.0.0.1:8080/book/search",
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
        handleEdit(book){
            this.updateDialog = true;
            this.updateForm.id = book.id;
            this.updateForm.name = book.name;
            this.updateForm.author = book.author;
            this.updateForm.publisher = book.publisher;
            this.updateForm.type = book.type;
            this.updateForm.state = book.state;
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
                url: "http://127.0.0.1:8080/book/list",
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
        padding:0 30px;
    }
    .select{
      width: 280px;
      margin-left: 0px;
    }
</style>