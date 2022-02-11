<template>
    <div class="wrapper">
        <h2 class="title">注册</h2>
        <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="用户名">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item label="学号">
            <el-input v-model="form.studentCode"></el-input>
        </el-form-item>
        <el-form-item label="学院">
            <el-select v-model="form.department" placeholder="请选择学院" size="medium" class="select">
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
        <el-button type="primary" class="botton" @click="onSubmit">注册</el-button>
        </el-form>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Register',
    data() {
      return {
        form: {
          name: '',
          password: '',
          studentCode:'',
          department:''  
        }
      }
    },
    methods: {
      onSubmit() {
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/user/register',
            data: this.form
        }).then(res => {
            if (res.data.status == 200){
            localStorage.setItem("token", res.data.data)
            this.$message({
                message:'注册成功',
                type:'success'
            });
            this.$router.push('/');
          }else{
            this.$message.error(res.data.message);
          }
        });
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
        margin-top: 120px;
    }
    .title{
        text-align: center;
        margin-bottom: 20px;
    }
    .botton{
        width: 250px;
        margin-left: 80px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .select{
        width: 320px;
        margin: 0;
    }
</style>