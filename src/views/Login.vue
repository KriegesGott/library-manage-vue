<template>
    <div class="wrapper">
        <h2 class="title">登录</h2>
        <el-form ref="form" :model="form" label-width="80px" class="form">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-button type="primary" class="botton leftBotton" v-on:click="onSubmit">登录</el-button>
        <el-button type="primary" class="botton" v-on:click="register">注册</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Login',
    data() {
      return {
        form: {
          name: '',
          password: ''
        }
      }
    },
    methods: {
      onSubmit() {
        axios({
          method: 'post',
          url: "http://127.0.0.1:8080/user/login",
          data: this.form,
        }).then(res => {
          if (res.data.status == 200){
            console.log(res.data.data.token)
            localStorage.setItem("token", res.data.data.token)
            if (res.data.data.isAdmin == true){
              this.$router.push('/admin/userManage')
            }else{
              this.$router.push('/user/bookList')
            }
          }else{
            this.$message.error(res.data.message)
          }
        });
      },
      register() {
        this.$router.push('/register');
      }
    }
}
</script>

<style scoped>
    .wrapper{
        width: 400px;
        padding: 20px;
        border: 1px solid;
        margin: 0 auto;
        margin-top: 150px;
    }
    .title{
        text-align: center;
        margin-bottom: 10px;
    }
    .form{
      margin-right: 20px;
    }
    .botton{
        width: 150px;
        margin-left: 40px;
        margin-bottom: 20px;
    }
</style>
