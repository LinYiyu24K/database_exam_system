<template>
  <div style="padding:0 5px 0 5px">
    <h3>用户列表</h3>

    <el-table :data="tableData" border style="width: 100%" max-height="550"  v-loading="loading">
    <el-table-column prop="account" label="账号" sortable width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="80">
    </el-table-column>
    <el-table-column prop="phone" label="电话号码" width="180">
    </el-table-column>
    <el-table-column prop="usertype" label="标签"  :filters="[{ text: '学生', value: '学生' }, { text: '教师', value: '教师' },{ text: '管理', value: '管理' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.usertype === '学生' ? 'primary' : scope.row.usertype === '教师'?'success':'warning'"
          disable-transitions>{{scope.row.usertype}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {requestGetUserLists,requestdeleteUser} from '@/api/user'
export default {
  name: 'UserLists',
  data() {
      return {
        loading:true,
        tableData: []
      }
    },
    methods: {
      
      filterTag(value, row) {
        return row.usertype === value;
      },
      deleteRow(index, rows) {
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var user = JSON.parse(window.localStorage['user']);
          if(user.dno == rows[index].account){
            this.$message({
                  type: 'error',
                  message: '请不要删除自己!'
                });
          }else{
            requestdeleteUser(rows[index]).then(data=>{
              console.log(data)
              var data = data.data;
              if(data.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                console.log('删除了用户：'+rows[index])
                this.getUserLists();
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '删除失败'
              });  
          });
          }
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getUserLists(){
        requestGetUserLists({}).then(data=>{
        console.log(data)
        var data = data.data;
        this.loading= false;
        if(data.success){
          this.tableData = data.result;
        }
      })
      }
    },
    created(){
      this.getUserLists();
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>