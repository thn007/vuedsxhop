<template>
    <div class="formwrap">
    <el-form class="form" label-position="top" label-width="80px" :model="formdata">
        <h2>用户登录</h2>
        <el-form-item label="用户名">
            <el-input v-model="formdata.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="formdata.password"></el-input>
        </el-form-item>
        <el-button type="primary" class="btn" @click="handellogin();">点击登录</el-button>
    </el-form>
    </div>
</template>
<script>
export default {
  data () {
    return {
      formdata: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async handellogin () {
      const res = await this.$http.post('login', this.formdata)

      //   console.log(res);
      const {data: {data, meta: {msg, status}}} = res
      if (status === 200) {
        // token
        localStorage.setItem('token', data.token)
        //    this.$message.success(msg)
        this.$router.push({
          name: 'home'
        })
      } else {
        this.$message.error(msg)
      }
      console.log(data)
    }
  }
}
</script>
<style>
   .formwrap{
       width: 100%;
       height: 100%;
       background: #324152;
       display: flex;
       justify-content: center;
       align-items: center;
   }
   .formwrap .form{
       width: 400px;
       background: #fff;
       padding: 30px;
   }
   .formwrap .form .btn{
       width: 100%;
   }
</style>
