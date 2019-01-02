<template>
        <el-container class="container">
                <el-header class="header">
                        <el-row>
                                <el-col :span="3">
                                    <img src="@/assets/logo.png" alt="">
                                </el-col>
                                <el-col :span="19" class="middle">
                                    <h2>电商后台管理系统</h2>
                                </el-col>
                                <el-col :span="1">
                                    <a href="" class="loginout" @click.prevent="loginout()">退出</a>
                                </el-col>
                        </el-row>
                </el-header>
                <el-container>
                  <el-aside class="aside"width="200px">
                        <el-menu default-active="2" :unique-opened="true" router>
                        <el-submenu index="1">
                          <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>用户管理</span>
                          </template>
                          <el-menu-item index="users">
                            <i class="el-icon-location"></i>
                              用户列表
                           
                          </el-menu-item>
                        </el-submenu>
                        <el-submenu index="2">
                                <template slot="title">
                                  <i class="el-icon-location"></i>
                                  <span>导航一</span>
                                </template>
                                <el-menu-item index="2-1">
                                  <i class="el-icon-location"></i>
                                  选项1
                                </el-menu-item>
                              </el-submenu>
                              <el-submenu index="3">
                                    <template slot="title">
                                      <i class="el-icon-location"></i>
                                      <span>导航一</span>
                                    </template>
                                    <el-menu-item index="3-1">
                                      <i class="el-icon-location"></i>
                                      选项1
                                    </el-menu-item>
                                  </el-submenu>
                                  <el-submenu index="4">
                                        <template slot="title">
                                          <i class="el-icon-location"></i>
                                          <span>导航一</span>
                                        </template>
                                        <el-menu-item index="4-1">
                                          <i class="el-icon-location"></i>
                                          选项1
                                        </el-menu-item>
                                      </el-submenu>

                      </el-menu>
                  </el-aside>
                  <el-main class="main">
                    <router-view></router-view>
                  </el-main>
                </el-container>
        </el-container>

</template>
<script>
export default{
  // 权限验证
  beforeCreate(){
    if(!localStorage.getItem("token")){
      this.$router.push({
        name:'login'
      })
      this.$message.warning('请先登录')
    }
  },
  methods:{
    loginout(){
      // 1.清楚token
     localStorage.clear();
      // 2.退出到登录页
      this.$router.push({
        name :'login'
      })
      // 3.提示退出成功
      this.$message.success('退出成功')
    }
  }
}
</script>
<style>
    .container{
        height: 100%;
        background: #b3c0d1;
    }
    .aside{
        background:#fff;
    }
    .main{
        background:#ccc;
    }
    .middle h2{
        text-align: center;
        line-height: 60px;
    }
    .loginout{
        line-height: 60px;
        text-decoration: none;
    }
</style>
