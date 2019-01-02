<template>
    <el-card class="box-card card">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row class="addrow">
            <el-col>
                <el-input placeholder="请输入内容" clearable @clear="getall()" v-model="query" class="input-with-select sea">
                    <el-button slot="append" icon="el-icon-search" @click="searchdata()"></el-button>
                </el-input>
                <el-button type="primary" @click="addusers()">添加</el-button>
            </el-col>
        </el-row>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="id" label="#" width="60">
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="80">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" width="130">
            </el-table-column>
            <el-table-column prop="mobile" label="电话" width="90">
            </el-table-column>
            <el-table-column prop="create_time" label="创建日期" width="100">
                <template slot-scope="list">
                    {{list.row.create_time|format}}
                </template>
            </el-table-column>
            <el-table-column prop="mg_state" label="用户状态" width="80">
                <template slot-scope="arr">
                    <el-switch v-model="arr.row.mg_state" active-color="#13ce66" inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="arr">
                    <el-button type="primary" icon="el-icon-edit" size="mini" circle plain @click="showedit(arr.row)"></el-button>
                    <el-button type="danger" icon="el-icon-delete" @click="deleteUsers(arr.row)" size="mini" circle plain></el-button>
                    <el-button type="success" icon="el-icon-check" size="mini" circle plain></el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
        <!-- 添加用户 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleAdd">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input v-model="form.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input v-model="form.mobile" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
                <el-button type="primary" @click="addRightUsers()">确 定</el-button>
            </div>

        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
                <el-form :model="form">
                    <el-form-item label="用户名" :label-width="formLabelWidth">
                        <el-input v-model="form.username" disabled autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" :label-width="formLabelWidth">
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="电话" :label-width="formLabelWidth">
                        <el-input v-model="form.mobile" autocomplete="off"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
                    <el-button type="primary" @click="addRightUsers()">确 定</el-button>
                </div>
    
            </el-dialog>
    </el-card>
</template>
<script>
    export default {
        data() {
            return {
                search: '',
                query: '',
                pagenum: 1,
                pagesize: 2,
                total: -1,
                tableData: [

                ],
                form: {
                    username: '',
                    password: '',
                    email: '',
                    mobile: ''
                },
                dialogFormVisibleAdd: false,
                dialogFormVisibleEdit:false,
                formLabelWidth: "120px"
            }
        },
        created() {
            this.getUsersList();
        },
        methods: {
            //  用户数据列表
            async getUsersList() {
                this.$http.defaults.headers.common["Authorization"] = localStorage.getItem('token');
                const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
                console.log(res)
                const { data: {
                    data: { users, total },
                    meta: { msg, status }
                } } = res
                if (status === 200) {
                    // 给表格数据赋值
                    this.tableData = users
                    this.total = total
                }
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pagesize = val;
                this.pagenum = 1
                this.getUsersList();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pagenum = val;
                this.getUsersList();
            },
            // 搜索
            searchdata() {
                this.pagenum = 1
                this.getUsersList();
            },
            getall() {
                this.getUsersList();
            },
            // 添加用户对话框
            addusers() {
                this.dialogFormVisibleAdd = true
            },
            // 确定添加用户
            async addRightUsers() {
                const res = await this.$http.post('users', this.form)
                // console.log(res);
                const { meta: { msg, status } } = res.data
                if (status === 201) {
                    this.$message.success('添加用户成功')
                    this.dialogFormVisibleAdd = false
                    this.getUsersList();
                } else {
                    this.$message.error(msg)
                }
            },
            // 删除用户
            deleteUsers(user) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(  async() => {
                    const res = await this.$http.delete(`users/${user.id}`)
                    // console.log(res)
                    const {meta:{msg,status}}=res.data
                    if(status===200){
                        this.$message.success('删除成功')
                        this.pagenum=1
                        this.getUsersList()
                    }
                    
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 显示编辑
            showedit(user){
                this. dialogFormVisibleEdit=true
            },
        }
    }
</script>
<style>
    .card {
        width: 100%;
        height: 100%;
    }

    .addrow {
        margin-top: 20px;
    }

    .sea {
        width: 400px;
    }
</style>