<template>
<div class="wapper">
    <el-form :inline="true"  class="demo-form-inline search">
        <el-form-item label="查询图书">
            <el-input v-model="search"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">搜索</el-button>
        </el-form-item>
    </el-form> 
    <el-table
    :data="tableData"
    :height="tableHeight"
    stripe
    style="width: 100%">
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
  </el-table>
</div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
      return {
        tableHeight: document.documentElement.clientHeight - 180,
        search: '',  
        tableData: []
      }
    },
    methods: {
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
</style>