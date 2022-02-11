<template>
    <el-container>
        <el-header>
            <UserHeader></UserHeader>
        </el-header>
        <el-main>
            <router-view/>
        </el-main>

    </el-container>
</template>

<script>
import UserHeader from '../components/user/UserHeader.vue'

export default {
    components:{
        UserHeader
    }
}
</script>
