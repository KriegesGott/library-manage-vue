<template>
    <el-descriptions title="用户信息" class="wrapper">
    <el-descriptions-item label="用户名">{{name}}</el-descriptions-item>
    <el-descriptions-item label="学校">{{school}}</el-descriptions-item>
    <el-descriptions-item label="学院">{{department}}</el-descriptions-item>
    <el-descriptions-item label="身份">{{role}}</el-descriptions-item>
    <el-descriptions-item label="借书次数">{{borrowCount}}</el-descriptions-item>
    </el-descriptions>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            name:'',
            school:'',
            department:'',
            role:'',
            borrowCount:''
        }
    },
    created(){
        var _this = this;
        axios({
            method:'get',
            url:'http://127.0.0.1:8080/user/userInfo',
            headers:{"token" : localStorage.getItem("token")},
        }).then(res => {
            if (res.data.status == 200){
            _this.name = res.data.data.name;
            _this.school = res.data.data.school;
            _this.department = res.data.data.department;
            _this.borrowCount = res.data.data.borrowCount;
            _this.role = res.data.data.role;
        }else{
            this.$message.error(res.data.message);
        }
        })
    }
}
</script>

<style scoped>
    .wrapper{
        padding: 30px;
        border: 1px solid;
        width: 800px;
        margin: 0 auto;
        margin-top: 100px;
    }
</style>

