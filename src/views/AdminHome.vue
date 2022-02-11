<template>
<el-container>
  <el-header><AdminHeader></AdminHeader></el-header>
  <el-main><router-view/></el-main>
</el-container>
</template>

<script>
import AdminHeader from '../components/admin/AdminHeader.vue'

export default {
    components:{
        AdminHeader
    }
}
</script>