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
                                    <a href="" class="loginout">退出</a>
                                </el-col>
                        </el-row>
                </el-header>
                <el-container>
                  <el-aside class="aside"width="200px">
                        <el-menu default-active="2" :unique-opened="true">
                        <el-submenu index="1">
                          <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                          </template>
                          <el-menu-item index="1-1">
                            <i class="el-icon-location"></i>
                            选项1
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
                  <el-main class="main">Main</el-main>
                </el-container>
        </el-container>

</template>
<script>
export default{

}
</script>
<style>
    .container{
        height: 100%;
        background: #b3c0d1;
    }
    .aside{
        background: pink;
    }
    .main{
        background: red;
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
