<template>
    <div class="header">
        <div class="title">图书管理系统</div> 
        <el-menu mode="horizontal" default-active="/user/bookList" @select="handleSelect">
            <el-menu-item index="/user/bookList" class="select">图书列表</el-menu-item>
            <el-menu-item index="/user/recommend" class="select">个性推荐</el-menu-item>
            <el-menu-item index="/user/userInfo" class="select">个人信息</el-menu-item>
            <el-menu-item index="/user/userBorrow" class="select">我的借还</el-menu-item>
            <el-menu-item index="/user/userPassword" class="select">密码修改</el-menu-item>
        </el-menu>
        <div class="right">
            <div class="text">
                <i class="el-icon-user-solid logo"></i>
                <span> {{name}}</span>
            </div>
            <a class="text" @click="exit">
                <i class="el-icon-circle-close logo"></i>
                <span> 退出</span>
            </a>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name:'UserHeader',
        data(){
            return {
                name:'',
            }
        },
        methods:{
            handleSelect(index){
                this.$router.push(index);
            },
            exit(){
                this.$message({
                    message:'退出成功',
                    type:'success'
                });
                this.$router.push('/')
            }
        },
        created(){
            var _this = this;
            axios({
                method: 'get',
                url: "http://127.0.0.1:8080/user/getName",
                headers:{"token" : localStorage.getItem("token")}
            }).then(res => {
                if (res.data.status == 200){
                    _this.name = res.data.data;
                }else{
                    this.$message.error("初始化页面失败");
                    this.$router.push('/')
                }
            })
        }

    }
</script>

<style>
    .header{
        display: flex;
        justify-content: space-between;
        align-content: center;
        border-bottom: 1px solid;
        height: 60px;
        margin: 0 auto;
    }
    .title{
        margin-top: 20px;
        margin-left: 10px;
        text-align: center;
        height: 60px;
        font-size: 20px;
    }
    .select{
        font-size: 15px;
        margin-left: 90px;
    }
    .right{
        height: 60px;
        margin-top: 20px;
        text-align: center;
    }
    .text{
        display: inline-block;
        text-align: center;
        height: 60px;
        margin-left: 30px;
        cursor: pointer;

    }
</style>>

