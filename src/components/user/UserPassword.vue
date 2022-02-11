<template>
    <div>
        <el-form ref="form" :model="form" class="form">
            <el-form-item label="输入旧密码">
            <el-input v-model="oldPassword"></el-input>
            </el-form-item>
            <el-form-item label="输入新密码">
            <el-input v-model="newPassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="再次输入新密码">
            <el-input v-model="repeat" show-password></el-input>
             </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit" class="botton">修改密码</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            oldPassword:'',
            newPassword:'',
            repeat:''
        }
    },
    methods: {
      onSubmit() {
        axios({
          method: 'post',
          url: "http://127.0.0.1:8080/user/updatePassword",
          headers:{"token" : localStorage.getItem("token")},
          data: {
              'oldPassword' : this.oldPassword,
              'newPassword' : this.newPassword,
              'repeat' : this.repeat
          },
        }).then(res => {
          if (res.data.status == 200){
            this.$message({
                message: '修改成功',
                type: 'success'
            })
            this.$router.push('/')
          }else{
            this.$message.error(res.data.message)
          }
        });
      }
    }
}
</script>

<style scoped>
    .form{
        width: 400px;
        padding: 30px;
        border: 1px solid;
        margin: 0 auto;
        margin-top: 30px;
    }
    .botton{
        margin-left: 150px;
    }
</style>