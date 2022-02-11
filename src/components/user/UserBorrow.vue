<template>
    <el-table
    :data="tableData"
    stripe
    height="600"
    style="width: 100%">
    <el-table-column
      prop="bookName"
      label="书名">
      </el-table-column>
      <el-table-column
      prop="author"
      label="作者"
      >
    </el-table-column>
    <el-table-column
      prop="publisher"
      label="出版社">
    </el-table-column>
    <el-table-column
      prop="startTime"
      label="借阅时间"
      >
    </el-table-column>
    <el-table-column
      prop="endTime"
      label="应还时间">
    </el-table-column>
    <el-table-column
      prop="state"
      label="状态">
    </el-table-column>
  </el-table>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      tableData:[]
    }
  },
  created(){
      axios({
        method: 'get',
        url: "http://127.0.0.1:8080/borrow/userBorrow",
        headers:{"token" : localStorage.getItem("token")}

      }).then(res => {
        if (res.data.status == 200){
            this.tableData = res.data.data;
        }else{
            this.$message.error(res.data.message);
        }
      })
  }
}
</script>